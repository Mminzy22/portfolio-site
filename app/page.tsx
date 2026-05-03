import Link from "next/link"
import { ArrowUpRight, Github, Globe, Mail } from "lucide-react"
import ProjectCard from "@/components/project-card"
import CollaborationSection from "@/components/collaboration-section"
import ParticleField from "@/components/particle-field"
import AnimatedCounter from "@/components/animated-counter"
import SkillCloud from "@/components/skill-cloud"
import { getProjectsForHomepage } from "@/data/projects"
import { skillCategories, skills } from "@/data/skills"

export default function Home() {
  const projects = getProjectsForHomepage()
  const gridClass =
    projects.length <= 2
      ? "mt-16 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
      : "mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"

  return (
    <main id="top">
      {/* HERO */}
      <section className="relative isolate flex min-h-[calc(100vh-64px)] items-center overflow-hidden">
        <div className="pf-hero-bg" aria-hidden />
        <div className="pf-hero-grid" aria-hidden />
        <ParticleField className="absolute left-1/2 top-1/2 z-[1] h-[min(680px,60vw)] w-[min(680px,60vw)] -translate-x-1/2 -translate-y-1/2 rounded-full max-md:opacity-60" />

        <div className="relative z-[2] mx-auto flex w-full max-w-[1240px] flex-col gap-12 px-5 pb-20 pt-24 md:px-7">
          <div className="pointer-events-none flex flex-col gap-8">
            <span className="pf-eyebrow pointer-events-auto self-start">
              <span className="pf-eyebrow-dot" />
              Backend · DevOps · AI
            </span>

            <h1 className="pf-display pointer-events-auto m-0 max-w-[12ch]">
              박민지
            </h1>

            <p className="pointer-events-auto max-w-[56ch] text-base leading-relaxed text-[var(--pf-fg-dim)] md:text-lg">
              안정적인 백엔드와 클라우드 운영을 설계하고,
              <br />
              AI 기반 서비스 흐름을 구현하는 개발자입니다.
            </p>

            <div className="pointer-events-auto flex flex-wrap items-center gap-3">
              <Link href="#projects" className="pf-btn pf-btn-primary">
                프로젝트 보기
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="https://mminzy22.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn"
              >
                <Globe className="h-3.5 w-3.5" />
                Blog
              </Link>
              <Link
                href="https://github.com/Mminzy22"
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </Link>
            </div>
          </div>

        </div>

        <div
          className="absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 items-center gap-2.5 font-mono-ui text-[10px] uppercase tracking-[0.36em] text-[var(--pf-fg-mute)]"
          aria-hidden
        >
          Scroll
          <span className="h-px w-7 bg-current" />
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-[1240px] px-5 py-24 md:px-7 md:py-32"
      >
        <div className="mb-14 grid items-end gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="pf-label mb-3">About</div>
            <h2 className="pf-section-title text-[var(--pf-fg)]">소개</h2>
          </div>
          <p className="max-w-[72ch] text-[17px] leading-relaxed text-[var(--pf-fg-dim)]">
            문서화와 협업으로 팀 생산성을 끌어올리는, 백엔드부터 클라우드 운영, AI 서비스까지 연결하는 개발자.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="pf-card p-7">
            <h3 className="mb-4 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--pf-fg-mute)]">
              Mission
            </h3>
            <p className="text-[15px] leading-relaxed text-[var(--pf-fg-dim)]">
              AWS 클라우드 인프라 설계와 CI/CD 파이프라인 구축으로 운영 안정성과 배포 효율을 높이고,
              AI 기반 백엔드 서비스 개발로 데이터부터 서비스까지 전체 흐름을 연결합니다.
              보안, 가용성, 모니터링, 확장성을 함께 고려하는 것을 기본 원칙으로 삼습니다.
            </p>
          </div>

          <div className="pf-card p-7">
            <h3 className="mb-4 font-mono-ui text-xs uppercase tracking-[0.2em] text-[var(--pf-fg-mute)]">
              By the numbers
            </h3>
            <div className="flex flex-wrap gap-7">
              <Stat value={3} label="Projects" />
              <Stat value={100} suffix="%" label="Code Review" />
              <Stat value={24} label="Skills" />
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--pf-fg-dim)]">
              단기 팀 프로젝트에서도 실무 수준의 협업 문화와 운영 품질을 유지했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="mx-auto max-w-[1240px] px-5 py-24 md:px-7 md:py-32"
      >
        <div className="mb-14 grid items-end gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="pf-label mb-3">Selected Work</div>
            <h2 className="pf-section-title text-[var(--pf-fg)]">프로젝트</h2>
          </div>
          <p className="max-w-[72ch] text-[17px] leading-relaxed text-[var(--pf-fg-dim)]">
            제가 개발에 참여한 주요 프로젝트들입니다. 카드 클릭시 상세 설명을 볼 수 있습니다.
          </p>
        </div>

        <div className={gridClass}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* COLLABORATION */}
      <CollaborationSection />

      {/* SKILLS */}
      <section
        id="skills"
        className="mx-auto max-w-[1240px] px-5 py-24 md:px-7 md:py-32"
      >
        <div className="mb-14 grid items-end gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="pf-label mb-3">Stack</div>
            <h2 className="pf-section-title text-[var(--pf-fg)]">기술 스택</h2>
          </div>
          <p className="max-w-[72ch] text-[17px] leading-relaxed text-[var(--pf-fg-dim)]">
            카테고리를 클릭해 필터링해 보세요. 항목을 클릭하면 관련 블로그 태그 페이지로 이동합니다.
          </p>
        </div>

        <SkillCloud skills={skills} categories={skillCategories} />
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-[var(--pf-border)]"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-[1]"
          style={{
            background:
              "radial-gradient(800px 400px at 80% 0%, hsl(var(--pf-accent) / 0.18), transparent 60%), linear-gradient(180deg, var(--pf-bg) 0%, var(--pf-bg-2) 100%)",
          }}
        />
        <div className="mx-auto grid max-w-[1100px] gap-12 px-5 py-28 md:grid-cols-2 md:items-center md:px-7">
          <div>
            <div className="pf-label mb-3">Contact</div>
            <h2
              className="text-[var(--pf-fg)]"
              style={{
                fontSize: "clamp(40px, 6vw, 88px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              연락처
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <ContactLink
              href="mailto:minji.dev22@gmail.com"
              label="Email"
              value="minji.dev22@gmail.com"
              icon={<Mail className="h-5 w-5" />}
            />
            <ContactLink
              href="https://github.com/Mminzy22"
              label="GitHub"
              value="@Mminzy22"
              icon={<Github className="h-5 w-5" />}
              external
            />
            <ContactLink
              href="https://mminzy22.github.io/"
              label="Blog"
              value="mminzy22.github.io"
              icon={<Globe className="h-5 w-5" />}
              external
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--pf-border)] px-7 py-7">
        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-4 font-mono-ui text-xs uppercase tracking-[0.12em] text-[var(--pf-fg-mute)]">
          <span>© 2026 박민지</span>
          <span>Backend · DevOps · AI</span>
        </div>
      </footer>
    </main>
  )
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <AnimatedCounter
        value={value}
        suffix={suffix}
        className="text-3xl font-bold tracking-tight text-[var(--pf-fg)]"
      />
      <div className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pf-fg-mute)]">
        {label}
      </div>
    </div>
  )
}

function ContactLink({
  href,
  label,
  value,
  icon,
  external,
}: {
  href: string
  label: string
  value: string
  icon: React.ReactNode
  external?: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--pf-border)] bg-[var(--pf-surface)] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--pf-border-2)] hover:shadow-[var(--pf-shadow-lg)]"
    >
      <div className="flex items-center gap-4">
        <span className="text-[var(--pf-fg-dim)]">{icon}</span>
        <div>
          <div className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--pf-fg-mute)]">
            {label}
          </div>
          <div className="text-[17px] font-medium text-[var(--pf-fg)]">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 text-[var(--pf-fg-dim)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  )
}
