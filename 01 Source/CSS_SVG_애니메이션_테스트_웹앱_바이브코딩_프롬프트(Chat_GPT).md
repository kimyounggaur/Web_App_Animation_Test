# CSS&SVG 애니메이션 테스트 웹앱 개발용 바이브코딩 프롬프트

> 프로젝트명 후보: **CSS&SVG Motion Lab**  
> 사용자 표기인 `CSS&SGV`는 소스 문맥상 `CSS&SVG`로 해석한다. 단, 앱 안에는 “CSS&SGV / SVG Motion Lab”처럼 원문 표기도 함께 살려도 좋다.  
> 목적: `01 Source` 폴더에 있는 CSS 애니메이션 설명, SVG 애니메이션 설명, HTML 와이어프레임, 스토리보드/미리보기 자료를 통합하여 **실제로 눌러보고, hover하고, 스크롤하고, 코드까지 복사할 수 있는 최고 수준의 애니메이션 테스트 웹앱**을 만들도록 AI 코딩 에이전트에게 지시한다.

---

## 1. 이 프롬프트의 사용법

아래 **“복사용 최종 프롬프트”** 전체를 Cursor, Claude Code, Codex, Windsurf, Cline 같은 바이브코딩 도구에 그대로 붙여넣는다.  
이미 `01 Source` 폴더가 프로젝트에 있으면 코딩 에이전트가 먼저 그 폴더를 읽고, 없으면 이 문서의 요구사항만으로 구현하게 한다.

권장 실행 방식은 다음과 같다.

1. 빈 프로젝트 루트에 `01 Source` 폴더와 이 프롬프트 파일을 둔다.
2. 코딩 에이전트에게 “복사용 최종 프롬프트”를 붙여넣는다.
3. 에이전트가 제안한 파일 구조를 승인한다.
4. 단계별 커밋처럼 `Phase 0 → Phase 9` 순서로 만들게 한다.
5. 마지막에는 `npm install`, `npm run dev`, `npm run build`까지 확인시킨다.

---

## 2. 소스 통합 핵심 요약

이 섹션은 최종 프롬프트 안에도 반영되어 있다. 코딩 에이전트가 소스를 직접 읽지 못할 때도 방향을 잃지 않도록 정리한 설계 메모다.

### 2.1 CSS 애니메이션 쪽에서 반드시 가져올 것

- `Transition`: hover, focus, checked, class 변경처럼 **두 상태 사이를 보간**하는 데모.
- `@keyframes`: spinner, skeleton, pulse, shimmer, background motion처럼 **독립 타임라인**으로 반복되는 데모.
- `Transform / Opacity`: 성능 좋은 이동, 확대, 회전, fade, modal, toast, image zoom의 기본 원칙.
- `Timing function`: linear, ease-in, ease-out, ease-in-out, cubic-bezier spring을 같은 거리에서 비교하는 레이스 데모.
- `Scroll-driven`: reading progress, section reveal, parallax, sticky stepper, `animation-timeline: view()` 지원 여부와 JS fallback.
- `View Transition`: 목록 → 상세, gallery thumbnail → detail hero 전환. `document.startViewTransition` 지원 확인 및 fallback.
- `Image UI`: wrapper 고정 + 내부 이미지 `scale`, caption reveal, `clip-path`/mask reveal, thumbnail transition.
- `Video UI`: 영상 자체는 JS/video가 맡고 CSS는 play overlay, progress, subtitle, reel/card transition을 담당하는 구조.
- `Micro interactions`: 좋아요 pop, toggle, hamburger/X, ripple, loading button, toast, modal, tabs, accordion.
- `Accessibility`: `prefers-reduced-motion`, keyboard focus, `aria-pressed`, role/tablist/tabpanel, hover-only 금지.

### 2.2 SVG 애니메이션 쪽에서 반드시 가져올 것

- SVG 엔진 4종: **CSS SVG**, **SMIL**, **JavaScript/Web Animations API**, **Lottie/툴 기반**.
- SVG 기법 10종 이상:
  - transform/opacity
  - stroke drawing
  - `<animate>` 속성 보간
  - `<animateTransform>` 회전/확대/이동
  - `<animateMotion>` 경로 이동
  - path morphing
  - mask/clipPath reveal
  - filter glow/blur/noise
  - viewBox camera zoom
  - data visualization transition
  - Lottie/Bodymovin workflow 설명 카드
- 대표 실전 화면:
  - 랜딩 hero logo reveal
  - 결제/저장/업로드 idle → loading → success/error
  - 지도/배송 경로 motion path
  - 대시보드 chart update
  - 온보딩/빈 상태 Lottie 설명
  - 기술 문서/교육용 sequential path drawing
- SVG 접근성:
  - 의미 있는 SVG에는 `role="img"`, `<title>`, `<desc>` 또는 `aria-label`.
  - 장식용 SVG는 `aria-hidden="true"`.
  - 반복 모션은 reduced motion에서 멈추거나 간소화.

### 2.3 기존 와이어프레임에서 가져올 UI 방향

- 어두운 네이비/블루 계열 배경, 보라/청록/민트/옐로 포인트 컬러.
- grid overlay, glassmorphism 카드, rounded panel, code panel, sticky toolbar.
- “설명 카드 + 라이브 데모 + 코드 스니펫 + 컨트롤” 4요소를 한 세트로 반복.
- 탭 기반 탐색: 종류별 핵심, 이미지 UI, 영상 UI, 인터랙션, 스크롤/라우팅, SVG 엔진, SVG 실전, QA.
- 정적 설명 페이지가 아니라 **실시간 테스트 도구**여야 한다.

