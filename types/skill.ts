export type SkillCategory = "Language" | "Backend" | "AI/ML" | "Database" | "DevOps" | "Cloud" | "Tools"

export interface Skill {
  name: string
  category: SkillCategory
  link?: string
}
