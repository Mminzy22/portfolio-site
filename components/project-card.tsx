import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ProjectImage from "@/components/project-image"
import type { ProjectSummary } from "@/types/project"

interface ProjectCardProps {
  project: ProjectSummary
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0")
  const tags = project.technologies.slice(0, 6)

  return (
    <Link
      href={project.link}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[var(--pf-border)] bg-[var(--pf-surface)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--pf-border-2)] hover:shadow-[var(--pf-shadow-lg)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, hsl(var(--pf-accent) / 0.30), transparent 60%), linear-gradient(135deg, var(--pf-bg-2), color-mix(in oklab, hsl(var(--pf-accent)) 14%, var(--pf-bg-2)))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {project.image && (
          <ProjectImage src={project.image} alt={project.title} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--pf-fg-mute)]">
          <span className="font-medium text-[hsl(var(--pf-accent))]">{number}</span>
          {project.technologies[0] && (
            <>
              <span>·</span>
              <span>{project.technologies[0]}</span>
            </>
          )}
        </div>

        <h3 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--pf-fg)]">
          {project.title}
        </h3>

        <p className="mb-5 max-w-[56ch] text-[15px] leading-relaxed text-[var(--pf-fg-dim)]">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {tags.map((tech) => (
            <span key={tech} className="pf-tag">
              {tech}
            </span>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-medium text-[hsl(var(--pf-accent))]">
          자세히 보기
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
