"use client"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import Image from "next/image"

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="max-w-none text-[var(--pf-fg-dim)]">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-md my-2 custom-scrollbar"
                customStyle={{
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
                showLineNumbers={true}
                wrapLines={true}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} rounded bg-[var(--pf-surface-2)] px-1 py-0.5 font-mono-ui text-[0.9em] text-[var(--pf-fg)]`} {...props}>
                {children}
              </code>
            )
          },
          img({ node, ...props }) {
            return (
              <span className="block my-4">
                <Image
                  src={props.src || "/placeholder.svg?height=400&width=600"}
                  alt={props.alt || ""}
                  width={800}
                  height={450}
                  style={{ width: "100%", height: "auto" }}
                  className="rounded-lg"
                />
              </span>
            )
          },
          video({ node, ...props }) {
            return (
              <video controls className="w-full rounded-lg my-4" poster={props.poster} src={props.src}>
                브라우저가 비디오 태그를 지원하지 않습니다.
              </video>
            )
          },
          h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
          p: ({ children }) => <p className="my-3 leading-relaxed text-[var(--pf-fg-dim)]">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 my-3">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 my-3">{children}</ol>,
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
