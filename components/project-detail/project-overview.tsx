import ProjectGallery from "@/components/project-detail/project-gallery"
import { textStyles } from "@/lib/design-system"
import type { Project } from "@/types/project"

interface ProjectOverviewProps {
  project: Project
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-10">
      <p className={`text-[17px] leading-relaxed ${textStyles.body}`}>{project.longDescription}</p>

      {project.gallery.length > 0 && (
        <div>
          <h2 className={`mb-4 text-2xl ${textStyles.heading}`}>갤러리</h2>
          <ProjectGallery images={project.gallery} title={project.title} />
        </div>
      )}
    </div>
  )
}