---

## 3. 복사용 최종 프롬프트

아래부터 끝까지 그대로 복사해서 코딩 에이전트에게 전달한다.

---

# BEGIN PROMPT

너는 **시니어 프론트엔드 엔지니어 + 모션 디자이너 + UX 교육용 인터랙티브 랩 제작자**다.  
현재 프로젝트 루트에는 `01 Source` 폴더가 있고, 그 안에는 CSS 애니메이션 설명 문서, SVG/SGV 애니메이션 설명 문서, 인터랙티브 HTML 와이어프레임, 스토리보드 이미지, SVG 인포그래픽, GIF 미리보기 자료가 들어 있다.

목표는 이 자료들을 단순 병합하는 것이 아니라, 교육용 설명과 실무 테스트 기능이 결합된 **최고 수준의 “CSS&SVG 애니메이션 테스트 웹앱”**을 개발하는 것이다.  
앱은 한국어 UI를 기본으로 하며, 사용자가 직접 hover, click, keyboard focus, scroll, slider 조작, play/pause, reduced motion, code copy를 테스트할 수 있어야 한다.

`SGV`라고 쓰인 자료명은 `SVG`의 오타 또는 사용자식 표기로 보고, 앱 안에서는 **CSS&SGV / SVG Motion Lab**처럼 원문과 정확한 용어를 함께 안내한다.

---

## A. 최종 산출물

다음 산출물을 만들어라.

1. **Vite + React + TypeScript** 기반 싱글 페이지 웹앱.
2. 외부 모션 라이브러리 없이 **CSS, inline SVG, TypeScript/DOM 제어**만으로 구현.
3. 빌드 및 실행 가능:
   - `npm install`
   - `npm run dev`
   - `npm run build`
4. 주요 파일:
   - `package.json`
   - `index.html`
   - `src/main.tsx`
   - `src/App.tsx`
   - `src/styles/tokens.css`
   - `src/styles/global.css`
   - `src/styles/animations.css`
   - `src/data/demos.ts`
   - `src/components/*`
   - `src/labs/*`
   - `README.md`
5. 모든 데모는 실제로 동작해야 하며, 각 데모에는 다음 4가지를 포함한다.
   - 무엇을 보여주는지 설명
   - 실제 라이브 애니메이션 무대
   - 사용자가 조작할 수 있는 컨트롤
   - 복사 가능한 핵심 코드 스니펫
6. 앱 자체가 하나의 테스트 웹앱이므로 “보기만 하는 문서”가 되면 실패다.

---

## B. 기술 제약

- React + TypeScript를 사용하되, animation 구현은 가능한 한 순수 CSS와 inline SVG로 한다.
- GSAP, anime.js, Framer Motion, Lottie 같은 외부 모션 라이브러리는 설치하지 않는다.
  - 단, 앱 안의 “확장 도구 설명 카드”에서 GSAP/Lottie/D3를 개념적으로 소개할 수는 있다.
- 이미지/영상 파일에 의존하지 말고, 대부분의 시각 요소는 CSS gradient, CSS shape, inline SVG로 만든다.
- `prefers-reduced-motion`을 반드시 반영한다.
- hover 전용 UX가 되지 않게 `focus-visible`, button click, keyboard interaction을 함께 제공한다.
- 브라우저 최신 기능인 `animation-timeline: view()`와 `document.startViewTransition()`은 feature detection 및 fallback을 넣는다.
- 의미 있는 SVG에는 `<title>`, `<desc>`, `role="img"` 또는 `aria-label`을 넣는다.
- 장식 SVG는 `aria-hidden="true" focusable="false"` 처리한다.
- 애니메이션 성능은 `transform`, `opacity`, `stroke-dashoffset` 중심으로 설계한다. `width`, `height`, `top`, `left`, `margin` 애니메이션은 데모 목적이 아니면 피한다.

---

## C. 앱 컨셉

앱 이름은 **CSS&SVG Motion Lab**으로 한다.

Hero 문구 예시:

> CSS와 SVG 애니메이션을 실제 UI로 테스트하기  
> Transition · Keyframes · Scroll-driven · View Transition · Image/Video UI · SVG Stroke/Motion/Path

앱은 다음 질문에 답해야 한다.

1. CSS 애니메이션에는 어떤 종류가 있고 언제 쓰는가?
2. SVG 애니메이션은 CSS, SMIL, JS 방식 중 무엇을 선택해야 하는가?
3. 실제 앱에서 버튼, 카드, 모달, toast, skeleton, 영상 overlay, 결제 상태, 차트, 로고 리빌은 어떻게 구현하는가?
4. 접근성과 성능을 해치지 않는 애니메이션 설계 기준은 무엇인가?
5. 각 패턴을 바로 복사해서 쓸 수 있는 최소 코드가 무엇인가?

---

## D. 디자인 시스템

`src/styles/tokens.css`에 다음 계열의 디자인 토큰을 정의한다.

