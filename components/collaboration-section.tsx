import { ClipboardList, GitBranch, MessageSquareText, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import AnimatedCounter from "@/components/animated-counter"

const collaborationLinks = {
  branch:
    "https://github.com/next-engineer/next-kickytime-server/wiki/%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5",
  commit:
    "https://github.com/next-engineer/next-kickytime-server/wiki/%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B7%9C%EC%B9%99",
  quality:
    "https://github.com/next-engineer/next-kickytime-server/wiki/%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%9E%90%EB%8F%99%ED%99%94-%EC%84%A4%EC%A0%95",
  process: "https://mminzy22.github.io/posts/Project19/",
}

const collaborationResults: { value: number; suffix: string; label: string }[] = [
  { value: 100, suffix: "%", label: "코드 리뷰 적용률" },
  { value: 0, suffix: "건", label: "브랜치 충돌 발생" },
  { value: 2, suffix: "개", label: "프로젝트 적용" },
]

export default function CollaborationSection() {
  return (
    <section
      id="collaboration"
      className="mx-auto max-w-[1240px] px-5 py-24 md:px-7 md:py-32"
    >
      <div className="mb-14 grid items-end gap-12 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <div className="pf-label mb-3">Collaboration</div>
          <h2 className="pf-section-title text-[var(--pf-fg)]">협업 경험</h2>
        </div>
        <p className="max-w-[72ch] text-[17px] leading-relaxed text-[var(--pf-fg-dim)]">
          팀 프로젝트에서 적용한 협업 문화와 개발 프로세스. 짧은 일정 안에서도 흔들리지 않는 운영을 만듭니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 브랜치 전략 */}
        <CollabCard
          icon={GitBranch}
          title="브랜치 전략"
          subtitle="Git Flow 기반 구조"
          href={collaborationLinks.branch}
          note="보호 브랜치 설정으로 직접 푸시 금지, PR 리뷰 필수"
        >
          <div className="flex flex-col gap-2">
            {[
              { name: "main", desc: "운영 환경 배포용" },
              { name: "develop", desc: "개발 통합 브랜치" },
              { name: "feature/*", desc: "기능별 브랜치" },
              { name: "hotfix/*", desc: "긴급 수정 브랜치" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-[13px]">
                <code className="rounded-md border border-[var(--pf-border)] bg-[var(--pf-bg-2)] px-2 py-1 font-mono-ui text-[11px] text-[var(--pf-fg)]">
                  {item.name}
                </code>
                <span className="text-[var(--pf-fg-dim)]">: {item.desc}</span>
              </div>
            ))}
          </div>
        </CollabCard>

        {/* 커밋 메시지 규칙 */}
        <CollabCard
          icon={MessageSquareText}
          title="커밋 메시지 규칙"
          subtitle="Conventional Commits + Gitmoji"
          href={collaborationLinks.commit}
          note="하나의 커밋 = 하나의 논리적 변경 원칙"
        >
          <div className="flex flex-col gap-2">
            {[
              "✨ feat: 새로운 기능",
              "🐛 fix: 버그 수정",
              "♻️ refactor: 구조 개선",
              "📄 docs: 문서 변경",
            ].map((line) => (
              <code
                key={line}
                className="rounded-md border border-[var(--pf-border)] bg-[var(--pf-bg-2)] px-2.5 py-1.5 font-mono-ui text-[12px] text-[var(--pf-fg-dim)]"
              >
                {line}
              </code>
            ))}
          </div>
        </CollabCard>

        {/* 코드 품질 자동화 */}
        <CollabCard
          icon={ShieldCheck}
          title="코드 품질 자동화"
          subtitle="Frontend & Backend 품질 규칙"
          href={collaborationLinks.quality}
          note="Git Hooks + CI/CD로 일관된 품질 보장"
        >
          <div className="space-y-3.5">
            <div>
              <p className="mb-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--pf-accent))]">
                Frontend (React + TS)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Prettier", "ESLint", "Husky"].map((tag) => (
                  <span key={tag} className="pf-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--pf-accent))]">
                Backend (Spring Boot + Java)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Spotless", "Checkstyle"].map((tag) => (
                  <span key={tag} className="pf-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CollabCard>

        {/* 프로세스 관리 */}
        <CollabCard
          icon={ClipboardList}
          title="프로세스 관리"
          subtitle="이슈 · PR · 버전 관리"
          href={collaborationLinks.process}
        >
          <div className="space-y-3.5">
            <div>
              <p className="mb-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--pf-accent))]">
                버전 관리
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="pf-tag">Semantic Versioning</span>
                <span className="pf-tag">vMAJOR.MINOR.PATCH</span>
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--pf-accent))]">
                이슈 &amp; PR 템플릿
              </p>
              <ul className="space-y-1 text-[13px] text-[var(--pf-fg-dim)]">
                <li>• 기능 요청, 버그 리포트, 문서 변경</li>
                <li>• 체계적인 양식으로 누락 방지</li>
                <li>• 최소 1명 리뷰 승인 후 병합</li>
              </ul>
            </div>
          </div>
        </CollabCard>
      </div>

      <div className="pf-card mt-6 p-7">
        <h4 className="mb-5 font-mono-ui text-[11px] uppercase tracking-[0.2em] text-[var(--pf-fg-mute)]">
          협업 성과
        </h4>
        <div className="grid gap-4 md:grid-cols-3 md:items-center">
          {collaborationResults.map((result) => (
            <div key={result.label} className="text-center">
              <AnimatedCounter
                value={result.value}
                suffix={result.suffix}
                className="text-[30px] font-bold text-[hsl(var(--pf-accent))]"
              />
              <div className="mt-1 text-[13px] text-[var(--pf-fg-dim)]">{result.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-[13px] text-[var(--pf-fg-dim)]">
          체계적인 협업 문화로 단기 프로젝트에서도 실무 수준의 개발 경험 달성
        </p>
      </div>
    </section>
  )
}

function CollabCard({
  icon: Icon,
  title,
  subtitle,
  href,
  note,
  children,
}: {
  icon: LucideIcon
  title: string
  subtitle: string
  href: string
  note?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pf-card relative overflow-hidden p-6"
    >
      <div
        className="mb-3.5 grid h-10 w-10 place-items-center rounded-[10px] text-[hsl(var(--pf-accent))]"
        style={{ background: "hsl(var(--pf-accent-soft))" }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="mb-1 text-lg font-semibold tracking-tight text-[var(--pf-fg)]">
        {title}
      </h4>
      <div className="mb-4 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--pf-accent))]">
        {subtitle}
      </div>
      {children}
      {note && <p className="mt-4 text-xs italic text-[var(--pf-fg-mute)]">{note}</p>}
    </a>
  )
}
