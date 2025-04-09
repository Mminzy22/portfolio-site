import Link from "next/link"
import { Github, Mail, Globe } from "lucide-react"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import { Button } from "@/components/ui/button"
import { getProjectsForHomepage } from "@/data/projects"

export default function Home() {
  const projects = getProjectsForHomepage()

  const skills = [
    { name: "Python", category: "Language" },
    { name: "Java", category: "Language" },
    { name: "Django", category: "Backend" },
    { name: "Django Channels", category: "Backend" },
    { name: "WebSocket", category: "Backend" },
    { name: "Celery", category: "Backend" },
    { name: "Spring Boot", category: "Backend" },
    { name: "LangChain", category: "AI/ML" },
    { name: "CrewAI", category: "AI/ML" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "OracleDB", category: "Database" },
    { name: "Docker", category: "DevOps" },
    { name: "GitHub Actions", category: "DevOps" },
    { name: "Nginx", category: "DevOps" },
    { name: "AWS EC2", category: "Cloud" },
    { name: "AWS S3", category: "Cloud" },
    { name: "AWS RDS", category: "Cloud" },
    { name: "AWS CloudFront", category: "Cloud" },
    { name: "AWS Route 53", category: "Cloud" },
    { name: "Git", category: "Tools" },
    { name: "VSCode", category: "Tools" },
    { name: "Postman", category: "Tools" },
    { name: "Notion", category: "Tools" },
  ]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">박민지</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-[700px]">백엔드 개발자 & AI 엔지니어</p>
            <div className="flex items-center space-x-4 mt-6">
              <Link href="https://github.com/Mminzy22" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent border-gray-500 hover:bg-gray-800"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://mminzy22.github.io/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent border-gray-500 hover:bg-gray-800"
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Blog</span>
                </Button>
              </Link>
              <Link href="mailto:minji.dev22@gmail.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent border-gray-500 hover:bg-gray-800"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="about">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">소개</h2>
              <div className="space-y-2 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                <p>안녕하세요, 백엔드와 AI 개발을 중심으로 성장 중인 개발자 박민지입니다.</p>
                <p>
                  Django 기반 웹 서비스, CrewAI 멀티에이전트 챗봇, AWS 인프라 배포, CI/CD 자동화 등 다양한 기술을 직접
                  구현하며 실무 중심의 개발 역량을 키워왔습니다. 단순히 작동하는 기능을 넘어서, 유지보수성과 확장성까지
                  고려한 설계를 지향하고 있으며, 협업과 문서화, 커뮤니케이션에도 진심을 다하는 개발자가 되기 위해
                  끊임없이 노력하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="projects">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">프로젝트</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                제가 개발에 참여한 주요 프로젝트들입니다.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="skills">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">기술 스택</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                제가 사용할 수 있는 기술들입니다.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <div className="space-y-8">
              {["Language", "Backend", "AI/ML", "Database", "DevOps", "Cloud", "Tools"].map((category) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-semibold dark:text-white">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => (
                        <SkillBadge key={skill.name} name={skill.name} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="contact">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">연락처</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                아래 방법으로 연락해 주세요.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-4 mt-8">
              <div className="flex items-center justify-center space-x-4">
                <Mail className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">minji.dev22@gmail.com</p>
              </div>
              <div className="flex justify-center space-x-4">
                <Link href="https://github.com/Mminzy22" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </Link>
                <Link href="https://mminzy22.github.io/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full">
                    <Globe className="h-5 w-5 mr-2" />
                    Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-gray-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <p className="text-sm">© 2025 박민지. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
