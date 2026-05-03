"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Collaboration", href: "/#collaboration" },
  { name: "Stack", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null)
      return
    }
    const ids = ["about", "projects", "collaboration", "skills", "contact"]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActiveId(en.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [pathname])

  useEffect(() => setIsMenuOpen(false), [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (isMenuOpen) setIsMenuOpen(false)

    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.substring(2)
      const element = document.getElementById(targetId)
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" })
      }
    } else if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push(href)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-300 ${
        isScrolled
          ? "border-b border-[var(--pf-border)] bg-[color-mix(in_oklab,var(--pf-bg)_82%,transparent)]"
          : "border-b border-transparent bg-[color-mix(in_oklab,var(--pf-bg)_60%,transparent)]"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3.5 md:px-7">
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label="홈으로"
        >
          <span className="pf-brand-mark" />
          <span>Minji Park</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("/#", "")
            const isActive = pathname === "/" && activeId === id
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative rounded-full px-3 py-2 text-[13px] transition-colors ${
                  isActive
                    ? "text-[var(--pf-fg)]"
                    : "text-[var(--pf-fg-dim)] hover:text-[var(--pf-fg)]"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full border border-[var(--pf-border)] bg-[var(--pf-surface-2)]"
                  />
                )}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            type="button"
            className="pf-icon-btn md:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--pf-bg)] md:hidden">
          <div className="mx-auto max-w-[1240px] px-5 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                className="flex items-center gap-2.5 font-semibold tracking-tight"
              >
                <span className="pf-brand-mark" />
                <span>Minji Park</span>
              </Link>
              <button
                type="button"
                className="pf-icon-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="메뉴 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-xl border border-[var(--pf-border)] bg-[var(--pf-surface)] px-4 py-3 text-base text-[var(--pf-fg)]"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://mminzy22.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[var(--pf-border)] bg-[var(--pf-surface)] px-4 py-3 text-base text-[var(--pf-fg)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
