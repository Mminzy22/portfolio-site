import type { Project } from "@/types/project"
import aiNlpSystem from "./ainfo"
import technicalInterview from "./technical-interview"
import movimoa from "./movimoa"

// 모든 프로젝트 데이터를 배열로 내보냅니다
export const projects: Project[] = [
  aiNlpSystem,
  technicalInterview,
  movimoa,
  // 새 프로젝트를 추가할 때마다 여기에 추가하면 됩니다
]

// 슬러그로 프로젝트 찾기
export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined
  return projects.find((project) => project.slug === slug)
}

// 모든 프로젝트 가져오기
export function getAllProjects(): Project[] {
  return projects
}

// 프로젝트 ID로 찾기
export function getProjectById(id: number): Project | undefined {
  return projects.find((project) => project.id === id)
}

// 메인 페이지용 프로젝트 요약 정보 가져오기
export function getProjectsForHomepage() {
  return projects.map(({ id, title, description, technologies, image, slug }) => ({
    id,
    title,
    description,
    technologies,
    image,
    link: `/projects/${slug}`,
  }))
}
