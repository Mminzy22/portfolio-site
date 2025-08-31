import Link from "next/link"
import { Github, Mail, Globe } from "lucide-react"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import { Button } from "@/components/ui/button"
import CollaborationSection from "@/components/collaboration-section"
import { getProjectsForHomepage } from "@/data/projects"

export default function Home() {
  const projects = getProjectsForHomepage()
  // 프로젝트 개수에 따라 그리드 클래스 동적 결정
  const gridClass =
    projects.length <= 2
      ? "grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto"

  const skills = [
    { name: "Python", category: "Language", link: "https://mminzy22.github.io/tags/python/" },
    { name: "Java", category: "Language", link: "https://mminzy22.github.io/tags/java/" },
    { name: "Django", category: "Backend", link: "https://mminzy22.github.io/tags/django/" },
    { name: "Django Channels", category: "Backend", link: "https://mminzy22.github.io/tags/django-channels/" },
    { name: "WebSocket", category: "Backend", link: "https://mminzy22.github.io/tags/websocket/" },
    { name: "Celery", category: "Backend", link: "https://mminzy22.github.io/tags/celery/" },
    { name: "Spring Boot", category: "Backend", link: "https://mminzy22.github.io/tags/springboot/" },
    { name: "LangChain", category: "AI/ML", link: "https://mminzy22.github.io/tags/langchain/" },
    { name: "CrewAI", category: "AI/ML", link: "https://mminzy22.github.io/tags/crewai/" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Database", link: "https://mminzy22.github.io/tags/redis/" },
    { name: "MySQL", category: "Database", link: "https://mminzy22.github.io/tags/mysql/" },
    { name: "OracleDB", category: "Database" },
    { name: "Docker", category: "DevOps", link: "https://mminzy22.github.io/tags/docker/" },
    { name: "GitHub Actions", category: "DevOps", link: "https://mminzy22.github.io/tags/github-actions/" },
    { name: "Nginx", category: "DevOps" },
    { name: "AWS EC2", category: "Cloud", link: "https://mminzy22.github.io/tags/ec2/" },
    { name: "AWS S3", category: "Cloud", link: "https://mminzy22.github.io/tags/s3/" },
    { name: "AWS RDS", category: "Cloud", link: "https://mminzy22.github.io/tags/rds/" },
    { name: "AWS CloudFront", category: "Cloud", link: "https://mminzy22.github.io/tags/cloudfront/" },
    { name: "AWS Route 53", category: "Cloud" },
    { name: "AWS ECS", category: "Cloud", link: "https://mminzy22.github.io/tags/ecs/" },
    { name: "AWS ECR", category: "Cloud", link: "https://mminzy22.github.io/tags/ecr/" },
    { name: "AWS IAM", category: "Cloud", link: "https://mminzy22.github.io/tags/iam/" },
    { name: "AWS KMS", category: "Cloud", link: "https://mminzy22.github.io/tags/kms/" },
    { name: "AWS VPC", category: "Cloud", link: "https://mminzy22.github.io/tags/vpc/" },
    { name: "AWS SSM", category: "Cloud", link: "https://mminzy22.github.io/tags/ssm/" },
    { name: "Git", category: "Tools" },
    { name: "VSCode", category: "Tools" },
    { name: "Postman", category: "Tools" },
    { name: "Notion", category: "Tools" },
    { name: "Discord", category: "Tools" },
    { name: "Slack", category: "Tools" },
  ]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">박민지</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-[700px]">Backend · DevOps/Infra · AI 엔지니어</p>
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
                <p>안녕하세요, 백엔드와 클라우드 운영을 체계적으로 설계·구현하는 박민지입니다. </p>
                <p>
                  AWS 클라우드 인프라 설계와 CI/CD 파이프라인 구축을 통해 운영 안정성과 배포 효율을 높였으며, 
                  AI 기반 백엔드 서비스 개발로 데이터부터 서비스까지 전체 흐름을 연결했습니다. 
                  단순한 기능 구현을 넘어 보안, 가용성, 모니터링, 확장성을 함께 고려하고, 
                  문서화와 협업을 통해 팀 생산성을 높이는 개발자를 지향합니다.
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
          <div className={gridClass}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <CollaborationSection />

      {/* Skills Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="skills">
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
                        <SkillBadge key={skill.name} name={skill.name} category={skill.category} link={skill.link} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="contact">
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
                  <Button variant="outline" className="rounded-full bg-transparent">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </Link>
                <Link href="https://mminzy22.github.io/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full bg-transparent">
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
