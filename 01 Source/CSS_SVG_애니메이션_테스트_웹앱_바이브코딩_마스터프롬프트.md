# 🎬 CSS & SVG Motion Lab — 바이브코딩 마스터 프롬프트

> **무엇인가**: AI 코딩 도구(Cursor, Claude Code, Codex, Windsurf, Cline 등)에 그대로 붙여넣어 **"CSS·SVG 애니메이션 테스트 웹앱"**을 단계적으로 완성시키는 통합 마스터 프롬프트입니다.
> 첨부된 3개 프롬프트(Gemini·Claude·ChatGPT)의 강점만 뽑아 하나로 합쳤습니다 — Gemini의 **깔끔한 구조와 단계별 플랜**, Claude의 **공통 컴포넌트 계약·데이터 주도 설계·"정직한 코드" 원칙·완료 기준**, ChatGPT의 **구체적 코드 스니펫·실무 시나리오·레시피 라이브러리·QA 체크리스트·수용 기준**.
> **기술 전제**: 외부 의존성 없는 **단일 `index.html` (Vanilla HTML + CSS + JS)**. 설치·빌드 불필요, 더블클릭으로 즉시 실행. **라이트/다크 테마 토글** 기본 탑재.
> ⚠️ 파일명의 `SGV`는 `SVG`의 오타로 보고 앱 안에서는 **SVG**로 통일하되, 헤더 부제에 원문 표기(`CSS&SGV / SVG Motion Lab`)를 함께 남깁니다.

---

## 📖 이 문서를 쓰는 법 (먼저 읽기)

이 프롬프트는 "한 번에 다 만들어줘"가 아니라 **Phase 단위로 잘라서** 코딩 에이전트에게 먹이는 것을 전제로 설계되었습니다.

1. **첫 메시지**: `0. 프로젝트 개요` ~ `5. 공통 컴포넌트 계약`까지 붙여넣고 → *"이 사양으로 앱 셸과 공통 컴포넌트까지 만들어줘 (Phase 0~2)"*.
2. **이후 메시지**: `6. 모듈별 상세 스펙`의 모듈을 하나씩(A→J) 붙여넣으며 → *"이 모듈을 공통 컴포넌트 계약에 맞춰 구현해줘"*.
3. 각 Phase 끝에는 **완료 기준 체크리스트**가 있습니다. 통과 못 하면 다음 Phase로 넘어가지 마세요.
4. 막히면 `12. 바이브코딩 실전 팁`의 디버깅 프롬프트 패턴을 사용하세요.

> **🔑 가장 중요한 1줄 원칙 — "정직한 코드(Honest Code)"**
> 각 데모의 모션은 **순수 CSS / 네이티브 SVG**로 작성하고, 화면의 "복사" 버튼이 주는 코드는 **프레임워크·빌드 없이 빈 HTML에 붙여도 그대로 동작하는 진짜 코드**여야 합니다. 그래야 교육·테스트 도구로서 거짓말을 하지 않습니다. JavaScript는 "JS 구동 방식을 보여주는 데모(Web Animations API 등)"와 컨트롤·상태 제어에만 씁니다.

---

# BEGIN PROMPT (여기부터 끝까지 코딩 에이전트에게 전달)

너는 **시니어 프론트엔드 엔지니어 + 모션 디자이너 + UX 교육용 인터랙티브 랩 제작자**다.
지금부터 **"CSS & SVG Motion Lab"** 이라는 단일 페이지 웹앱을 만든다. 이 앱은 "보기만 하는 설명 문서"가 아니라, 사용자가 직접 **hover · click · keyboard focus · scroll · 슬라이더 조작 · play/pause · 코드 복사**를 테스트하는 **실시간 애니메이션 실험실**이다. 한국어 UI가 기본이다.

---

## 0. 프로젝트 개요

### 0.1 한 줄 정의
> **"호버·클릭·스크롤·슬라이더로 직접 만져보고, 그 자리에서 생성된 코드를 복사해 가는, CSS와 SVG 애니메이션 통합 인터랙티브 도감 + 플레이그라운드."**

### 0.2 핵심 가치 (왜 만드는가)
- 애니메이션의 본질은 '움직임'이라 **정지 이미지·영상으로는 핵심이 전달되지 않는다.** → 모든 항목을 "실제로 돌아가는 라이브 데모"로 보여준다.
- 각 데모 옆에 **컨트롤 값에 따라 실시간 갱신되는 코드**를 붙여, **"보고 → 만지고 → 복사"**의 한 흐름을 만든다.
- "이 효과를 **어떤 실무 화면에** 쓰는가"를 항상 함께 보여줘 개념이 곧장 실무로 연결되게 한다.
- CSS와 SVG를 **하나의 도구 안에서** 다뤄 둘의 경계와 조합을 자연스럽게 익히게 한다.

### 0.3 타깃 사용자
- 프론트엔드 개발자 / 퍼블리셔 / 코드 친화 UI 디자이너.
- "버튼 호버를 몇 ms로 줄까", "로고 그려지는 효과 코드 줘", "스크롤 리빌 어떻게 해" 같은 질문을 가진 사람.
- 1차 언어는 한국어 (KO 우선).

### 0.4 성공 기준 (Definition of Done)
- [ ] 누구나 설치·계정 없이 **`index.html` 더블클릭만으로 즉시 열어 만질 수 있다.**
- [ ] 모든 데모는 **60fps**로 부드럽게 돈다(transform / opacity 중심).
- [ ] 모든 데모에 **복사 가능한 코드**가 붙어 있고, 그 코드를 빈 HTML에 붙여도 동작한다.
- [ ] **`prefers-reduced-motion`을 존중**하고, 앱 안에서 그 동작을 토글로 시뮬레이션할 수 있다.
- [ ] 라이트/다크 테마 토글이 동작하고 선택이 유지된다.
- [ ] 모바일~데스크톱 반응형으로 무너지지 않는다.

### 0.5 핵심 설계 원칙 (5)
1. **라이브 우선(Live-first)** — 스크린샷 금지. 전부 실제 동작 데모.
2. **정직한 코드(Honest code)** — 데모 모션은 순수 CSS/SVG. 복사 코드 = 실제 동작 코드.
3. **만질 수 있는 파라미터(Tweakable)** — duration·easing·transform 값을 컨트롤로 조절 → 코드 즉시 반영.
4. **맥락 동봉(Context-rich)** — 모든 항목에 "실제 적용 화면" 1줄 매핑 + 대표 제품 예시.
5. **접근성·성능 내장(A11y/Perf by default)** — 옵션이 아니라 기본값.

---

## 1. 기술 스택 & 프로젝트 구조

