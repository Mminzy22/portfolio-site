import { ClipboardList, GitBranch, MessageSquareText, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// 카드 본문은 블록 단위로 구성합니다
export type CollabBlock =
  | { type: "branches"; items: { name: string; desc: string }[] }
  | { type: "codes"; items: string[] }
  | { type: "tags"; label: string; items: string[] }
  | { type: "list"; label: string; items: string[] }

export interface CollabCardData {
  icon: LucideIcon
  title: string
  subtitle: string
  href: string
  note?: string
  blocks: CollabBlock[]
}

const wiki = "https://github.com/next-engineer/next-kickytime-server/wiki"

export const collaborationCards: CollabCardData[] = [
  {
    icon: GitBranch,
    title: "브랜치 전략",
    subtitle: "Git Flow 기반 구조",
    href: `${wiki}/%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5`,
    note: "보호 브랜치 설정으로 직접 푸시 금지, PR 리뷰 필수",
    blocks: [
      {
        type: "branches",
        items: [
          { name: "main", desc: "운영 환경 배포용" },
          { name: "develop", desc: "개발 통합 브랜치" },
          { name: "feature/*", desc: "기능별 브랜치" },
          { name: "hotfix/*", desc: "긴급 수정 브랜치" },
        ],
      },
    ],
  },
  {
    icon: MessageSquareText,
    title: "커밋 메시지 규칙",
    subtitle: "Conventional Commits + Gitmoji",
    href: `${wiki}/%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B7%9C%EC%B9%99`,
    note: "하나의 커밋 = 하나의 논리적 변경 원칙",
    blocks: [
      {
        type: "codes",
        items: ["✨ feat: 새로운 기능", "🐛 fix: 버그 수정", "♻️ refactor: 구조 개선", "📄 docs: 문서 변경"],
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "코드 품질 자동화",
    subtitle: "Frontend & Backend 품질 규칙",
    href: `${wiki}/%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%9E%90%EB%8F%99%ED%99%94-%EC%84%A4%EC%A0%95`,
    note: "Git Hooks + CI/CD로 일관된 품질 보장",
    blocks: [
      { type: "tags", label: "Frontend (React + TS)", items: ["Prettier", "ESLint", "Husky"] },
      { type: "tags", label: "Backend (Spring Boot + Java)", items: ["Spotless", "Checkstyle"] },
    ],
  },
  {
    icon: ClipboardList,
    title: "프로세스 관리",
    subtitle: "이슈 · PR · 버전 관리",
    href: "https://mminzy22.github.io/posts/Project19/",
    blocks: [
      { type: "tags", label: "버전 관리", items: ["Semantic Versioning", "vMAJOR.MINOR.PATCH"] },
      {
        type: "list",
        label: "이슈 & PR 템플릿",
        items: ["기능 요청, 버그 리포트, 문서 변경", "체계적인 양식으로 누락 방지", "최소 1명 리뷰 승인 후 병합"],
      },
    ],
  },
]

export const collaborationResults: { value: number; suffix: string; label: string }[] = [
  { value: 100, suffix: "%", label: "코드 리뷰 적용률" },
  { value: 0, suffix: "건", label: "브랜치 충돌 발생" },
  { value: 2, suffix: "개", label: "프로젝트 적용" },
]

export const collaborationResultNote = "체계적인 협업 문화로 단기 프로젝트에서도 실무 수준의 개발 경험 달성"
