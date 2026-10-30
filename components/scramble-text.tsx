"use client"

import { useEffect, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/"

interface ScrambleTextProps {
  text: string
  duration?: number
  delay?: number
}

// 무작위 문자에서 왼쪽부터 차례로 원래 글자로 맞춰지는 텍스트
export default function ScrambleText({ text, duration = 1100, delay = 250 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let start = 0
    const scramble = (progress: number) =>
      text
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "·") return ch
          return i / text.length < progress ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join("")

    const tick = (now: number) => {
      if (!start) start = now
      const p = Math.min(1, (now - start) / duration)
      setDisplay(scramble(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setDisplay(scramble(0))
    const timer = window.setTimeout(() => (raf = requestAnimationFrame(tick)), delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [text, duration, delay])

  return (
    <span aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  )
}
