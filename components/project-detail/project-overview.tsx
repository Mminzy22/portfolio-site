import { Badge } from "@/components/ui/badge"
import ProjectImage from "@/components/project-image"
import { surfaceStyles } from "@/lib/design-system"
import type { Project } from "@/types/project"

interface ProjectOverviewProps {
  project: Project
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="secondary" className={surfaceStyles.mutedBadge}>
            {tech}
          </Badge>
        ))}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-slate-500 dark:text-slate-400 text-lg">{project.longDescription}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">갤러리</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.gallery.map((image, index) => (
            <div key={image} className="relative aspect-video overflow-hidden rounded-lg">
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
