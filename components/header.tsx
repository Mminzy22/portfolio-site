"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 페이지 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // 모바일 메뉴가 열려있으면 닫기
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // 현재 경로 확인
    const currentPath = pathname

    // 해시 링크인 경우 스크롤 처리
    if (href.startsWith("/#") && currentPath === "/") {
      // 현재 홈페이지에 있고 해시 링크인 경우
      const targetId = href.substring(2)
      const element = document.getElementById(targetId)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // 헤더 높이를 고려하여 약간 위로 스크롤
          behavior: "smooth",
        })
      }
    } else if (href === "/" && currentPath === "/") {
      // 홈에서 홈으로 이동 (최상단으로 스크롤)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      // 다른 페이지로 이동
      router.push(href)
    }
  }

  const navItems = [
    { name: "홈", href: "/" },
    { name: "소개", href: "/#about" },
    { name: "프로젝트", href: "/#projects" },
    { name: "기술 스택", href: "/#skills" },
    { name: "연락처", href: "/#contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold dark:text-white">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100 ${
                  pathname === item.href ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
            <ModeToggle />
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold dark:text-white">
                Portfolio
              </Link>
              <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300" onClick={toggleMenu}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://mminzy22.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100"
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
