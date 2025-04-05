import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  link: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg dark:bg-gray-850 h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-500 dark:text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={project.link} className="w-full">
          <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors">
            자세히 보기
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}

