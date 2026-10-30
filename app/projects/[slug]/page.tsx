import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectImage from "@/components/project-image"
import HashTabs from "@/components/project-detail/hash-tabs"
import ProjectOverview from "@/components/project-detail/project-overview"
import ProjectFeatures from "@/components/project-detail/project-features"
import ProjectInfoSidebar from "@/components/project-detail/project-info-sidebar"
import ProjectNav from "@/components/project-detail/project-nav"
import TroubleshootingTab from "@/components/project-detail/troubleshooting-tab"
import { getAllProjects, getProjectBySlug } from "@/data/projects"

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

const tabTriggerClass =
  "rounded-[var(--pf-r-sm)] px-4 py-2 text-sm text-[var(--pf-fg-dim)] transition-colors hover:text-[var(--pf-fg)] data-[state=active]:bg-[var(--pf-fg)] data-[state=active]:text-[var(--pf-bg)] data-[state=active]:shadow-none"

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const all = getAllProjects()
  const index = all.findIndex((p) => p.slug === project.slug)
  const prev = index > 0 ? all[index - 1] : undefined
  const next = index < all.length - 1 ? all[index + 1] : undefined

  const hasTroubleshooting = Boolean(project.troubleshooting?.length)
  const tabs = ["overview", "features", ...(hasTroubleshooting ? ["troubleshooting"] : [])]

  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-[1240px] px-5 md:px-7">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center font-mono-ui text-xs uppercase tracking-[0.14em] text-[var(--pf-fg-mute)] transition-colors hover:text-[var(--pf-fg)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          프로젝트 목록으로 돌아가기
        </Link>

        {/* 페이지 헤더: 제목, 한 줄 설명, 기술 태그 */}
        <header data-reveal className="mb-10 max-w-[860px]">
          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--pf-fg-mute)]">
            <span className="text-[hsl(var(--pf-accent))]">{String(index + 1).padStart(2, "0")}</span>
            <span>·</span>
            <span>{project.projectInfo.type}</span>
            <span>·</span>
            <span>{project.projectInfo.period}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--pf-fg)] md:text-6xl">{project.title}</h1>
          <p className="mt-4 text-lg text-[var(--pf-fg-dim)] md:text-xl">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className="pf-tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div data-reveal className="relative aspect-video overflow-hidden rounded-[var(--pf-r-lg)] border border-[var(--pf-border)]">
              <ProjectImage src={project.image || "/placeholder.svg?height=400&width=600"} alt={project.title} />
            </div>

            <HashTabs values={tabs} defaultValue="overview" className="w-full">
              <TabsList className="mb-8 h-auto flex-wrap justify-start gap-1 rounded-[var(--pf-r-md)] border border-[var(--pf-border)] bg-[var(--pf-surface)] p-1">
                <TabsTrigger value="overview" className={tabTriggerClass}>
                  개요
                </TabsTrigger>
                <TabsTrigger value="features" className={tabTriggerClass}>
                  주요 기능
                </TabsTrigger>
                {hasTroubleshooting && (
                  <TabsTrigger value="troubleshooting" className={tabTriggerClass}>
                    트러블슈팅
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="overview">
                <ProjectOverview project={project} />
              </TabsContent>

              <TabsContent value="features">
                <ProjectFeatures features={project.features} />
              </TabsContent>

              {hasTroubleshooting && project.troubleshooting && (
                <TabsContent value="troubleshooting">
                  <TroubleshootingTab items={project.troubleshooting} />
                </TabsContent>
              )}
            </HashTabs>
          </div>

          <div className="lg:col-span-1">
            <ProjectInfoSidebar project={project} />
          </div>
        </div>

        <ProjectNav prev={prev} next={next} />
      </div>
    </main>
  )
}
