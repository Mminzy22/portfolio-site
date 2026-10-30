"use client"

import { useEffect, useState } from "react"
import { Check, Copy, Mail } from "lucide-react"
import { contactCardClass } from "@/components/sections/contact-card-class"

// 클릭하면 이메일 주소를 복사하는 연락처 카드
export default function CopyEmailCard({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button type="button" onClick={copy} className={`${contactCardClass} w-full text-left`} aria-live="polite">
      <div className="flex items-center gap-4">
        <span className="text-[var(--pf-fg-dim)]">
          <Mail className="h-5 w-5" />
        </span>
        <div>
          <div className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--pf-fg-mute)]">
            {copied ? "복사됨" : "Email · 클릭해서 복사"}
          </div>
          <div className="text-[17px] font-medium text-[var(--pf-fg)]">{email}</div>
        </div>
      </div>
      {copied ? (
        <Check className="h-5 w-5 text-[#22c55e]" />
      ) : (
        <Copy className="h-[18px] w-[18px] text-[var(--pf-fg-dim)] transition-colors group-hover:text-[var(--pf-fg)]" />
      )}
    </button>
  )
}
