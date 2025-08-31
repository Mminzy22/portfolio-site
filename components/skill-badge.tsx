import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface SkillBadgeProps {
  name: string
  category: string
  link?: string
}

export default function SkillBadge({ name, category, link }: SkillBadgeProps) {
  // 카테고리별 색상 정의
  const getCategoryColors = (category: string) => {
    switch (category) {
      case "Language":
        return "bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-blue-100"
      case "Backend":
        return "bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-green-100"
      case "AI/ML":
        return "bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 dark:text-purple-100"
      case "Database":
        return "bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 dark:text-orange-100"
      case "DevOps":
        return "bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:text-red-100"
      case "Cloud":
        return "bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:text-indigo-100"
      case "Tools":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
      default:
        return "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
    }
  }

  const badgeClasses = `py-1.5 px-3 cursor-pointer ${getCategoryColors(category)}`

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
