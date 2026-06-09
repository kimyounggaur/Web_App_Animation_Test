SGV는 **SVG**로 해석해서 정리했습니다. 바로 열어볼 수 있는 자료도 같이 만들었습니다.

자료:
[인터랙티브 SVG 와이어프레임 HTML](sandbox:/mnt/data/svg_animation_wireframe.html)
[한 장 요약 인포그래픽 SVG](sandbox:/mnt/data/svg_animation_types_infographic.svg)
[영상형 미리보기 MP4](sandbox:/mnt/data/svg_animation_preview.mp4)
[영상형 미리보기 GIF](sandbox:/mnt/data/svg_animation_preview.gif)

## 1. SVG 애니메이션의 큰 분류

SVG 애니메이션은 보통 **CSS 기반**, **SVG 자체 SMIL 기반**, **JavaScript 기반**, **Lottie/툴 기반**으로 나눕니다. CSS는 `transform`, `opacity`, `stroke-dashoffset` 같은 속성을 keyframes로 움직이는 방식이고, MDN도 CSS animations를 “CSS 속성 값을 keyframes로 시간에 따라 애니메이션하는 모듈”로 설명합니다. ([MDN 웹 문서][1])

| 분류                        | 핵심 방식                                                       | 실제로 많이 쓰는 곳                      | 장점                  | 주의점                   |
| ------------------------- | ----------------------------------------------------------- | -------------------------------- | ------------------- | --------------------- |
| **CSS SVG 애니메이션**         | `@keyframes`, `transition`, `transform`, `stroke-dasharray` | 로고 리빌, 아이콘 hover, 로딩 스피너, 버튼 피드백 | 가볍고 빠름, 구현 쉬움       | 복잡한 상태 분기는 어려움        |
| **SMIL / SVG 자체 애니메이션**   | `<animate>`, `<animateTransform>`, `<animateMotion>`        | 단독 SVG 파일, 반복 아이콘, 경로 이동         | JS 없이 SVG 안에서 재생    | 팀 표준이 React/JS면 관리 분리 |
| **JavaScript 제어형**        | DOM 제어, Web Animations API, GSAP, Motion, D3                | 클릭/스크롤 반응, 대시보드, 인터랙티브 지도        | 상태·데이터·사용자 입력 반영 가능 | DOM이 많으면 성능 설계 필요     |
| **Lottie / SVG renderer** | After Effects → Bodymovin JSON → SVG/canvas/native 렌더러      | 온보딩, 빈 상태, 복잡한 일러스트 모션           | 디자이너 타임라인 재현 쉬움     | 플레이어, 용량, 접근성 처리 필요   |

MDN 기준으로 `<animate>`는 SVG 요소의 속성을 시간에 따라 바꾸고, `<animateMotion>`은 요소를 motion path를 따라 이동시키며, `<animateTransform>`은 이동·회전·확대·축소·skew 같은 transform을 제어합니다. 이 세 요소는 MDN에서 “widely available”로 표시되어 있습니다. ([MDN 웹 문서][2])

## 2. SVG 애니메이션 종류와 실제 적용사례

### 1) CSS transform / opacity 애니메이션

가장 기본적인 형태입니다. SVG 안의 `path`, `circle`, `rect`, `g` 그룹에 클래스를 주고 회전, 확대, 이동, 투명도 전환을 적용합니다.

**실제 적용사례**는 로딩 스피너, 버튼 hover, 알림 pulse, 좋아요 아이콘, 햄버거 메뉴 → X 아이콘 전환입니다. 예를 들어 결제 버튼을 눌렀을 때 버튼 안의 원형 path만 회전시키면 “처리 중” 상태를 즉시 전달할 수 있습니다. Material UI도 progress indicator를 로딩, 제출, 저장 같은 진행 중 상태를 알려주는 컴포넌트로 설명하며, 가능한 한 CSS 애니메이션을 사용한다고 밝힙니다. ([MUI][3])

```css
.spinner {
  transform-origin: center;
  transform-box: fill-box;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

적용 화면은 이런 식입니다.

```html
<button>
  <svg viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="16" class="spinner-ring" />
    <path class="spinner" d="M20 4 A16 16 0 0 1 36 20" />
  </svg>
  처리 중
