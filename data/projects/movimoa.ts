import type { Project } from "@/types/project"

const project: Project = {
    id: 3,
    slug: "movimoa",
    title: "영화 커뮤니티 웹사이트",
    description: "개발자를 대상으로 기술 면접을 시뮬레이션하는 AI 챗봇",
    longDescription:
      "MovieMoa는 사용자가 영화 정보를 확인하고, 영화에 대한 감상평과 댓글을 통해 소통할 수 있는 영화 커뮤니티 웹사이트입니다.",
      technologies: ["Java", "Spring Boot","Spring Security", "OracleDB", "MyBatis"],
    features: [
      "영화 API를 통해 현재 상영 중인 영화 및 인기 영화 정보를 제공",
      "사용자가 영화에 대한 감상평을 작성하고 게시 가능",
      "댓글 기능을 통해 다른 사용자와 소통 가능",
      "Spring Security를 활용한 사용자 인증 및 권한 관리",
      "관리자 기능을 통해 영화 정보 및 사용자 관리",
      "MyBatis를 활용한 데이터베이스 연동 및 쿼리 최적화",
    ],
    image: "/placeholder.svg?height=300&width=500",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    projectInfo: {
      type: "백엔드",
      period: "2023.10 - 2023.11",
      role: "백엔드 아키텍처 설계 및 구현",
      githubUrl: "https://github.com/Mminzy22/moviemoa",
      // demoUrl: "https://demo.cloud-backend.com",
    },
    troubleshooting: [],
}

export default project

