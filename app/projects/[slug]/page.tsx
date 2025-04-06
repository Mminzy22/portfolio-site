import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  slug: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features:
    | string[]
    | {
        user: string[]
        chatbot: string[]
        [key: string]: string[] // 다른 카테고리도 추가 가능
      }
  image: string
  gallery: string[]
  projectInfo: {
    type: string
    period: string
    role: string
    githubUrl?: string
    demoUrl?: string
  }
}

// 프로젝트 데이터 (실제로는 데이터베이스나 API에서 가져올 수 있습니다)
const projects: Project[] = [
  {
    id: 1,
    slug: "ainfo",
    title: "AInfo",
    description: "개인 맞춤형 공공서비스 추천 AI 챗봇",
    longDescription:
      "이 프로젝트는 개인 맞춤형 공공서비스 추천 AI 챗봇입니다. Django Rest Framework(DRF)를 기반으로 API를 제공하며, AI 모델과 연동하여 실시간으로 사용자의 질의에 응답합니다. ChromaDB를 활용하여 대량의 데이터를 효율적으로 저장하고 검색할 수 있도록 설계되었습니다. Redis를 사용하여 세션 관리 및 캐싱을 통해 성능을 최적화했습니다. Celery를 통해 비동기 작업 처리를 구현하여 사용자 경험을 향상시켰습니다.",
    technologies: ["Python", "Django", "DRF", "PostgreSQL", "ChromaDB", "Django Channels", "Redis", "Celery", "LangChain", "CrewAI"],
    features: {
      user: ["JWT 기반 로그인/회원가입", "이메일 인증 및 비밀번호 재설정", "소셜 로그인 (Google, Kakao)", "프로필 조회 및 수정", "회원 탈퇴"],
      chatbot: ["LangChain + ChromaDB 기반 RAG 모델 연동", "Django Channels, Redis를 이용한 WebSocket 실시간 대화 지원", "개인화된 맞춤형 공공서비스 추천 기능", "대화 기록 저장 및 조회 기능", "대화 흐름 기억", "부족한 정보 → 웹검색", "보고서 작성"],
      "공공 데이터 연동": ["정부 API(고용24, 정부24, 온통청년) 활용", "K스타트업 안내책자 pdf 활용", "주기적 데이터 로드"],
      "메일": ["회원가입 시 본인인증을 위한 메일 발송", "비밀번호 재설정 메일 발송", "전체유저 대상 공지메일 발송"],
      "결제": ["KG 이니시스 PG 사 연동", "결제 관련정보 DB 관리"],
    },
    image: "/images/projects/project1/ainfo_index.png?height=300&width=500",
    gallery: [
      "/images/projects/project1/ainfo_report.gif?height=400&width=600",
      "/images/projects/project1/ainfo_pay.gif?height=400&width=600",
      "/images/projects/project1/ainfo_s.gif?height=400&width=600",
    ],
    projectInfo: {
      type: "AI & 백엔드",
      period: "2025.02 - 진행 중",
      role: "초기 회원관련 기능, 배포, CrewAI 멀티에이전트 시스템 설계 및 구현",
      githubUrl: "https://github.com/Mminzy22/AInfo-Backend",
      demoUrl: "https://www.youtube.com/watch?v=Y2IPx5YfEuc&ab_channel=ainfo",
    },
  },
  {
    id: 2,
    slug: "technical-interview",
    title: "개발자 모의 기술 면접 AI 챗봇",
    description: "개발자를 대상으로 기술 면접을 시뮬레이션하는 AI 챗봇",
    longDescription:
      "AI 기반 대화형 챗봇을 개발하는 프로젝트입니다. LangChain과 Pinecone을 활용한 RAG(Retrieval-Augmented Generation) 모델을 기반으로, 주어진 문서를 참고하여 면접 질문을 생성하고 답변을 평가하는 기능을 제공합니다.",
    technologies: ["Python", "Streamlit", "Pinecone", "PostgreSQL", "LangChain", "LangGraph"],
    features: [
      "Pinecone에 저장된 문서를 바탕으로 적절한 면접 질문을 생성",
      "사용자가 입력한 답변을 RAG 기반으로 평가",
      "사용자별 채팅 세션을 생성하고 데이터베이스에 저장",
      "PostgreSQL을 활용하여 채팅 내역 조회 가능",
    ],
    image: "/images/projects/project2/모의면접_챗봇.png?height=300&width=500",
    gallery: [
      "/images/projects/project2/모의면접_로그인.png?height=400&width=600",
      "/images/projects/project2/모의면접_채팅내역1.png?height=400&width=600",
      "/images/projects/project2/모의면접_채팅내역2.png?height=400&width=600",
    ],
    projectInfo: {
      type: "AI & 백엔드",
      period: "2025.02 - 2025.02",
      role: "RDB 설계 및 구현",
      githubUrl: "https://github.com/Mminzy22/Chatbot_pjt",
      demoUrl: "https://www.youtube.com/watch?v=Vx48Bgsf3qQ&ab_channel=shincc6500",
    },
  },
  {
    id: 3,
    slug: "movimoa",
    title: "영화 커뮤니티 웹사이트",
    description: "개발자를 대상으로 기술 면접을 시뮬레이션하는 AI 챗봇",
    longDescription:
      "MovieMoa는 사용자가 영화 정보를 확인하고, 영화에 대한 감상평과 댓글을 통해 소통할 수 있는 영화 커뮤니티 웹사이트입니다.",
      technologies: ["Java", "Spring Boot","Spring Security", "OracleDB", "MyBatis"],
    features: [
      "영화 API를 통해 현재 상영 중인 영화 및 인기 영화 정보를 제공",
      "사용자가 영화에 대한 감상평을 작성하고 게시 가능",
      "댓글 기능을 통해 다른 사용자와 소통 가능",
      "Spring Security를 활용한 사용자 인증 및 권한 관리",
      "관리자 기능을 통해 영화 정보 및 사용자 관리",
      "MyBatis를 활용한 데이터베이스 연동 및 쿼리 최적화",
    ],
    image: "/placeholder.svg?height=300&width=500",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    projectInfo: {
      type: "백엔드",
      period: "2023.10 - 2023.11",
      role: "백엔드 아키텍처 설계 및 구현",
      githubUrl: "https://github.com/Mminzy22/moviemoa",
      // demoUrl: "https://demo.cloud-backend.com",
    },
  },
]

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

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

            <div className="space-y-6">
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
              </div>
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

