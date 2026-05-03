declare module "react-syntax-highlighter" {
  import type { ComponentType, CSSProperties, HTMLAttributes, ReactNode } from "react"

  export interface SyntaxHighlighterProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode
    customStyle?: Record<string, string | number>
    language?: string
    PreTag?: keyof JSX.IntrinsicElements | ComponentType<unknown>
    showLineNumbers?: boolean
    style?: CSSProperties | Record<string, unknown>
    wrapLines?: boolean
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  export const vscDarkPlus: Record<string, unknown>
}
