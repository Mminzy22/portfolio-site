import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface SkillBadgeProps {
  name: string
  link?: string
}

export default function SkillBadge({ name, link }: SkillBadgeProps) {
  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <Badge className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-1.5 px-3 cursor-pointer">
          {name}
        </Badge>
      </Link>
    )
  }

  return (
    <Badge className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-1.5 px-3">
      {name}
    </Badge>
  )
}
