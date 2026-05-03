import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { extractBlogLink } from "@/lib/project-features"
import { surfaceStyles } from "@/lib/design-system"
import type { Project } from "@/types/project"

interface ProjectFeaturesProps {
  features: Project["features"]
}

function FeatureItem({ feature, index }: { feature: string; index: number }) {
  const { text, blogUrl } = extractBlogLink(feature)

  return (
    <div className={`rounded-lg p-4 ${surfaceStyles.card}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-primary text-lg font-semibold">{index + 1}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-slate-700 dark:text-slate-300 my-0 py-1">{text}</p>
            {blogUrl && (
              <Link
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap border ${surfaceStyles.accentBadge}`}
              >
                <ExternalLink className="mr-1 h-3 w-3" />
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
        <h2 className="text-2xl font-bold mb-6 dark:text-white">주요 기능</h2>
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
      <h2 className="text-2xl font-bold mb-6 dark:text-white">주요 기능</h2>
      <div className="space-y-10">
        {Object.entries(features).map(([category, featureList]) => (
          <section
            key={category}
            className={`rounded-xl p-6 ${surfaceStyles.subtlePanel}`}
          >
            <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
              <span className="inline-block w-2 h-6 bg-primary mr-3 rounded-sm" />
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
