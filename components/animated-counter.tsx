"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setDisplay(value)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || startedRef.current) return
          startedRef.current = true
          const t0 = performance.now()
          let raf = 0
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(Math.round(value * eased))
            if (p < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
          obs.disconnect()
          return () => cancelAnimationFrame(raf)
        })
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