### 1.1 스택 (의존성 0)
| 영역 | 선택 | 이유 |
|---|---|---|
| 마크업 | 시맨틱 **HTML5** | `<header><nav><main><section>` 등 |
| 스타일 | **순수 CSS** + CSS 변수(디자인 토큰) | 빌드 없이 테마·모션 토큰 관리 |
| 로직 | **Vanilla JavaScript (ES Modules, 외부 라이브러리 0)** | 컨트롤·상태·코드 동기화 |
| 폰트 | 시스템 폰트 스택 (한글: Pretendard 있으면 사용, 없으면 system-ui) / 코드: `ui-monospace` | 오프라인 동작 |

> **외부 라이브러리 금지**: GSAP, anime.js, Framer Motion, Lottie 등은 설치·로드하지 않는다. 단, 앱 안의 "확장 도구 설명 카드"에서 이들을 **개념적으로 소개**하는 것은 허용한다(코드 임포트는 하지 않음).
> 이미지·영상 파일에 의존하지 말고, 모든 시각 요소는 **CSS gradient / CSS shape / inline SVG**로 만든다.

### 1.2 파일 구조
가능하면 **단일 `index.html`** 하나에 모두 담는다(`<style>` + `<script type="module">`). 단 코드가 비대해지면 아래처럼 분리해도 좋다(상대 경로 import, 빌드 없이 동작해야 함).

```
index.html            # 진입점 (셸 + 마운트 지점)
assets/
  styles/
    tokens.css        # 디자인 토큰 (라이트/다크 변수)
    global.css        # 리셋 + 레이아웃 + 셸
    motion.css        # 데모용 raw @keyframes / transition 모음
  js/
    main.js           # 부트스트랩, 라우팅(해시), 전역 상태 동기화
    store.js          # 전역 상태(테마·pause·speed·reduce-sim·lang)
    components/
      demoFrame.js    # 데모 1칸 표준 골격 (팩토리 함수)
      codePanel.js    # 코드 탭 + 복사
      controlPanel.js # 슬라이더/셀렉트/스위치 선언적 렌더
      copyButton.js
    data/
      techniques.js   # 도감 데이터 (스키마는 5.4)
      recipes.js      # Recipe Library 데이터
      usecases.js     # 적용사례 매트릭스
    modules/          # 모듈별 데모 (A~J)
README.md
```

> 단일 파일을 선택했다면 위 구획을 **주석 배너**(`/* ===== STORE ===== */`)로 나눠 가독성을 유지하라.

---

## 2. 디자인 시스템 (라이트/다크 토글)

### 2.1 무드
**다크 = 딥블루 그라데이션 배경 + 프로스티드 글래스(글래스모피즘) 카드 + 은은한 보더 + soft glow + 네온 포인트.** **라이트 = 깨끗한 화이트/슬레이트, 넉넉한 여백, 절제된 포인트 컬러(Notion 톤).** 두 테마 모두 1급 시민으로 다룬다.

### 2.2 색 토큰 (`tokens.css`)
```css
:root {
  /* ===== 라이트 (기본 기준값) ===== */
  --bg: #f7f8fc;
  --bg-grad-1: rgba(124,140,255,.10);
  --bg-grad-2: rgba(117,230,255,.08);
  --surface: #ffffff;
  --surface-glass: rgba(255,255,255,.72);
  --line: rgba(20,30,60,.10);
  --text: #1b2233;
  --muted: #5b6678;
  --brand: #4f5bd5;     /* 보라-블루 */
  --cyan: #1aa6c4;
  --mint: #1f9d57;
  --yellow: #c98a12;
  --rose: #e1495b;
  --radius-xl: 24px; --radius-lg: 18px; --radius-md: 12px;
  --shadow-card: 0 6px 24px rgba(20,30,60,.08);
  --font-sans: "Pretendard", ui-sans-serif, system-ui, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "D2Coding", monospace;

  /* ===== 모션 토큰 (앱 전체가 따른다) ===== */
  --t-fast: 150ms;   /* 버튼 피드백 */
  --t-base: 240ms;   /* 일반 전환 */
  --t-slow: 380ms;   /* 모달/카드 등장 */
  --ease-out: cubic-bezier(.2,.8,.2,1);          /* 등장 */
  --ease-in:  cubic-bezier(.4,0,1,1);            /* 퇴장 */
  --spring:   cubic-bezier(.2,1.4,.38,1);        /* pop/lift/like */
  --overshoot: cubic-bezier(.68,-0.6,.32,1.6);   /* 통통 */
  --speed: 1;        /* 전역 속도 배율 (JS가 갱신) */
}

:root[data-theme="dark"] {
  --bg: #07111f;
  --bg-grad-1: rgba(124,140,255,.18);
  --bg-grad-2: rgba(117,230,255,.10);
  --surface: #0f1830;
  --surface-glass: rgba(255,255,255,.06);
  --line: rgba(255,255,255,.12);
  --text: #f6f8ff;
  --muted: #a9b8cd;
  --brand: #7c8cff;
  --cyan: #75e6ff;
  --mint: #9af28b;
  --yellow: #ffcf70;
  --rose: #ff7e8a;
  --shadow-card: 0 10px 36px rgba(0,0,0,.35);
}

body {
  background:
    radial-gradient(1200px 600px at 18% -8%, var(--bg-grad-1), transparent),
    radial-gradient(1000px 520px at 100% 0%, var(--bg-grad-2), transparent),
    var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
}
```
- **모션 원칙(앱이 스스로 지키는 규칙)**: 등장 = `--ease-out`, 퇴장 = `--ease-in`, 진행률/회전 = `linear`, 살아있는 느낌 = `--spring`/`--overshoot`, 스프라이트 = `steps(n)`.

### 2.3 글래스 카드 유틸
```css
.glass {
  background: var(--surface-glass);
  border: 1px solid var(--line);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  backdrop-filter: blur(14px) saturate(120%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}
.pill {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 10px; border-radius: 999px; font-size: 12px;
  background: color-mix(in srgb, var(--brand) 16%, transparent);
  color: var(--brand); border: 1px solid var(--line);
}
```

### 2.4 타이포 / 간격 / 반경
- 제목 스케일: 36 / 28 / 22 / 18px, 본문 16px, 캡션 13~14px. 정보 위계가 보이도록 여백을 넉넉히.
- 라운드: 카드 `--radius-lg`, 컨트롤 `--radius-md`, pill `999px`.
- 활성 탭/카드에는 **네온 accent 보더** 또는 글로우로 현재 위치를 명확히.

---

## 3. 정보 구조 & 라우팅

### 3.1 레이아웃
- **상단 sticky 헤더** — 로고/타이틀(`CSS & SVG Motion Lab` + 부제 `CSS&SGV / SVG Motion Lab`), 전역 컨트롤(테마·모션정지·속도·reduce-motion 시뮬·전체 리셋).
- **좌측 사이드바 네비**(데스크톱 고정 / 모바일은 상단 드로어) — 모듈 목록 + 스크롤스파이로 현재 섹션 활성 표시.
- **메인** — 모듈 섹션들. 해시 라우팅(`#/css-core`, `#/svg-lab` …)으로 직접 진입·공유 가능. 네비 클릭 시 스무스 스크롤 + URL 동기화.

