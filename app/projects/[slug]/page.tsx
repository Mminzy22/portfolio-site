import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjectBySlug } from "@/data/projects"
import MarkdownContent from "@/components/markdown-content"
import ProjectImage from "@/components/project-image"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// 블로그 링크 정보를 추출하는 함수
function extractBlogLink(feature: string): { text: string; blogUrl: string | null } {
  // [blog:URL] 패턴 찾기
  const blogLinkPattern = /\[blog:(https?:\/\/[^\]]+)\]$/
  const match = feature.match(blogLinkPattern)

  if (match) {
    // 패턴이 있으면 URL 추출하고 텍스트에서 패턴 제거
    return {
      text: feature.replace(blogLinkPattern, "").trim(),
      blogUrl: match[1],
    }
  }

  return {
    text: feature,
    blogUrl: null,
  }
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15.2.4에서는 params를 사용하기 전에 await 해야 합니다
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

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
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="features">주요 기능</TabsTrigger>
                {project.troubleshooting && project.troubleshooting.length > 0 && (
                  <TabsTrigger value="troubleshooting">트러블슈팅</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
                  {project.title}
                </h1>

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

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">{project.longDescription}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">갤러리</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                        <ProjectImage
                          src={image || "/placeholder.svg?height=400&width=600"}
                          alt={`${project.title} 이미지 ${index + 1}`}
                          fill={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">주요 기능</h2>

                {Array.isArray(project.features) ? (
                  // 카테고리 없이 단순 목록으로 표시 - 1열 카드 형태로 개선
                  <div className="space-y-3">
                    {project.features.map((feature, index) => {
                      const { text, blogUrl } = extractBlogLink(feature)
                      return (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                                  {index + 1}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <p className="text-gray-700 dark:text-gray-300 my-0 py-1">{text}</p>
                                {blogUrl && (
                                  <Link
                                    href={blogUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                                  >
                                    <ExternalLink className="mr-1 h-3 w-3" />
                                    블로그 글 보기
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  // 카테고리별로 표시 - 섹션 형태로 개선
                  <div className="space-y-10">
                    {Object.entries(project.features).map(([category, featureList]) => (
                      <div
                        key={category}
                        className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                      >
                        <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                          <span className="inline-block w-2 h-6 bg-gray-800 dark:bg-gray-300 mr-3 rounded-sm"></span>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h3>
                        <div className="space-y-3 mt-4">
                          {featureList.map((feature, index) => {
                            const { text, blogUrl } = extractBlogLink(feature)
                            return (
                              <div
                                key={`${category}-${index}`}
                                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                              >
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                      <span className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
                                        {index + 1}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <p className="text-gray-700 dark:text-gray-300 my-0 py-1">{text}</p>
                                      {blogUrl && (
                                        <Link
                                          href={blogUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors whitespace-nowrap"
                                        >
                                          <ExternalLink className="mr-1 h-3 w-3" />
                                          블로그 글 보기
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {project.troubleshooting && project.troubleshooting.length > 0 && (
                <TabsContent value="troubleshooting" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">트러블슈팅</h2>

                  {/* 게시판 헤더 */}
                  <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-200 dark:bg-gray-700 rounded-t-lg font-medium text-sm">
                    <div className="col-span-2 md:col-span-1 text-center">번호</div>
                    <div className="col-span-3 md:col-span-1 text-center">분류</div>
                    <div className="col-span-7 md:col-span-7">제목</div>
                    <div className="hidden md:block md:col-span-3 text-right pr-10">발견 날짜</div>
                  </div>

                  {/* 트러블슈팅 아코디언 목록 */}
                  <Accordion type="single" collapsible className="w-full border rounded-b-lg divide-y">
                    {project.troubleshooting.map((item) => (
                      <AccordionItem key={item.id} value={`item-${item.id}`} className="border-0">
                        <div className="relative">
                          <AccordionTrigger className="py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 w-full">
                            <div className="grid grid-cols-12 gap-4 w-full text-left pr-8">
                              <div className="col-span-2 md:col-span-1 text-center text-gray-500">{item.id}</div>
                              <div className="col-span-3 md:col-span-1 text-center">
                                <Badge
                                  variant="outline"
                                  className="bg-gray-100 dark:bg-gray-800 text-xs md:text-sm px-1 md:px-2"
                                >
                                  {item.category}
                                </Badge>
                              </div>
                              <div className="col-span-7 md:col-span-7 font-medium truncate pr-2 text-sm md:text-base">
                                {item.title}
                              </div>
                              <div className="hidden md:block md:col-span-3 text-right text-gray-500 text-sm">
                                <span className="whitespace-nowrap">발견: {item.discoveryDate}</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                        </div>
                        <AccordionContent className="px-4 pb-6 pt-2">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                              <h3 className="text-xl font-bold">{item.title}</h3>
                              <div className="text-sm text-gray-500">
                                <div>발견: {item.discoveryDate}</div>
                                <div>해결: {item.resolutionDate}</div>
                              </div>
                            </div>

                            {/* 수정된 MarkdownContent 컴포넌트 사용 */}
                            <MarkdownContent content={item.content} />

                            {/* 기존 코드 블록, 이미지, 비디오 지원 (하위 호환성) */}
                            {item.codeBlock && !item.content.includes("```") && (
                              <div className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                                <pre className="text-sm">
                                  <code>{item.codeBlock}</code>
                                </pre>
                              </div>
                            )}

                            {item.image && !item.content.includes("![") && (
                              <div className="mt-4">
                                <div className="w-full rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image || "/placeholder.svg?height=400&width=600"}
                                    alt={`${item.title} 이미지`}
                                    width={800}
                                    height={0}
                                    style={{ width: "100%", height: "auto" }}
                                    className="rounded-lg"
                                  />
                                </div>
                              </div>
                            )}

                            {item.video && !item.content.includes("<video") && (
                              <div className="mt-4">
                                <video controls className="w-full rounded-lg" poster={item.image}>
                                  <source src={item.video} type="video/mp4" />
                                  브라우저가 비디오 태그를 지원하지 않습니다.
                                </video>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              )}
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
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
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                        {project.troubleshooting.length}개
                      </dd>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