```css
:root {
  --bg: #07111f;
  --bg-2: #0b1020;
  --surface: rgba(255, 255, 255, 0.08);
  --surface-strong: rgba(255, 255, 255, 0.14);
  --line: rgba(255, 255, 255, 0.14);
  --text: #f6f8ff;
  --muted: #a9b8cd;
  --brand: #7c8cff;
  --cyan: #75e6ff;
  --mint: #9af28b;
  --yellow: #ffcf70;
  --rose: #ff7e8a;
  --radius-xl: 28px;
  --radius-lg: 20px;
  --radius-md: 14px;
  --duration-fast: 180ms;
  --duration-normal: 360ms;
  --duration-slow: 900ms;
  --ease-out: cubic-bezier(.2, .8, .2, 1);
  --spring: cubic-bezier(.2, 1.4, .38, 1);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
```

필수 시각 요소:

- dark gradient background
- radial glow
- subtle grid overlay
- glass cards
- sticky segmented toolbar
- code panel with monospace font
- neon accent border on active tab/card
- responsive 1-column mobile layout
- desktop에서는 2~3 column card grid

light mode도 있으면 좋지만 필수는 아니다. 다만 theme toggle을 넣으면 최고 품질로 간주한다.

---

## E. 정보 구조와 라우팅

싱글 페이지 안에서 hash navigation 또는 state 기반 tabs를 사용한다. URL 라우터는 필수 아님.

필수 섹션:

1. `Overview` — 전체 분류, 선택 기준, 앱 사용법.
2. `CSS Lab` — Transition, Keyframes, Transform, Timing, Micro Interaction.
3. `Media UI` — Image UI, Video UI, Skeleton, Modal, Toast.
4. `Scroll & View` — Scroll-driven, Reading progress, View Transition fallback.
5. `SVG Lab` — CSS SVG, SMIL, JS 제어, Stroke drawing, Motion path, Morphing, Mask/Clip, Filter, viewBox, Data viz.
6. `Scenario Lab` — 결제/업로드, 대시보드, 지도 경로, 랜딩 hero, 온보딩/빈 상태.
7. `Recipe Library` — 복사 가능한 코드 레시피 모음.
8. `QA Checklist` — 성능, 접근성, fallback, reduced motion, keyboard test.

상단 sticky toolbar에는 다음 컨트롤을 넣어라.

- 섹션 탭
- 전체 애니메이션 pause/resume
- reduced motion 강제 토글
- theme toggle
- “모든 데모 리셋” 버튼
- “레시피 보기” 링크

---

## F. 데이터 설계

`src/data/demos.ts`에 데모 메타데이터를 정의한다. UI 텍스트를 하드코딩으로 흩뿌리지 말고, 가능한 한 데이터 기반으로 렌더링한다.

예시 타입:

```ts
export type DemoCategory =
  | "css-core"
  | "css-media"
  | "scroll-view"
  | "svg-core"
  | "scenario"
  | "recipe";

export interface DemoMeta {
  id: string;
  category: DemoCategory;
  title: string;
  subtitle: string;
  purpose: string;
  useCases: string[];
  techniques: string[];
  accessibilityNotes: string[];
  performanceNotes: string[];
  code: string;
}
```

각 데모 컴포넌트는 `DemoShell` 또는 `DemoCard` 안에서 공통 레이아웃으로 감싼다.

공통 카드 레이아웃:

- 상단: tag, title, subtitle
- 중앙: live stage
- 하단: controls
- 접힘 가능한 `CodePanel`
- “코드 복사” 버튼
- “실무 적용” pill list
- “접근성/성능 주의” mini note

---

## G. 컴포넌트 구조

다음 컴포넌트를 만들고 재사용한다.

```txt
src/
  main.tsx
  App.tsx
  data/
    demos.ts
    recipes.ts
  components/
    AppShell.tsx
    Hero.tsx
    GlobalToolbar.tsx
    SectionNav.tsx
    DemoShell.tsx
    CodePanel.tsx
    CopyButton.tsx
    Pill.tsx
    SupportBadge.tsx
    MetricCard.tsx
    ResetContext.tsx
  labs/
    overview/
      OverviewMatrix.tsx
    css/
      TransitionCardDemo.tsx
      KeyframeLoaderDemo.tsx
      TransformPlayground.tsx
      TimingCurveRace.tsx
      MicroInteractionGallery.tsx
    media/
      ImageZoomRevealDemo.tsx
      ClipMaskRevealDemo.tsx
      VideoOverlayDemo.tsx
      SkeletonDemo.tsx
      ModalToastDemo.tsx
    scroll/
      ScrollProgressDemo.tsx
      ViewTimelineDemo.tsx
      ViewTransitionDemo.tsx
    svg/
      SvgEngineComparison.tsx
      StrokeDrawLogoDemo.tsx
      SmilMotionDemo.tsx
      MotionPathDemo.tsx
      PathMorphDemo.tsx
      SvgMaskFilterDemo.tsx
      ViewBoxCameraDemo.tsx
      SvgDataVizDemo.tsx
    scenarios/
      PaymentStateMachineDemo.tsx
      DashboardUpdateDemo.tsx
      MapRouteStoryDemo.tsx
      LandingHeroStoryboardDemo.tsx
    qa/
      ChecklistPanel.tsx
      BrowserSupportPanel.tsx
  styles/
    tokens.css
    global.css
    animations.css
```

---

## H. 전역 상태

`App.tsx` 또는 Context에서 다음 상태를 관리한다.

```ts
type MotionMode = "normal" | "paused" | "reduced";
type ThemeMode = "dark" | "light";
```

전역 상태 동작:

