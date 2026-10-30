import SkillList from "@/components/skill-list"
import { Section, SectionHeader } from "@/components/section"
import { skillCategories, skills } from "@/data/skills"

export default function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeader
        label="Stack"
        title="기술 스택"
        description="분야별로 사용해 온 기술입니다. 화살표가 있는 항목을 클릭하면 관련 블로그 글 목록으로 이동합니다."
      />
      <SkillList skills={skills} categories={skillCategories} />
    </Section>
  )
}
