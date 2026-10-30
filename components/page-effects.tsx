"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// 페이지 전역 효과
// - [data-reveal] 요소가 화면에 들어오면 아래에서 떠오르며 나타남
// - .pf-glow 카드에 커서 위치를 전달해 테두리가 커서를 따라 빛남
export default function PageEffects() {
  const pathname = usePathname()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in")
            io.unobserve(en.target)
          }
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".pf-glow")
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty("--gx", `${e.clientX - r.left}px`)
      card.style.setProperty("--gy", `${e.clientY - r.top}px`)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return null
}
