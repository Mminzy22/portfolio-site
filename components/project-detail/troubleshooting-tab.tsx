import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import MarkdownContent from "@/components/markdown-content"
import { surfaceStyles } from "@/lib/design-system"
import type { TroubleshootingItem } from "@/types/project"

interface TroubleshootingTabProps {
  items: TroubleshootingItem[]
}

export default function TroubleshootingTab({ items }: TroubleshootingTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">트러블슈팅</h2>

      <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-t-lg font-medium text-sm">
        <div className="col-span-2 md:col-span-1 text-center">번호</div>
        <div className="col-span-3 md:col-span-1 text-center">분류</div>
        <div className="col-span-7 md:col-span-7">제목</div>
        <div className="hidden md:block md:col-span-3 text-right pr-10">발견 날짜</div>
      </div>

      <Accordion type="single" collapsible className="w-full border rounded-b-lg divide-y">
        {items.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`} className="border-0">
            <AccordionTrigger className="py-4 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 w-full">
              <div className="grid grid-cols-12 gap-4 w-full text-left pr-8">
                <div className="col-span-2 md:col-span-1 text-center text-slate-500">{item.id}</div>
                <div className="col-span-3 md:col-span-1 text-center">
                  <Badge variant="outline" className={`text-xs md:text-sm px-1 md:px-2 ${surfaceStyles.mutedBadge}`}>
                    {item.category}
                  </Badge>
                </div>
                <div className="col-span-7 md:col-span-7 font-medium truncate pr-2 text-sm md:text-base">
                  {item.title}
                </div>
                <div className="hidden md:block md:col-span-3 text-right text-slate-500 text-sm">
                  <span className="whitespace-nowrap">발견: {item.discoveryDate}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-6 pt-2">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <div className="text-sm text-slate-500">
                    <div>발견: {item.discoveryDate}</div>
                    <div>해결: {item.resolutionDate}</div>
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