### 3.2 모듈 맵 (네비 순서)
```
Overview        — 6카드 그리드(움직이는 목차) + 4엔진 인포그래픽 + 선택 규칙
── CSS ───────────────────────────────
A. 기초 메커니즘   Transition · @keyframes · Transform · Timing
B. 마이크로 인터랙션  버튼·리플·하트·토글·햄버거·로딩버튼
C. UI 컴포넌트 모션  스켈레톤·모달·토스트·아코디언·탭·진행률
D. 스크롤 & 화면 전환  Scroll-driven · View Transition  (둘 다 fallback)
E. 이미지 & 영상 UI  zoom/reveal · clip-path/mask · 플레이어 오버레이 · reel
── SVG ───────────────────────────────
F. SVG 엔진 비교   CSS vs SMIL vs JS(WAAPI) vs Lottie(설명)  — 같은 스피너 나란히
G. SVG 기법 도감   10기법 (stroke·animate·transform·motion·morph·mask·filter·viewBox·dataviz·lottie)
H. 실전 시나리오   결제 상태머신 · 업로드 진행률 · 대시보드 갱신 · 지도 경로 · 빈상태
── 가이드 ─────────────────────────────
I. 적용사례 매트릭스 & 선택 가이드(결정 트리)
J. 성능 & 접근성 도구  FPS미터 · reduce-motion 시뮬 · 체크리스트
─────────────────────────────────────
Recipe Library  — 복사 가능한 코드 레시피 모음(15+)
```

---

## 4. 전역 상태 & 셸

### 4.1 전역 컨트롤 (헤더에 노출)
1. **테마 토글** — light/dark. `:root`의 `data-theme` 속성 토글 + `localStorage` 저장. 최초엔 OS `prefers-color-scheme` 따름.
2. **모션 일시정지** — 켜면 `<html class="motion-paused">` → 전역 `*{animation-play-state:paused!important}`. (그 자체가 `animation-play-state` 메타 데모.) SVG SMIL은 `svg.pauseAnimations()`도 함께 호출.
3. **속도 배율** — 0.25× / 0.5× / 1× / 2×. CSS 변수 `--speed`를 갱신하고 데모 duration을 `calc(var(--t-base) / var(--speed))`로 해석.
4. **동작 줄이기 시뮬(reduce-motion)** — 켜면 `<html class="rm-sim">` → 7장의 reduced-motion 규칙을 강제 적용해 "접근성 모드 미리보기".
5. **전체 리셋** — 모든 데모를 초기 상태로(리셋 카운터/CustomEvent로 각 데모 구독).

모든 토글 버튼은 `aria-pressed`를 정확히 반영한다.

### 4.2 상태 스토어 (`store.js`)
```js
// 단순 옵저버 패턴 (외부 라이브러리 없이)
export const store = {
  state: { theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
           paused: false, speed: 1, reduceSim: false, resetCounter: 0 },
  _subs: new Set(),
  subscribe(fn){ this._subs.add(fn); return () => this._subs.delete(fn); },
  set(patch){ Object.assign(this.state, patch); this._subs.forEach(fn => fn(this.state)); this.sync(); },
  sync(){
    const r = document.documentElement;
    r.dataset.theme = this.state.theme;
    r.classList.toggle('motion-paused', this.state.paused);
    r.classList.toggle('rm-sim', this.state.reduceSim);
    r.style.setProperty('--speed', String(this.state.speed));
    localStorage.setItem('motionlab', JSON.stringify(this.state));
  },
};
```
- 부팅 시 `localStorage`에서 복원 → `store.sync()` 호출.

### 4.3 Overview 화면
- **6장 카드 그리드(= 움직이는 목차)**: Transition / @keyframes / Scroll-driven / View Transition / Image UI / Video UI. 각 카드에 미니 CSS·SVG 모션 아이콘 + "언제 쓰나 / 적용사례 / 대표 속성" 요약 + 해당 모듈로 점프 버튼.
- 그 아래 **4엔진 인포그래픽(SVG)**: CSS · SMIL · JavaScript(WAAPI) · Lottie 한 줄 요약.
- 하단 **실무 선택 규칙 4줄**: ① 목적이 피드백/방향/계층 중 무엇? ② transform·opacity 우선인가? ③ prefers-reduced-motion 대응했나? ④ 미지원 브라우저 fallback 있나?

---

## 5. 공통 컴포넌트 계약 (★ 이 앱의 백본 ★)

모든 모듈은 아래 컴포넌트를 **재사용**한다. 모듈마다 UI를 새로 짜지 않는다. (React가 아니라 바닐라이므로 **팩토리 함수 + DOM 반환** 패턴으로 만든다.)

### 5.1 `createDemoFrame(config)` — 데모 1칸의 표준 골격
```
┌─ glass 카드 ─────────────────────────────────┐
│  제목 + pill(엔진/분류 태그)      [▷재생][↺리셋]  │
│  ────────────────────────────────────────── │
│  [ 라이브 스테이지 ]        |   [ 컨트롤 패널 ]   │ ← 데스크톱 2열
│  (실제 모션 영역)           |   슬라이더/셀렉트     │
│  ────────────────────────────────────────── │
│  ▸ 적용사례: "버튼 호버 · 토글 · 드롭다운"  + 제품 pill │
│  ⚠ 접근성/성능 한 줄 노트                        │
│  ▾ 코드 보기 (CodePanel: 탭 + 복사)             │
└──────────────────────────────────────────────┘
```
설정 계약:
```js
/**
 * @param {Object} config
 * @param {string}   config.title       데모 제목
 * @param {string[]} config.tags        ["Transition","CSS"] → pill
 * @param {string}   config.useCase     "버튼 호버 · 토글 · 드롭다운"
 * @param {string[]} config.products    ["Instagram","Material Design"] (선택)
 * @param {string}   config.note        접근성/성능 한 줄 주의
 * @param {(stage:HTMLElement)=>void} config.mountStage  라이브 모션 영역 마운트
 * @param {ControlSpec[]} config.controls  ControlPanel 스펙 (5.3)
 * @param {(params:object)=>CodeBlock[]} config.buildCode  파라미터→코드 (5.5)
 * @param {boolean}  config.replayable  재생/리셋 버튼 노출
 * @returns {HTMLElement}
 */
```
- 재생/리셋: 스테이지를 다시 마운트(리마운트)하거나 클래스 토글로 애니메이션 재트리거. `store.resetCounter` 변화도 구독.
- 모든 DemoFrame은 무한 모션 영역에 `data-animated="true"`를 달아 전역 pause 대상이 되게 한다.

