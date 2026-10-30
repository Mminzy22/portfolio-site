import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight, Github, Globe, Mail } from "lucide-react"
import { links } from "@/data/profile"

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--pf-border)]">
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
            style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700 }}
          >
            연락처
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <ContactLink
            href={`mailto:${links.email}`}
            label="Email"
            value={links.email}
            icon={<Mail className="h-5 w-5" />}
          />
          <ContactLink
            href={links.github}
            label="GitHub"
            value={`@${links.githubUser}`}
            icon={<Github className="h-5 w-5" />}
            external
          />
          <ContactLink
            href={links.blog}
            label="Blog"
            value={new URL(links.blog).host}
            icon={<Globe className="h-5 w-5" />}
            external
          />
        </div>
      </div>
    </section>
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
  icon: ReactNode
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
          <div className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--pf-fg-mute)]">{label}</div>
          <div className="text-[17px] font-medium text-[var(--pf-fg)]">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 text-[var(--pf-fg-dim)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  )
}
