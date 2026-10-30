import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectImage from "@/components/project-image"
import ProjectOverview from "@/components/project-detail/project-overview"
import ProjectFeatures from "@/components/project-detail/project-features"
import ProjectInfoSidebar from "@/components/project-detail/project-info-sidebar"
import TroubleshootingTab from "@/components/project-detail/troubleshooting-tab"
import { getAllProjects, getProjectBySlug } from "@/data/projects"

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

const tabTriggerClass =
  "rounded-full px-4 py-2 text-sm text-[var(--pf-fg-dim)] transition-colors hover:text-[var(--pf-fg)] data-[state=active]:bg-[var(--pf-fg)] data-[state=active]:text-[var(--pf-bg)] data-[state=active]:shadow-none"

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const hasTroubleshooting = Boolean(project.troubleshooting?.length)

  return (
    <main className="min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-[1240px] px-5 md:px-7">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center font-mono-ui text-xs uppercase tracking-[0.14em] text-[var(--pf-fg-mute)] transition-colors hover:text-[var(--pf-fg)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          프로젝트 목록으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-[18px] border border-[var(--pf-border)]">
              <ProjectImage src={project.image || "/placeholder.svg?height=400&width=600"} alt={project.title} />
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 h-auto flex-wrap justify-start gap-1 rounded-full border border-[var(--pf-border)] bg-[var(--pf-surface)] p-1">
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
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <ProjectInfoSidebar project={project} />
          </div>
        </div>
      </div>
    </main>
  )
}