### 5.2 `createCodePanel(blocks)` — 탭 + 복사
```js
/** @typedef {{lang:"css"|"html"|"svg"|"js", label:string, code:string}} CodeBlock */
```
- 여러 언어를 **탭**으로 전환(CSS/HTML/SVG/JS).
- 가벼운 자체 하이라이트(키워드/문자열/주석 정규식)로 충분. **외부 하이라이터 로드 금지.** `<pre><code>`에 `var(--font-mono)`.
- 우상단 **복사 버튼** → `navigator.clipboard.writeText` (실패 시 `document.execCommand('copy')` fallback) → "복사됨!" 토스트 1.5s.
- **컨트롤 값이 바뀌면 코드 문자열도 즉시 갱신**(5.5).

### 5.3 `createControlPanel(specs, onChange)` — 만지는 부분
- 컨트롤은 선언적 스펙으로:
```js
/** @typedef {{
 *   id:string, label:string,
 *   type:"range"|"select"|"switch",
 *   min?:number, max?:number, step?:number, unit?:string,
 *   options?:{label:string,value:string}[], value:any
 * }} ControlSpec */
```
- 값은 **CSS 변수**로 스테이지에 전달: 스테이지 래퍼에 `stage.style.setProperty('--dur', dur+'ms')` 등.
- 데모 CSS는 그 변수를 읽는다: `transition: transform var(--dur) var(--ease);`
- 각 컨트롤 옆에 **현재 값 라벨**을 실시간 표시.

### 5.4 도감 데이터 모델 (`techniques.js`)
```js
/** @typedef {{
 *   id:string,
 *   module:"A"|"B"|"C"|"D"|"E"|"F"|"G"|"H",
 *   title:string,
 *   engine:("CSS"|"SMIL"|"JS"|"Lottie")[],
 *   category:string,        // "선 그리기", "경로 이동" 등
 *   useCase:string,         // 적용사례 한 줄
 *   products?:string[],     // ["Instagram","Material Design"]
 *   controls?:ControlSpec[],
 *   buildCode:(p:object)=>CodeBlock[],
 *   note?:string            // 원리/주의점
 * }} Technique */
```
- 최대한 **데이터 주도**로 만들어, 새 기법 추가가 객체 1개 추가로 끝나게 한다.

### 5.5 코드 ↔ 파라미터 동기화 규약 (정직한 코드의 핵심)
- 각 데모는 `buildCode(params): CodeBlock[]` **순수 함수**를 가진다.
- 컨트롤 변경 → params 상태 갱신 → (a) CSS 변수로 스테이지 반영, (b) `buildCode(params)`로 CodePanel 갱신.
- 즉 "보이는 모션"과 "보이는 코드"가 **항상 같은 params에서 파생** → 둘이 어긋나면 그것이 버그다.

### Phase 0~2 완료 기준 (셸 + 공통)
- [ ] 헤더의 테마/일시정지/속도/reduce-sim/리셋 토글이 실제로 동작하고 `aria-pressed` 반영.
- [ ] 테마 선택이 새로고침 후에도 유지(localStorage).
- [ ] `createDemoFrame` 하나에 더미 모션을 넣어 재생/리셋, 코드 탭/복사가 동작.
- [ ] 슬라이더를 움직이면 스테이지 모션과 코드 문자열이 **동시에** 바뀐다.
- [ ] 사이드바 스크롤스파이가 현재 섹션을 표시.
- [ ] 모바일에서 카드가 1열로 자연스럽게 내려간다.

---

## 6. 모듈별 상세 스펙

> 각 모듈은 (목표 / 데모 목록 / 컨트롤 / 노출 코드 / 적용사례 / 완료 기준)으로 기술. 모두 `createDemoFrame`으로 렌더.

### 🟦 Module A — CSS 기초 메커니즘
**목표**: 엔진 2종(Transition·@keyframes) + 재료(Transform) + 성격(Timing)을 직접 만져 체득.

**데모**
1. **Transition 탐색기** — 사각형 타깃에 hover/클릭 토글. 컨트롤: `property`(transform/opacity/background/all), `duration`(0~1000ms), `easing`(linear/ease/ease-in/ease-out/spring), `delay`(0~500ms). 노출 코드(CSS): `transition: <prop> <dur> <ease> <delay>;` + "duration 기본값은 `0s`라 시간을 안 주면 전환이 안 보인다" 노트.
2. **@keyframes 탐색기** — 0%→100% 박스 이동+페이드. 컨트롤: `duration`, `iteration-count`(1~∞), `direction`(normal/alternate), `fill-mode`(none/forwards), `play-state`(running/paused). 노출 코드: `@keyframes` + `animation` 단축.
3. **Transform 플레이그라운드** — 타깃 1개 + 슬라이더 `translateX/Y`, `scale`, `rotate`, `skewX`, `opacity`, (3D 옵션) `rotateY`, `perspective`. 노출 코드: 합성된 `transform:` 한 줄(+ `transform-origin` 토글). 학습 포인트: transform/opacity는 compositing-friendly.
4. **Timing function 비교 레이서** — 5개 공이 같은 거리·duration을 `linear / ease-in / ease-out / ease-in-out / spring`으로 **동시 출발** → 차이를 눈으로 비교. "동시 재생" 버튼으로 replay(`void el.offsetWidth`로 transition restart). 추가로 **드래그 가능한 cubic-bezier 에디터**(핸들 2개)로 커스텀 곡선 생성 → 코드 출력. 각 timing의 실제 사용처 한 줄(linear=progress/loader, ease-out=등장, ease-in=퇴장, spring=pop/like).

**완료 기준**: 4데모 모두 컨트롤→모션·코드 동기화. cubic-bezier 핸들이 실제 곡선·모션에 반영.

---

### 🟦 Module B — CSS 마이크로 인터랙션
**목표**: 손끝 피드백 패턴을 실제 제품과 묶어 보여준다.

**데모**
1. **버튼 호버 3종** — lift(`translateY(-2px)`+shadow), 채움 스와이프, 보더 글로우 (150~250ms, ease-out).
2. **클릭 리플(Material)** — 클릭 좌표를 JS로 받아 CSS 변수에 주입, 원이 퍼짐. → *Material Design / Android*
3. **좋아요 하트 팝 + 파티클** — scale 팝 + 방사형 파티클. → *Instagram / X*
4. **토글 스위치 & 햄버거 → X** — 손잡이 슬라이드 / 3선이 X로 회전 변형. `role="switch"` + `aria-checked`.
5. **로딩 버튼 상태 시퀀스** — idle → spinner → check(성공). 클릭하면 진행. → *결제/제출 버튼*

**컨트롤(공통)**: duration, easing(spring 포함), (해당 시) 파티클 개수. 모든 인터랙션에 keyboard(Enter/Space) 동작.

**완료 기준**: 5개 모두 트리거 동작 + 각 데모에 제품 예시 pill + 키보드 조작 가능.

---

### 🟦 Module C — CSS UI 컴포넌트 모션
**목표**: 실제 컴포넌트 등장/전환 모션.

