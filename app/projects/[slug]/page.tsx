import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectImage from "@/components/project-image"
import ProjectOverview from "@/components/project-detail/project-overview"
import ProjectFeatures from "@/components/project-detail/project-features"
import ProjectInfoSidebar from "@/components/project-detail/project-info-sidebar"
import TroubleshootingTab from "@/components/project-detail/troubleshooting-tab"
import { getProjectBySlug } from "@/data/projects"

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const hasTroubleshooting = Boolean(project.troubleshooting?.length)

  return (
    <main className="min-h-screen py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          프로젝트 목록으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <ProjectImage src={project.image || "/placeholder.svg?height=400&width=600"} alt={project.title} />
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className={`grid w-full mb-8 ${hasTroubleshooting ? "grid-cols-3" : "grid-cols-2"}`}>
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="features">주요 기능</TabsTrigger>
                {hasTroubleshooting && <TabsTrigger value="troubleshooting">트러블슈팅</TabsTrigger>}
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
