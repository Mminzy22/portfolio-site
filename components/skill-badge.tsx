import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { surfaceStyles } from "@/lib/design-system"
import type { SkillCategory } from "@/types/skill"

interface SkillBadgeProps {
  name: string
  category: SkillCategory
  link?: string
}

export default function SkillBadge({ name, category, link }: SkillBadgeProps) {
  const badgeClasses = `py-1.5 px-3 cursor-pointer ${surfaceStyles.mutedBadge}`

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <Badge className={badgeClasses}>
          {name}
        </Badge>
      </Link>
    )
  }

  return (
    <Badge className={badgeClasses}>
      {name}
    </Badge>
  )
}
