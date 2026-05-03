# 박민지 - Portfolio Site

이 포트폴리오 사이트는 Vercel에서 제공하는 템플릿(v0)을 기반으로 제작되었으며,  
백엔드 및 AI 개발자로서의 프로젝트와 이력을 소개하기 위한 목적으로 구성되었습니다.

🔗 **Portfolio Site**: [https://portfolio-site-eight-zeta.vercel.app/](https://portfolio-site-eight-zeta.vercel.app/)  
📘 **기술 블로그**: [https://mminzy22.github.io](https://mminzy22.github.io/)

## 📌 주요 구성

- 소개 (About Me)
- 참여 프로젝트 (Projects)
- 협업 경험 (Collaboration)
- 기술 스택 (Stack)
- 연락처 (Contact)

---

## 🛠 제작 히스토리

### v1 — v0.dev 기반 초기 버전

[v0.dev](https://v0.dev) 템플릿을 바탕으로 콘텐츠와 구성을 개인 포트폴리오 용도로 커스터마이징하여 제작했습니다.

### v2 — Claude Code 기반 디자인 리뉴얼

두 번째 버전은 [Claude Code](https://claude.com/claude-code)를 활용해 디자인 시스템과 인터랙션을 전면 개편했습니다.

**주요 변경**

- **Hero 인터랙티브 파티클** — Three.js 기반 fibonacci 분포 구체(2200개)가 마우스 움직임에 반응해 산란/복귀
- **커서 스포트라이트 + 스크롤 진행 바** — 커서를 따라가는 발광 효과와 상단 스크롤 인디케이터
- **테마 시스템 강화** — 딥 네이비 다크 / 라이트 그레이 팔레트, `--pf-*` 디자인 토큰 도입
- **타이포그래피** — Inter + JetBrains Mono 조합, 모노폰트 라벨 + 큰 디스플레이 헤딩
- **섹션 재구성** — About / Projects / Collaboration / Skills / Contact 모두 새 디자인 시스템으로 갱신
- **카운터 애니메이션** — IntersectionObserver 기반, About "By the numbers"와 협업 성과 통계에 적용
- **Next.js 15.5.2 → 16.2.4 업그레이드** — CVE-2025-66478 (React Server Components RCE) 패치 적용
