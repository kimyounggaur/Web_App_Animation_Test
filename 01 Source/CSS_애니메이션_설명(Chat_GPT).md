아래 3개 파일로 **이미지 + 영상 + 인터랙티브 와이어프레임** 형식까지 같이 정리해두었습니다.

* [인터랙티브 HTML 와이어프레임 열기](sandbox:/mnt/data/css_animation_wireframe_demo.html)
* [요약 이미지 PNG 보기](sandbox:/mnt/data/css_animation_storyboard.png)
* [요약 영상 MP4 보기](sandbox:/mnt/data/css_animation_demo_video.mp4)

## 핵심 분류

CSS 애니메이션은 실무에서 보통 **상태 변화형**, **시간표형**, **입력 연동형**, **화면 전환형**, **미디어 연출형**으로 나누면 이해하기 쉽습니다. `transition`은 `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay` 등을 묶는 shorthand이며, `transition-duration`의 기본값은 `0s`라서 시간을 지정하지 않으면 눈에 보이는 전환이 없습니다. ([MDN 웹 문서][1])

| 종류                               | 언제 쓰는가                                    | 실제 적용사례                                                       | 대표 CSS                                                   |
| -------------------------------- | ----------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| **Transition**                   | hover, focus, class 변경처럼 두 상태 사이를 부드럽게 연결 | 버튼 hover, 상품 카드 lift, 드롭다운 열림, 토글 스위치                         | `transition`, `transform`, `opacity`                     |
| **@keyframes Animation**         | 자동 실행, 반복, 단계별 움직임이 필요할 때                 | 로딩 spinner, skeleton shimmer, 알림 badge pulse, 배경 gradient 이동  | `@keyframes`, `animation`                                |
| **Transform / Opacity 중심 애니메이션** | 성능 좋은 움직임이 필요할 때                          | 카드 이동, 모달 등장, 이미지 zoom, toast enter/exit                      | `translate`, `scale`, `rotate`, `opacity`                |
| **Scroll-driven Animation**      | 스크롤 위치가 애니메이션 진행률이 되어야 할 때                | 읽기 progress bar, parallax, 섹션 reveal, 제품 스토리텔링                | `animation-timeline`, `view()`                           |
| **View Transition**              | 목록→상세, 페이지/라우트 이동을 자연스럽게 연결할 때            | 갤러리 썸네일이 상세 이미지로 이어짐, SPA/MPA 화면 전환                           | `document.startViewTransition()`, `view-transition-name` |
| **SVG Stroke Animation**         | 선이 그려지는 느낌이 필요할 때                         | 결제 성공 체크, 업로드 완료, 로고 드로잉                                      | `stroke-dasharray`, `stroke-dashoffset`                  |
| **Image / Video UI Animation**   | 미디어 콘텐츠 몰입도를 높일 때                         | 이미지 zoom/reveal, 영상 play overlay, progress, subtitle, reel 전환 | `clip-path`, `mask`, `opacity`, `keyframes`              |

`animation` shorthand는 `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`, `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, `animation-play-state`, `animation-timeline` 등을 묶습니다. 시간 기반 애니메이션에서 `animation-duration`을 지정하지 않으면 기본값이 `0s`라서 사용자에게 보이는 움직임이 없을 수 있습니다. ([MDN 웹 문서][2])

## 실제 적용을 아주 구체적으로 보면

**1. 버튼/CTA micro-interaction**
사용자가 버튼 위에 마우스를 올리거나 키보드 focus를 했을 때 `translateY(-2px)`, `box-shadow`, `background`를 150~250ms 정도로 전환합니다. 목적은 “누를 수 있는 요소”라는 피드백을 주는 것입니다. `transition: all`보다는 실제로 바꿀 속성만 지정하는 편이 좋습니다.

```css
.cta {
  transform: translateY(0);
  transition:
    transform 180ms cubic-bezier(.2,.8,.2,1),
    box-shadow 180ms ease;
}

.cta:hover,
.cta:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0,0,0,.18);
}
```

**2. 상품 카드 hover / 이미지 zoom**
커머스, 여행, 포트폴리오 카드에서 많이 씁니다. 카드 전체는 살짝 떠오르고, 내부 이미지는 wrapper 안에서만 확대합니다. wrapper에 `overflow: hidden`을 두면 레이아웃은 고정되고 이미지만 확대됩니다.

```css
.product-card {
  transition: transform 320ms cubic-bezier(.2,1.4,.38,1);
}

.product-card:hover {
  transform: translateY(-10px) scale(1.02);
}

.product-card__image {
  overflow: hidden;
}

.product-card__image img {
  transform: scale(1);
  transition: transform 900ms cubic-bezier(.2,.8,.2,1);
}