- `paused`: body에 `.is-paused` 추가. CSS animation-play-state를 pause.
- `reduced`: body에 `.reduce-motion` 추가. animation/transition duration을 최소화하고 scroll behavior를 auto로.
- OS-level `prefers-reduced-motion: reduce` 감지 시 최초 상태는 `reduced`로 시작.
- toolbar 버튼의 `aria-pressed`를 정확히 반영.
- 모든 데모 리셋 버튼은 CustomEvent 또는 Context reset counter로 각 데모 상태를 초기화.

CSS 예시:

```css
body.is-paused [data-animated="true"],
body.is-paused [data-animated="true"] * {
  animation-play-state: paused !important;
}

body.reduce-motion *,
body.reduce-motion *::before,
body.reduce-motion *::after {
  animation-duration: 1ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 1ms !important;
  scroll-behavior: auto !important;
}
```

---

## I. 필수 데모 상세 사양

### I-1. Overview Matrix

목적: 사용자가 먼저 “어떤 애니메이션을 언제 써야 하는지” 결정할 수 있게 한다.

표 컬럼:

- 상황
- 추천 방식
- 실제 적용
- 핵심 CSS/SVG
- fallback/주의점

필수 행:

1. 버튼/카드 hover → transition
2. 로딩/상태 표시 → keyframes
3. 이미지 카드 → transition + transform + clip/mask
4. 영상 플레이어 → transition + keyframes + JS state
5. 긴 랜딩 페이지 → scroll-driven + IntersectionObserver fallback
6. 목록→상세 → View Transition + fallback
7. 로고/체크 drawing → SVG stroke-dashoffset
8. 지도/배송 경로 → animateMotion 또는 JS motion path
9. 대시보드 → SVG rect/path transition 또는 D3 개념
10. 복잡 일러스트 → Lottie/툴 기반 설명 카드

---

### I-2. Transition Card Demo

라이브 무대:

- 커머스 상품 카드.
- hover/focus 시 카드가 위로 lift, 내부 제품 이미지가 살짝 rotate/scale, shadow 증가.
- 장바구니 버튼 click 시 micro pop.

필수 코드:

```css
.product-card {
  transform: translateY(0) scale(1);
  transition:
    transform 320ms cubic-bezier(.2, 1.4, .38, 1),
    box-shadow 320ms ease,
    border-color 320ms ease;
}
.product-card:hover,
.product-card:focus-within {
  transform: translateY(-10px) scale(1.025);
}
.product-card__visual {
  overflow: hidden;
}
.product-card__visual > svg {
  transition: transform 900ms cubic-bezier(.2, .8, .2, 1);
}
.product-card:hover .product-card__visual > svg {
  transform: scale(1.12) rotate(-2deg);
}
```

테스트:

- hover 가능.
- keyboard tab focus에서도 같은 전환.
- reduced motion에서 transform이 과하지 않게 즉시 상태만 바뀜.

---

### I-3. Keyframe Loader Demo

라이브 무대:

- 이중 원형 loader.
- skeleton shimmer list.
- badge pulse.
- 사용자가 “play/pause”, “속도 0.5x/1x/2x”를 바꿀 수 있음.

필수 코드:

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
.loader-ring {
  transform-origin: center;
  animation: spin 950ms linear infinite;
}

