import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
}

// 메인 페이지 섹션 공통 래퍼 (폭, 여백 통일)
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("mx-auto max-w-[1240px] px-5 py-24 md:px-7 md:py-32", className)}>
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  label: string
  title: string
  description?: ReactNode
}

// 라벨 + 제목 + 설명으로 이루어진 섹션 헤더
export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-14 grid items-end gap-12 md:grid-cols-[0.7fr_1.3fr]">
      <div>
        <div className="pf-label mb-3">{label}</div>
        <h2 className="pf-section-title text-[var(--pf-fg)]">{title}</h2>
      </div>
      {description && (
        <p className="max-w-[72ch] text-[17px] leading-relaxed text-[var(--pf-fg-dim)]">{description}</p>
      )}
    </div>
  )
}
