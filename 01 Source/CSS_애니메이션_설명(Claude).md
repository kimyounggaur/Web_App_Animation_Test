CSS 애니메이션은 "정지 이미지나 영상으로는 핵심인 '움직임'을 제대로 못 보여준다"는 특성이 있어서, 아래 자료는 전부 **실제로 동작하는 인터랙티브 와이어프레임**으로 준비했습니다. 호버하고 클릭하면 그 자리에서 애니메이션이 재생됩니다. 먼저 큰 그림부터 잡고 가겠습니다.

CSS 애니메이션은 결국 세 가지 메커니즘의 조합입니다. 상태 변화에 반응하는 **transition**, 타임라인 위에서 스스로 재생되는 **@keyframes 애니메이션**, 그리고 이 둘이 실제로 움직이는 대상이 되는 **transform**. 이 셋의 동작 방식부터 직접 보겠습니다.The interactive renderer isn't responding right now, so I'll build you a self-contained interactive HTML wireframe instead — you can open it, hover, click, and play with every animation live (and keep it as a reference). Let me check the design guidelines first, then build it.The renderer's still down, so I'm building you a complete interactive HTML lab — every animation runs live, with the actual CSS shown next to each demo. Writing it now.Let me quickly verify the interactive logic has no syntax errors before handing it over.Everything checks out — JS is valid and the markup is balanced. Copying it to your outputs.위 파일을 열면 모든 애니메이션이 실제로 돌아갑니다 — 호버·클릭·슬라이더로 직접 조작하고, 각 데모 아래에 그대로 복사해 쓸 수 있는 CSS가 붙어 있어요. 헤더의 **"모션 일시정지"** 버튼은 `animation-play-state: paused`를 토글하는 실제 기능이자 메타 데모입니다. 정지 이미지나 영상 대신 라이브 와이어프레임으로 만든 이유는, 애니메이션은 본질이 '움직임'이라 멈춘 화면으로는 핵심이 전달되지 않기 때문입니다. 아래는 그 자료를 읽을 때 곁에 두면 좋은 개념 정리입니다.

## 애니메이션의 큰 분류

CSS 모션은 딱 두 가지 ‘엔진’과 한 가지 ‘재료’로 정리됩니다.

**Transition(전환)** 은 *시작 상태와 끝 상태 둘 사이*를 잇습니다. 반드시 트리거가 필요하고(`:hover`, `:focus`, `:checked`, 혹은 JS로 클래스 추가), 트리거가 풀리면 알아서 되돌아옵니다. 버튼 호버, 토글, 모달 열기처럼 "어떤 사건에 반응하는" 모션의 99%가 여기에 속합니다.

**Animation(@keyframes)** 은 *타임라인* 위에 0%~100% 여러 단계를 미리 짜두고 스스로 재생합니다. 트리거가 없어도 되고, `infinite`로 무한 반복하거나 `alternate`로 왕복할 수 있어 로딩 스피너·스켈레톤·강조·앰비언트 모션에 씁니다. transition보다 훨씬 표현력이 넓습니다.

**Transform(변형)** 은 애니메이션이 아니라, 위 두 엔진이 실제로 ‘무엇을’ 움직이는지에 대한 답입니다. `translate / scale / rotate / skew`(+ 3D인 `rotateX/Y/Z`, `perspective`)는 레이아웃을 다시 계산하지 않고 GPU에서 합성만 하므로 가장 부드럽습니다. 그래서 실무에서는 거의 항상 transform과 opacity를 애니메이션합니다.

효과의 ‘종류’로 다시 쪼개면 이렇게 분류돼요: 페이드(opacity), 슬라이드(translate), 스케일(scale), 회전(rotate), 색·그라데이션 전환(background-position), 셰이크/바운스 같은 강조, 그리고 3D 플립과 시머(shimmer). 파일의 Part 01에 이 종류들이 전부 라이브로 들어 있습니다.

## 핵심 프로퍼티 빠른 참조

```css
/* transition 단축 = 속성 | 시간 | 타이밍함수 | 지연 */
transition: transform .3s ease-out .1s;

/* animation 단축 = 이름 | 시간 | 타이밍 | 지연 | 반복 | 방향 | fill-mode | 재생상태 */
animation: spin 1s linear 0s infinite normal none running;
```

`animation` 단축에서 자주 헷갈리는 세 가지만 짚자면, `animation-iteration-count: infinite`(반복 횟수), `animation-direction: alternate`(끝나면 거꾸로 되돌아오며 왕복), 그리고 `animation-fill-mode: forwards`(끝난 뒤 마지막 프레임 상태를 유지 — 이게 없으면 애니메이션이 끝나고 원위치로 튕깁니다)입니다.

## 타이밍 함수 고르는 법