@keyframes shimmer {
  100% { transform: translateX(160%); }
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.24), transparent);
  animation: shimmer 1.4s ease-in-out infinite;
}
```

---

### I-4. Transform Playground

라이브 무대:

- 중앙 SVG/카드 하나를 대상으로 `translateX`, `translateY`, `rotate`, `scale`, `skew`, `opacity` slider를 제공.
- 오른쪽 code panel에 현재 transform 코드가 실시간 반영.

컨트롤:

- translateX: -120px ~ 120px
- translateY: -80px ~ 80px
- rotate: -180deg ~ 180deg
- scale: 0.4 ~ 1.8
- skewX: -40deg ~ 40deg
- opacity: 0.2 ~ 1
- reset button

학습 포인트:

- `transform`과 `opacity`는 성능 좋은 대표 속성.
- layout 속성보다 compositing-friendly.

---

### I-5. Timing Curve Race

라이브 무대:

- 5개의 공이 같은 거리, 같은 duration으로 이동.
- 각각 `linear`, `ease-in`, `ease-out`, `ease-in-out`, `spring cubic-bezier`.
- “동시에 재생” 버튼으로 transition replay.

필수:

- `void element.offsetWidth` 또는 key state 변경으로 transition restart.
- 각 timing의 실제 사용처 설명:
  - linear: progress/loader
  - ease-in: 퇴장
  - ease-out: 등장
  - ease-in-out: 양방향 UI
  - spring: pop/lift/like

---

### I-6. Micro Interaction Gallery

필수 데모:

1. Like heart pop + small particles
2. Toggle switch
3. Hamburger → X
4. Ripple button
5. Loading button: idle → loading → success
6. Toast: enter/exit
7. Modal: backdrop fade + card translate/scale
8. Tabs: sliding indicator
9. Accordion: smooth expand/collapse

각 데모에 `aria-pressed`, `role="switch"`, keyboard Enter/Space 처리.

---

### I-7. Image UI Lab

필수 데모:

1. Image card zoom + caption reveal
2. Clip-path/mask reveal using pointer position CSS variables
3. Gallery thumbnail transition
4. Ken Burns slow pan using transform

구현 방식:

- 실제 이미지 파일 없이 inline SVG landscape 또는 gradient placeholder 사용.
- wrapper는 고정, 내부만 transform.
- pointermove로 `--x`, `--y` 설정해서 circular reveal.

필수 코드:

```css
.image-card {
  overflow: hidden;
}
.image-card__visual {
  transform: scale(1);
  transition: transform 900ms cubic-bezier(.2,.8,.2,1), filter 900ms;
}
.image-card:hover .image-card__visual {
  transform: scale(1.13);
}
.reveal-layer {
  clip-path: circle(0% at var(--x, 50%) var(--y, 50%));
  transition: clip-path 700ms cubic-bezier(.2,.8,.2,1);
}
.reveal-card:hover .reveal-layer,
.reveal-card.is-open .reveal-layer {
  clip-path: circle(76% at var(--x, 50%) var(--y, 50%));
}
```

---

### I-8. Video UI Lab

목적: video 파일이 없어도 영상 UI의 상태 애니메이션을 테스트한다.

필수 데모:

1. Video player shell
2. Play overlay fade/scale
3. Progress animation
4. Subtitle enter/exit
5. Preview hover
6. Short-form reel transition

상태:

- `isPlaying` true/false
- progress bar animation only when playing
- reduced motion에서는 progress animation을 멈추고 상태값만 표시

필수 코드:

```css
.video-shell.is-playing .play-button {
  transform: scale(.72);
  opacity: 0;
}
.video-shell.is-playing .progress-fill {
  animation: videoProgress 8s linear infinite;
}
@keyframes videoProgress {
  from { width: 0%; }
  to { width: 100%; }
}
.subtitle {
  transform: translateY(12px);
  opacity: 0;
  transition: transform 320ms var(--spring), opacity 320ms ease;
}
.video-shell.is-playing .subtitle {
  transform: translateY(0);
  opacity: 1;
}
```

---

### I-9. Scroll & View Lab

필수 데모 1: Reading Progress

- 페이지 또는 데모 박스 스크롤에 따라 상단 progress fill.
- JS scroll listener는 passive로.

필수 데모 2: Scroll-driven Section Reveal

- `@supports (animation-timeline: view())` 사용.
- 미지원 브라우저는 IntersectionObserver fallback.

필수 코드:

```css
@supports (animation-timeline: view()) {
  .scroll-step {
    animation: fadeUp linear both;
    animation-timeline: view();
    animation-range: entry 8% cover 38%;
  }
}
```

필수 데모 3: View Transition

- 목록 grid와 상세 screen이 전환.
- `document.startViewTransition` 지원 시 사용.
- 미지원/ reduced motion 시 class swap fallback.

필수 코드:

```ts
function updateView() {
  setRoute((prev) => prev === "list" ? "detail" : "list");
}

