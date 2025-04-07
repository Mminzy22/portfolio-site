import type { Project } from "@/types/project"

const project: Project = {
    id: 1,
    slug: "ainfo",
    title: "AInfo",
    description: "개인 맞춤형 공공서비스 추천 AI 챗봇",
    longDescription:
      "이 프로젝트는 개인 맞춤형 공공서비스 추천 AI 챗봇입니다. Django Rest Framework(DRF)를 기반으로 API를 제공하며, AI 모델과 연동하여 실시간으로 사용자의 질의에 응답합니다. ChromaDB를 활용하여 대량의 데이터를 효율적으로 저장하고 검색할 수 있도록 설계되었습니다. Redis를 사용하여 세션 관리 및 캐싱을 통해 성능을 최적화했습니다. Celery를 통해 비동기 작업 처리를 구현하여 사용자 경험을 향상시켰습니다.",
    technologies: ["Python", "Django", "DRF", "PostgreSQL", "ChromaDB", "Django Channels", "Redis", "Celery", "LangChain", "CrewAI"],
    features: {
      user: ["JWT 기반 로그인/회원가입", "이메일 인증 및 비밀번호 재설정", "소셜 로그인 (Google, Kakao)", "프로필 조회 및 수정", "회원 탈퇴"],
      chatbot: ["LangChain + ChromaDB 기반 RAG 모델 연동", "Django Channels, Redis를 이용한 WebSocket 실시간 대화 지원", "개인화된 맞춤형 공공서비스 추천 기능", "대화 기록 저장 및 조회 기능", "대화 흐름 기억", "부족한 정보 → 웹검색", "보고서 작성"],
      "공공 데이터 연동": ["정부 API(고용24, 정부24, 온통청년) 활용", "K스타트업 안내책자 pdf 활용", "주기적 데이터 로드"],
      "메일": ["회원가입 시 본인인증을 위한 메일 발송", "비밀번호 재설정 메일 발송", "전체유저 대상 공지메일 발송"],
      "결제": ["KG 이니시스 PG 사 연동", "결제 관련정보 DB 관리"],
    },
    image: "/images/projects/project1/ainfo_index.png?height=300&width=500",
    gallery: [
      "/images/projects/project1/ainfo_report.gif?height=400&width=600",
      "/images/projects/project1/ainfo_pay.gif?height=400&width=600",
      "/images/projects/project1/ainfo_s.gif?height=400&width=600",
    ],
    projectInfo: {
      type: "AI & 백엔드",
      period: "2025.02 - 진행 중",
      role: "초기 회원관련 기능, 배포, CrewAI 멀티에이전트 시스템 설계 및 구현",
      githubUrl: "https://github.com/Mminzy22/AInfo-Backend",
      demoUrl: "https://www.youtube.com/watch?v=Y2IPx5YfEuc&ab_channel=ainfo",
    },
    troubleshooting: [
      {
        id: 1,
        category: "DB",
        title: "load_data.py 실행 오류",
        content: `증상
        load_data.py 실행명령어가 실행되지 않음
        
        원인
        python vector_store/load_data.py 명령어를 사용 :
        vector_store/load_data.py를 독립적인 스크립트로 실행하기 때문에, vector_store는 단순한 폴더로 인식됨.
        - 현재 디렉토리(.)가 sys.path에 추가되지만, vector_store가 패키지로 인식되지 않음.
        - 만약 load_data.py에서 import config를 시도하면:
        - Python은 config.py가 sys.path에 있는지 확인하지만, 패키지 경로가 올바르게 설정되지 않아서 찾지 못함.
        - 따라서 "ModuleNotFoundError: No module named 'config'" 같은 오류 발생.
        
        해결방안
        python -m vector_store.load_data 명령어 사용 :
        - m 옵션을 사용하면 Python은 vector_store를 패키지로 인식하고 실행함.
        - 실행 전, Python은 vector_store가 속한 최상위 디렉토리(즉, vector_store의 부모 디렉토리)를 sys.path에 추가.
        - 이로 인해 vector_store 내의 다른 모듈(config, utils 등)을 올바르게 찾을 수 있음.
        - 따라서 import config가 문제없이 동작함.
        
        재발방지
        계속 python -m vector_store.load_data로 실행`,
        discoveryDate: "2025-03-06",
        resolutionDate: "2025-03-06",
      },
      {
        id: 2,
        category: "BE",
        title: "서비스로 실행한 Daphne가 끊기는 문제",
        content:
          `증상
          Nginx 의 reverse proxy 를 구현해 HTTP 요청과 WebSocket 연결을 각각 gunicorn과 Daphne로 연결하려고 했는데, Daphne 서버가 계속해서 끊기는 현상이 나타남.`,
        discoveryDate: "2025-03-12",
        resolutionDate: "2025-03-12",
        codeBlock: ``,
      },
    ],
}

export default project

