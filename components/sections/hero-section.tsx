import Link from "next/link"
import { ArrowUpRight, Github, Globe } from "lucide-react"
import NetworkField from "@/components/network-field"
import ScrambleText from "@/components/scramble-text"
import { links, profile } from "@/data/profile"

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-64px)] items-center overflow-hidden">
      <div className="pf-hero-bg" aria-hidden />
      <div className="pf-hero-grid" aria-hidden />
      <NetworkField className="absolute inset-0 z-[1] max-md:opacity-50 md:[mask-image:linear-gradient(90deg,rgba(0,0,0,0.35)_0%,#000_55%)]" />

      <div className="relative z-[2] mx-auto flex w-full max-w-[1240px] flex-col gap-12 px-5 pb-20 pt-24 md:px-7">
        <div className="pointer-events-none flex flex-col gap-8">
          <span className="pf-eyebrow pointer-events-auto self-start">
            <span className="pf-eyebrow-dot" />
            <ScrambleText text={profile.role} />
          </span>

          <h1 className="pf-display pointer-events-auto m-0 max-w-[12ch]">{profile.name}</h1>

          <p className="pointer-events-auto max-w-[56ch] text-base leading-relaxed text-[var(--pf-fg-dim)] md:text-lg">
            {profile.heroIntro.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>

          <div className="pointer-events-auto flex flex-wrap items-center gap-3">
            <Link href="#projects" className="pf-btn pf-btn-primary">
              프로젝트 보기
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link href={links.blog} target="_blank" rel="noopener noreferrer" className="pf-btn">
              <Globe className="h-3.5 w-3.5" />
              Blog
            </Link>
            <Link href={links.github} target="_blank" rel="noopener noreferrer" className="pf-btn">
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
  )
}
