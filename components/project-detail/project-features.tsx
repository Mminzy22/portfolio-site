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
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--pf-accent-soft))]">
            <span className="font-mono-ui text-sm font-semibold text-[hsl(var(--pf-accent))]">{index + 1}</span>
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
      <div className="space-y-10">
        {Object.entries(features).map(([category, featureList]) => (
          <section
            key={category}
            className={`p-6 ${surfaceStyles.panel}`}
          >
            <h3 className={`mb-4 flex items-center text-xl ${textStyles.heading}`}>
              <span className="mr-3 inline-block h-6 w-1.5 rounded-sm bg-[hsl(var(--pf-accent))]" />
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