</button>
```

---

### 2) Stroke drawing, 즉 선 그리기 애니메이션

`stroke-dasharray`와 `stroke-dashoffset`을 이용해 선이 처음부터 그려지는 듯한 효과를 만듭니다. SVG 로고, 서명, 지도 경로, 회로도, 프로세스 플로우에 매우 자주 씁니다. GSAP의 DrawSVGPlugin도 SVG stroke를 점진적으로 드러내거나 숨기기 위해 `stroke-dashoffset`과 `stroke-dasharray`를 제어한다고 설명합니다. ([gsap.com][4])

**실제 적용사례**는 브랜드 랜딩 페이지에서 로고가 손으로 그려지는 듯 나타나는 효과, 배송 경로가 지도 위에서 점점 이어지는 효과, 데이터 파이프라인 다이어그램에서 “입력 → 처리 → 출력” 선이 차례로 그려지는 설명 모션입니다.

```css
.logo-path {
  stroke-dasharray: 620;
  stroke-dashoffset: 620;
  animation: draw 2.8s ease forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

---

### 3) `<animate>` 속성 애니메이션

SVG 내부에서 직접 선언하는 방식입니다. JS나 CSS 파일 없이 SVG만 열어도 움직입니다. 예를 들어 `rect`의 `rx`, `circle`의 `cx`, `fill`, `opacity`, `width` 등을 바꿀 수 있습니다. MDN은 `<animate>`를 “요소의 속성을 시간에 따라 애니메이션하는 방법”으로 설명합니다. ([MDN 웹 문서][2])

**실제 적용사례**는 반복되는 배경 도형, 작은 장식 일러스트, 단독 SVG 배너, 이메일 안에 삽입하는 간단한 벡터 모션입니다.

```html
<svg viewBox="0 0 100 100">
  <rect width="80" height="40" x="10" y="30" rx="4">
    <animate
      attributeName="rx"
      values="4;20;4"
      dur="2s"
      repeatCount="indefinite" />
  </rect>
</svg>
```

---

### 4) `<animateTransform>` 회전·확대·이동 애니메이션

`transform` 속성을 SVG 내부에서 직접 움직입니다. 회전하는 기어, 흔들리는 알림, 커지는 원, 이동하는 카드 등에 씁니다. MDN은 `<animateTransform>`이 target element의 transform attribute를 애니메이션해서 translation, scaling, rotation, skewing을 제어한다고 설명합니다. ([MDN 웹 문서][5])

**실제 적용사례**는 대시보드의 새로고침 아이콘, 설정 아이콘의 톱니 회전, 업로드 중 구름 아이콘, 보안 인증 중 회전하는 shield 아이콘입니다.

```html
<polygon points="50,10 90,90 10,90">
  <animateTransform
    attributeName="transform"
    type="rotate"
    from="0 50 50"
    to="360 50 50"
    dur="2s"
    repeatCount="indefinite" />
</polygon>
```

---

### 5) `<animateMotion>` 경로 이동 애니메이션

SVG의 path를 따라 물체가 움직입니다. 배송, 지도, 모빌리티, 우주 궤도, 온보딩 여정처럼 “경로”가 중요한 화면에서 특히 좋습니다. MDN은 `<animateMotion>`을 요소가 motion path를 따라 움직이는 방식을 정의하는 요소라고 설명합니다. ([MDN 웹 문서][6])

**실제 적용사례**는 배달 앱에서 라이더 위치가 경로를 따라 움직이는 모션, 여행 앱에서 일정 경로를 따라 도시가 연결되는 모션, SaaS 온보딩에서 “데이터 수집 → 분석 → 리포트” 흐름을 점으로 이동시키는 설명입니다.

```html
<path id="route" d="M20 80 C80 10 160 150 240 60" fill="none" />

<circle r="8" fill="orange">
  <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
    <mpath href="#route" />
  </animateMotion>
</circle>
```

---

### 6) Path morphing, 즉 형태 변형

하나의 SVG path가 다른 path로 변형되는 방식입니다. 재생 버튼 → 일시정지 버튼, 검색 아이콘 → 닫기 아이콘, 햄버거 메뉴 → X, blob 배경, 캐릭터 표정 변화에 씁니다. GSAP MorphSVG는 SVG `<path>`의 `d` attribute 데이터를 애니메이션해 형태를 바꾸며, 서로 점 개수가 달라도 보간할 수 있도록 처리한다고 설명합니다. ([gsap.com][7])

**실제 적용사례**는 모바일 앱 하단 탭 아이콘이 선택될 때 아이콘 형태가 부드럽게 바뀌는 모션, 플레이어 UI에서 play/pause 전환, 검색창 열림/닫힘 인터랙션입니다.

```js
gsap.to("#playIcon", {
  duration: 0.4,
  morphSVG: "#pauseIcon",
  ease: "power2.inOut"
});
```

라이브러리 없이 하려면 시작 path와 끝 path의 명령 구조를 맞추는 편이 안전합니다.

---

### 7) Mask / clipPath 리빌 애니메이션

`<mask>`나 `<clipPath>`로 보이는 영역을 제한하고, 그 영역을 움직여 콘텐츠가 닦이듯 나타나게 만듭니다.

**실제 적용사례**는 제품 이미지가 좌우로 reveal 되는 히어로, 프로필 카드가 스켈레톤 로딩에서 실제 콘텐츠로 바뀌는 화면, 원형 progress가 차오르는 UI, 쿠폰 카드가 긁히듯 열리는 효과입니다.

```html
<clipPath id="reveal">
  <rect x="0" y="0" width="0" height="120">
    <animate attributeName="width" values="0;300" dur="1s" fill="freeze" />
  </rect>
</clipPath>

<g clip-path="url(#reveal)">
  <image href="product.png" width="300" height="120" />
</g>
```

---

### 8) Filter 애니메이션

`feGaussianBlur`, `feColorMatrix`, `feTurbulence`, `drop-shadow` 등을 조합해 glow, blur, gooey, noise, liquid 같은 효과를 만듭니다.

**실제 적용사례**는 알림 pulse, 음악 앱의 비주얼라이저, 게임 UI의 마법 효과, AI 서비스의 “생성 중” glowing orb, 배경 blob입니다.

```html
<filter id="glow">
  <feGaussianBlur stdDeviation="4" result="blur" />
  <feMerge>
    <feMergeNode in="blur" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>

<circle class="pulse" filter="url(#glow)" />
```

---

### 9) `viewBox` / camera animation

SVG의 `viewBox`를 바꾸면 마치 카메라가 줌인/줌아웃하거나 화면 안에서 이동하는 느낌을 만들 수 있습니다. 복잡한 시스템 구조도, 지도, 프로세스 다이어그램에 좋습니다. Motion for React 문서도 SVG animation 지원에 `viewBox` 애니메이션과 path drawing 효과가 포함된다고 설명합니다. ([Motion][8])

**실제 적용사례**는 기술 문서에서 전체 아키텍처를 보여준 뒤 특정 API 서버로 확대하는 영상형 설명, 지도에서 국가 → 도시 → 매장 위치로 줌인하는 화면, 교육 콘텐츠에서 회로의 특정 부품을 확대하는 연출입니다.

```html
<svg viewBox="0 0 800 400">
  <animate
    attributeName="viewBox"
    values="0 0 800 400; 240 120 240 120; 0 0 800 400"
    dur="4s"
    repeatCount="indefinite" />
</svg>
```

---

### 10) 데이터 시각화 애니메이션

SVG는 차트와 궁합이 좋습니다. `rect`, `path`, `line`, `text`가 DOM 요소라서 데이터가 바뀔 때 막대 높이, 선 좌표, 축, label을 부드럽게 바꿀 수 있습니다. D3는 웹 표준 기반의 데이터 시각화 라이브러리이고, D3 transition은 DOM이 현재 상태에서 목표 상태로 부드럽게 보간되도록 합니다. ([d3js.org][9])

**실제 적용사례**는 실시간 매출 대시보드, KPI 리포트, 주식/트래픽 차트, 뉴스 인터랙티브 그래픽, 설문 결과 변화 애니메이션입니다.

```js
d3.selectAll("rect.bar")
  .data(nextData)
  .transition()
  .duration(650)
  .attr("y", d => y(d.value))
  .attr("height", d => height - y(d.value));
```

---

### 11) Lottie / Bodymovin / SVG renderer

Lottie는 After Effects 애니메이션을 Bodymovin으로 JSON export한 뒤 웹·모바일에서 재생하는 워크플로에 가깝습니다. Airbnb의 lottie-web 문서도 Lottie가 After Effects 애니메이션을 Bodymovin JSON으로 내보낸 뒤 웹/iOS 등에서 렌더링한다고 설명하며, 디자이너가 엔지니어가 손으로 재구현하지 않아도 애니메이션을 ship할 수 있게 해준다고 설명합니다. ([GitHub][10])

**실제 적용사례**는 앱 온보딩 캐릭터, 결제 성공 일러스트, 빈 상태 안내, 404 페이지, AI 처리 중 애니메이션, 프로덕트 투어입니다.

```js
lottie.loadAnimation({
  container: document.querySelector("#empty-state"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "/animations/empty-box.json"
});
```

---

## 3. 실제 서비스 화면별 적용 예시

| 화면               | 추천 SVG 애니메이션                              | 구체적 예시                                          |
| ---------------- | ----------------------------------------- | ----------------------------------------------- |
| **랜딩 페이지 첫 화면**  | stroke drawing, mask reveal, viewBox zoom | 로고 선이 그려지고, 제품 UI 스크린샷이 마스크로 열리고, 데이터 흐름 선이 연결됨 |
| **회원가입/온보딩**     | Lottie, path motion, step animation       | “프로필 작성 → 취향 선택 → 완료” 단계를 캐릭터나 선 이동으로 안내        |
| **결제/저장/업로드**    | spinner, check drawing, error shake       | 버튼 클릭 후 로딩 스피너 → 성공 체크마크 → 실패 시 X와 흔들림          |
| **대시보드**         | D3 transition, bar/line morphing          | 새 데이터가 들어오면 막대 높이와 선 그래프가 부드럽게 변함               |
| **지도/배송/모빌리티**   | animateMotion, dash path, marker pulse    | 라이더/차량/비행기가 경로를 따라 이동하고 완료 구간은 색이 바뀜            |
| **기술 문서/교육 콘텐츠** | viewBox camera, sequential path drawing   | 전체 시스템 구조를 보여준 뒤 특정 서버나 모듈로 확대                  |
| **광고 배너/프로모션**   | mask, morph, loop micro motion            | 쿠폰이 반짝이거나 가격 태그가 튀어나오고 CTA 버튼이 pulse            |
| **빈 상태/에러 페이지**  | Lottie 또는 CSS SVG loop                    | 빈 박스, 구름, 로봇, 검색 실패 캐릭터가 짧게 반복                  |

## 4. 이미지형·영상형·인터랙티브 와이어프레임으로 나누면

**이미지형 SVG 애니메이션**은 정적인 일러스트를 살짝 움직이는 방식입니다. 로고 리빌, 빈 상태, 히어로 그래픽에 적합합니다. 핵심은 “움직이지만 사용자의 조작을 기다리지는 않는” 것입니다.

**영상형 SVG 애니메이션**은 짧은 설명 시퀀스입니다. 경로 이동, 단계별 등장, 카메라 줌, 차트 변화처럼 5~15초 안에 개념을 설명하는 데 좋습니다. MP4처럼 렌더링된 비디오가 아니라 도형을 실시간으로 움직이므로 수정과 반응형 대응이 쉽습니다.

**인터랙티브 와이어프레임형 SVG 애니메이션**은 사용자의 클릭, 스크롤, 입력, API 상태에 반응합니다. 예를 들어 제가 만든 HTML 파일 안의 결제 버튼은 `idle → loading → success/error` 상태를 SVG class로 전환합니다. 이 방식은 실제 React/Vue/Svelte 컴포넌트로 옮기기 좋습니다.

## 5. 접근성·성능 체크리스트

자동 반복 애니메이션은 반드시 줄일 수 있어야 합니다. MDN은 `prefers-reduced-motion`이 사용자가 비필수 모션을 줄이도록 설정했는지 감지하는 CSS media feature라고 설명합니다. ([MDN 웹 문서][11])

```css
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    transition: none;
  }
}
```

의미 있는 SVG에는 `role="img"`, `<title>`, `<desc>`를 넣는 편이 좋습니다. W3C의 accessible SVG 문서도 `<title>`과 `<desc>`가 SVG 콘텐츠의 텍스트 대안을 제공하며, assistive technology가 이를 이름과 설명으로 사용할 수 있다고 설명합니다. ([w3c.github.io][12])

실무 기준으로는 이렇게 선택하면 됩니다.

| 목적                  | 추천 방식          |
| ------------------- | -------------- |
| 아이콘, 로더, 버튼 피드백     | CSS            |
| 단독 SVG 파일에서 반복 재생   | SMIL           |
| 클릭/스크롤/API 상태 반응    | JavaScript     |
| 복잡한 일러스트 모션         | Lottie         |
| 차트·데이터 변화           | D3             |
| path morph, 고급 타임라인 | GSAP 또는 Motion |

위 자료 중 가장 실무에 가까운 것은 [인터랙티브 SVG 와이어프레임 HTML](sandbox:/mnt/data/svg_animation_wireframe.html)입니다. 브라우저에서 열면 이미지형, 영상형, 와이어프레임형, 데이터형 SVG 애니메이션을 직접 눌러 비교할 수 있습니다.

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations "CSS animations - CSS | MDN"
[2]: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animate "<animate> - SVG | MDN"
[3]: https://mui.com/material-ui/react-progress/ "Circular, Linear progress React components - Material UI"
[4]: https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/ "DrawSVG | GSAP | Docs & Learning"
[5]: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateTransform "<animateTransform> - SVG | MDN"
[6]: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion "<animateMotion> - SVG | MDN"
[7]: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/ "MorphSVG | GSAP | Docs & Learning"
[8]: https://motion.dev/docs/react "Motion for React: Get started - React Animation Library | Motion React"
[9]: https://d3js.org/what-is-d3 "What is D3? | D3 by Observable"
[10]: https://github.com/airbnb/lottie-web "GitHub - airbnb/lottie-web: Render After Effects animations natively on Web, Android and iOS, and React Native. http://airbnb.io/lottie/ · GitHub"
[11]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion "prefers-reduced-motion CSS media feature - CSS | MDN"
[12]: https://w3c.github.io/writing-accessible-svg/accessible-svg.html "Writing accessible SVG - Editors' DRAFT"
