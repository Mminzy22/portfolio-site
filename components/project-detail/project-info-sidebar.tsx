import Link from "next/link"
import { textStyles } from "@/lib/design-system"
import type { Project } from "@/types/project"

interface ProjectInfoSidebarProps {
  project: Project
}

export default function ProjectInfoSidebar({ project }: ProjectInfoSidebarProps) {
  const { type, period, role, demoUrl, githubUrl } = project.projectInfo
  const rows: { label: string; value: string }[] = [
    { label: "프로젝트 유형", value: type },
    { label: "기간", value: period },
    { label: "역할", value: role },
  ]
  if (project.troubleshooting) {
    rows.push({ label: "트러블슈팅 항목", value: `${project.troubleshooting.length}개` })
  }

  return (
    <aside className="sticky top-24 space-y-8 rounded-[var(--pf-r-lg)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-6">
      <div>
        <h3 className={`mb-5 text-xl ${textStyles.heading}`}>프로젝트 정보</h3>
        <dl className="space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className={textStyles.monoLabel}>{row.label}</dt>
              <dd className="mt-1 text-sm text-[var(--pf-fg)]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {(demoUrl || githubUrl) && (
        <div className="flex flex-col gap-3">
          {demoUrl && (
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn-primary justify-center">
              데모 보기
            </Link>
          )}
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="pf-btn justify-center">
              GitHub 저장소
            </Link>
          )}
        </div>
      )}
    </aside>
  )
}
