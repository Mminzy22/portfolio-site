import ProjectImage from "@/components/project-image"
import { textStyles } from "@/lib/design-system"
import type { Project } from "@/types/project"

interface ProjectOverviewProps {
  project: Project
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-6">
      <h1 className={`text-3xl sm:text-4xl md:text-5xl ${textStyles.heading}`}>{project.title}</h1>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="pf-tag">
            {tech}
          </span>
        ))}
      </div>

      <p className={`text-lg leading-relaxed ${textStyles.body}`}>{project.longDescription}</p>

      <div>
        <h2 className={`mb-4 text-2xl ${textStyles.heading}`}>갤러리</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div
              key={image}
              className="relative aspect-video overflow-hidden rounded-[14px] border border-[var(--pf-border)]"
            >
              <ProjectImage
                src={image || "/placeholder.svg?height=400&width=600"}
                alt={`${project.title} 이미지 ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