**데모**
1. **스켈레톤 + 시머** — `linear-gradient`를 `translateX`로 흘림. → *Facebook/LinkedIn/YouTube/Slack*
2. **모달 등장/퇴장** — backdrop opacity + 카드 `translateY+scale+opacity`, 약간의 delay 차이로 깊이감. focus trap + ESC 닫기. → *iOS/웹 다이얼로그*
3. **토스트/스낵바 슬라이드** — 가장자리에서 진입 후 자동 소멸(비차단), `aria-live="polite"`. → *Gmail/Slack*
4. **아코디언 펼침** — `grid-template-rows: 0fr→1fr` 트릭(높이 애니메이션, reflow 없이). `aria-expanded`.
5. **탭 슬라이딩 인디케이터** — 밑줄이 활성 탭으로 `transform: translateX`로 미끄러짐. `role="tablist"`.
6. **진행률 바** — 0→100% `scaleX`(또는 width) 채움 + 퍼센트 라벨.

**완료 기준**: 모달/토스트/아코디언 열고 닫힘 모두 부드럽고, reflow 유발 속성 사용 금지(transform/opacity·grid-fr 허용).

---

### 🟦 Module D — 고급 CSS: 스크롤 & 화면 전환
**목표**: 최신 기능을 **feature-detection + fallback**과 함께 정직하게 보여준다. 각 데모에 지원 여부 배지 표시.

**데모**
1. **Reading progress 바** — 스크롤 위치에 따라 상단 바 채움(passive scroll listener).
2. **Scroll-driven 섹션 reveal** — `animation-timeline: view()`.
   - 지원 시 네이티브 스크롤 타임라인 / 미지원 시 `IntersectionObserver` 폴백. **두 버전 모두 코드 탭으로 제공.**
   ```css
   @supports (animation-timeline: view()) {
     .reveal { animation: reveal linear both; animation-timeline: view();
               animation-range: entry 10% cover 40%; }
   }
   @keyframes reveal { from{opacity:0; transform:translateY(32px)} to{opacity:1; transform:none} }
   ```
3. **View Transition: 목록 → 상세** — 썸네일이 상세 히어로로 이어지는 전환.
   ```js
   function go(update){
     if (!document.startViewTransition || store.state.reduceSim) { update(); return; }
     document.startViewTransition(update);
   }
   ```
   ```css
   .thumb, .detail-hero { view-transition-name: hero-img; }
   ::view-transition-group(hero-img){ animation-duration: 420ms; animation-timing-function: var(--ease-out); }
   ```
   - 미지원/reduce 시 즉시 class swap(크로스페이드 없이)으로 graceful degradation.

**완료 기준**: 미지원 환경에서도 안 깨지고, 지원 배지("이 브라우저는 X 미지원 → 폴백 동작") 표시.

---

### 🟦 Module E — 이미지 & 영상 UI 모션 (CSS)
**목표**: 미디어 몰입 패턴. 실제 이미지/영상 파일 없이 **gradient/inline SVG placeholder**로 구현.

**데모**
1. **이미지 zoom + caption reveal** — wrapper `overflow:hidden` 고정, 내부만 `scale(1.12)`, 캡션 슬라이드 인. → *커머스/여행/포트폴리오*
2. **clip-path / mask reveal** — 포인터 위치를 `--x/--y` CSS 변수로 받아 `clip-path: circle()`이 닦이듯 등장.
3. **갤러리 썸네일 트랜지션** — hover 시 살짝 lift + 밝기.
4. **Ken Burns 슬로우 팬** — `transform`만으로 느린 이동/확대.
5. **영상 플레이어 오버레이** — `is-playing` 상태로 play 버튼 fade/scale, 컨트롤 바, progress(width 0→100%), 자막 등장. reduce 시 progress 정지하고 상태값만. → *OTT/강의*
6. **숏폼 reel 전환** — 세로 카드가 위로 스냅 전환.

**완료 기준**: 이미지 zoom 시 레이아웃 고정(wrapper 고정), 플레이어 상태 토글 동작, reduce 모드 반영.

---

### 🟪 Module F — SVG 엔진 비교 (CSS vs SMIL vs JS vs Lottie)
**목표**: **같은 결과(로딩 스피너)를 여러 엔진으로** 나란히 구현해 차이를 체감.

**데모(나란히 배치)**
1. **CSS 구동 SVG** — `transform-box:fill-box; transform-origin:center; animation: spin 1s linear infinite;`
2. **SMIL** — `<animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite"/>`
3. **JS (Web Animations API)** — `el.animate([{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:1000,iterations:Infinity})`
4. **(설명 카드) 라이브러리** — GSAP / anime.js / Vivus / Lottie / WAAPI가 각각 강한 지점을 표로 요약(코드 임포트는 없음).

**엔진별 노트(앱이 가르칠 핵심)**
- **SMIL**: 외부 CSS/JS 없이 SVG 파일 자체로 재생, 단독 아이콘에 강함. 복잡한 상태 분기는 약함.
- **CSS**: 가장 보편·고성능(transform/opacity). UI 마이크로 인터랙션의 99%.
- **JS(WAAPI)**: 클릭/스크롤/데이터/물리 등 정밀 제어.
- **Lottie**: After Effects → Bodymovin JSON → 렌더. 디자이너 타임라인 재현, 온보딩/빈상태.

**완료 기준**: 동일 스피너 3엔진이 시각적으로 동일하게 돌고, 각 코드 복사 가능.

---

### 🟪 Module G — SVG 기법 도감 (10기법)
**목표**: SVG 애니메이션의 "종류"를 라이브로 모두 보여주는 핵심 모듈. 데이터 주도(5.4)로. 각 기법 = 라이브 데모 + 핵심 원리 1줄 + 적용사례 + 코드.

1. **속성 변화(`<animate>`)** — `r/cx/fill/opacity` 보간. 예: 맥동 점, `rect`의 `rx` 4↔20. → 장식 배너/이메일 벡터.
2. **변형(`<animateTransform>` / CSS transform)** — rotate/scale/translate. → 새로고침·설정 톱니, 업로드 구름.
3. **경로 이동(`<animateMotion>` / CSS `offset-path`)** — `mpath` + `rotate="auto"`. → 배달 라이더, 지도 마커, 온보딩 흐름.
   ```html
   <path id="route" d="M20 80 C80 10 160 150 240 60" fill="none"/>
   <circle r="8"><animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
     <mpath href="#route"/></animateMotion></circle>
   ```
