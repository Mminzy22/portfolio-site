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
      "Pinecone에 저장된 문서를 바탕으로 적절한 면접 질문을 생성",
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
      githubUrl: "https://github.com/Mminzy22/Chatbot_pjt",
      demoUrl: "https://www.youtube.com/watch?v=Vx48Bgsf3qQ&ab_channel=shincc6500",
    },
    troubleshooting: [
      {
        id: 1,
        category: "인프라",
        title: "Kubernetes 클러스터 확장 시 네트워크 지연 문제",
        content:
          "트래픽이 증가하여 Kubernetes 클러스터를 확장했을 때, 서비스 간 통신에 지연이 발생하는 문제가 있었습니다. 네트워크 정책과 서비스 디스커버리 설정을 최적화하여 해결했습니다.",
        discoveryDate: "2025-03-12",
        resolutionDate: "2025-03-12",
        codeBlock: `# 네트워크 정책 설정
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-internal-traffic
spec:
  podSelector: {}
  ingress:
  - from:
    - podSelector: {}`,
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: 2,
        category: "데이터베이스",
        title: "MongoDB 인덱스 최적화 문제",
        content:
          "사용자 데이터 조회 시 쿼리 성능이 저하되는 문제가 발생했습니다. 데이터베이스 인덱스가 제대로 설정되지 않아 발생한 문제였으며, 적절한 인덱스를 추가하여 쿼리 성능을 10배 이상 개선했습니다.",
        discoveryDate: "2025-03-12",
        resolutionDate: "2025-03-12",
        codeBlock: `// 인덱스 생성 전 쿼리 실행 시간: 1200ms
db.users.find({ 
  status: "active", 
  lastLogin: { $gt: new Date("2023-01-01") } 
}).explain("executionStats")

// 인덱스 생성
db.users.createIndex({ status: 1, lastLogin: -1 })

// 인덱스 생성 후 쿼리 실행 시간: 85ms
db.users.find({ 
  status: "active", 
  lastLogin: { $gt: new Date("2023-01-01") } 
}).explain("executionStats")`,
      },
      {
        id: 3,
        category: "보안",
        title: "JWT 토큰 만료 처리 오류",
        content:
          "JWT 토큰이 만료되었을 때 적절한 오류 메시지를 반환하지 않고 서버 오류가 발생하는 문제가 있었습니다. 토큰 검증 미들웨어를 수정하여 만료된 토큰에 대해 명확한 오류 메시지를 반환하도록 개선했습니다.",
        discoveryDate: "2025-03-12",
        resolutionDate: "2025-03-12",
        codeBlock: ``
      },
    ],
}

export default project