if (!("startViewTransition" in document) || motionMode === "reduced") {
  updateView();
} else {
  document.startViewTransition(updateView);
}
```

CSS:

```css
.route-card {
  view-transition-name: route-card;
}
.detail-hero {
  view-transition-name: detail-hero;
}
::view-transition-group(route-card),
::view-transition-group(detail-hero) {
  animation-duration: 420ms;
  animation-timing-function: cubic-bezier(.2,.8,.2,1);
}
```

---

### I-10. SVG Engine Comparison

4개의 엔진 카드를 만든다.

1. CSS SVG Animation
   - 핵심: `@keyframes`, `transition`, `transform`, `stroke-dasharray`
   - 용도: icon hover, spinner, button feedback, logo reveal
2. SMIL
   - 핵심: `<animate>`, `<animateTransform>`, `<animateMotion>`
   - 용도: standalone SVG, repeated icon, path movement
3. JavaScript / Web Animations API
   - 핵심: state, click, scroll, API, data update
   - 용도: dashboard, route, payment state, complex timeline
4. Tool/Lottie
   - 핵심: After Effects → Bodymovin JSON → renderer
   - 용도: onboarding, empty state, complex illustration

각 카드는 작은 inline SVG motion preview를 포함한다.

---

### I-11. Stroke Draw Logo Demo

목적: 로고 선이 그려지는 효과.

필수:

- `stroke-dasharray`, `stroke-dashoffset` 사용.
- JS로 `getTotalLength()`를 측정해 정확한 길이를 세팅하는 옵션.
- “다시 그리기” 버튼.
- “auto length 측정” toggle.

필수 코드:

```ts
const length = path.getTotalLength();
path.style.strokeDasharray = String(length);
path.style.strokeDashoffset = String(length);
requestAnimationFrame(() => {
  path.style.transition = "stroke-dashoffset 1800ms cubic-bezier(.2,.8,.2,1)";
  path.style.strokeDashoffset = "0";
});
```

---

### I-12. SMIL Motion Demo

3개 미니 데모를 제공한다.

1. `<animate>`: circle radius/opacity pulse.
2. `<animateTransform>`: gear/spinner rotate.
3. `<animateMotion>`: dot following a curve.

중요:

- SMIL은 inline SVG 안에서 직접 재생됨.
- pause/resume은 가능하면 SVG DOM의 `pauseAnimations()`/`unpauseAnimations()`도 사용한다.
- global pause 버튼과 연결한다.

---

### I-13. Motion Path Demo

목적: 배송/지도/여정/데이터 흐름.

라이브 무대:

- 굽은 path를 따라 marker가 이동.
- path stroke는 dash animation으로 그려짐.
- marker에 glow/pulse.
- “배송”, “여행”, “데이터 파이프라인” preset path 선택.

구현:

- SMIL `<animateMotion>` 또는 CSS `offset-path` 중 안정적인 방식을 선택.
- `mpath href="#route"` 사용 가능.

---

### I-14. Path Morph Demo

목적: 형태 변형의 원리와 한계를 설명.

라이브 무대:

- play icon ↔ pause icon
- hamburger ↔ X는 CSS transform으로 별도 카드에서 이미 구현
- blob morph는 SVG `<animate attributeName="d">`로 구현

설명:

- path morph는 시작/끝 path의 command 구조와 point 수가 맞아야 부드럽다.
- 복잡한 morph는 GSAP MorphSVG, flubber 같은 도구를 쓸 수 있음을 설명 카드에 넣는다.
- 외부 라이브러리는 설치하지 않는다.

---

### I-15. Mask / Clip / Filter Demo

필수 데모:

1. clipPath reveal
2. SVG mask reveal
3. filter glow
4. blur/noise 느낌의 animated orb

접근성:

- 장식용 filter/orb는 `aria-hidden`.
- 색으로만 상태를 전달하지 말고 텍스트 label 병행.

---

### I-16. ViewBox Camera Demo

목적: SVG의 `viewBox`를 카메라처럼 활용.

라이브 무대:

- 전체 아키텍처 다이어그램: Client → API → DB → Analytics.
- 버튼 클릭 시 특정 노드로 줌인.
- `viewBox` 값을 state로 바꾸고 transition은 CSS 또는 JS interpolation으로 처리.
- 단순 구현이면 SVG 내부 `<animate attributeName="viewBox">` 예시도 함께 표시.

---

### I-17. SVG Data Visualization Demo

목적: 막대/라인 차트 업데이트.

필수:

- 4~6개 bar SVG rect.
- “랜덤 데이터 갱신” 버튼.
- y/height 속성을 CSS transition 또는 React state로 부드럽게 업데이트.
- reduced motion에서는 transition duration 짧게.
- code panel에는 D3로 확장할 때의 pseudo snippet도 포함.

---

### I-18. Payment State Machine Scenario

이 앱에서 가장 실무적인 통합 데모다.

라이브 무대:

- 모바일 결제 카드 UI를 inline SVG + CSS로 구성.
- 상태: `idle`, `loading`, `success`, `error`.
- 버튼:
  - 결제하기
  - 로딩
  - 성공
  - 오류
  - 자동 시퀀스 실행
  - reset

각 상태 애니메이션:

- idle: button highlight subtle pulse 없음 또는 약한 hover.
- loading: spinner rotate.
- success: button color mint, circle + check stroke drawing.
- error: rose color, X icon + shake.

필수 코드:

```ts
type PaymentState = "idle" | "loading" | "success" | "error";

