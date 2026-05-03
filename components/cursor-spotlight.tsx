"use client"

import { useEffect, useRef } from "react"

export default function CursorSpotlight() {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none"
      return
    }

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.setProperty("--pf-mx", `${x}px`)
      el.style.setProperty("--pf-my", `${y}px`)
      raf = requestAnimationFrame(loop)
    }
    loop()

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    window.addEventListener("pointermove", onMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return <div ref={elRef} className="pf-spotlight" aria-hidden="true" />
}
