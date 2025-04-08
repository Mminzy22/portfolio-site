// 트러블슈팅 항목 인터페이스
export interface TroubleshootingItem {
  id: number
  category: string
  title: string
  content: string
  discoveryDate: string
  resolutionDate: string
  codeBlock?: string
  image?: string
  video?: string
}

// 프로젝트 인터페이스
export interface Project {
  id: number
  slug: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features:
    | string[]
    | {
        user: string[]
        chatbot: string[]
        [key: string]: string[] // 다른 카테고리도 추가 가능
      }
  image: string
  gallery: string[]
  link?: string // 추가된 필드
  projectInfo: {
    type: string
    period: string
    role: string
    githubUrl?: string
    demoUrl?: string
  }
  troubleshooting?: TroubleshootingItem[]
}
