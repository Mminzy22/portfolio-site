import SkillCloud from "@/components/skill-cloud"
import { Section, SectionHeader } from "@/components/section"
import { skillCategories, skills } from "@/data/skills"

export default function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeader
        label="Stack"
        title="기술 스택"
        description="카테고리를 클릭해 필터링해 보세요. 항목을 클릭하면 관련 블로그 태그 페이지로 이동합니다."
      />
      <SkillCloud skills={skills} categories={skillCategories} />
    </Section>
  )
}