.product-card:hover img {
  transform: scale(1.12);
}
```

**3. 로딩 spinner / skeleton shimmer**
데이터가 도착하기 전 빈 화면을 보여주지 않기 위해 skeleton을 씁니다. shimmer는 `linear-gradient`를 `translateX()`로 이동시키는 방식이 흔합니다.

```css
.skeleton {
  position: relative;
  overflow: hidden;
  background: rgba(255,255,255,.12);
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,.24),
    transparent
  );
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer {
  to {
    transform: translateX(160%);
  }
}
```

**4. 모달 enter/exit**
모달은 backdrop은 `opacity`, 카드 본체는 `translateY + scale + opacity` 조합이 자연스럽습니다. 등장 시간은 보통 240~380ms 정도가 무난합니다.

```css
.modal-backdrop {
  opacity: 0;
  pointer-events: none;
  transition: opacity 240ms ease;
}

.modal {
  opacity: 0;
  transform: translateY(20px) scale(.96);
  transition:
    transform 320ms cubic-bezier(.2,1.4,.38,1),
    opacity 240ms ease;
}

.modal-backdrop.is-open {
  opacity: 1;
  pointer-events: auto;
}

.modal-backdrop.is-open .modal {
  opacity: 1;
  transform: translateY(0) scale(1);
}
```

**5. 영상 플레이어 UI**
영상 자체의 재생은 보통 `<video>`와 JS가 맡고, CSS는 play button fade, control bar, progress, subtitle 등장 같은 “상태 표현”을 담당합니다.

```css
.video.is-playing .play-button {
  transform: scale(.72);
  opacity: 0;
}

.video.is-playing .progress span {
  animation: videoProgress 8s linear infinite;
}

@keyframes videoProgress {
  from { width: 0%; }
  to   { width: 100%; }
}
```

**6. 스크롤 기반 랜딩 페이지**
스크롤 기반 애니메이션은 시간 대신 스크롤 위치를 timeline으로 씁니다. MDN은 CSS scroll-driven animations가 기본 시간 기반 document timeline 대신 scroll-based timeline을 따라 속성 값을 애니메이션할 수 있게 한다고 설명합니다. ([MDN 웹 문서][3])

```css
@supports (animation-timeline: view()) {
  .section-card {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 40%;
  }
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**7. 목록→상세 View Transition**
View Transition은 화면이 바뀔 때 이전 뷰와 새 뷰를 스냅샷으로 연결합니다. `view-transition-name`은 특정 요소가 별도 snapshot에 참여하도록 지정해서 전체 화면 cross-fade와 별개로 이미지, 제목, caption 등을 따로 움직일 수 있게 합니다. ([MDN 웹 문서][4])

```js
function updateView() {
  app.dataset.route =
    app.dataset.route === "home" ? "detail" : "home";
}

if (!document.startViewTransition) {
  updateView();
} else {
  document.startViewTransition(updateView);
}
```

```css
.thumbnail,
.detail-hero {
  view-transition-name: product-image;
}

::view-transition-group(product-image) {
  animation-duration: 420ms;
}
```

## 성능과 접근성 기준

성능 면에서는 가능한 한 `transform`과 `opacity` 중심으로 설계하는 것이 안전합니다. web.dev는 가능한 경우 애니메이션을 `opacity`와 `transform`으로 제한해 compositing 단계에 머무르게 하라고 권장합니다. ([web.dev][5])

`will-change`는 브라우저에 곧 바뀔 속성을 힌트로 주는 속성이지만, MDN은 성능 문제를 해결하기 위한 마지막 수단으로 쓰고 과도하게 적용하지 말라고 경고합니다. ([MDN 웹 문서][6])

접근성에서는 `prefers-reduced-motion` 대응이 중요합니다. 이 media feature는 사용자가 기기 설정에서 불필요한 움직임을 줄이도록 요청했는지 감지하는 데 사용됩니다. ([MDN 웹 문서][7])

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

가장 실무적인 결론은 이렇습니다. **작은 UI 피드백은 transition**, **반복/자동 상태는 keyframes**, **긴 설명형 페이지는 scroll-driven**, **목록→상세 이동은 View Transition**, **이미지/영상은 transform·opacity 기반 overlay와 reveal**로 설계하는 것이 좋습니다.

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition "transition CSS property - CSS | MDN"
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation "animation CSS property - CSS | MDN"
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations "CSS scroll-driven animations - CSS | MDN"
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-transition-name "view-transition-name CSS property - CSS | MDN"
[5]: https://web.dev/articles/animations-guide "How to create high-performance CSS animations  |  Articles  |  web.dev"
[6]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change "will-change CSS property - CSS | MDN"
[7]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion "prefers-reduced-motion CSS media feature - CSS | MDN"
