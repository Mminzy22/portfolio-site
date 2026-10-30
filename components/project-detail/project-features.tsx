import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { extractBlogLink } from "@/lib/project-features"
import { surfaceStyles, textStyles } from "@/lib/design-system"

import type { Project } from "@/types/project"

interface ProjectFeaturesProps {
  features: Project["features"]
}

function FeatureItem({ feature, index }: { feature: string; index: number }) {
  const { text, blogUrl } = extractBlogLink(feature)

  return (
    <div className={`p-4 ${surfaceStyles.card}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-[var(--pf-r-sm)] bg-[hsl(var(--pf-accent-soft))]">
            <span className="font-mono-ui text-xs font-semibold text-[hsl(var(--pf-accent))]">{String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="my-0 py-1 text-[var(--pf-fg-dim)]">{text}</p>
            {blogUrl && (
              <Link
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={surfaceStyles.accentLink}
              >
                <ExternalLink className="h-3 w-3" />
                블로그 글 보기
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
  if (Array.isArray(features)) {
    return (
      <div className="space-y-6">
        <h2 className={`mb-6 text-2xl ${textStyles.heading}`}>주요 기능</h2>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <FeatureItem key={feature} feature={feature} index={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className={`mb-6 text-2xl ${textStyles.heading}`}>주요 기능</h2>
      <div>
        {Object.entries(features).map(([category, featureList], i) => (
          <section key={category} className={`py-8 ${i > 0 ? "border-t border-[var(--pf-border)]" : "pt-2"}`}>
            <h3 className={`mb-4 flex items-baseline gap-3 text-xl ${textStyles.heading}`}>
              <span className="font-mono-ui text-[11px] font-normal tracking-[0.16em] text-[hsl(var(--pf-accent))]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="space-y-3 mt-4">
              {featureList.map((feature, index) => (
                <FeatureItem key={`${category}-${feature}`} feature={feature} index={index} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
