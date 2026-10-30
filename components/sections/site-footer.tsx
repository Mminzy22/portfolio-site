import { profile } from "@/data/profile"

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--pf-border)] px-7 py-7">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-4 font-mono-ui text-xs uppercase tracking-[0.12em] text-[var(--pf-fg-mute)]">
        <span>
          © {profile.copyrightYear} {profile.name}
        </span>
        <span>{profile.role}</span>
      </div>
    </footer>
  )
}