4. **선 그리기(stroke)** — `stroke-dasharray:L; stroke-dashoffset:L → 0`. **정확한 L은 JS `getTotalLength()`로 측정**. "다시 그리기" 버튼 + "auto length 측정" 토글. → 로고/서명/성공 체크.
   ```js
   function drawPath(path, dur = 1800){
     const L = path.getTotalLength();
     path.style.strokeDasharray = `${L}`;
     path.style.strokeDashoffset = `${L}`;
     path.getBoundingClientRect();            // reflow 강제 → 트랜지션 보장
     path.style.transition = `stroke-dashoffset ${dur}ms var(--ease-out)`;
     path.style.strokeDashoffset = '0';
   }
   ```
5. **형태 모핑(morphing)** — `path`의 `d` 보간(재생↔정지, 햄버거↔X, blob). **앵커 점 개수·명령 구조가 같아야 부드럽다**; 다르면 GSAP MorphSVG / flubber가 점 개수 자동 매칭(설명만). 외부 라이브러리는 설치하지 않으니, 데모는 **점 구조가 일치하는 단순/안정 path**로.
6. **Mask / clipPath 리빌** — 보이는 영역을 움직여 콘텐츠가 닦이듯 등장. → 히어로 reveal, 원형 progress, 쿠폰 긁기, 스켈레톤→콘텐츠.
   ```html
   <clipPath id="reveal"><rect x="0" y="0" width="0" height="120">
     <animate attributeName="width" values="0;300" dur="1s" fill="freeze"/></rect></clipPath>
   <g clip-path="url(#reveal)"><rect width="300" height="120" fill="url(#grad)"/></g>
   ```
7. **Filter 애니메이션** — `feGaussianBlur`(glow), `feTurbulence`(noise/liquid), gooey. → 알림 pulse, 비주얼라이저, AI "생성 중" orb. 장식용은 `aria-hidden`, 작은 영역에만(성능).
8. **viewBox / 카메라 워크** — `viewBox`를 보간해 줌인/이동. → 아키텍처 전체→특정 서버 확대, 지도 국가→매장. (state로 viewBox 갱신 + transition, 또는 `<animate attributeName="viewBox">` 예시 병기.)
9. **데이터 시각화** — 막대 자라남/도넛 차오름/선 그려짐. "랜덤 데이터 갱신" 버튼으로 y/height transition. D3 `transition()` 확장 pseudo-snippet 노트.
10. **Lottie 임베드(설명)** — AE → JSON → 렌더 워크플로 카드. → 온보딩, 결제 성공, 빈 상태, 404. (실제 임베드 없이 개념 + 언제 쓰는지.)

**접근성**: 의미 있는 SVG에는 `role="img"` + `<title>`(+필요 시 `<desc>`). 장식용은 `aria-hidden="true" focusable="false"`.

**완료 기준**: 10기법 전부 라이브 + 코드. 선 그리기의 L 측정, 모핑 토글, animateMotion 경로 이동이 실제 동작.

---

### 🟪 Module H — 실전 시나리오 (상태 기반, 앱의 하이라이트)
**목표**: 진짜 제품 컴포넌트처럼 **상태 머신**으로 모션을 묶는다.

**데모**
1. **결제/제출 버튼 상태머신** ⭐ — `idle → loading(스피너) → success(원→체크 순차 그리기) → error(X + shake)`. 버튼: 결제하기 / 로딩 / 성공 / 오류 / 자동 시퀀스 / reset. 상태 텍스트는 `aria-live="polite"`, loading 중에만 `disabled`.
   ```js
   /** @typedef {"idle"|"loading"|"success"|"error"} PaymentState */
   const labelByState = { idle:"결제하기", loading:"처리 중", success:"완료", error:"다시 시도" };
   ```
2. **업로드 진행률** — 원형(stroke-dashoffset) + 막대, % 라벨, 완료 시 체크.
3. **대시보드 갱신** — mini 카드 + SVG bar/line. "새 데이터 수신" 버튼 → 숫자 count-up + chart transition. 스켈레톤→실데이터 전환 포함하면 가산점.
4. **지도/배송 경로 스토리** — 굽은 path를 따라 marker 이동(`animateMotion` 또는 `offset-path`), path는 dash로 그려지고 marker엔 glow/pulse. "배송/여행/데이터 파이프라인" preset 선택.
5. **빈 상태 / 404** — 짧게 반복하는 SVG 일러스트(구름/박스/로봇), `role="img"` + `<title>/<desc>`.

**완료 기준**: 결제 버튼이 4상태를 깔끔히 순회(특히 성공 체크가 "원→체크" 순차). 모든 시나리오가 "실무 화면"처럼 보인다.

---

### 🟩 Module I — 적용사례 매트릭스 & 선택 가이드
**목표**: "어디에 무엇을" 한 화면에서 결정.

1. **화면별 매트릭스(표)** — 행: 랜딩 히어로 / 온보딩 / 결제·저장·업로드 / 대시보드 / 지도·물류 / 기술문서 / 광고배너 / 빈상태·에러. 열: 추천 기법 · 주 엔진 · 구체 예시 · fallback/주의 · (클릭 시 해당 데모로 점프).
2. **결정 트리(인터랙티브)** — 질문을 따라가며 추천 도출:
   - Q1 "두 상태 사이 전환인가, 스스로 반복인가?" → Transition / @keyframes
   - Q2 "스크롤 위치가 진행률인가?" → Scroll-driven
   - Q3 "목록→상세 이동인가?" → View Transition
   - Q4 "선이 그려지는 느낌?" → SVG stroke
   - Q5 "디자이너 AE 타임라인?" → Lottie
3. **엔진 선택 요약표** — 목적(아이콘/로더, 단독 SVG 반복, 클릭·스크롤·API, 복잡 일러스트, 차트, path morph) → 추천(CSS/SMIL/JS/Lottie/D3/GSAP).

**완료 기준**: 매트릭스 행 클릭 시 해당 모듈/데모로 이동, 결정 트리가 끝에서 추천 + 데모 링크 제시.

---

### 🟩 Module J — 성능 & 접근성 도구
**목표**: 앱이 "성능·접근성"을 **측정·시연하는 도구**가 된다.

1. **FPS 미터** — `requestAnimationFrame` 기반 실시간 FPS. 토글로 "나쁜 예(`left`/`width`/`margin` = reflow)" vs "좋은 예(`transform`/`opacity`)"를 동시에 돌려 프레임 드랍 비교.
2. **reduce-motion 시뮬 패널** — 전역 토글(4.1-④) 효과를 한 화면에서 미리보기.
3. **`will-change` 데모** — 사용/남용 비교 + "마지막 수단" 경고.
4. **접근성 체크리스트(인앱)** — 아래 항목을 체크 가능한 UI로:
   - `prefers-reduced-motion` 대응 / 자동반복 모션 끌 수단 / SVG `role="img"`·`<title>`·`<desc>` / 키보드 포커스·`:focus-visible` / 색만으로 상태 전달 금지(체크·텍스트 병행) / hover-only 금지.

**완료 기준**: FPS 미터가 두 예시 차이를 수치로 보여주고, reduce-motion 토글이 전 페이지에 즉시 반영.