const labelByState: Record<PaymentState, string> = {
  idle: "결제하기",
  loading: "처리 중",
  success: "완료",
  error: "다시 시도"
};
```

ARIA:

- 상태 텍스트는 `aria-live="polite"` 영역에 표시.
- 버튼 disabled는 loading 중에만.

---

### I-19. Dashboard Update Scenario

라이브 무대:

- mini dashboard cards.
- SVG bar/line chart.
- “새 데이터 수신” 버튼.
- 숫자는 count-up effect.
- chart는 transform/height transition.
- skeleton loading과 실제 데이터 전환을 포함하면 더 좋음.

---

### I-20. Landing Hero Storyboard Scenario

기존 스토리보드/인포그래픽 감성을 앱 hero에 반영한다.

Hero 안에:

- 큰 제목
- subtitle chips: Transition, Keyframes, Scroll-driven, View Transition, Image/Video UI, SVG
- 6개 preview cards:
  - Transition
  - Keyframes
  - Scroll-driven
  - View Transition
  - Image UI
  - Video UI
- 각 카드에는 미니 SVG 또는 CSS motion icon.

이 섹션은 “앱의 목차이자 움직이는 인포그래픽” 역할을 한다.

---

## J. Recipe Library

사용자가 코드만 빠르게 가져갈 수 있는 레시피 섹션을 만든다.

필수 recipe:

1. Button hover transition
2. Card lift
3. Spinner
4. Skeleton shimmer
5. Modal enter/exit
6. Toast enter/exit
7. Image zoom/caption reveal
8. Clip-path reveal
9. Video overlay/progress
10. Scroll reveal with `animation-timeline` + fallback note
11. View Transition route swap
12. SVG stroke drawing
13. SVG motion path
14. SVG payment success check
15. Reduced motion global CSS

각 recipe는:

- 제목
- 언제 쓰는가
- 코드
- “복사” 버튼
- 주의점 1개

---

## K. QA Checklist 섹션

체크리스트를 실제 앱 안에 넣는다. 각 항목은 체크 가능한 UI로 만들어도 좋다.

필수 체크 항목:

### 성능

- transform/opacity 우선인가?
- layout-triggering 속성을 불필요하게 애니메이션하지 않는가?
- 무한 반복 애니메이션 수가 과하지 않은가?
- SVG filter가 너무 큰 영역에 적용되지 않는가?
- DevTools Performance에서 jank를 확인했는가?

### 접근성

- `prefers-reduced-motion` 대응이 있는가?
- 전체 pause/resume이 가능한가?
- keyboard focus에서도 동작하는가?
- hover-only interaction이 없는가?
- `aria-pressed`, `aria-expanded`, `role="switch"`, `aria-live`가 필요한 곳에 있는가?
- 의미 있는 SVG에 title/desc가 있는가?

### Fallback

- `animation-timeline: view()` 미지원 fallback이 있는가?
- `document.startViewTransition` 미지원 fallback이 있는가?
- SMIL이 꺼진 환경에서도 핵심 UI가 깨지지 않는가?
- JS 오류가 나도 기본 콘텐츠가 보이는가?

### UX

- 모션 목적이 상태/방향/계층/피드백 중 하나로 설명되는가?
- 150~450ms 구간의 마이크로 인터랙션이 과하지 않은가?
- 사용자 조작에 대한 피드백이 즉시 보이는가?
- 복사 가능한 코드가 실제 데모와 일치하는가?

---

## L. 구현 순서

아래 순서로 반드시 진행하라. 각 Phase 완료 후 간단한 자체 검수를 남겨라.

### Phase 0 — 소스 분석

1. `01 Source` 폴더의 모든 `.md`, `.html`, `.svg`, `.png`, `.gif` 파일명을 확인한다.
2. CSS 관련 자료에서 데모/패턴/코드 스니펫을 추출한다.
3. SVG 관련 자료에서 엔진/기법/실전 사례를 추출한다.
4. 겹치는 내용은 중복 제거하고, 좋은 UI/애니메이션 아이디어는 하나의 통합 앱 구조로 재배치한다.
5. `README.md`에 “참고 소스 요약”을 10줄 이하로 적는다.

### Phase 1 — 프로젝트 세팅

1. Vite React TS 프로젝트 생성.
2. 기본 CSS reset, tokens, global layout 작성.
3. app shell, hero, toolbar, section nav를 만든다.
4. build가 되는지 먼저 확인한다.

### Phase 2 — 공통 컴포넌트

1. `DemoShell`, `CodePanel`, `CopyButton`, `Pill`, `SupportBadge` 구현.
2. code copy는 `navigator.clipboard.writeText` 사용, fallback 메시지 제공.
3. 공통 live stage 디자인 완성.
4. 모바일 responsive를 먼저 확보.

### Phase 3 — CSS Core Lab

1. TransitionCardDemo
2. KeyframeLoaderDemo
3. TransformPlayground
4. TimingCurveRace
5. MicroInteractionGallery

각 데모마다 live + controls + code panel + notes를 넣는다.

### Phase 4 — Media UI Lab

1. ImageZoomRevealDemo
2. ClipMaskRevealDemo
3. VideoOverlayDemo
4. SkeletonDemo
5. ModalToastDemo

실제 이미지/영상 파일 없이 gradient/SVG placeholder로 구현한다.

### Phase 5 — Scroll & View Lab

1. ScrollProgressDemo
2. ViewTimelineDemo with fallback
3. ViewTransitionDemo with fallback
4. 지원 여부 badge 표시:
   - `CSS.supports("animation-timeline: view()")`
   - `"startViewTransition" in document`

### Phase 6 — SVG Lab

1. SvgEngineComparison
2. StrokeDrawLogoDemo
3. SmilMotionDemo
4. MotionPathDemo
5. PathMorphDemo
6. SvgMaskFilterDemo
7. ViewBoxCameraDemo
8. SvgDataVizDemo

SVG는 가능한 inline으로 작성하고, 접근성 속성을 넣는다.

### Phase 7 — Scenario Lab

1. PaymentStateMachineDemo
2. DashboardUpdateDemo
3. MapRouteStoryDemo
4. LandingHeroStoryboardDemo

이 섹션은 앱의 하이라이트다. “실무에서 바로 보는 화면”처럼 보여야 한다.

### Phase 8 — Recipe Library & QA

1. recipes.ts 작성.
2. 코드 복사 기능 연결.
3. QA checklist UI 작성.
4. reduced motion / pause / reset이 모든 데모에 적용되는지 확인.

### Phase 9 — 최종 polish

1. `npm run build` 통과.
2. TypeScript 오류 0개.
3. console error 0개.
4. Lighthouse 또는 자체 checklist 관점에서 접근성 점검.
5. README에 실행 방법, 주요 기능, 기술 선택 이유, fallback 설명 작성.
6. 최종 결과를 한국어로 요약.

---

## M. 수용 기준

다음 기준을 만족해야 완료다.

### 필수 기능 기준

- [ ] app이 정상 실행된다.
- [ ] hero와 sticky toolbar가 있다.
- [ ] CSS lab에 최소 5개 이상의 실제 조작 데모가 있다.
- [ ] SVG lab에 최소 8개 이상의 실제 조작/재생 데모가 있다.
- [ ] Scroll/View lab에 feature detection과 fallback이 있다.
- [ ] Payment state machine 데모가 있다.
- [ ] CodePanel의 복사 버튼이 동작한다.
- [ ] pause/resume 전역 버튼이 동작한다.
- [ ] reduced motion 토글이 동작한다.
- [ ] keyboard focus로 주요 인터랙션을 사용할 수 있다.
- [ ] SVG title/desc 또는 aria-label이 들어가 있다.

### 품질 기준

- [ ] UI가 기존 소스의 blue/purple/cyan glassmorphism 감성을 반영한다.
- [ ] 설명은 한국어이며 실무 예시 중심이다.
- [ ] 각 데모는 “왜 쓰는가”가 명확하다.
- [ ] 애니메이션은 과하지 않고 목적이 있다.
- [ ] transform/opacity 중심으로 성능을 고려한다.
- [ ] 복잡한 기능도 fallback이 있어 화면이 깨지지 않는다.
- [ ] 모바일에서 카드가 1열로 자연스럽게 내려간다.

---

## N. README 작성 요구사항

`README.md`에는 다음을 포함한다.

```md
# CSS&SVG Motion Lab

