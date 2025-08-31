import type { Project } from "@/types/project"

const project: Project = {
  id: 3,
  slug: "kickytime",
  title: "Kickytime",
  description: "풋살 매칭 플랫폼",
  longDescription: "풋살 매칭 서비스로, Spring Boot 기반 백엔드와 React 프론트엔드를 AWS 클라우드 환경에 배포했습니다. 멀티 AZ VPC-ALB-ECS/EC2-RDS 3티어 아키텍처를 설계하고, AWS Cognito로 인증을 처리하며, GitHub Actions→ECR→ECS/EC2로 이어지는 CI/CD 파이프라인을 구축했습니다. 프론트엔드는 S3+CloudFront로 정적 호스팅하고, 백엔드는 ECS Fargate와 EC2를 혼용하여 운영합니다.",
  technologies: [
    "Java",
    "Spring Boot",
    "AWS EC2",
    "AWS S3",
    "AWS RDS",
    "AWS CloudFront",
    "AWS Route 53",
    "AWS ECS",
    "Docker",
    "GitHub Actions",
  ],
  features: {
    "인증 시스템": [
      "AWS Cognito Hosted UI로 회원가입/로그인[blog:https://mminzy22.github.io/posts/Project20/]",
      "OAuth2 Authorization Code with PKCE",
      "JWT 기반 Spring Security Resource Server",
      "자동 사용자 정보 동기화(upsert)"
    ],
    "백엔드 API": [
      "Spring Boot 3.5.4 기반 REST API[blog:https://mminzy22.github.io/posts/Project18/]",
      "풋살 매칭 CRUD 및 참여/취소 기능",
      "관리자 전용 경기 개설/삭제",
      "중복 참여 방지 및 정원 제한 검증"
    ],
    "프론트엔드": [
      "React + TypeScript + Vite",
      "Zustand 상태 관리",
      "Axios 인터셉터로 인증 토큰 자동 처리",
      "반응형 UI 및 사용자 친화적 인터페이스"
    ],
    "클라우드 인프라": [
      "멀티 AZ VPC 아키텍처[blog:https://mminzy22.github.io/posts/Project21/]",
      "프라이빗 서브넷의 ECS/EC2 + RDS",
      "퍼블릭 서브넷의 ALB + NAT Gateway",
      "VPC 엔드포인트로 AWS 서비스 접근 최적화"
    ],
    "CI/CD 파이프라인": [
      "GitHub Actions 기반 자동화[blog:https://mminzy22.github.io/posts/Project22/]",
      "OIDC로 AWS 자격 증명 관리",
      "ECR 멀티 아키텍처 이미지 빌드(amd64/arm64)",
      "ECS Blue/Green 배포 및 EC2 롤링 배포",
      "S3+CloudFront 프론트엔드 자동 배포"
    ],
    "보안 및 운영": [
      "IAM 최소 권한 원칙 적용[blog:https://mminzy22.github.io/posts/Project21/]",
      "KMS 암호화 및 Secrets Manager",
      "보안 그룹 기반 네트워크 격리",
      "SSM Session Manager로 서버 접근",
      "CloudWatch 로깅 및 모니터링"
    ]
  },
  image: "/images/projects/project3/kickytime_main.png",
  gallery: [
    "/images/projects/project3/kickytime_architecture.png",
    "/images/projects/project3/kickytime_sing-up.png",
    "/images/projects/project3/kickytime_all_match.png",
    "/images/projects/project3/kickytime_my.png"
  ],
  projectInfo: {
    type: "Backend & DevOps",
    period: "2025.08.01 - 2025.08.17",
    role: "팀장, 백엔드 개발, 클라우드 인프라 설계·구축, CI/CD 파이프라인 구축",
    githubUrl: "https://github.com/next-engineer/next-kickytime-server",
  },
  troubleshooting: [
    {
      id: 1,
      category: "DEV",
      title: ".gitignore의 *.jar 규칙으로 gradle-wrapper.jar 미추적 → pre-commit/commit-msg 실패",
      content: `
      ### 배경

프로젝트에 Husky(허스키) 기반 pre-commit(프리-커밋) / commit-msg(커밋-메시지) 훅을 적용한 뒤, 첫 커밋 시 훅 실행 과정에서 오류가 발생했습니다. 클론으로 참여한 개발자 환경에서 재현되었습니다.


### 상세 설명

Spotless 실행 단계에서 Gradle Wrapper JAR이 없어 \`./gradlew\` 실행이 실패하며 훅이 종료됩니다.
원인은 \`.gitignore\`에 있는 \`*.jar\` 규칙이 하단에 선언된 \`!gradle-wrapper.jar\` 예외 규칙보다 우선 적용(덮어쓰기)되어,
레포 최초 업로드 시 \`gradle/wrapper/gradle-wrapper.jar\` 파일이 추적되지 않고 누락된 것입니다.


### 재현 방법

1. 레포를 클론한다.
2. 아무 파일 수정 후 스테이지한다.
3. git commit을 수행한다.
4. pre-commit 훅에서 Spotless 실행 시 아래 오류가 발생한다.


### 예상했던 동작

- pre-commit 훅에서 ./gradlew spotlessCheck가 정상 실행되어 포맷/린트 검증 통과
- commit-msg 훅에서 커밋 메시지 검사가 정상 진행


### 스크린샷/로그

\`\`\`bash
git -c diff.mnemonicprefix=false -c core.quotepath=false --no-optional-locks commit -q -F C:\Users\aw702\AppData\Local\Temp\yrsm43rw.ubw
🩷 Running Spotless...
Error: Unable to access jarfile D:/Temp/Git/01_next-kickytime-server/gradle/wrapper/gradle-wrapper.jar
husky - pre-commit hook exited with code 1 (error)
오류가 나면서 완료됨.
\`\`\`


### 해야할 일

- [x] 원인 분석
- [x] 코드 수정
- [x] 테스트 작성 및 실행

### 완료 조건

- .gitignore에서 \`*.jar\` 규칙을 상단으로 올리고, 그 아래에 \`!gradle-wrapper.jar\` 예외 규칙을 명시하여 \`gradle-wrapper.jar\`가 항상 추적됨
- 누락되었던 \`gradle/wrapper/gradle-wrapper.jar\`가 레포에 포함되어 클론 직후 \`./gradlew\`가 정상 동작
- pre-commit 및 commit-msg 훅이 클린 환경에서도 연속 2회 이상 정상 실행(Spotless/commitlint 통과)


### 참고 자료

- 권장 점검 항목:
  - gradle/wrapper/gradle-wrapper.jar 존재 여부
  - gradle/wrapper/gradle-wrapper.properties 존재 여부
  - .husky/pre-commit에서 ./gradlew 호출 경로 정상 여부

### 관련 이슈 번호

#4
      `,
      discoveryDate: "2025-08-09",
      resolutionDate: "2025-08-09",
    }
  ]
}

export default project