---

## 7. 접근성 요구사항 (전역) — `global.css`에 기본 포함
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
/* 앱 내 시뮬 토글: 위 규칙을 강제 */
html.rm-sim *, html.rm-sim *::before, html.rm-sim *::after {
  animation-duration: .01ms !important; animation-iteration-count: 1 !important;
  transition-duration: .01ms !important;
}
/* 전역 일시정지 */
html.motion-paused *, html.motion-paused *::before, html.motion-paused *::after {
  animation-play-state: paused !important;
}
:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
```
추가 규칙:
- 의미 있는 SVG엔 `role="img"` + `<title>`(+필요 시 `<desc>`). 장식 SVG는 `aria-hidden="true" focusable="false"`.
- 인터랙티브 요소는 가능하면 `<button>`. div를 써야 하면 `role`/`tabindex`/keyboard handler 필수.
- 자동반복/앰비언트 모션은 reduce 시 끄되, **사용자가 직접 누른 결과의 핵심 피드백은 남긴다.**
- `aria-pressed`/`aria-expanded`/`role="switch"`/`aria-live`를 필요한 곳에 정확히.

## 8. 성능 요구사항 (전역)
- **transform / opacity / stroke-dashoffset만 애니메이션**(레이아웃·페인트 회피, compositing 유지). `width/height/top/left/margin` 애니메이션 금지(트릭으로 `scale`·`translate`·`grid-fr` 사용. *단 데모 목적이 "나쁜 예 비교"인 J-1은 예외*).
- `transition: all` 남발 금지 — 실제 바뀌는 속성만 지정.
- `will-change`는 무거운 모션 직전에만, 끝나면 제거.
- 무한 루프 데모는 화면 밖이면 `IntersectionObserver`로 일시정지 고려.
- `clip-path`/`filter`는 작은 데모 영역에만. 60fps 목표, J 모듈 FPS 미터로 자가 검증.

## 9. 반응형 요구사항
- 브레이크포인트: `sm 640 / md 768 / lg 1024 / xl 1280`.
- 데스크톱: 사이드바 고정 + DemoFrame 2열(스테이지|컨트롤). 모바일: 사이드바→상단 드로어, DemoFrame 1열(스테이지 위, 컨트롤 아래, 코드 접힘).
- 터치 환경에서 hover 데모는 "탭=토글"로 대체.

## 10. 콘텐츠 / 카피 (KO 우선)
- 기본 한국어. 톤은 짧고 명확. 각 데모 1줄 적용사례 + 필요 시 "원리" 1~2줄.
- 코드 주석은 한국어 OK(복사 코드에 한 줄 설명 포함 가능).
- `SGV` 표기는 자료명일 뿐 정확한 용어는 `SVG`임을 Overview에서 한 번 안내.

---

## 11. 단계적 빌드 플랜 (Phase 0 → 9)

> 각 Phase는 **독립적으로 검증** 후 다음으로. 코딩 에이전트에게 "지금은 Phase N만 하라"고 못박기.

### Phase 0 — 셋업 & 디자인 토큰
- 작업: 1.2 구조, 2장 토큰/글래스 유틸, 폰트, 라이트/다크 변수, `index.html` 골격.
- 완료: 빈 페이지에 글래스 카드 하나가 라이트·다크 양쪽에서 레퍼런스 톤으로 보인다.

### Phase 1 — 셸(헤더·사이드바·해시 라우팅·스크롤스파이·전역 상태)
- 작업: 3장 레이아웃, 4.1/4.2 전역 컨트롤 + store + sync.
- 완료: 5장 Phase 0~2 기준의 토글들 + 스크롤스파이 + 테마 영속.

### Phase 2 — 공통 컴포넌트(DemoFrame/CodePanel/ControlPanel/CopyButton)
- 작업: 5장 전체 + 더미 데모로 동기화 검증.
- 완료: 슬라이더↔모션↔코드 동기화 + 복사 동작.

### Phase 3 — Module A (CSS 기초)
- 완료: Transition/@keyframes/Transform/Timing 4데모 + cubic-bezier 에디터.

### Phase 4 — Module B + C (마이크로 인터랙션 + UI 컴포넌트)
- 완료: 11개 데모 동작, 제품 예시 pill, 키보드 조작.

### Phase 5 — Module D + E (스크롤/전환 + 이미지/영상)
- 완료: feature-detection 폴백 동작 + 미지원 배지.

### Phase 6 — Module F (SVG 엔진 비교)
- 완료: 동일 스피너 3엔진 + 라이브러리 요약표.

### Phase 7 — Module G (SVG 10기법 도감) ← 가장 큰 분량
- 완료: 10기법 라이브 + 코드 + getTotalLength/morph/animateMotion 동작.

### Phase 8 — Module H + I (실전 시나리오 + 매트릭스/가이드)
- 완료: 결제버튼 4상태 + 매트릭스 점프 + 결정 트리.

### Phase 9 — Module J + Recipe Library + 접근성/성능 패스 + 마감
- 작업: FPS 미터, reduce-motion 시뮬, Recipe Library(아래), 7·8장 전수 점검, 반응형 QA, Overview 마감.
- 완료: 0.4 성공 기준 전부 체크.

### 전체 최종 체크리스트
- [ ] 모든 데모 라이브 + 코드 복사 가능(붙여넣어 동작)
- [ ] transform/opacity/stroke-dashoffset 외 레이아웃 애니메이션 없음(아코디언 grid-fr, J-1 비교용 예외)
- [ ] prefers-reduced-motion 존중 + 앱 내 시뮬 토글
- [ ] 키보드 포커스/`:focus-visible`/SVG 타이틀
- [ ] 라이트/다크 모두 정상 + 영속
- [ ] 모바일~데스크톱 반응형 무결
- [ ] FPS 미터로 60fps 확인
- [ ] JS 콘솔 에러 0

---

## Recipe Library — 복사 가능한 코드 레시피 (별도 섹션, 15+)
사용자가 코드만 빠르게 가져갈 수 있는 섹션. 각 recipe = 제목 / 언제 쓰는가 / 코드 / 복사 버튼 / 주의점 1개.

1. Button hover transition  2. Card lift  3. Spinner  4. Skeleton shimmer  5. Modal enter/exit  6. Toast enter/exit  7. Image zoom + caption reveal  8. Clip-path reveal  9. Video overlay/progress  10. Scroll reveal(`animation-timeline` + IO fallback)  11. View Transition route swap  12. SVG stroke drawing  13. SVG motion path  14. SVG 결제 성공 체크  15. Reduced-motion 전역 CSS

---

## 12. 바이브코딩 실전 팁 (프롬프트 운영)

**Phase 시작 프롬프트 템플릿**
```
첨부한 사양서의 Phase {N}만 구현해줘.
- 공통 컴포넌트 계약(5장)을 반드시 재사용하고 새 UI를 임의로 만들지 마.
- 모션은 순수 CSS/네이티브 SVG로 작성하고, 복사 코드는 빌드·프레임워크 없이 빈 HTML에 붙여도 동작해야 해.
- 외부 모션 라이브러리는 설치하지 마(설명 카드의 개념 소개만 허용).
- 끝나면 이 Phase의 '완료 기준' 체크리스트를 스스로 점검해 통과 여부를 표로 보고해줘.
```

**가드레일(매번 상기)**
- "transform/opacity/stroke-dashoffset만 애니메이션. `left/width/top/margin` 쓰지 마(J-1 비교 데모 제외)."
- "데모 모션을 외부 라이브러리로 만들지 마. (Lottie/GSAP는 '설명 카드'에서 개념만)"
- "컨트롤 값과 표시 코드는 동일 params에서 파생(5.5). 둘이 어긋나면 버그."
- "새 기법은 `techniques.js` 객체 추가로 끝나게 데이터 주도로."

**디버깅 프롬프트 예**
```
Module G의 '선 그리기' 데모에서 stroke가 한 번에 다 보여. getTotalLength로 L을 재고
dasharray/dashoffset=L에서 0으로 transition 하는 흐름(6장 G-4 코드)대로 고쳐줘.
reflow 트리거(getBoundingClientRect) 빠졌는지 확인해.
```

---

## 13. 수용 기준 (Acceptance Criteria)

### 필수 기능
- [ ] `index.html` 더블클릭만으로 실행된다(빌드 불필요).
- [ ] hero/Overview와 sticky 헤더·사이드바가 있다.
- [ ] CSS Lab에 **최소 5개 이상**의 실제 조작 데모.
- [ ] SVG Lab에 **최소 8개 이상**의 실제 조작/재생 데모.
- [ ] Scroll/View Lab에 feature detection + fallback + 지원 배지.
- [ ] 결제 상태머신 데모가 4상태로 동작.
- [ ] CodePanel 복사 버튼 동작 + 컨트롤↔코드 실시간 동기화.
- [ ] 전역 pause/resume, reduce-motion 토글, 테마 토글, 전체 리셋 동작.
- [ ] 키보드 포커스로 주요 인터랙션 사용 가능.
- [ ] 의미 있는 SVG에 title/desc 또는 aria-label.

### 품질
- [ ] 라이트/다크 모두 blue/purple/cyan 글래스모피즘 ↔ Notion 톤 감성을 각각 반영.
- [ ] 설명은 한국어, 실무 예시 중심, 각 데모 "왜 쓰는가"가 명확.
- [ ] 애니메이션이 과하지 않고 목적이 있다(150~450ms 마이크로 인터랙션).
- [ ] transform/opacity 중심 성능 설계, 복잡 기능도 fallback으로 안 깨짐.
- [ ] 모바일에서 카드 1열로 자연스럽게 내려감.

---

## 14. 최종 응답 형식
구현이 끝나면 다음 형식으로 보고하라.
```md
완료했습니다.