## 실행
npm install
npm run dev
npm run build

## 주요 기능
- CSS Transition / Keyframes / Transform / Timing 테스트
- Image / Video UI 애니메이션 테스트
- Scroll-driven / View Transition fallback 테스트
- SVG CSS / SMIL / JS 제어형 애니메이션 테스트
- Stroke drawing / Motion path / Morph / Mask / Filter / viewBox / Data Viz
- 결제 상태 머신, 대시보드, 지도 경로 등 실무 시나리오
- Reduced motion, pause/resume, code copy, keyboard 접근성

## 기술 선택
순수 CSS, inline SVG, TypeScript state를 중심으로 구현했다. 외부 모션 라이브러리는 학습 목적상 사용하지 않았다.

## 접근성
prefers-reduced-motion, aria, keyboard focus, SVG title/desc를 반영했다.

## Fallback
Scroll-driven animation과 View Transition API는 feature detection으로 fallback 처리했다.
```

---

## O. 구현 시 특히 조심할 점

1. `transition: all`을 남발하지 말고 실제 바뀌는 속성을 지정하라.
2. 무한 반복 애니메이션은 pause/reduced motion에서 반드시 멈춰라.
3. 인터랙션 가능한 div는 가능하면 button으로 만들고, div를 써야 하면 role/tabindex/keyboard handler를 넣어라.
4. SVG path morph는 point 구조가 맞지 않으면 깨지므로 단순하고 안정적인 path를 사용하라.
5. `clip-path`와 `filter`는 과한 영역에 적용하면 성능이 떨어질 수 있으니 작은 데모 영역에서만 사용하라.
6. View Transition API는 브라우저 지원이 제한적이므로 fallback을 반드시 넣어라.
7. Scroll-driven CSS도 fallback을 반드시 넣어라.
8. 데모 코드와 실제 구현 코드가 너무 다르면 안 된다. 사용자가 복사해도 이해 가능한 최소 코드로 맞춰라.
9. 소스 문서 내용을 그대로 장황하게 붙이지 말고, “테스트 가능한 웹앱”으로 재구성하라.
10. 마지막에 반드시 직접 빌드해 오류를 고쳐라.

---

## P. 최종 응답 형식

구현이 끝나면 다음 형식으로 보고하라.

```md
완료했습니다.

## 실행 방법
- npm install
- npm run dev
- npm run build

## 구현한 핵심 기능
1. ...
2. ...

## 확인한 사항
- TypeScript 오류: 없음
- Build: 성공
- Reduced motion: 확인
- View Transition fallback: 확인
- Scroll-driven fallback: 확인

## 주요 파일
- src/App.tsx
- src/labs/css/...
- src/labs/svg/...
- src/styles/...
```

# END PROMPT

---

## 4. 빠른 축약 버전

아래는 아주 짧게 지시해야 할 때 쓰는 버전이다. 단, 실제 품질은 위의 전체 프롬프트를 쓰는 편이 훨씬 좋다.

```text
01 Source 폴더의 CSS 애니메이션 자료와 SVG/SGV 애니메이션 자료를 모두 분석해서, React+TypeScript+Vite 기반의 한국어 인터랙티브 웹앱 “CSS&SVG Motion Lab”을 만들어줘. 단순 설명 페이지가 아니라 Transition, @keyframes, transform, timing, image/video UI, scroll-driven, View Transition, SVG CSS/SMIL/JS, stroke drawing, animateMotion, morph, mask/filter, viewBox, data viz, 결제 상태 머신 등을 실제로 눌러보고 테스트할 수 있는 앱이어야 해. 외부 모션 라이브러리는 쓰지 말고 순수 CSS, inline SVG, TypeScript state로 구현해. 각 데모는 설명, 라이브 무대, 조작 컨트롤, 복사 가능한 코드 스니펫, 접근성/성능 주의점을 포함해. prefers-reduced-motion, 전역 pause/resume, keyboard focus, aria, SVG title/desc, scroll/view transition fallback을 반드시 구현하고 npm run build까지 통과시켜줘.
```

---

## 5. 개발자가 놓치기 쉬운 추가 요구사항 체크리스트

- [ ] “설명”보다 “테스트” 중심인가?
- [ ] 각 데모에 상태를 바꾸는 컨트롤이 있는가?
- [ ] 코드 복사 기능이 있는가?
- [ ] pause/reduced motion이 SVG/SMIL까지 최대한 반영되는가?
- [ ] View Transition 미지원 브라우저에서도 화면 전환이 되는가?
- [ ] Scroll-driven 미지원 브라우저에서도 섹션 reveal이 되는가?
- [ ] `SGV` 표기를 `SVG`로 자연스럽게 안내했는가?
- [ ] CSS와 SVG를 별도 챕터로만 두지 않고 결제/대시보드/지도 같은 통합 시나리오로 묶었는가?
- [ ] 사용자가 이 앱을 열면 “아, 이건 실무 애니메이션 테스트 도구다”라고 느끼는가?

