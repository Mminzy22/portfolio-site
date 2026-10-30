import ProjectCard from "@/components/project-card"
import { Section, SectionHeader } from "@/components/section"
import { getProjectsForHomepage } from "@/data/projects"

export default function ProjectsSection() {
  const projects = getProjectsForHomepage()
  const gridClass =
    projects.length <= 2
      ? "mt-16 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
      : "mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"

  return (
    <Section id="projects">
      <SectionHeader
        label="Selected Work"
        title="프로젝트"
        description="제가 개발에 참여한 주요 프로젝트들입니다. 카드 클릭시 상세 설명을 볼 수 있습니다."
      />

      <div className={gridClass}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
