import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjectBySlug } from '@/data/projects'

export default function Project({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

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
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8">
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
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} 이미지 ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">주요 기능</h2>

                {Array.isArray(project.features) ? (
                  // 카테고리 없이 단순 목록으로 표시
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-gray-700 dark:bg-gray-300"></span>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  // 카테고리별로 표시
                  <div className="space-y-6">
                    {Object.entries(project.features).map(([category, featureList]) => (
                      <div key={category}>
                        <h3 className="text-xl font-semibold mb-3 dark:text-white">
                          {category.charAt(0).toUpperCase() + category.slice(1)}:
                        </h3>
                        <ul className="space-y-2">
                          {featureList.map((feature, index) => (
                            <li key={`${category}-${index}`} className="flex items-start">
                              <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-gray-700 dark:bg-gray-300"></span>
                              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {project.troubleshooting && project.troubleshooting.length > 0 && (
                <TabsContent value="troubleshooting" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">트러블슈팅</h2>

                  <div className="space-y-6">
                    {project.troubleshooting.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="bg-gray-100 dark:bg-gray-800 pb-3">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="bg-gray-200 dark:bg-gray-700">
                                  #{item.id}
                                </Badge>
                                <Badge>{item.category}</Badge>
                              </div>
                              <CardTitle className="text-xl">{item.title}</CardTitle>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col md:items-end">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>발견: {item.discoveryDate}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>해결: {item.resolutionDate}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="whitespace-pre-line">{item.content}</p>

                            {item.codeBlock && (
                              <div className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                                <pre className="text-sm">
                                  <code>{item.codeBlock}</code>
                                </pre>
                              </div>
                            )}

                            {item.image && (
                              <div className="mt-4">
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={`${item.title} 이미지`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            )}

                            {item.video && (
                              <div className="mt-4">
                                <video controls className="w-full rounded-lg" poster={item.image}>
                                  <source src={item.video} type="video/mp4" />
                                  브라우저가 비디오 태그를 지원하지 않습니다.
                                </video>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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

