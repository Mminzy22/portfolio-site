// --pf-* 디자인 토큰(app/globals.css)을 쓰는 공통 클래스 모음
export const surfaceStyles = {
  card: "rounded-[14px] border border-[var(--pf-border)] bg-[var(--pf-surface)] transition-colors hover:border-[var(--pf-border-2)]",
  panel: "rounded-[18px] border border-[var(--pf-border)] bg-[var(--pf-bg-2)]",
  accentLink:
    "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[hsl(var(--pf-accent)/0.4)] px-3 py-1 text-xs font-medium text-[hsl(var(--pf-accent))] transition-colors hover:bg-[hsl(var(--pf-accent-soft))]",
}

export const textStyles = {
  heading: "font-bold tracking-tight text-[var(--pf-fg)]",
  body: "text-[var(--pf-fg-dim)]",
  mute: "text-[var(--pf-fg-mute)]",
  monoLabel: "font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[var(--pf-fg-mute)]",
}
