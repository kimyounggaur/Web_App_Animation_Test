# [Vibe Coding Prompt] CSS & SVG Animation Master Lab 구축

## 1. 프로젝트 개요 및 목표
* **목표:** CSS와 SVG 애니메이션의 핵심 원리부터 실전 마이크로 인터랙션까지 한곳에서 직접 조작하고 코드를 확인할 수 있는 'All-in-One 인터랙티브 웹앱'을 개발합니다.
* **기술 스택:** 단일 HTML, 순수 CSS (Vanilla), Vanilla JavaScript (외부 라이브러리 의존성 없음).
* **기획 의도:** 시각적인 요소와 코드가 완벽하게 매칭되어, 초보자도 원리를 직관적으로 깨달을 수 있는 수준 높은 교육용 랩(Lab) 환경을 구축합니다.

## 2. 디자인 시스템 및 UI/UX Vibe (핵심)
* **테마:** 노션(Notion) 모바일 및 웹 인터페이스에서 영감을 받은 **극도로 깔끔하고 미니멀한 UI/UX**.
* **색상 팔레트:**
  * Background: `#FFFFFF` (Light), `#191919` (Dark)
  * Surface: `#F7F7F5` (Light), `#202020` (Dark)
  * Border/Line: `#E9E9E7`
  * Primary Accent: `#2383E2` (노션 블루톤)
  * Text: `#37352F` (Primary), `#787774` (Secondary)
* **타이포그래피:** 가독성이 뛰어난 Sans-serif (Pretendard, Inter 등)를 사용하며, 여백(Margin/Padding)을 넉넉하게 주어 정보의 위계를 명확히 합니다.
* **인터랙션 피드백:** 모든 버튼과 탭은 누를 때 미세한 scale 변경(`transform: scale(0.97)`)과 부드러운 전환 효과(`transition: 0.2s ease`)를 가져야 합니다.

## 3. 핵심 기능 및 화면 구조 (Architecture)

웹앱은 상단 탭(Tab) 네비게이션을 통해 4개의 메인 섹션으로 나뉩니다.

### Section 1: CSS 엔진 룸 (Mechanisms)
* **상태 전환 (Transition):** Hover 시 카드가 부드럽게 떠오르는 데모.
* **시간표 기반 (@keyframes):** Spinner, Pulse, Bounce 등 무한 반복 UI 요소.
* **속성 조작기 (Transform Playground):** 사용자가 슬라이더 범위(range) 컨트롤을 움직여 `translateX`, `rotate`, `scale`, `skewX` 값을 실시간으로 조작하고 타겟 박스가 변하는 것을 확인하는 기능.
* **타이밍 곡선 (Timing Function):** `linear`, `ease-in`, `ease-out`, `cubic-bezier(spring)` 등의 속도 차이를 한 번의 버튼 클릭으로 동시에 달리기 경주하듯 비교하는 트랙 UI.

### Section 2: 마이크로 인터랙션 (Micro-interactions)
* Material 스타일의 클릭 리플(Ripple) 버튼.
* 인스타그램 스타일의 하트(좋아요) Pop + 파티클 효과.
* 부드럽게 상태가 변하는 토글(Toggle) 스위치.
* 대기/처리중/완료 상태가 순차적으로 변하는 비동기 로딩 버튼(결제하기 버튼 등).

### Section 3: SVG 애니메이션 랩 (SVG Lab)
* **선 그리기 (Stroke Drawing):** `stroke-dasharray`와 `stroke-dashoffset`을 조작하여 로고나 체크 마크가 스스로 그려지는 효과.
* **경로 이동 (animateMotion):** 특정 Path를 따라 점이나 아이콘이 부드럽게 이동하는 시각화.
* **형태 보간 (Morphing):** 햄버거 메뉴(≡)가 클릭 시 닫기(X) 아이콘으로 변하는 CSS/SVG 복합 인터랙션.

### Section 4: 고급 UI 및 화면 전환 (Advanced UX)
* **Scroll-driven 애니메이션:** 스크롤 위치에 따라 화면 상단의 진행률(Progress) 바가 차오르고, 스크롤 진입 시 요소가 부드럽게 등장(Reveal)하는 효과 (`IntersectionObserver` 활용).
* **스켈레톤 로딩 (Shimmer):** 콘텐츠가 로드되기 전 뼈대를 보여주는 빛 반사 애니메이션.
* **View Transition:** 목록(Thumbnail)을 클릭했을 때 상세 뷰로 자연스럽게 화면이 이어지는 스냅샷 전환 효과 (`document.startViewTransition()`).

## 4. 단계별 구현 지침 (Step-by-Step Execution Plan)

**Step 1: 뼈대 및 디자인 시스템 구축**
* 시맨틱 HTML 마크업 작성 및 CSS 변수(`:root`)를 활용한 노션 스타일의 라이트/다크 테마 기반 마련.
* 상단 Sticky 네비게이션 탭 및 하단 콘텐츠 영역을 제어하는 Vanilla JS 로직 작성.

**Step 2: CSS Mechanisms & Playground 구현**
* CSS Transition과 Keyframes를 적용한 데모 카드 구현.
* 슬라이더(`<input type="range">`)의 값 변화를 JS로 감지하여 타겟 요소의 `transform` CSS 속성을 즉시 업데이트하는 로직 작성. 값에 따라 하단에 실제 적용된 CSS 코드가 텍스트로 출력되도록 구성.

**Step 3: Micro-interactions & SVG Lab 구현**
* SVG 코드를 HTML 내부에 인라인으로 삽입하여 CSS로 직접 제어할 수 있도록 세팅.
* Stroke animation과 Morphing을 구현하고, 각 요소 하단에 복사 가능한 코드 스니펫 블록(`pre`, `code` 태그 노션 스타일링) 배치.

**Step 4: 고급 UI 및 최적화**
* `IntersectionObserver`를 활용한 스크롤 등장 애니메이션 구현.
* View Transition API를 지원하는 브라우저를 위한 자연스러운 DOM 상태 전환 로직 작성.

## 5. 성능 및 접근성 (Constraints & Quality)
* **접근성(a11y):** 운영체제에서 '모션 줄이기'를 설정한 사용자를 위해 반드시 `@media (prefers-reduced-motion: reduce)` 미디어 쿼리를 전역에 적용하여 불필요한 반복 모션을 정지시킬 것.
* **성능 최적화:** 레이아웃 리플로우(Reflow)를 방지하기 위해 애니메이션은 오직 `transform`과 `opacity` 속성만 사용할 것.
* 모든 기능은 데스크톱과 모바일 환경에서 깨짐 없이 동작하도록 반응형 레이아웃(`Grid`, `Flexbox`)으로 구성할 것.