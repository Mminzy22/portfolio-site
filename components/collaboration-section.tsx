export default function CollaborationSection() {
    const collaborationLinks = {
      branch: "https://github.com/next-engineer/next-kickytime-server/wiki/%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5",
      commit: "https://github.com/next-engineer/next-kickytime-server/wiki/%EC%BB%A4%EB%B0%8B-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B7%9C%EC%B9%99",
      quality: "https://github.com/next-engineer/next-kickytime-server/wiki/%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%9E%90%EB%8F%99%ED%99%94-%EC%84%A4%EC%A0%95",
      process: "https://mminzy22.github.io/posts/Project19/",
    }
  
    return (
      <section className="w-full py-12 md:py-24 lg:py-32" id="collaboration">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">협업 경험</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                팀 프로젝트에서 적용한 협업 문화와 개발 프로세스입니다.
              </p>
            </div>
          </div>
  
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Collaboration Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Branch Strategy */}
              <a
                href={collaborationLinks.branch}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 cursor-pointer border border-blue-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">
                    브랜치 전략
                  </h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-medium text-blue-800 dark:text-blue-200">GitLab Flow 기반 구조</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md text-xs font-mono border">
                        main
                      </code>
                      <span className="ml-2 text-xs">: 운영 환경 배포용</span>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md text-xs font-mono border">
                        develop
                      </code>
                      <span className="ml-2 text-xs">: 개발 통합 브랜치</span>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md text-xs font-mono border">
                        feature/*
                      </code>
                      <span className="ml-2 text-xs">: 기능별 브랜치</span>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md text-xs font-mono border">
                        hotfix/*
                      </code>
                      <span className="ml-2 text-xs">: 긴급 수정 브랜치</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                    보호 브랜치 설정으로 직접 푸시 금지, PR 리뷰 필수
                  </p>
                </div>
              </a>
  
              {/* Commit Rules */}
              <a
                href={collaborationLinks.commit}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 cursor-pointer border border-green-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-green-900 dark:text-green-100 group-hover:text-green-700 dark:group-hover:text-green-200 transition-colors">
                    커밋 메시지 규칙
                  </h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-medium text-green-800 dark:text-green-200">Conventional Commits + Gitmoji</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono border">✨ feat: 새로운 기능</code>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono border">🐛 fix: 버그 수정</code>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono border">
                      ♻️ refactor: 구조 개선
                      </code>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono border">📄 docs: 문서 변경</code>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                    하나의 커밋 = 하나의 논리적 변경 원칙
                  </p>
                </div>
              </a>
  
              {/* Code Quality */}
              <a
                href={collaborationLinks.quality}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 cursor-pointer border border-purple-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-purple-900 dark:text-purple-100 group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors">
                    코드 품질 자동화
                  </h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <p className="font-medium text-purple-800 dark:text-purple-200 mb-2">Frontend (React + TS)</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border">Prettier</span>
                      <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border">ESLint</span>
                      <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border">Husky</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-purple-800 dark:text-purple-200 mb-2">Backend (Spring Boot + Java)</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border">Spotless</span>
                      <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border">Checkstyle</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                    Git Hooks + CI/CD로 일관된 품질 보장
                  </p>
                </div>
              </a>
  
              {/* Process Management */}
              <a
                href={collaborationLinks.process}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 cursor-pointer border border-orange-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-orange-900 dark:text-orange-100 group-hover:text-orange-700 dark:group-hover:text-orange-200 transition-colors">
                    프로세스 관리
                  </h4>
                </div>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <p className="font-medium text-orange-800 dark:text-orange-200 mb-2">버전 관리</p>
                    <p className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border inline-block">
                      Semantic Versioning
                    </p>
                    <p className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded border inline-block">
                      (vMAJOR.MINOR.PATCH)
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-orange-800 dark:text-orange-200 mb-2">이슈 & PR 템플릿</p>
                    <div className="space-y-1 text-xs">
                      <p>• 기능 요청, 버그 리포트, 문서 변경</p>
                      <p>• 체계적인 양식으로 누락 방지</p>
                      <p>• 최소 1명 리뷰 승인 후 병합</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
  
            {/* Key Results */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 mt-8">
              <h4 className="text-xl font-semibold mb-4 dark:text-white">협업 성과</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                  <div className="text-gray-600 dark:text-gray-300">코드 리뷰 적용률</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">0건</div>
                  <div className="text-gray-600 dark:text-gray-300">브랜치 충돌 발생</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2개</div>
                  <div className="text-gray-600 dark:text-gray-300">프로젝트 적용</div>
                </div>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
                체계적인 협업 문화로 단기 프로젝트에서도 실무 수준의 개발 경험 달성
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  