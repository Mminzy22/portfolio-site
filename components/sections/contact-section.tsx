import type { ReactNode } from "react"
import type React from "react"
import Link from "next/link"
import { ArrowUpRight, Github, Globe, Send } from "lucide-react"
import CopyEmailCard from "@/components/copy-email-card"
import { contactCardClass } from "@/components/sections/contact-card-class"
import { contact, links } from "@/data/profile"

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
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 md:grid-cols-[1.1fr_1fr] md:items-center md:px-7 md:py-28">
        <div data-reveal>
          <div className="pf-label mb-3">Contact</div>
          <h2
            className="text-[var(--pf-fg)]"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 700 }}
          >
            {contact.headline}
          </h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-[var(--pf-fg-dim)]">{contact.message}</p>
          <Link href={`mailto:${links.email}`} className="pf-btn pf-btn-primary mt-8">
            <Send className="h-3.5 w-3.5" />
            메일 보내기
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div data-reveal>
            <CopyEmailCard email={links.email} />
          </div>
          <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
            <ContactLink
              href={links.github}
              label="GitHub"
              value={`@${links.githubUser}`}
              icon={<Github className="h-5 w-5" />}
            />
          </div>
          <div data-reveal style={{ "--d": "180ms" } as React.CSSProperties}>
            <ContactLink
              href={links.blog}
              label="Blog"
              value={new URL(links.blog).host}
              icon={<Globe className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactLink({ href, label, value, icon }: { href: string; label: string; value: string; icon: ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={contactCardClass}>
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
