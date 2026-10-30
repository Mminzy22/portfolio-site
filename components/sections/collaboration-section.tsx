import AnimatedCounter from "@/components/animated-counter"
import { Section, SectionHeader } from "@/components/section"
import {
  collaborationCards,
  collaborationResultNote,
  collaborationResults,
  type CollabBlock,
  type CollabCardData,
} from "@/data/collaboration"

export default function CollaborationSection() {
  return (
    <Section id="collaboration">
      <SectionHeader
        label="Collaboration"
        title="협업 경험"
        description="팀 프로젝트에서 적용한 협업 문화와 개발 프로세스. 짧은 일정 안에서도 흔들리지 않는 운영을 만듭니다."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {collaborationCards.map((card) => (
          <CollabCard key={card.title} card={card} />
        ))}
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
        <p className="mt-5 text-center text-[13px] text-[var(--pf-fg-dim)]">{collaborationResultNote}</p>
      </div>
    </Section>
  )
}

function CollabCard({ card }: { card: CollabCardData }) {
  const { icon: Icon, title, subtitle, href, note, blocks } = card

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="pf-card relative overflow-hidden p-6">
      <div
        className="mb-3.5 grid h-10 w-10 place-items-center rounded-[10px] text-[hsl(var(--pf-accent))]"
        style={{ background: "hsl(var(--pf-accent-soft))" }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="mb-1 text-lg font-semibold tracking-tight text-[var(--pf-fg)]">{title}</h4>
      <div className="mb-4 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--pf-accent))]">
        {subtitle}
      </div>
      <div className="space-y-3.5">
        {blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
      {note && <p className="mt-4 text-xs italic text-[var(--pf-fg-mute)]">{note}</p>}
    </a>
  )
}

function BlockLabel({ children }: { children: string }) {
  return (
    <p className="mb-2 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--pf-accent))]">{children}</p>
  )
}

function Block({ block }: { block: CollabBlock }) {
  switch (block.type) {
    case "branches":
      return (
        <div className="flex flex-col gap-2">
          {block.items.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-[13px]">
              <code className="rounded-md border border-[var(--pf-border)] bg-[var(--pf-bg-2)] px-2 py-1 font-mono-ui text-[11px] text-[var(--pf-fg)]">
                {item.name}
              </code>
              <span className="text-[var(--pf-fg-dim)]">: {item.desc}</span>
            </div>
          ))}
        </div>
      )
    case "codes":
      return (
        <div className="flex flex-col gap-2">
          {block.items.map((line) => (
            <code
              key={line}
              className="rounded-md border border-[var(--pf-border)] bg-[var(--pf-bg-2)] px-2.5 py-1.5 font-mono-ui text-[12px] text-[var(--pf-fg-dim)]"
            >
              {line}
            </code>
          ))}
        </div>
      )
    case "tags":
      return (
        <div>
          <BlockLabel>{block.label}</BlockLabel>
          <div className="flex flex-wrap gap-1.5">
            {block.items.map((tag) => (
              <span key={tag} className="pf-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )
    case "list":
      return (
        <div>
          <BlockLabel>{block.label}</BlockLabel>
          <ul className="space-y-1 text-[13px] text-[var(--pf-fg-dim)]">
            {block.items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      )
  }
}
