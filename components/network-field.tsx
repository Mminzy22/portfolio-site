"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

interface NetworkFieldProps {
  className?: string
}

// 떠다니는 노드가 가까우면 선으로 이어지는 네트워크 그래프.
// 커서 근처 노드는 커서와 연결되며 살짝 끌려옵니다.
export default function NetworkField({ className }: NetworkFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isLight = resolvedTheme === "light"
    const w = () => mount.clientWidth || 1
    const h = () => mount.clientHeight || 1

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 100)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.setSize(w(), h())
    mount.appendChild(renderer.domElement)

    // 화면에 보이는 z=0 평면의 절반 크기
    const bounds = { x: 0, y: 0, z: 1.4 }
    const updateBounds = () => {
      bounds.y = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.05
      bounds.x = bounds.y * camera.aspect
    }
    updateBounds()

    // 화면 넓이에 맞춰 노드 수 조절
    const COUNT = Math.round(THREE.MathUtils.clamp((w() * h()) / 9000, 60, 170))
    const LINK = 1.45 // 노드끼리 연결되는 거리
    const CURSOR_R = 2.1 // 커서와 연결되는 거리
    const MAX_SEGMENTS = COUNT * 8 + COUNT

    const pos = new Float32Array(COUNT * 3)
    const drift = new Float32Array(COUNT * 3)
    const pull = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * bounds.x
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * bounds.y
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * bounds.z
      const speed = reducedMotion ? 0 : 0.0025 + Math.random() * 0.004
      const a = Math.random() * Math.PI * 2
      drift[i * 3] = Math.cos(a) * speed
      drift[i * 3 + 1] = Math.sin(a) * speed
      drift[i * 3 + 2] = (Math.random() * 2 - 1) * speed * 0.3
    }

    const nodeColor = new THREE.Color(isLight ? 0x2563eb : 0xcfe2ff)
    const lineColor = new THREE.Color(isLight ? 0x3b82f6 : 0x8fb4ff)
    const hotColor = new THREE.Color(isLight ? 0x7c3aed : 0xb7a6ff)

    // 노드
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    const nodeColors = new Float32Array(COUNT * 3)
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3))

    const sprite = (() => {
      const c = document.createElement("canvas")
      c.width = c.height = 64
      const g = c.getContext("2d")!
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
      grd.addColorStop(0, "rgba(255,255,255,1)")
      grd.addColorStop(0.35, "rgba(255,255,255,0.6)")
      grd.addColorStop(1, "rgba(255,255,255,0)")
      g.fillStyle = grd
      g.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(c)
    })()

    const blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
    const nodeMat = new THREE.PointsMaterial({
      size: 0.14,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending,
    })
    const nodes = new THREE.Points(nodeGeo, nodeMat)

    // 연결선 (색에 alpha 포함)
    const linePos = new Float32Array(MAX_SEGMENTS * 2 * 3)
    const lineCol = new Float32Array(MAX_SEGMENTS * 2 * 4)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage))
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 4).setUsage(THREE.DynamicDrawUsage))
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)

    // 커서 노드
    const cursorGeo = new THREE.BufferGeometry()
    const cursorPos = new Float32Array(3)
    cursorGeo.setAttribute("position", new THREE.BufferAttribute(cursorPos, 3))
    const cursorMat = new THREE.PointsMaterial({
      size: 0.32,
      map: sprite,
      color: hotColor,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending,
    })
    const cursorDot = new THREE.Points(cursorGeo, cursorMat)

    const group = new THREE.Group()
    group.add(lines, nodes, cursorDot)
    scene.add(group)

    // 포인터 → z=0 평면 위 좌표
    const ptr = { active: false, world: new THREE.Vector3(), local: new THREE.Vector3(), strength: 0 }
    const ndc = new THREE.Vector2()
    const ray = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const inv = new THREE.Matrix4()

    const onPointerMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect()
      if (e.clientY < r.top || e.clientY > r.bottom) {
        ptr.active = false
        return
      }
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
      ray.setFromCamera(ndc, camera)
      ptr.active = ray.ray.intersectPlane(plane, ptr.world) !== null
    }
    const onPointerLeave = () => {
      ptr.active = false
    }
    window.addEventListener("pointermove", onPointerMove)
    document.documentElement.addEventListener("pointerleave", onPointerLeave)

    const onResize = () => {
      camera.aspect = w() / h()
      camera.updateProjectionMatrix()
      renderer.setSize(w(), h())
      updateBounds()
    }
    window.addEventListener("resize", onResize)

    const PULL = 0.0007
    const MIN_GAP = 0.9
    const DAMP = 0.88

    const step = (t: number) => {
      if (!reducedMotion) {
        group.rotation.y = Math.sin(t * 0.08) * 0.12 + Math.min(window.scrollY / 900, 1) * 0.3
        group.rotation.x = Math.sin(t * 0.11) * 0.05
      }
      group.updateMatrixWorld()

      // 커서 효과는 부드럽게 켜지고 꺼짐
      ptr.strength += ((ptr.active ? 1 : 0) - ptr.strength) * 0.08
      if (ptr.active) {
        inv.copy(group.matrixWorld).invert()
        ptr.local.copy(ptr.world).applyMatrix4(inv)
      }
      const s = ptr.strength
      const cx = ptr.local.x
      const cy = ptr.local.y
      const cz = ptr.local.z

      // 노드 이동
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3
        let px = pos[ix]
        let py = pos[ix + 1]
        let pz = pos[ix + 2]

        if (s > 0.01) {
          const dx = cx - px
          const dy = cy - py
          const d = Math.hypot(dx, dy)
          if (d < CURSOR_R && d > 0.0001) {
            // 멀면 끌어당기고, 너무 가까우면 살짝 밀어내서 커서 주변을 감싸도록
            const f = d > MIN_GAP ? (1 - d / CURSOR_R) * PULL : -(1 - d / MIN_GAP) * PULL * 4
            pull[ix] += (dx / d) * f * s * 60
            pull[ix + 1] += (dy / d) * f * s * 60
          }
        }
        pull[ix] *= DAMP
        pull[ix + 1] *= DAMP

        px += drift[ix] + pull[ix]
        py += drift[ix + 1] + pull[ix + 1]
        pz += drift[ix + 2]

        // 경계에서 반사
        if (px > bounds.x || px < -bounds.x) drift[ix] *= -1
        if (py > bounds.y || py < -bounds.y) drift[ix + 1] *= -1
        if (pz > bounds.z || pz < -bounds.z) drift[ix + 2] *= -1
        pos[ix] = THREE.MathUtils.clamp(px, -bounds.x * 1.02, bounds.x * 1.02)
        pos[ix + 1] = THREE.MathUtils.clamp(py, -bounds.y * 1.02, bounds.y * 1.02)
        pos[ix + 2] = pz

        // 커서에 가까운 노드는 강조색
        const dc = s > 0.01 ? Math.hypot(cx - pos[ix], cy - pos[ix + 1]) : Infinity
        const heat = dc < CURSOR_R ? (1 - dc / CURSOR_R) * s : 0
        nodeColors[ix] = nodeColor.r + (hotColor.r - nodeColor.r) * heat
        nodeColors[ix + 1] = nodeColor.g + (hotColor.g - nodeColor.g) * heat
        nodeColors[ix + 2] = nodeColor.b + (hotColor.b - nodeColor.b) * heat
      }

      // 연결선 만들기
      let seg = 0
      const push = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, c: THREE.Color, a: number) => {
        if (seg >= MAX_SEGMENTS) return
        const p = seg * 6
        linePos[p] = ax
        linePos[p + 1] = ay
        linePos[p + 2] = az
        linePos[p + 3] = bx
        linePos[p + 4] = by
        linePos[p + 5] = bz
        const q = seg * 8
        lineCol[q] = lineCol[q + 4] = c.r
        lineCol[q + 1] = lineCol[q + 5] = c.g
        lineCol[q + 2] = lineCol[q + 6] = c.b
        lineCol[q + 3] = lineCol[q + 7] = a
        seg++
      }

      const baseAlpha = isLight ? 0.35 : 0.45
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3
        for (let j = i + 1; j < COUNT; j++) {
          const jx = j * 3
          const dx = pos[ix] - pos[jx]
          const dy = pos[ix + 1] - pos[jx + 1]
          const dz = pos[ix + 2] - pos[jx + 2]
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < LINK * LINK) {
            const a = (1 - Math.sqrt(d2) / LINK) * baseAlpha
            push(pos[ix], pos[ix + 1], pos[ix + 2], pos[jx], pos[jx + 1], pos[jx + 2], lineColor, a)
          }
        }
      }

      if (s > 0.01) {
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3
          const d = Math.hypot(cx - pos[ix], cy - pos[ix + 1])
          if (d < CURSOR_R) {
            push(cx, cy, cz, pos[ix], pos[ix + 1], pos[ix + 2], hotColor, (1 - d / CURSOR_R) * 0.85 * s)
          }
        }
      }

      cursorPos[0] = cx
      cursorPos[1] = cy
      cursorPos[2] = cz
      cursorMat.opacity = s
      cursorGeo.attributes.position.needsUpdate = true

      lineGeo.setDrawRange(0, seg * 2)
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true
      nodeGeo.attributes.position.needsUpdate = true
      nodeGeo.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
    }

    // 화면에 보일 때만 애니메이션
    const clock = new THREE.Clock()
    let raf = 0
    let visible = true
    const loop = () => {
      step(clock.getElapsedTime())
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true
        loop()
      } else if (!entry.isIntersecting && visible) {
        visible = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(mount)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("resize", onResize)
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
      nodeGeo.dispose()
      lineGeo.dispose()
      cursorGeo.dispose()
      nodeMat.dispose()
      lineMat.dispose()
      cursorMat.dispose()
      sprite.dispose()
      renderer.dispose()
    }
  }, [resolvedTheme])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
