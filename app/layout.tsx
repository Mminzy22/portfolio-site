import type React from "react"
import "@/app/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import CursorSpotlight from "@/components/cursor-spotlight"
import ScrollProgress from "@/components/scroll-progress"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata = {
  title: "박민지 | Backend · DevOps/Infra · AI",
  description: "안정적인 백엔드와 클라우드 운영을 설계하고, AI 기반 서비스 흐름을 구현하는 개발자",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CursorSpotlight />
          <ScrollProgress />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
