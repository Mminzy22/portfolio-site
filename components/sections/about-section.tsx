import type React from "react"
import AnimatedCounter from "@/components/animated-counter"
import { Section, SectionHeader } from "@/components/section"
import { getAllProjects } from "@/data/projects"
import { skills } from "@/data/skills"
import { about } from "@/data/profile"

export default function AboutSection() {
  return (
    <Section id="about">
      <SectionHeader label="About" title="소개" description={about.summary} />

      <div className="grid gap-6 md:grid-cols-2">
        <div data-reveal className="pf-card p-7">
          <CardHeading>Mission</CardHeading>
          <p className="text-[15px] leading-relaxed text-[var(--pf-fg-dim)]">{about.mission}</p>
        </div>

        <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="pf-card p-7">
          <CardHeading>By the numbers</CardHeading>
          <div className="flex flex-wrap gap-7">
            <Stat value={getAllProjects().length} label="Projects" />
            <Stat value={about.codeReviewRate} suffix="%" label="Code Review" />
            <Stat value={skills.length} label="Skills" />
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-[var(--pf-fg-dim)]">{about.numbersNote}</p>
        </div>
      </div>
    </Section>
  )
}

function CardHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-4 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--pf-fg-mute)]">{children}</h3>
  )
}

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <AnimatedCounter value={value} suffix={suffix} className="text-3xl font-bold tracking-tight text-[var(--pf-fg)]" />
      <div className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pf-fg-mute)]">{label}</div>
    </div>
  )
}
