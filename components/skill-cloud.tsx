"use client"

import Link from "next/link"
import { useState } from "react"
import type { Skill, SkillCategory } from "@/types/skill"

interface SkillCloudProps {
  skills: Skill[]
  categories: SkillCategory[]
}

type Filter = "all" | SkillCategory

export default function SkillCloud({ skills, categories }: SkillCloudProps) {
  const [active, setActive] = useState<Filter>("all")

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="pf-pill"
          data-active={active === "all"}
          onClick={() => setActive("all")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="pf-pill"
            data-active={active === cat}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, i) => {
          const dim = active !== "all" && skill.category !== active
          const className = `inline-flex items-center gap-2 rounded-xl border border-[var(--pf-border)] bg-[var(--pf-surface)] px-4 py-2.5 text-sm transition-all duration-300 ${
            dim
              ? "scale-[0.97] opacity-30"
              : "hover:-translate-y-0.5 hover:border-[var(--pf-border-2)] hover:bg-[var(--pf-surface-2)]"
          }`
          const inner = (
            <>
              <span className="text-[var(--pf-fg)]">{skill.name}</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-[var(--pf-fg-mute)]">
                {skill.category}
              </span>
            </>
          )

          if (skill.link) {
            return (
              <Link
                key={skill.name}
                href={skill.link}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={{ transitionDelay: `${i * 12}ms` }}
              >
                {inner}
              </Link>
            )
          }
          return (
            <div
              key={skill.name}
              className={className}
              style={{ transitionDelay: `${i * 12}ms` }}
            >
              {inner}
            </div>
          )
        })}
      </div>
    </div>
  )
}
