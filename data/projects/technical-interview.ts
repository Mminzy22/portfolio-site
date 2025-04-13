import type { Project } from "@/types/project"

const project: Project = {
  id: 2,
  slug: "technical-interview",
  title: "개발자 모의 기술 면접 AI 챗봇",
  description: "개발자를 대상으로 기술 면접을 시뮬레이션하는 AI 챗봇",
  longDescription:
    "AI 기반 대화형 챗봇을 개발하는 프로젝트입니다. LangChain과 Pinecone을 활용한 RAG(Retrieval-Augmented Generation) 모델을 기반으로, 주어진 문서를 참고하여 면접 질문을 생성하고 답변을 평가하는 기능을 제공합니다.",
  technologies: ["Python", "Streamlit", "Pinecone", "PostgreSQL", "LangChain", "LangGraph"],
  features: [
    "Pinecone에 저장된 문서를 바탕으로 적절한 면접 질문을 생성[blog:https://mminzy22.github.io/posts/Project04/]",
    "사용자가 입력한 답변을 RAG 기반으로 평가",
    "사용자별 채팅 세션을 생성하고 데이터베이스에 저장",
    "PostgreSQL을 활용하여 채팅 내역 조회 가능",
  ],
  image: "/images/projects/project2/모의면접_챗봇.png?height=300&width=500",
  gallery: [
    "/images/projects/project2/모의면접_로그인.png?height=400&width=600",
    "/images/projects/project2/모의면접_채팅내역1.png?height=400&width=600",
    "/images/projects/project2/모의면접_채팅내역2.png?height=400&width=600",
  ],
  projectInfo: {
    type: "AI & 백엔드",
    period: "2025.02 - 2025.02",
    role: "RDB 설계 및 구현",
    githubUrl: "https://github.com/Mminzy22/DevPilot-Backend",
    demoUrl: "https://www.youtube.com/watch?v=Vx48Bgsf3qQ&ab_channel=shincc6500",
  },
  troubleshooting: [],
}

export default project
