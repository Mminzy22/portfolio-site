import type React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Skill, SkillCategory } from "@/types/skill"

interface SkillListProps {
  skills: Skill[]
  categories: SkillCategory[]
}

const itemClass =
  "inline-flex items-center gap-1.5 rounded-[var(--pf-r-sm)] border border-[var(--pf-border)] bg-[var(--pf-surface)] px-3 py-1.5 text-sm text-[var(--pf-fg)] transition-colors"

// 카테고리별 한 줄씩 정리한 기술 스택 목록
export default function SkillList({ skills, categories }: SkillListProps) {
  const groups = categories
    .map((category) => ({ category, items: skills.filter((s) => s.category === category) }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="border-t border-[var(--pf-border)]">
      {groups.map((group, i) => (
        <div
          key={group.category}
          data-reveal
          style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
          className="grid gap-4 border-b border-[var(--pf-border)] px-1 py-5 transition-colors hover:bg-[var(--pf-surface)] md:grid-cols-[240px_1fr] md:items-center md:px-3"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono-ui text-[11px] text-[hsl(var(--pf-accent))]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-lg font-semibold tracking-tight text-[var(--pf-fg)]">{group.category}</span>
            <span className="font-mono-ui text-[11px] text-[var(--pf-fg-mute)]">{group.items.length}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) =>
              skill.link ? (
                <Link
                  key={skill.name}
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${itemClass} hover:border-[hsl(var(--pf-accent)/0.6)] hover:text-[hsl(var(--pf-accent))]`}
                >
                  {skill.name}
                  <ArrowUpRight className="h-3 w-3 opacity-40 transition-all group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100" />
                </Link>
              ) : (
                <span key={skill.name} className={itemClass}>
                  {skill.name}
                </span>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
