import type { Project } from "@/types/project"

const project: Project = {
  id: 1,
  slug: "ainfo",
  title: "AInfo",
  description: "개인 맞춤형 공공서비스 추천 AI 챗봇",
  longDescription:
    "이 프로젝트는 개인 맞춤형 공공서비스 추천 AI 챗봇입니다. Django Rest Framework(DRF)를 기반으로 API를 제공하며, AI 모델과 연동하여 실시간으로 사용자의 질의에 응답합니다. ChromaDB를 활용하여 대량의 데이터를 효율적으로 저장하고 검색할 수 있도록 설계되었습니다. Redis를 사용하여 세션 관리 및 캐싱을 통해 성능을 최적화했습니다. Celery를 통해 비동기 작업 처리를 구현하여 사용자 경험을 향상시켰습니다.",
  technologies: [
    "Python",
    "Django",
    "DRF",
    "PostgreSQL",
    "ChromaDB",
    "Django Channels",
    "Redis",
    "Celery",
    "LangChain",
    "CrewAI",
  ],
  features: {
    user: [
      "JWT 기반 로그인/회원가입[blog:https://mminzy22.github.io/posts/Project07/]",
      "이메일 인증 및 비밀번호 재설정[blog:https://mminzy22.github.io/posts/Project07/]",
      "소셜 로그인 (Google, Kakao)[blog:https://mminzy22.github.io/posts/Project07/]",
      "프로필 조회 및 수정[blog:https://mminzy22.github.io/posts/Project07/]",
      "회원 탈퇴[blog:https://mminzy22.github.io/posts/Project07/]",
    ],
    chatbot: [
      "LangChain + ChromaDB 기반 RAG 모델 연동",
      "Django Channels, Redis를 이용한 WebSocket 실시간 대화 지원",
      "개인화된 맞춤형 공공서비스 추천 기능",
      "대화 기록 저장 및 조회 기능",
      "대화 흐름 기억",
      "부족한 정보 → 웹검색",
      "보고서 작성[blog:https://mminzy22.github.io/posts/Project17/]",
    ],
    "공공 데이터 연동": [
      "정부 API(고용24, 정부24, 온통청년) 활용",
      "K스타트업 안내책자 pdf 활용",
      "주기적 데이터 로드",
    ],
    메일: ["회원가입 시 본인인증을 위한 메일 발송", "비밀번호 재설정 메일 발송", "전체유저 대상 공지메일 발송"],
    결제: ["KG 이니시스 PG 사 연동", "결제 관련정보 DB 관리"],
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
      content: `# 증상

\`load_data.py\` 실행명령어가 실행되지 않음

# 원인

\`python vector_store/load_data.py\` 명령어를 사용 : 

- \`vector_store/load_data.py\`를 독립적인 스크립트로 실행하기 때문에, \`vector_store\`는 단순한 폴더로 인식됨.
- 현재 디렉토리(\`.\`)가 \`sys.path\`에 추가되지만, \`vector_store\`가 패키지로 인식되지 않음.
- 만약 \`load_data.py\`에서 \`import config\`를 시도하면:
    - Python은 \`config.py\`가 \`sys.path\`에 있는지 확인하지만, 패키지 경로가 올바르게 설정되지 않아서 찾지 못함.
    - 따라서 \`"ModuleNotFoundError: No module named 'config'"\` 같은 오류 발생.

# 해결방안

python -m vector_store.load_data 명령어 사용 : 

- \`m\` 옵션을 사용하면 Python은 \`vector_store\`를 패키지로 인식하고 실행함.
- 실행 전, Python은 \`vector_store\`가 속한 최상위 디렉토리(즉, \`vector_store\`의 부모 디렉토리)를 \`sys.path\`에 추가.
- 이로 인해 \`vector_store\` 내의 다른 모듈(\`config\`, \`utils\` 등)을 올바르게 찾을 수 있음.
- 따라서 \`import config\`가 문제없이 동작함.

# 재발방지

계속 \`python -m vector_store.load_data\`로 실행
`,
      discoveryDate: "2025-03-06",
      resolutionDate: "2025-03-06",
    },
    {
      id: 2,
      category: "BE",
      title: "서비스로 실행한 Daphne가 끊기는 문제",
      content: `# 증상

Nginx 의 reverse proxy 를 구현해 HTTP 요청과 WebSocket 연결을 각각 gunicorn과 Daphne로 연결하려고 했는데, Daphne 서버가 계속해서 끊기는 현상이 나타남.

\`\`\`bash
daphne.service - Daphne ASGI Server for Django Channels
     Loaded: loaded (/etc/systemd/system/daphne.service; disabled; vendor preset: enabled)
     Active: failed (Result: exit-code) since Wed 2025-03-12 05:56:29 UTC; 2min 17s ago
    Process: 7647 ExecStart=/home/ubuntu/AInfo-Backend/venv/bin/daphne -b 127.0.0.1 -p 9000 config.asgi:application (code=exited, status=1/FAILURE)
   Main PID: 7647 (code=exited, status=1/FAILURE)
        CPU: 593ms

Mar 12 05:56:28 ip-172-31-38-254 systemd[1]: daphne.service: Failed with result 'exit-code'.
Mar 12 05:56:29 ip-172-31-38-254 systemd[1]: daphne.service: Scheduled restart job, restart counter is at 5.
Mar 12 05:56:29 ip-172-31-38-254 systemd[1]: Stopped Daphne ASGI Server for Django Channels.
Mar 12 05:56:29 ip-172-31-38-254 systemd[1]: daphne.service: Start request repeated too quickly.
Mar 12 05:56:29 ip-172-31-38-254 systemd[1]: daphne.service: Failed with result 'exit-code'.
Mar 12 05:56:29 ip-172-31-38-254 systemd[1]: Failed to start Daphne ASGI Server for Django Channels.
\`\`\`

# 원인

- Django가 실핼되기 전에 [\`asgi.py\`](http://asgi.py) 의 \`get_asgi_application()\`  를 불러오려고 하면서 오류가 생기고 daphne가 꺼지는 현상이 나타남

# 해결방안

변경 전

\`\`\`python
import os

from channels.routing import ProtocolTypeRouter, URLRouter  # noqa: E402
from django.core.asgi import get_asgi_application  # noqa: E402

from chatbot.middleware import JWTAuthMiddleware  # noqa: E402
from chatbot.routing import websocket_urlpatterns  # noqa: E402

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")  # noqa: E402

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddleware(URLRouter(websocket_urlpatterns)),
    }
)

\`\`\`

변경 후

\`\`\`python
import os

import django  # noqa: E402

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")  # noqa: E402
django.setup()  # noqa: E402

from channels.routing import ProtocolTypeRouter, URLRouter  # noqa: E402
from django.core.asgi import get_asgi_application  # noqa: E402

from chatbot.middleware import JWTAuthMiddleware  # noqa: E402
from chatbot.routing import websocket_urlpatterns  # noqa: E402

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddleware(URLRouter(websocket_urlpatterns)),
    }
)
\`\`\`

- Django 의 \`get_asgi_application()\` 를 불러오기 전 \`django.setup()\` 을 통해서, django 환경을 설정하고 초기화를 먼저 하도록 작성

# 재발방지

- 재발방지보다는 더 깔끔한 방법을 찾아보자…`,
      discoveryDate: "2025-03-12",
      resolutionDate: "2025-03-12",
    },
    {
      id: 4,
      category: "BE",
      title: `메일발송 요청시 처리시간이 너무 김`,
      content: `# 증상

이메일을 통한 본인인증을 하기위해

회원가입시 메일을 보내는 기능을 구현함

→ 요청을 보내보니 시간이 너무 오래걸림

![image.png](/images/projects/project1/trouble01.png)

# 원인

대략적으로 오래걸리는 이유를 보면

- 메일 서버와 통신
    - \`SMTP\`서버와 통신이 필요한데 네트워크 대기시간, 서버의 응답시간 등으로 지연됨
- 메일 큐에 쌓이는 대기 시간
    - 메일전송이 대기 큐에 들어가서, 서버에서 순차적으로 처리하기때문에 전송 속도가 지연됨
- 메시지 내용 생성
    - 이메일 내용에 첨부파일 혹은 \`HTML\` 로 복잡한 템플릿을 사용하는 경우, 처리하기위한 과정에서 시간지연 발생

등등 여러가지가 있을 수 있다

내가알아본 대표적인 이유 3가지중에서 1,2 번째는 당장에 하긴 어렵다

\`SMTP\` 서버를 만드는것보다 \`gmail\` 를 이용하는게 훨씬 수월해서 

3번 메시지내용을 불필요한거 다빼고빼서 줄여보았는데도

여전히 느림

# 해결방안

그래서 

비동기처리하기위해 \`Celery\` 를 도입하기로 함

셀러리 적용후

![image.png](/images/projects/project1/trouble02.png)

# 재발방지

비동기 처리로 돌려서 재발은 안할것같음

그런데 Celery 도입하고도 이 셀러리를 어떻게 사용하냐 따라서 시간을 더 단축시킬수도 있을것 같음

당장 생각나는건

가장 쉬운건 작업자체를 가볍게 만드는건데 그건 불가능

그렇다면 셀러리를 사용하면 왜 빨라질까?

백그라운드에서 워커가 대신처리하기때문에 해당 작업은 그대로 오래걸리는것으로 보임

![image.png](/images/projects/project1/trouble03.png)

사용자의 요청을 빠르게처리하기위해 눈속임으로 빨라진거로만 보이지

백그라운드에선 워커가 여전히 오래걸리는일을 처리하고있는거임

그렇다면 작업자체를 아무리가볍게해도 시간이 더안줄어들면

셀러리랑 워커 관련설정을 건드리면 더 빨라지지 않을까?

다음 트러블슈팅에서 나오지만 윈도우환경에서 멀티프로세싱 관련 에러가나와서

프로세스 풀을 조정할수 있다는걸 알게됨

현재는 윈도우환경이라 단일프로세스로 처리하지만

\`celery -A config worker --loglevel=info --concurrency=4\`

이런식으로 일꾼을 늘려주면 일을 더 빨리하지 않을까? → 워커 수 증가

혹은 추후에 로드밸런싱도 생각중이라면

아직 정확한 개념은 모르지만 여러대의 서버를 두고 작업을 분산시키는 것으로만 아는데

워커도 여러대의 서버에 분산시켜두고 서버가 작업을 균등하게 분배해서 처리할수있게하면 더 빨라질것으로 기대 됨`,
      discoveryDate: "2025-03-18",
      resolutionDate: "2025-03-19",
    },
  ],
}

export default project
