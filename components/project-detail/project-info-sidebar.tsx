import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"

interface ProjectInfoSidebarProps {
  project: Project
}

export default function ProjectInfoSidebar({ project }: ProjectInfoSidebarProps) {
  return (
    <aside className="sticky top-24 space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div>
        <h3 className="text-xl font-semibold mb-4 dark:text-white">프로젝트 정보</h3>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">프로젝트 유형</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{project.projectInfo.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">기간</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{project.projectInfo.period}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">역할</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{project.projectInfo.role}</dd>
          </div>
          {project.troubleshooting && (
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">트러블슈팅 항목</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{project.troubleshooting.length}개</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="space-y-4">
        {project.projectInfo.demoUrl && (
          <Button className="w-full" variant="default" asChild>
            <Link href={project.projectInfo.demoUrl} target="_blank" rel="noopener noreferrer">
              데모 보기
            </Link>
          </Button>
        )}
        {project.projectInfo.githubUrl && (
          <Button className="w-full" variant="outline" asChild>
            <Link href={project.projectInfo.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub 저장소
            </Link>
          </Button>
        )}
      </div>
    </aside>
  )
}
