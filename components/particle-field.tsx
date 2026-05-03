"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

interface ParticleFieldProps {
  className?: string
}

export default function ParticleField({ className }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const w = () => mount.clientWidth || 1
    const h = () => mount.clientHeight || 1

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 100)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.setSize(w(), h())
    mount.appendChild(renderer.domElement)

    // Build a sphere of particles using Fibonacci distribution
    const COUNT = 2200
    const positions = new Float32Array(COUNT * 3)
    const home = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const RADIUS = 2.6

    for (let i = 0; i < COUNT; i++) {
      const k = i + 0.5
      const phi = Math.acos(1 - (2 * k) / COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * k
      const r = RADIUS * (0.92 + Math.random() * 0.08)
      const x = Math.cos(theta) * Math.sin(phi) * r
      const y = Math.sin(theta) * Math.sin(phi) * r
      const z = Math.cos(phi) * r
      home[i * 3] = x
      home[i * 3 + 1] = y
      home[i * 3 + 2] = z
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      sizes[i] = 0.6 + Math.random() * 0.8
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1))

    // Soft circular sprite texture
    const sprite = (() => {
      const c = document.createElement("canvas")
      c.width = c.height = 64
      const g = c.getContext("2d")!
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
      grd.addColorStop(0, "rgba(220,235,255,1)")
      grd.addColorStop(0.4, "rgba(180,205,255,0.55)")
      grd.addColorStop(1, "rgba(150,180,235,0)")
      g.fillStyle = grd
      g.fillRect(0, 0, 64, 64)
      const t = new THREE.CanvasTexture(c)
      t.needsUpdate = true
      return t
    })()

    const isLight = resolvedTheme === "light"

    const mat = new THREE.PointsMaterial({
      size: 0.085,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      color: isLight ? 0x3b82f6 : 0xcfe2ff,
      opacity: isLight ? 0.85 : 1,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Pointer in world space (ray from camera onto z=0 plane)
    const ptr = {
      active: false,
      world: new THREE.Vector3(999, 999, 999),
      raw: new THREE.Vector2(),
    }
    const ray = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

    const onPointerMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect()
      ptr.raw.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      )
      ray.setFromCamera(ptr.raw, camera)
      ray.ray.intersectPlane(plane, ptr.world)
      ptr.active = true
    }
    const onPointerLeaveWindow = () => {
      ptr.active = false
      ptr.world.set(999, 999, 999)
    }

    // Listen on window so the canvas reacts even when overlapping UI sits above it.
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerleave", onPointerLeaveWindow)

    const onResize = () => {
      camera.aspect = w() / h()
      camera.updateProjectionMatrix()
      renderer.setSize(w(), h())
    }
    window.addEventListener("resize", onResize)

    const REPEL_R = 1.3
    const REPEL_R2 = REPEL_R * REPEL_R
    const REPEL_FORCE = 0.045
    const SPRING = 0.012
    const DAMP = 0.86

    const clock = new THREE.Clock()
    let last = 0
    let raf = 0

    const loop = () => {
      const t = clock.getElapsedTime()
      const dt = Math.min(0.05, t - last)
      last = t
      const sp = Math.min(window.scrollY / 900, 1)

      if (!reducedMotion) {
        points.rotation.y = t * 0.05 + sp * 0.4
        points.rotation.x = Math.sin(t * 0.3) * 0.04
      }

      const localPtr = ptr.world.clone()
      if (ptr.active) {
        const inv = new THREE.Matrix4().copy(points.matrixWorld).invert()
        localPtr.applyMatrix4(inv)
      }

      const arr = geo.attributes.position.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3
        const iy = ix + 1
        const iz = ix + 2
        const px = arr[ix]
        const py = arr[iy]
        const pz = arr[iz]
        const hx = home[ix]
        const hy = home[iy]
        const hz = home[iz]

        let ax = (hx - px) * SPRING
        let ay = (hy - py) * SPRING
        let az = (hz - pz) * SPRING

        if (ptr.active) {
          const dx = px - localPtr.x
          const dy = py - localPtr.y
          const dz = pz - localPtr.z
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < REPEL_R2 && d2 > 0.0001) {
            const f = ((1 - d2 / REPEL_R2) * REPEL_FORCE) / Math.sqrt(d2)
            ax += dx * f
            ay += dy * f
            az += dz * f
          }
        }

        vel[ix] = (vel[ix] + ax) * DAMP
        vel[iy] = (vel[iy] + ay) * DAMP
        vel[iz] = (vel[iz] + az) * DAMP
        arr[ix] = px + vel[ix]
        arr[iy] = py + vel[iy]
        arr[iz] = pz + vel[iz]
      }
      geo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(loop)
      void dt
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeaveWindow)
      window.removeEventListener("resize", onResize)
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
      geo.dispose()
      mat.dispose()
      sprite.dispose()
      renderer.dispose()
    }
  }, [resolvedTheme])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
