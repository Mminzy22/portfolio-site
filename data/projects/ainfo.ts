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
      "이메일 인증 및 비밀번호 재설정",
      "소셜 로그인 (Google, Kakao)",
      "프로필 조회 및 수정",
      "회원 탈퇴",
    ],
    chatbot: [
      "LangChain + ChromaDB 기반 RAG 모델 연동[blog:https://mminzy22.github.io/posts/Project15/]",
      "Django Channels, Redis를 이용한 WebSocket 실시간 대화 지원[blog:https://mminzy22.github.io/posts/Project12/]",
      "개인화된 맞춤형 공공서비스 추천 기능",
      "대화 기록 저장 및 조회 기능[blog:https://mminzy22.github.io/posts/Project13/]",
      "대화 흐름 기억[blog:https://mminzy22.github.io/posts/Project14/]",
      "부족한 정보 → 웹검색",
      "보고서 작성[blog:https://mminzy22.github.io/posts/Project17/]",
    ],
    "공공 데이터 연동": [
      "정부 API(고용24, 정부24, 온통청년) 활용[blog:https://mminzy22.github.io/posts/Project15/]",
      "K스타트업 안내책자 pdf 활용",
      "주기적 데이터 로드[blog:https://mminzy22.github.io/posts/Project08/]",
    ],
    메일: ["회원가입 시 본인인증을 위한 메일 발송", "비밀번호 재설정 메일 발송", "전체유저 대상 공지메일 발송[blog:https://mminzy22.github.io/posts/Project10/]"],
    결제: ["KG 이니시스 PG 사 연동[blog:https://mminzy22.github.io/posts/Project11/]", "결제 관련정보 DB 관리"],
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
      category: "FE",
      title: `프로필 수정 후 페이지 이동 오류`,
      content: `
	  # 증상

- 프로필 수정 후 **"저장"** 버튼을 눌러도 \`profile.html\`로 이동하지 않고, 현재 페이지에 머무름.

# 원인

1. \`profile_edit.js\`에서 \`window.location.href = "profile.html";\` 코드가 실행되지 않음.
2. AJAX 요청이 성공적으로 처리되었으나, 응답을 받은 후 \`setTimeout()\` 또는 이벤트 리스너 문제로 페이지 이동이 동작하지 않을 가능성이 있음.
3. 브라우저 캐싱 또는 JavaScript 오류 가능성 있음.

# 해결방안

- \`profile_edit.js\` 내 \`messageContainer\`가 정의되지 않아 \`showMessage()\` 호출 시 내부 오류 발생 → 이후 코드가 실행되지 않음.
- \`messageContainer\` 변수를 \`showMessage()\` 내부에서 새로 정의하여 오류 해결.
- 또한 \`showMessage()\` 대신 \`alert()\`으로 변경하여 사용자에게 즉시 메시지를 보여주고, 이후 \`window.location.href\`가 정상 동작하는지 테스트.
- \`setTimeout()\` 지연 시간도 1500ms → 500ms로 조정하여 UX 개선 시도.
- \`console.log()\` 및 \`try-catch\`를 통해 흐름을 추적하면서 정확한 원인을 확인함.

# 재발방지

- \`showMessage()\`와 같이 DOM 요소를 사용하는 함수에서는 해당 요소가 **항상 정의되어 있는지** 확인하고, 초기화 위치를 명확히 할 것.
- 오류 발생 시 전체 흐름이 중단되지 않도록 \`try-catch\` 구문을 적극적으로 사용.
- 주요 동작(페이지 이동 등) 이후에 로그(\`console.log\`)를 삽입하여 디버깅 시 흐름 확인을 용이하게 함.
- QA 테스트 시, **버튼 클릭 후 기대 동작이 수행되는지까지 포함한 플로우 테스트**를 반드시 수행할 것.
`,
      discoveryDate: "2025-03-05",
      resolutionDate: "2025-03-05",
    },
    {
      id: 3,
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
      category: "Dep",
      title: `우분투 서버에서 daphne, gunicorn 서버 서버스 설정 후 서비스 실행이 안되는 문제`,
      content: `
	  # 증상

daphne, gunicorn 서버의 서비스 설정 후 실행했는데, status로 확인하면 정상적을 실행되지 않았음.

\`\`\`python
sudo systemctl start gunicorn && sudo systemctl start daphne
\`\`\`

\`\`\`python
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

- 우분투의 systemd는 서비스 유닛 파일들을 \`/etc/systemd/system/\`경로에서 읽어들이며, 이를 **메모리에 캐싱해둠**
- 새로운 \`.service\` 파일을 추가하거나 기존 파일을 수정한 후, \`sudo systemctl daemon-reload\` 명령을 실행하지 않으면, 캐싱되어있는 메모리에는 변화가 없어서 새로 설정한 **서비스가 반영되지 않음.**

# 해결방안

- 서비스 파일 작성 후, 아래 명령어를 실행하여 systemd에 변경 사항을 반영해줌

\`\`\`python
sudo systemctl daemon-reload
\`\`\`

- 이후에 정상적으로 서비스 실행

\`\`\`python
sudo systemctl start gunicorn && sudo systemctl start daphne
\`\`\`

# 재발방지

- 서비스 설정 후에 변동사항 반영해주기
`,
      discoveryDate: "2025-03-12",
      resolutionDate: "2025-03-12",
    },
    {
      id: 5,
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
    {
      id: 6,
      category: "BE",
      title: `celery 사용시 브로커 연결 문제`,
      content: `# 증상

레디스, 샐러리 워커 를 실행함

\`\`\`bash
redis-server
celery -A config worker --loglevel=info
\`\`\`

샐러리를 통해 비동기처리해야하는 요청을 보내니

아래와같은 에러가 나타남

![image.png](/images/projects/project1/trouble06.png)

브로커 서버에 접근할수 없다는 에러인데

현재 우리는 브로커서버로 redis 를 사용중이다

관련설정은 settings 에서 아래와같이 해둔 상태이다

\`\`\`python
# CELERY 관련설정 --> Redis 를 브로커로 설정
CELERY_BROKER_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}/0'
CELERY_RESULT_BACKEND = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
# 메시지 직렬화 방식 설정
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
\`\`\`

그리고 워커를 실행해보니

![image.png](/images/projects/project1/trouble06-2.png)

transport 부분을보면 \`redis://127.0.0.1:6379/0\` 로 연결이 잘된걸 볼수있다

에러메시지를 보고 예상 , 구글링, 지피티 등 예상가는 이유를 적어보자면

1. \`WinError 10061.\` 발생 원인 : \`ConnectionRefusedError\`로, 서버에 제대로 연결하지 못하였을 때 발생한다. 해결 방법 : **주로 서버의 ip주소나 port번호가 잘못 입력된 경우 또는 서버를 실행시키지 않은 경우 발생**한다.
어떤사람이 블로그에 써둔글이있길래 따라해보기로함 → 근데이거 좀 아닌거같음
같은 ide 에서 실행한다하면 안된다고 해서 redis 는 도커, 워커실행은 깃배시에서, runserver 는 vs코드에서 나눠서도 해봤다 → 실패 → 네트워크환경이 다르니 당연한가
2. 레디스 연결이 안되었나? → 웹소켓도 쓰는데 챗봇은 정상작동함
3. 자꾸 레디스문제라고 포트번호랑 호스트 바꿔보라길래 아래있는거 다해봄 → 안됨
    - f'redis://{REDIS_HOST}:{REDIS_PORT}/0'
    - f'redis://localhost:6379/0'
    - f"redis://{REDIS_HOST}:6379/0"
    - f'redis://localhost:{REDIS_PORT}/0'
    - f"redis://host.docker.internal:6379/0"
    
    \`\`\`python
    # CELERY 관련설정 --> Redis 를 브로커로 설정
    CELERY_BROKER_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}/0'
    # CELERY_BROKER_URL = f'redis://{REDIS_HOST}:6379/0'
    # CELERY_BROKER_URL = f'redis://localhost:{REDIS_PORT}/0'
    CELERY_RESULT_BACKEND = f"redis://localhost:6379/0"
    CELERY_BROKER_URL = f"redis://host.docker.internal:6379/0"
    \`\`\`
    
    내가 관련설정을 잘못했나?? 싶어서 의심가는거 다해봄 → 안됨
    

# 원인

샐러리 워커를 실행할때 프로세스 

\`\`\`python
celery -A config worker --loglevel=info
\`\`\`

이런식으로 실행을 했음

해당명령어의 의미는

- \`celery\`: \`Celery\` 를 쓰겟다는 기본 명령어
- \`-A config\` : \`-A\` 는 \`Celery\` 애플리케이션을 지정하는 옵션이고, \`config\` 는 \`Celery\` 애플리케이션이 정의된 모듈 → 우리 프로젝트이름이 \`config\` 이고 그안에 \`celery.py\` 를 정의해놔서 \`config\`
- \`woker\` : Celery 의 작업자를 시작하라는 명령
- \`--loglevel=info\` : 로그보기위해 넣어둔거

인데 알아보니까 Celery 의 프로세스 풀을 설정할수 있었음

윈도우 환경에서 안된다는 말이 있길래 관련해서 찾아보니

Celery 는 기본적으로 멀티프로세싱을 사용하여 작업을 병렬로 처리

그러나 윈도우 환경에서 멀티프로세싱은 자식프로세스를 생성하는 방식에서 문제를 일으킬 수 있음

그래서 프로세스 풀을 설정할수있으니 단일프로세스로 작업을 해서 이게 정상작동하면

→ 윈도우 환경이라 멀티프로세스 에서 문제가생겨 정상작동을 안하는거다

라고 예상할수있음

명령어 중에 \`—-pool=solo\` 라는 옵션이 있음 

\`\`\`python
celery -A config worker --loglevel=info --pool=solo
\`\`\`

이 명령어로하니 정상작동함

\`--pool=solo\`   :  이 명령어는 프로세스 풀을 솔로로 설정해 단일프로세스로 작업을 강제하는 옵션

# 해결방안

일단 로컬에서 테스트하면서 개발해야하니 윈도우환경에선

\`\`\`python
celery -A config worker --loglevel=info --pool=solo
\`\`\`

해당 명령어로 테스트,

그후 배포환경은 리눅스환경이라 정상작동 할 것으로 기대

# 재발방지

OS 환경에 따른 멀티프로세스 처리 방식에 의한 문제여서

재발할것은 없을것같음

이와비슷하게 운영체제로 인한 버그도 빈번하다고하니 이것저것 찾아보다가 안되면

“아! 내가 윈도우라 그런건가?”

이걸 항상 염두에 두고 개발해야겠다
`,
      discoveryDate: "2025-03-18",
      resolutionDate: "2025-03-19",
    },
    {
      id: 7,
      category: "BE",
      title: `데이터베이스 연결 문제 (Async-DB sync)`,
      content: `
	  # 증상

WebSocket 연결 중 특정 채팅방에 접근하려고 할 때, 서버에서 예외가 발생하며 WebSocket 연결이 비정상적으로 종료됨. 서버 로그에 \`DoesNotExist\` 예외나 내부 서버 오류(500)가 출력됨.

# 원인

\`@database_sync_to_async\`로 래핑된 메서드(\`get_chatroom\`, \`get_user\` 등) 내부에서 \`.get()\`을 사용할 때, 해당 객체가 존재하지 않으면 \`DoesNotExist\` 예외가 발생함.

하지만 이 예외를 try/except로 처리하지 않으면 비동기 컨텍스트 상에서 예외가 전파되어 consumer 전체가 crash될 수 있음. Django의 일반 view에서는 잘 처리되는 예외지만, async 환경에서는 명시적으로 잡아줘야 함.

# 해결방안

모든 \`@database_sync_to_async\` 함수 내부에서 \`.get()\` 사용 시 \`try/except\`로 \`DoesNotExist\`를 명확히 처리하도록 수정. 예:

\`\`\`python
@database_sync_to_async
def get_chatroom(self, room_id):
    try:
        return ChatRoom.objects.get(id=room_id, user_id=self.user_id)
    except ChatRoom.DoesNotExist:
        return None

\`\`\`

또한 \`receive()\`나 \`connect()\` 같은 핵심 로직에서도 반환값이 None일 경우 명확하게 \`await self.close()\` 등의 처리를 해주는 것이 중요함.

# 재발방지

1. 비동기 컨텍스트에서 ORM 접근 시 \`.get()\`은 반드시 try/except로 감쌀 것
2. 모든 \`@database_sync_to_async\` 함수에 대해 테스트 작성 시, 존재하지 않는 데이터에 접근하는 케이스 포함
3. consumer의 \`connect\`, \`receive\` 등 주요 메서드에서 \`None\` 체크를 강제하고, \`None\`이면 로그를 남기고 종료하도록 공통 처리 로직을 도입
`,
      discoveryDate: "2025-03-18",
      resolutionDate: "2025-03-18",
    },
    {
      id: 8,
      category: "DB",
      title: `고용24 API 경로 + 파싱 문제`,
      content: `
	  # 증상

- 고용24 API 호출 시 응답 XML 내 \`<total>50</total>\` 존재
- 그러나 로더 코드에서 **\`총 프로그램 수: 0\`** 으로 인식되어 **수집 건수가 0건**으로 출력됨

# 원인

XML 트리 파싱 로직 오류로 인해 데이터 파싱 실패

- \`root.find(".//total")\` 경로가 잘못되어 \`<total>\` 값을 제대로 가져오지 못함
- XML 구조 상 루트 바로 하위에 있는 \`<total>\` 태그를 잘못 탐색
- 잘못된 항목 파싱 (\`item\` 사용)으로 프로그램 목록도 파싱 실패

처음에 오늘날짜 이후로 검색해서 값이 안나오는지 알고 날짜부분 주석처리하고 프린트 찍어서 API 응답 받아보니까 50개가 있었음

![image.png](/images/projects/project1/trouble08.png)

---

### 🛠 문제 1: total 파싱 경로 오류

❌ 잘못된 코드

\`\`\`python
total_element = root.find(".//total") or root.find(".//totalCount"
\`\`\`

- \`.//total\`: 루트 이하 모든 트리에서 \`total\`을 찾으려 했지만, 잘못된 트리 구조로 인해 값 미탐색
- \`total\`은 루트 바로 하위에 존재하는 태그였음

✅ 수정된 코드

\`\`\`python
total_element = root.find("./total")
\`\`\`

- 루트 기준으로 정확히 \`<total>\`을 찾아 정상적으로 프로그램 수를 가져옴

---

### 🛠 문제 2: 프로그램 항목 태그 불일치

❌ 잘못된 코드

\`\`\`python
items = root.findall(".//item")
\`\`\`

- API 명세와 다르게 실제 XML 응답에 \`item\` 태그가 존재하지 않음

✅ 수정된 코드

\`\`\`python
items = root.findall(".//empPgmSchdInvite")
\`\`\`

- 실제 응답에서 반복되는 프로그램 항목 태그 \`<empPgmSchdInvite>\` 를 기준으로 파싱

# 해결방안

- 루트 하위에 존재하는 \`total\` 값을 명확하게 탐색
    
    \`\`\`python
    total_element = root.find("./total")
    \`\`\`
    
- 프로그램 항목을 올바른 태그로 탐색
    
    \`\`\`python
    items = root.findall(".//empPgmSchdInvite")
    \`\`\`
    

# 재발방지 체크리스트

- XML 파싱 시 \`.//\` (전체 서브 트리 탐색) vs \`./\` (루트 직속 탐색) 경로 차이 인지
- API 명세와 실제 XML 응답 구조가 다를 수 있으므로 API 응답 직접 확인 필수
- XML 태그명 (\`item\`, \`empPgmSchdInvite\` 등) 실제 응답 구조 기반으로 작성
`,
      discoveryDate: "2025-03-19",
      resolutionDate: "2025-03-19",
    },
    {
      id: 9,
      category: "DB",
      title: `PDF 정규식 패턴 매칭 실패`,
      content: `# 증상

PDF 파일의 목차 페이지의 항목 코드, 제목, 페이지 번호를 추출하는 작업 중 텍스트 형식 차이로 인한 정규식 패턴 매칭 문제가 발생

# 원인

1. **PDF 뷰어로 봤을 때:**
    - PDF 뷰어에서 텍스트를 드래그하여 복사할 경우, 추출되는 텍스트 구조와 다르게 복사될 수 있음
    
    ![image.png](/images/projects/project1/trouble09.png)
    
2. **드래그 복사, 붙여넣기 했을 때:**
    - 줄바꿈이 제대로 유지되지 않고 공백으로 대체됨
    - 일부 항목에서 '▶' 기호가 추가로 삽입됨 (예: '초격차▶스타트업▶1000+▶프로젝트')
    - 공백 문자가 일관되지 않게 처리됨
    
    \`\`\`python
    Contents 중앙부처
    중앙부처
    사업화 001  ▶▶ 예비창업패키지 18
    002  ▶▶ 초기창업패키지 19
    003  ▶▶ 창업도약패키지 20
    004  ▶▶ 초격차▶스타트업▶1000+▶프로젝트 21
    005  ▶▶ 민관공동창업자발굴육성사업 22
    006  ▶▶ 통합▶창업패키지▶지원 23
    007  ▶▶ 창업중심대학 24
    008  ▶▶ 창업성공패키지(청년창업사관학교) 25
    009  ▶▶ 재도전성공패키지 26
    010  ▶▶ 신사업창업사관학교 27
    011  ▶▶ 로컬크리에이터▶육성사업 28
    012  ▶▶ 예술기업▶성장▶지원 29
    \`\`\`
    

# 해결방안

### 1. PyMuPDF(fitz) 라이브러리를 활용한 텍스트 추출

PDF 파일에서 텍스트를 프로그래밍 방식으로 직접 추출하여 일관된 형식을 확보:

\`\`\`python
import fitz  # PyMuPDF

def extract_toc_text(pdf_path, page_number):
    """목차 페이지의 텍스트를 추출하는 함수"""
    doc = fitz.open(pdf_path)
    page = doc[page_number]  # 목차 페이지 (0-based 인덱스)
    text = page.get_text()
    doc.close()
    return text

# 사용 예시
pdf_path = "your_document.pdf"
toc_page_number = 1  # 2페이지 (0-based 인덱스)
toc_text = extract_toc_text(pdf_path, toc_page_number)
print(toc_text)
\`\`\`

실행 결과:

\`\`\`txt
'C o n t e n t s 중앙부처 중앙부처 사업화 001  ▶▶ 예비창업패키지 18 002  ▶▶ 초기창업패키지 19 003  ▶▶ 창업도약패키지 20 004  ▶▶ 초격차 스타트업 1000+ 프로젝트 21 005  ▶▶ 민관공동창업자발굴육성사업 22 006  ▶▶ 통합 창업패키지 지원 23 007  ▶▶ 창업중심대학 24 008  ▶▶ 창업성공패키지(청년창업사관학교) 25 009  ▶▶ 재도전성공패키지 26 010  ▶▶ 신사업창업사관학교 27 011  ▶▶ 로컬크리에이터 육성사업 28 012  ▶▶ 예술기업 성장 지원 29 013  ▶▶ 스포츠산업 예비초기창업·창업도약 지원 30 014  ▶▶ 스포츠산업 창업중기(액셀러레이팅) 지원 31 015  ▶▶ (콘텐츠) 아이디어 사업화 지원 32 016  ▶▶ (콘텐츠) 엑셀러레이터 연계 사업화 지원 33 017  ▶▶ (콘텐츠) 투자 연계 사업화 지원 34 018  ▶▶ 선도기업 연계 동반성장 지원(콘텐츠 오픈이노베이션) 35 019  ▶▶ 전통문화 청년창업 육성지원사업 36 020  ▶▶ 관광벤처사업 공모전 37 021  ▶▶ 에코스타트업 지원사업 38 022 ▶▶ 농식품 벤처육성지원 39 023  ▶▶ 농식품 기술창업 액셀러레이터 육성지원 40 024  ▶▶ 농식품 기술평가지원 41 025  ▶▶ 농식품 판로지원 42 026  ▶▶ 경북‧구미 방산혁신클러스터 전주기 방산 창업지원 43 027  ▶▶ 대전 방산혁신클러스터 드론특화 창업 지원사업 44 028  ▶▶ 국방기술을 활용한 창업경진대회 45 029  ▶▶ 기창업자 경영개선자금 지원사업 46 030  ▶▶ 소규모 신규 창업자 지원사업 47 '
\`\`\`

### 2. 추출된 텍스트 기반으로 다시 패턴 작성

**원래 정규식 패턴:**

\`\`\`python
pattern = re.compile(r'(\d{3})\s*▶▶\s*(.+?)\s+(\d+)')
\`\`\`

- 페이지 번호(\`\d+\`) 이후 패턴을 명확히 지정하지 않아 매칭이 부정확함
- 공백 처리가 불일치하는 상황에 대응하지 못함
- 해석
    - \`(\d{3})\`: 숫자 3자리 (예: \`001\`, \`123\`)
    - \`\s*\`: 공백이 0개 이상
    - \`▶▶\`: ▶▶ 기호 (유니코드 문자)
    - \`\s*\`: 다시 공백이 0개 이상
    - \`(.+?)\`: 최소 매칭으로 **정책명** 같은 텍스트 (모든 문자 1개 이상, 가능한 짧게)
    - \`\s+\`: 공백 1개 이상
    - \`(\d+)\`: 숫자 1자리 이상

**개선된 정규식 패턴:**

fitz로 추출한 텍스트 형식에 맞게 정규식 패턴을 개선:

\`\`\`python
pattern = re.compile(r'(\d{3})\s*▶▶\s*(.+?)\s+(\d{1,3})(?:\D|$)')
\`\`\`

개선 포인트:

- \`(\d{1,3})\`: 페이지 번호가 1~3자리 숫자임을 명시
- \`(?:\D|$)\`: 페이지 번호 이후에 비숫자 문자나 문자열의 끝이 오도록 지정하여 매칭 정확도 향상
- 해석
    - \`(\d{3})\`: 숫자 3자리
    - \`\s*\`: 공백 0개 이상
    - \`▶▶\`: ▶▶ 기호
    - \`\s*\`: 공백 0개 이상
    - \`(.+?)\`: 정책명
    - \`\s+\`: 공백 1개 이상
    - \`(\d{1,3})\`: 숫자 1~3자리 (예: \`1\`부터 \`999\`까지)
    - \`(?:\D|$)\`: 비숫자(Non-digit) 1개 또는 문자열 **끝**에서 멈춤
`,
      discoveryDate: "2025-03-19",
      resolutionDate: "2025-03-19",
    },
    {
      id: 10,
      category: "DB",
      title: `PDF 정책 추출 4개 실패`,
      content: `# 증상

![스크린샷 2025-03-19 오후 9.22.35.png](/images/projects/project1/trouble10.png)

4개 정책이 잘못된 페이지 번호로 저장되지 않음

- "초격차 스타트업 1000+ 프로젝트" - 실제: 21페이지 / 오류: 1000페이지로 추출
- "컴업(COMEUP) 2025" - 실제: 86페이지 / 오류: 2025페이지로 추출
- "Try Everything 2025" - 실제: 430페이지 / 오류: 2025페이지로 추출
- "아시아 창업엑스포 FLY ASIA 2025" - 실제: 431페이지 / 오류: 2025페이지로 추출

# 원인

### 이전 코드의 문제점

\`\`\`python
def parse_toc(pages_text):
    toc_text = " ".join(pages_text[2:15])  # 2~15페이지 목차
    toc_text_clean = re.sub(r'\s+', ' ', toc_text)

    pattern = re.compile(r'(\d{3})\s*▶▶\s*(.+?)\s+(\d+)')
    toc_items = pattern.findall(toc_text_clean)
\`\`\`

1. **무제한 페이지 번호 추출**:
    - 정규식 \`(\d+)\`가 임의 길이의 숫자를 페이지 번호로 추출
    - "초격차 스타트업 1000+"에서 "1000"이 페이지 번호로 오인
    - "컴업(COMEUP) 2025"에서 "2025"가 연도가 아닌 페이지 번호로 오인
2. **텍스트 구조 변형**:
    - \`" ".join(...)\`으로 모든 줄바꿈을 공백으로 대체
    - \`re.sub(r'\s+', ' ', toc_text)\`로 모든 공백을 하나로 통일
    - 이로 인해 정책명과 페이지 번호 구분이 불명확해짐
3. **유효성 검사 부재**:
    - 추출된 페이지 번호에 대한 검증 로직 없음
    - PDF 총 페이지(483) 초과 값도 그대로 사용

# 해결방안

### 최적화된 새 코드

\`\`\`python
def parse_toc_improved(pages_text):
    """
    목차 페이지에서 정책 정보(코드, 제목, 페이지번호) 추출
    """
    toc_text = "\n".join(pages_text[1:15])

    pattern = re.compile(r"(\d{3})\s*\u25b6\u25b6\s*(.+?)\s+(\d{1,3})(?:\D|$)")
    toc_items = pattern.findall(toc_text)

    policies = []
    for match in toc_items:
        code, title, page = match
        page_num = int(page)
        if page_num > 483:
            continue
        policies.append({"code": code, "title": title.strip(), "page_num": page_num})

    return policies
\`\`\`

### 핵심 개선사항

1. **페이지 번호 자릿수 제한**:
    - \`(\d{1,3})(?:\D|$)\` 패턴으로 페이지 번호를 1~3자리로 제한
    - 이를 통해 4자리 숫자(1000, 2025)가 페이지 번호로 오인되는 문제 해결
    - 페이지 번호 다음에 비숫자 문자 또는 문자열 끝(\`(?:\D|$)\`)이 오도록 지정하여 정확도 향상
2. **텍스트 구조 보존**:
    - \`"\n".join\`으로 줄바꿈 유지
    - 공백 정규화 제거로 원래 서식 유지
    - 이를 통해 정책명과 페이지 번호 경계를 더 정확히 인식
3. **페이지 번호 유효성 검사**:
    - \`if page_num > 483: continue\` 조건으로 PDF 총 페이지 수 초과 값 필터링
    - 비정상적인 페이지 번호를 가진 정책 제외

---

+ 목차에 정책앞 숫자태그들 모두 더해서 총 정책이 436개인 것은 인지하고 있던 상태에서 432개가 찍혀서 건너뛰어지는 것을 출력해보니 4개의 문제 정책을 발견할 수 있었음.

![해결완료된 모습 캡쳐](/images/projects/project1/trouble10-1.png)

해결완료된 모습 캡쳐

# 재발방지

정책 데이터는 표준화된 형식 외에도 다양한 비정형 케이스(숫자 포함 정책명 등)가 존재할 수 있고 이런 케이스는 실제 데이터 처리 과정에서 발견될 가능성이 높음. 따라서 사전 정의된 패턴에 한계가 있을 수 있음을 인지하고 실행 과정에서 발견된 이슈에 대해 유연하게 문제를 해결하는 방향으로 진행하는 것이 좋을 것 같음
`,
      discoveryDate: "2025-03-19",
      resolutionDate: "2025-03-19",
    },
    {
      id: 11,
      category: "BE",
      title: `ChatRoom을 삭제시 관련된 ChatLog는 삭제되지만 LangChain 메모리는 남는 문제`,
      content: `# 증상

- 사용자가 채팅방을 삭제한 후, 새로운 채팅방을 만들고 대화를 시작했을 때, 과거의 대화 내용이 다시 응답에 영향을 줌
- 특히 같은 유저가 여러 채팅방을 오가며 대화하는 경우, 문맥이 섞이거나 이전의 질문-답변 흐름이 유지되어 챗봇이 엉뚱하게 응답함
- 대화 기록은 DB에서 삭제되었지만, 챗봇은 여전히 옛날 대화를 기억하는 듯한 현상이 발생

# 원인

- \`ChatRoom\` 모델에서 \`on_delete=models.CASCADE\`로 설정되어 있어서, 채팅방 삭제 시 관련 \`ChatLog\`는 자동으로 삭제됨 → DB에는 더 이상 대화 내역이 없음
- 하지만 LangChain의 메모리(\`ChatHistoryManager\`, \`ConversationBufferMemory\`)는 DB와 별개로 캐시 형태로 사용자별 대화를 기억하고 있음
- 메모리는 사용자 ID만 기준으로 관리되며, 채팅방 구분이 없음
    
    → 따라서 사용자가 채팅방을 삭제해도 \`ChatHistoryManager\`에는 여전히 과거 대화가 남아 있음
    

# 해결방안

- WebSocket 연결이 종료되는 시점 (\`disconnect()\`)에서 아래 코드를 실행하도록 수정:
    
    \`\`\`python
    if self.is_authenticated:
        chat_history_manager = ChatHistoryManager(self.user_id, model=None)
        chat_history_manager.clear_history()
    \`\`\`
    
- 위 코드에서 \`clear_history()\`는 LangChain memory 저장소 (예: Redis, 캐시 등)에서 사용자별 대화 히스토리를 제거함
- 이로써 WebSocket 연결이 끊기거나 사용자가 명시적으로 나갈 때, 해당 세션에 대한 메모리 내용이 삭제되며, 다음 채팅방에서는 새로 시작할 수 있음

# 재발방지

1. 채팅방 삭제와 메모리 삭제를 묶어서 처리

- HTTP DELETE 요청으로 채팅방을 삭제할 때, view나 signal에서 \`ChatHistoryManager.clear_history()\`도 같이 실행해야 함
- 예:
    
    \`\`\`python
    def perform_destroy(self, instance):
        ChatHistoryManager(self.request.user.id, None).clear_history()
        instance.delete()
    \`\`\`
    

2. 메모리와 채팅방을 구분 관리할 수 있는 구조로 개선 고려

- 현재는 유저 단위로 memory가 관리되기 때문에 채팅방을 여러 개 운영하기에 적합하지 않음
- 향후에는 \`ChatHistoryManager\`가 \`chatroom_id\`도 함께 고려해서 채팅방 단위의 문맥 관리를 할 수 있도록 구조 개편 필요
`,
      discoveryDate: "2025-03-19",
      resolutionDate: "2025-03-19",
    },
    {
      id: 12,
      category: "BE",
      title: `OpenAI의 분당 호출 제한`,
      content: `# 증상

- \`PolicyFlow\` 실행 중 특정 단계에서 **OpenAI API 호출이 잦아져 \`RateLimitError\` 발생**
- 로그 또는 콘솔 출력 예시:
    
    \`\`\`bash
    openai.RateLimitError: You exceeded your current quota, please check your plan and billing details.
    \`\`\`
    
- 에러 발생 위치는 일정하지 않고, 후속 Task (\`CompareCrew\`, \`ReportCrew\`, \`StrategyCrew\`)에서 주로 발생

# 원인

- 초기에는 모든 Agent 호출 시 \`max_rpm\`(분당 요청 제한)이 설정되어 있지 않았음
- 각 Agent는 별도의 제한 없이 GPT 모델을 호출하며, 동일 시간 내에 4~5개의 Agent가 거의 동시에 실행
- 결과적으로 OpenAI의 분당 호출 제한(\`rate limit\`)을 초과하면서 오류 발생

# 해결방안

- **모든 Agent에 \`max_rpm=3\`을 명시적으로 설정**하여 요청 속도를 제한
- 이를 통해 \`litellm\`에서 내부적으로 호출 간 지연을 삽입하여 초과를 방지함
- 예외 핸들링 로직 없이도 안정적인 실행 가능

### 적용 전 (RateLimit 설정 없음):

\`\`\`python
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1, max_tokens=1024)
\`\`\`

### 적용 후:

\`\`\`python
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1, max_tokens=1024, max_rpm=3)
\`\`\`

→ 해당 설정은 각 Agent 정의부 (\`*_agent.py\`)에 일괄 반영

# 재발방지

1. **LLM 호출 시 기본 파라미터로 \`max_rpm\` 포함하기**
    - 향후 새로운 Agent 추가 시에도 동일하게 설정할 수 있도록 템플릿화
2. **Agent 설정 일관화**
    - 모델, 토큰 수, 속도 제한 등 공통 옵션은 wrapper 또는 config로 관리
3. **요청 빈도 모니터링**
    - OpenAI \`Usage Dashboard\` 또는 자체 로그로 분당 요청 수 확인
4. **필요시 Crew 내부 병렬 실행 제한**
    - 추후 대규모 Agent 구성이 필요할 경우 \`Flow\` 또는 \`Crew\` 레벨에서 concurrency 조정 고려
`,
      discoveryDate: "2025-03-20",
      resolutionDate: "2025-03-20",
    },
    {
      id: 13,
      category: "BE",
      title: `Tool이 설정되어 있음에도 Agent가 사용하지 않는 문제`,
      content: `# 증상

- Agent가 RAG 검색 Tool이 존재함에도 불구하고, **검색을 실행하지 않고 직접 답변을 생성**
- 콘솔 출력에 Tool 호출 로그가 없고, 답변이 매우 추상적이거나 LLM의 사전 지식 기반으로 생성됨
- 검색 결과가 반드시 필요한 질문(\`서울시 청년 지원 정책 알려줘\`)에도 불구하고 llm이 자체적으로 정보를 만들어내서 대답

# 원인

- \`crewai.Task\` 객체에서 \`used_tools=True\`를 명시하지 않으면,
    
    Tool이 등록되어 있어도 **Agent가 툴을 사용하지 않을 수 있음**
    
- CrewAI 내부적으로는 툴 사용 여부를 **자동 판단**하거나, **프롬프트에 따라 무시**할 수 있음
    
    → 명시적 설정이 없을 경우 Tool이 "등록만 되어 있고 실행은 안 되는" 문제가 발생
    
- 과거에는 다음과 같이 설정되어 있었음:
    
    \`\`\`python
    Task(
        ...,
        tools=[RagSearchTool()],  # tool은 있지만 used_tools가 없음
    )
    \`\`\`
    

# 해결방안

- Task 정의 시 \`used_tools=True\`를 명시적으로 설정하여 **Agent가 Tool을 반드시 사용하도록 유도**
    
    \`\`\`python
    Task(
        ...,
        used_tools=True,
        tools=[RagSearchTool()],
        ...
    )
    \`\`\`
    
- 이를 통해 Agent는 LLM 기반 판단이 아닌, 등록된 Tool을 통해 실제 RAG 검색을 수행하게 됨
- 검색 결과가 응답에 자연스럽게 반영되며, \`"검색된 문서가 없습니다"\`와 같은 문장도 정상 출력됨

# 재발방지

- 모든 Tool 기반 Task 정의 시 \`used_tools=True\`를 기본값으로 포함
- 테스트 단계에서 Agent가 Tool을 실제로 사용하는지 확인하는 로그/결과 검증 필요
`,
      discoveryDate: "2025-03-20",
      resolutionDate: "2025-03-20",
    },
    {
      id: 14,
      category: "BE",
      title: `기간이 지난 정보를 제공하는 문제`,
      content: `# 증상

LLM prompt에 datetime을 이용해 오늘 날짜에 대한 정보를 제공하고, 해당 정보를 기준으로 신청기간이 지난 정보는 제공하지 않도록 프롬프트를 작성했음에도 신청기간이 지난 정보를 제공

\`\`\`python
**정책명**: 부여군 청년셰어하우스 운영  
**대상**: 무주택자 중 기준 중위소득 150% 이하인 18~39세 청년 또는 신혼부부  
**지원 내용**: 저렴한 월세로 주거 지원 (1인 1실, 최대 2년 거주 가능)  
**신청 방법**: 부여군청 홈페이지를 통해 신청  
**기간**: 2025년 3월까지 신청 가능  
---

**정책명**: 2024년 청주시 LH 영구임대주택 예비입주자 모집  
**대상**: 청주시 주민  
**지원 내용**: 영구임대주택 예비입주자 모집 (임대조건 등 상세 내용 LH 홈페이지 참조)  
**신청 방법**: 청주시청 홈페이지를 통해 신청  
**기간**: 2024년 11월 4일 ~ 11월 8일  
---
\`\`\`

# 원인

Vectorstore에 있는 날짜 정보가 날짜 타입이 아닌 문자열 타입 및 자연어 형식으로 저장되어있어서 LLM이 날짜 판단 및 구분을 잘 못하는 것 같음.

# 해결방안

1. VectorDB를 만들 때, 날짜 정보를 파싱해서 저장?
2. gpt-4o 모델 사용
`,
      discoveryDate: "2025-03-24",
      resolutionDate: "",
    },
    {
      id: 15,
      category: "BE",
      title: `사용자의 입력 분류가 정확하지 않고, 반복했을 때 재현성이 떨어짐`,
      content: `# 증상

사용자의 입력을 전반적인 정책을 소개를 요구하는지, 특정 정책들의 상세한 내용을 요구하는지 분류하는 작업에서 LLM이 잘 분류하지 못하고, 같은 입력값에도 분류결과가 달라지는 문제가 있음.

\`\`\`python
질문: 나 집을 사고 싶은데, 30대 1인 남성이 받을 수 있는 주거지원 정책이 있어?

# 분류결과
classification_result >>>>>> {'category': 'detail_policy', 'original_input': '나 집을 사고 싶은데, 30대 1인 남성이 받을 수 있는 주거지원 정책이 있어?', 'is_followup': False, 'keywords': ['주거', '지원', '정책', '30대', '1인']}
\`\`\`

- 사용자가 상세한 정보들을 제공하지만, 문맥상 특정 정책의 상세정보보다는 관련 정책 리스트를 제공해주는 것이 필요한 상황

# 원인

- 프롬프트를 잘못 작성했음.

\`\`\`python
"""

**Classify** the user's input into one of the following categories:
                - "off_topic": General casual conversation or input unrelated to any policy, support, or government services.
                - "gov_policy": Asking about general government or local government policies, programs, or support types.
                - "detail_policy": Asking about specific conditions, eligibility, application process, or requirements for a particular policy or support.
                - "support_related": Indirect or figurative expressions that imply a desire or need for financial aid, housing, employment, or social support.
                - "trend_ask": Asking about recent news, policy changes, or trends relevant to youth, employment, housing, etc.
                - "report_request": Explicitly requesting a written summary, report, or analysis based on search results, chatbot conversation, or retrieved policy data.

"""
\`\`\`

- \`detail_policy\`  을 \`policy_detail\` 로 적었었음..
- 프롬프트를 수정했음에도, LLM이 분류를 잘 못하는 것 같음. (문맥 상 리스트를 반환하는게 맞지만, 사용자가 자세히 적기만하면 \`detail_policy\`로 분류함.

# 해결방안

- 프롬프트의 잘못된 부분을 수정
- LLM이 1차적으로 분류한 뒤, 사용자 입력에서 특정 키워드가 있으면 가중치 점수를 주면서 계산하는 함수를 적용해 가중치 점수에 따른 분류를 다시 한번 더 적용함 (하이브리드 방식적용)
- 함수로만 분류할 수도 있지만, 1차 분류 LLM에서 분류뿐 아니라 키워드 추출 작업도 있기 때문에 LLM 모델을 거쳐야 함.

\`\`\`python
# from konlpy.tag import Okt
from enum import Enum

class Category(Enum):
    OFF_TOPIC = "off_topic"
    GOV_POLICY = "gov_policy"
    DETAIL_POLICY = "detail_policy"
    REPORT_REQUEST = "report_request"
    SUPPORT_RELATED = "support_related"

KEYWORD_CATEGORY_MAP = {
    Category.GOV_POLICY.value: [
        "정책", "지원", "프로그램", "혜택", "주거지원","청년지원",
        "복지", "정부지원", "대상자", "제도", "정부정책", "복지정책",
        "지원정책", "지원제도", "청년정책", "창업지원", "금융지원", "취업지원",
        "일자리", "공공지원", "청년주택", "임대주택", "국가정책", "지원방안",
        "제도안내"],
    Category.DETAIL_POLICY.value: [
        "대상", "선정기준", "신청방법", "신청사이트", "신청기한", "조건",
        "자격", "신청", "기간", "필요서류", "서류", "싱세", "자세히",
        "디테일", "절차", "증명서", "신청양식", "자세한내용", "서류제출",
        "제출서류", "신청조건", "신청절차", "신청링크", "접수기간", "자격요건",
        "자격조건", "신청가능일", "진행절차", "양식", "신청비용", "인터넷신청",
        "방문신청", "신청주소", "증빙자료", "첨부파일"],
}
POLICY_PATTERNS = [
    "있어?", "있나요?", "알려줘", "뭐가 있어", "어떤 것이 있", "있는지",
    "받을 수 있", "지원받을 수", "혜택 받", "무슨 정책", "정책 알려줘",
    "지원해주는 게", "무슨 혜택", "혜택 종류", "받을 수 있는 정책", "관련된 정책",
    "지원 가능한 게", "추천해줘",
]
DETAIL_PATTERNS = [
    "어떻게 신청", "어디서 신청", "신청 마감", "제출해야 하는", "필수 서류",
    "구체적", "상세 내용", "자세히", "어디서 확인", "언제까지 신청", "어떤 서류",
    "자격 요건", "자세한 정보", "신청하는 법", "신청 절차", "신청 주소", "신청 링크",
    "필요한 서류"]

KEYWORD_SCORE = 1
PATTERN_SCORE = 1.5

def keyword_base_classification(user_message: str) -> str | None:
    scores = {Category.GOV_POLICY.value: 0, Category.DETAIL_POLICY.value: 0}

    for category, keywords in KEYWORD_CATEGORY_MAP.items():
        for keyword in keywords:
            if keyword in user_message:
                scores[category] += KEYWORD_SCORE

    for pattern in POLICY_PATTERNS:
        if pattern in user_message:
            scores[Category.GOV_POLICY.value] += PATTERN_SCORE

    for pattern in DETAIL_PATTERNS:
        if pattern in user_message:
            scores[Category.DETAIL_POLICY.value] += PATTERN_SCORE

    max_score = max(scores.values())

    if max_score == 0 or len(set(scores.values())) == 1:
        return None

    for category, score in scores.items():
        if score == max_score:
            return category

\`\`\`
`,
      discoveryDate: "2025-03-24",
      resolutionDate: "2025-03-25",
    },
    {
      id: 16,
      category: "Dep",
      title: `Github Actions CD 중 Celery 종료 시 비정상 종료되는 문제`,
      content: `# 증상

Github Actions를 통한 자동화 배포(CD) 과정에서, celery 프로세스를 종료하는 시점에 워크플로가 실패처리 됨.

로그 상 pkill -f celery 실행 이후 다음과 같은 메시지와 함꼐 배포가 중단됨

\`\`\`bash
2025/03/30 17:27:18 Process exited with status 143 from signal TERM
Error: Process completed with exit code 1.
\`\`\`
`,
      discoveryDate: "2025-03-28",
      resolutionDate: "",
    },
    {
      id: 17,
      category: "DB",
      title: `Chroma 리트리버 유사도 정렬 실패`,
      content: `# 증상

retriever.py의 VectorRetriever.search() 함수에서 유사한 문서를 정렬하려 했지만, metadata["score"]를 기준으로 정렬해도 의도한 유사도 정렬이 전혀 작동하지 않음.

# 원인

**문제 코드**

\`\`\`python
docs = collection.similarity_search(query, k=k)
for doc in docs:
    어쩌구저쩌구
    results.append((name, doc))

return sorted(results, key=lambda x: x[1].metadata.get("score", 0), reverse=True)
\`\`\`

**잘못된 점**

1. \`similarity_search()\`는 score를 반환하지 않음
    
    → 반환 타입: \`List[Document]\`
    
    → 참조: [LangChain Docs](https://python.langchain.com/docs/integrations/vectorstores/chroma)
    
2. \`.metadata["score"]\`는 존재하지 않는 값 → 항상 0 또는 None

# 해결방안

**수정 코드**

\`\`\`python
docs_with_scores = collection.similarity_search_with_score(query, k=k)
for doc, score in docs_with_scores:
    if self._metadata_match(doc.metadata, filters):
        results.append((name, doc, score))

return sorted(results, key=lambda x: x[2])  # score 기준 오름차순 정렬해야함
\`\`\`

**핵심 변경사항**

- \`similarity_search()\` → \`similarity_search_with_score()\`
- 결과 타입: \`List[Tuple[Document, score]]\`
- 정렬 기준: 튜플의 3번째꺼(score)

# 재발방지

- \`retriever.py\`의 정렬 문제는 함수 반환 구조에 대한 오해로 발생함..
- 공식 문서 기준으로 \`with_score()\` 사용 및 unpacking 구조로 교체

### LangChain Docs

- **함수 설명**
    
    > similarity_search_with_score returns a list of (Document, score) tuples.
    > 
    > 
    > The lower the score, the more relevant the document is.
    > 
    > 🔗 [https://python.langchain.com/docs/integrations/vectorstores/chroma](https://python.langchain.com/docs/integrations/vectorstores/chroma)
    > 

### Chroma 공식 문서

- **거리 기반 유사도**
    
    > Chroma returns results based on vector distance.
    > 
    > 
    > The lower the distance, the more similar the item.
    > 
    > 🔗 [https://docs.trychroma.com/docs/querying-collections](https://docs.trychroma.com/docs/querying-collections)
    >
`,
      discoveryDate: "2025-04-09",
      resolutionDate: "2025-04-09",
    },
  ],
}

export default project
