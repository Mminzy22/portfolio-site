import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import MarkdownContent from "@/components/markdown-content"
import { textStyles } from "@/lib/design-system"
import type { TroubleshootingItem } from "@/types/project"

interface TroubleshootingTabProps {
  items: TroubleshootingItem[]
}

export default function TroubleshootingTab({ items }: TroubleshootingTabProps) {
  return (
    <div className="space-y-6">
      <h2 className={`mb-4 text-2xl ${textStyles.heading}`}>트러블슈팅</h2>

      <div className="grid grid-cols-12 gap-4 py-3 px-4 rounded-t-[14px] border border-b-0 border-[var(--pf-border)] bg-[var(--pf-bg-2)] font-mono-ui text-xs uppercase tracking-[0.12em] text-[var(--pf-fg-mute)]">
        <div className="col-span-2 md:col-span-1 text-center">번호</div>
        <div className="col-span-3 md:col-span-1 text-center">분류</div>
        <div className="col-span-7 md:col-span-7">제목</div>
        <div className="hidden md:block md:col-span-3 text-right pr-10">발견 날짜</div>
      </div>

      <Accordion type="single" collapsible className="w-full divide-y divide-[var(--pf-border)] rounded-b-[14px] border border-[var(--pf-border)]">
        {items.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`} className="border-0">
            <AccordionTrigger className="py-4 px-4 w-full text-[var(--pf-fg)] hover:bg-[var(--pf-surface-2)] hover:no-underline">
              <div className="grid grid-cols-12 gap-4 w-full text-left pr-8">
                <div className="col-span-2 md:col-span-1 text-center font-mono-ui text-[var(--pf-fg-mute)]">{item.id}</div>
                <div className="col-span-3 md:col-span-1 text-center">
                  <span className="pf-tag">{item.category}</span>
                </div>
                <div className="col-span-7 md:col-span-7 font-medium truncate pr-2 text-sm md:text-base">
                  {item.title}
                </div>
                <div className="hidden md:block md:col-span-3 text-right text-sm text-[var(--pf-fg-mute)]">
                  <span className="whitespace-nowrap">발견: {item.discoveryDate}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-6 pt-2">
              <div className="rounded-[14px] bg-[var(--pf-bg-2)] p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <h3 className={`break-words text-xl md:min-w-0 md:flex-1 ${textStyles.heading}`}>{item.title}</h3>
                  <div className={`text-sm md:shrink-0 md:text-right ${textStyles.mute}`}>
                    <div className="whitespace-nowrap">발견: {item.discoveryDate}</div>
                    <div className="whitespace-nowrap">해결: {item.resolutionDate}</div>
                  </div>
                </div>

                <MarkdownContent content={item.content} />

                {item.codeBlock && !item.content.includes("```") && (
                  <div className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      <code>{item.codeBlock}</code>
                    </pre>
                  </div>
                )}

                {item.image && !item.content.includes("![") && (
                  <div className="mt-4 w-full rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg?height=400&width=600"}
                      alt={`${item.title} 이미지`}
                      width={800}
                      height={450}
                      style={{ width: "100%", height: "auto" }}
                      className="rounded-lg"
                    />
                  </div>
                )}

                {item.video && !item.content.includes("<video") && (
                  <div className="mt-4">
                    <video controls className="w-full rounded-lg" poster={item.image}>
                      <source src={item.video} type="video/mp4" />
                      브라우저가 비디오 태그를 지원하지 않습니다.
                    </video>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
