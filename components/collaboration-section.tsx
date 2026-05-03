import { ClipboardList, GitBranch, MessageSquareText, ShieldCheck } from "lucide-react"
import { surfaceStyles } from "@/lib/design-system"

const collaborationLinks = {
  branch:
    "https://github.com/next-engineer/next-kickytime-server/wiki/%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5",
  commit:
    "https://github.com/next-engineer/next-kickytime-server/wiki/%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B7%9C%EC%B9%99",
  quality:
    "https://github.com/next-engineer/next-kickytime-server/wiki/%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%9E%90%EB%8F%99%ED%99%94-%EC%84%A4%EC%A0%95",
  process: "https://mminzy22.github.io/posts/Project19/",
}

const collaborationItems = [
  {
    title: "브랜치 전략",
    description: "Git Flow 기반 구조",
    href: collaborationLinks.branch,
    icon: GitBranch,
    details: ["main: 운영 환경 배포용", "develop: 개발 통합 브랜치", "feature/*: 기능별 브랜치", "hotfix/*: 긴급 수정 브랜치"],
    note: "보호 브랜치 설정으로 직접 푸시 금지, PR 리뷰 필수",
  },
  {
    title: "커밋 메시지 규칙",
    description: "Conventional Commits 기반",
    href: collaborationLinks.commit,
    icon: MessageSquareText,
    details: ["feat: 새로운 기능", "fix: 버그 수정", "refactor: 구조 개선", "docs: 문서 변경"],
    note: "하나의 커밋 = 하나의 논리적 변경 원칙",
  },
  {
    title: "코드 품질 자동화",
    description: "Frontend와 Backend 품질 규칙",
    href: collaborationLinks.quality,
    icon: ShieldCheck,
    details: ["Frontend: Prettier, ESLint, Husky", "Backend: Spotless, Checkstyle"],
    note: "Git Hooks와 CI/CD로 일관된 품질 보장",
  },
  {
    title: "프로세스 관리",
    description: "이슈, PR, 버전 관리",
    href: collaborationLinks.process,
    icon: ClipboardList,
    details: ["Semantic Versioning", "이슈 및 PR 템플릿", "최소 1명 리뷰 승인 후 병합"],
    note: "체계적인 양식으로 누락을 줄이는 협업 프로세스",
  },
]

const collaborationResults = [
  { value: "100%", label: "코드 리뷰 적용률" },
  { value: "0건", label: "브랜치 충돌 발생" },
  { value: "2개", label: "프로젝트 적용" },
]

export default function CollaborationSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="collaboration">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">협업 경험</h2>
            <p className={`mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${surfaceStyles.sectionText}`}>
              팀 프로젝트에서 적용한 협업 문화와 개발 프로세스입니다.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {collaborationItems.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-lg p-6 ${surfaceStyles.card}`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${surfaceStyles.iconBox}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm font-medium text-primary">{item.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {item.details.map((detail) => (
                      <div key={detail} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-950/60">
                        {detail}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">{item.note}</p>
                </a>
              )
            })}
          </div>

          <div className={`rounded-lg p-8 mt-8 ${surfaceStyles.subtlePanel}`}>
            <h4 className="text-xl font-semibold mb-4 dark:text-white">협업 성과</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {collaborationResults.map((result) => (
                <div key={result.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{result.value}</div>
                  <div className="text-slate-600 dark:text-slate-300">{result.label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-600 dark:text-slate-300 mt-4">
              체계적인 협업 문화로 단기 프로젝트에서도 실무 수준의 개발 경험 달성
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
