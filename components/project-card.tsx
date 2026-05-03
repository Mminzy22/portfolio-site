import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProjectImage from "@/components/project-image"
import { surfaceStyles } from "@/lib/design-system"
import type { ProjectSummary } from "@/types/project"

interface ProjectCardProps {
  project: ProjectSummary
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className={`overflow-hidden h-full flex flex-col ${surfaceStyles.card}`}>
      <div className="relative h-48 w-full">
        <ProjectImage src={project.image || "/placeholder.svg?height=300&width=500"} alt={project.title} />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-slate-500 dark:text-slate-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className={surfaceStyles.mutedBadge}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={project.link}
          className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors text-center"
        >
          자세히 보기
        </Link>
      </CardFooter>
    </Card>
  )
}
