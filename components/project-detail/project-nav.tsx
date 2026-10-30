import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Project } from "@/types/project"

interface ProjectNavProps {
  prev?: Project
  next?: Project
}

// 상세 페이지 하단의 이전/다음 프로젝트 이동
export default function ProjectNav({ prev, next }: ProjectNavProps) {
  if (!prev && !next) return null

  return (
    <nav className="mt-20 grid gap-4 border-t border-[var(--pf-border)] pt-10 md:grid-cols-2" aria-label="다른 프로젝트">
      {prev ? <NavCard project={prev} direction="prev" /> : <span className="hidden md:block" />}
      {next && <NavCard project={next} direction="next" />}
    </nav>
  )
}

function NavCard({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const isNext = direction === "next"
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`pf-card pf-glow group flex flex-col gap-2 p-6 ${isNext ? "md:items-end md:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--pf-fg-mute)]">
        {!isNext && <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />}
        {isNext ? "다음 프로젝트" : "이전 프로젝트"}
        {isNext && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />}
      </span>
      <span className="text-xl font-semibold tracking-tight text-[var(--pf-fg)]">{project.title}</span>
      <span className="text-sm text-[var(--pf-fg-dim)]">{project.description}</span>
    </Link>
  )
}