같은 시간·같은 거리라도 인상은 타이밍 함수가 결정합니다. 실무 기준은 단순해요. 화면에 **등장**하는 요소는 `ease-out`(빠르게 출발해 부드럽게 멈춤 — 가장 자연스러움), 화면에서 **사라지는** 요소는 `ease-in`, 진행률 바나 회전 로더처럼 일정 속도가 맞는 건 `linear`, 그리고 통통 튀는 ‘살아있는’ 느낌을 원하면 `cubic-bezier(.68,-0.6,.32,1.6)` 같은 오버슈트 곡선을 씁니다. 단계적으로 뚝뚝 끊는 스프라이트 애니메이션에는 `steps(n)`을 씁니다. Part 01의 ④번 데모에서 다섯 곡선을 동시에 재생해 비교할 수 있습니다.

## 실전 패턴이 실제로 어디에 쓰이나

이게 ‘적용 사례’의 핵심입니다. 파일의 Part 02·03에 든 패턴들을 실제 제품과 연결하면:

- **스켈레톤 + 시머** — Facebook, LinkedIn, YouTube, Slack이 빈 화면 대신 사용. 콘텐츠 자리를 미리 흐르는 빛으로 채워 체감 대기 시간을 줄입니다.
- **클릭 리플** — 안드로이드·Material Design의 시그니처. 탭한 좌표에서 원이 퍼지며 "눌렸다"는 물리적 피드백을 줍니다.
- **좋아요 팝 + 파티클** — 인스타그램·트위터의 하트/리트윗. scale 팝 + 방사형 파티클로 작은 보상감을 만듭니다.
- **토스트/스낵바 슬라이드** — Gmail, Slack, 안드로이드. 화면을 가리지 않고 가장자리에서 들어왔다 자동으로 사라지는 비차단 알림.
- **모달 scale-up 등장** — iOS와 대부분의 웹앱 다이얼로그. 오버레이 페이드 + 카드 스케일에 미세한 delay 차이를 줘 깊이감을 만듭니다.
- **탭 슬라이딩 인디케이터** — 모바일 앱 상단 탭바 전반. 밑줄이 활성 탭으로 미끄러집니다.
- **스크롤 트리거 등장(scroll reveal)** — 마케팅·랜딩 페이지에서 가장 흔함. 이 파일의 섹션 제목들이 스크롤하며 떠오르는 것 자체가 그 패턴이고, `IntersectionObserver`로 화면에 들어온 순간 CSS 클래스를 붙여 구현했습니다.
- **로딩 버튼 상태 시퀀스** — 결제·제출 버튼. 기본 → 스피너 → 체크로 전환해 진행 상황을 알립니다.

## 성능: 딱 두 가지만 기억

부드러운 60fps의 비결은 거의 전부 여기 있습니다. **`transform`과 `opacity`만 애니메이션하세요.** 이 둘은 레이아웃·페인트를 건드리지 않고 합성 단계에서만 처리됩니다. 반대로 `width / height / top / left / margin`을 애니메이션하면 매 프레임 레이아웃을 다시 계산(reflow)해 끊깁니다. 즉 "왼쪽에서 등장"은 `left`가 아니라 `transform: translateX()`로, "커지기"는 `width`가 아니라 `transform: scale()`로 만듭니다. 무거운 애니메이션 직전에 `will-change: transform`으로 브라우저에 힌트를 줄 수 있지만, 남발하면 메모리만 먹으니 꼭 필요한 곳에만 씁니다.

## 접근성 — 빠뜨리기 쉬운 한 줄

전정기관이 예민한 사용자를 위해 OS의 ‘동작 줄이기’ 설정을 존중해야 합니다. 파일에도 적용해 뒀고, 패턴은 이렇습니다:

```css
@media (prefers-reduced-motion: reduce) {
  *{ animation: none !important; transition-duration: .01ms !important; }
}
```

자동 반복·시차 같은 앰비언트 모션은 끄되, 사용자가 직접 누른 결과의 핵심 피드백은 살리는 식으로 균형을 잡으면 됩니다.

## 더 복잡하거나 ‘영상’ 같은 모션이 필요하면

순수 CSS는 UI 모션에 강하지만, 물리 기반 인터랙션이나 영상에 가까운 정교한 모션 그래픽은 도구를 얹습니다. 빠르게 가져다 쓰는 프리셋은 **Animate.css**, 스크롤 등장 전용은 **AOS**, 정밀한 타임라인·스크롤 연동·모핑은 **GSAP**, 리액트 환경의 제스처·스프링 물리는 **Framer Motion(Motion)** 이 표준입니다. 그리고 일러스트레이터/After Effects에서 만든 ‘영상 같은’ 벡터 모션을 가볍게 웹에 얹고 싶을 땐 **Lottie**(JSON으로 내보낸 모션 그래픽)를 씁니다 — GIF나 동영상보다 훨씬 가볍고 선명하며 색·속도를 코드로 제어할 수 있어서, 로딩 애니메이션이나 온보딩 일러스트에 널리 쓰입니다.

원하시면 이 중 특정 패턴(예: 스크롤 패럴랙스, 페이지 전환, Lottie 연동)만 따로 더 깊게 파거나, 이 파일을 React 컴포넌트 버전으로 바꿔 드릴 수도 있어요.