## 실행 방법
- index.html 더블클릭 (또는 로컬 서버: npx serve)

## 구현한 핵심 기능
1. ...
2. ...

## 확인한 사항
- JS 콘솔 에러: 없음
- 라이트/다크 토글 + 영속: 확인
- Reduced motion / 전역 pause: 확인
- View Transition fallback / Scroll-driven fallback: 확인
- 60fps(FPS 미터): 확인

## 주요 파일
- index.html
- assets/js/modules/...
- assets/styles/...
```

# END PROMPT

---

## 부록 A — 앱이 "정확히" 가르쳐야 할 사실 (코드 패널/노트 검증용)
- `transition` 단축 = `property | duration | timing-function | delay`. **`transition-duration` 기본값 `0s`** → 시간을 안 주면 보이는 전환이 없다.
- `animation` 단축 = `name | duration | timing-function | delay | iteration-count | direction | fill-mode | play-state`. **`animation-duration` 기본 `0s`**.
- 헷갈리는 3개: `iteration-count: infinite`(반복), `direction: alternate`(왕복), `fill-mode: forwards`(끝 프레임 유지 — 없으면 원위치로 튕김).
- Scroll-driven: 시간(document timeline) 대신 **스크롤 기반 timeline**으로 값 애니메이션(`animation-timeline: view()`/`scroll()`).
- View Transition: `document.startViewTransition()` + `view-transition-name`으로 이전/새 뷰를 스냅샷 연결, 특정 요소만 별도 전환.
- SMIL `<animate>`(속성) / `<animateMotion>`(경로) / `<animateTransform>`(이동·회전·확대·skew)은 최신 브라우저에서 widely available.
- 성능: 가능하면 `opacity`/`transform`으로 제한해 compositing 단계 유지. `will-change`는 성능 문제 **마지막 수단**.
- 접근성: `prefers-reduced-motion`은 사용자가 비필수 모션 줄이기를 요청했는지 감지. SVG `<title>`/`<desc>`는 보조기술용 텍스트 대안.

> (위 사실들은 MDN / web.dev 등 공개 문서 기준의 안정적 동작이며, 최신 기능은 **feature-detection + 폴백**으로 어느 브라우저에서도 깨지지 않게 구현한다.)

## 부록 B — 라이브러리 빠른 레퍼런스 (F·I 모듈 표/노트용 — 설치 없이 "개념 소개"만)
| 라이브러리 | 성격 | 언제 |
|---|---|---|
| **Animate.css** | 프리셋 클래스 | 빠르게 가져다 쓰는 등장/강조 |
| **AOS** | 스크롤 등장 전용 | 마케팅/랜딩 reveal |
| **GSAP**(+ScrollTrigger/DrawSVG/MorphSVG) | 정밀 타임라인·스크롤·모핑 | 복잡/고급 모션, SVG morph |
| **anime.js** | 경량 JS 타임라인 | 가벼운 JS 제어 |
| **Vivus** | SVG 선 그리기 전용 | 로고 드로잉 |
| **Lottie (lottie-web)** | AE→JSON 렌더 | 온보딩/빈상태/일러스트 모션 |
| **Web Animations API** | 브라우저 내장 `element.animate()` | 무의존 JS 모션 |
| **D3** | 데이터 시각화 + `transition()` | 차트 보간 |
| **flubber** | path 보간 보조 | 점 개수 다른 모핑 매칭 |

---

### ✅ 요약
이 프롬프트대로 만들면, **CSS(기초·마이크로·컴포넌트·스크롤/전환·미디어) + SVG(엔진 비교·10기법 도감·상태기반 시나리오) + 적용 가이드 + 성능/접근성 도구 + Recipe Library**를 하나의 **단일 HTML(라이트/다크 토글) 웹앱**에 담은, "보고 → 만지고 → 복사하는" 통합 모션 랩이 나옵니다. Phase 0부터 순서대로, 각 단계 완료 기준을 통과시키며 진행하세요.
