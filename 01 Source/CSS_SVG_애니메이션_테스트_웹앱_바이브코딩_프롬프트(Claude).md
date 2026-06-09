# 🎬 "Motion Lab" — CSS & SVG 애니메이션 테스트 웹앱 · 바이브코딩 프롬프트

> 업로드된 6개 설명 문서(ChatGPT/Claude/Gemini × CSS·SVG)와 4개 인터랙티브 데모 HTML, 인포그래픽·스토리보드 이미지를 한 덩어리로 종합해, **AI 코딩 도구(Cursor, Claude Code, Windsurf 등)에 그대로 붙여넣어 단계적으로 구현**할 수 있게 만든 마스터 프롬프트입니다.
> (파일명의 "SGV"는 "SVG" 오타로 판단하여 본문에서는 SVG로 통일합니다.)

---

## 📖 이 문서를 쓰는 법 (먼저 읽기)

이 문서는 "한 번에 다 만들어줘"가 아니라 **Phase 단위로 잘라서** 코딩 에이전트에게 먹이는 것을 전제로 설계되었습니다.

1. **첫 메시지**: `0. 프로젝트 개요` ~ `5. 공통 컴포넌트 계약` 까지를 붙여넣고 "이 사양으로 프로젝트 셸과 공통 컴포넌트까지 만들어줘 (Phase 0~2)"라고 지시합니다.
2. **이후 메시지**: 모듈을 하나씩(`6. 모듈별 상세 스펙`의 A→J) 붙여넣으며 "이 모듈을 공통 컴포넌트 계약에 맞춰 구현해줘"라고 지시합니다.
3. 각 Phase 끝에는 **완료 기준 체크리스트**가 있습니다. 통과하지 못하면 다음 Phase로 넘어가지 마세요.
4. 막히면 `12. 바이브코딩 실전 팁`의 프롬프트 패턴을 사용하세요.

> ⚠️ **가장 중요한 1줄 원칙**: 앱 셸(레이아웃·상태·네비)은 React로 만들되, **각 애니메이션 데모의 모션 자체는 "순수 CSS / 네이티브 SVG"로 작성**합니다. "복사" 버튼이 주는 코드가 프레임워크 없이도 동작하는 진짜 코드여야 교육·테스트 도구로서 정직하기 때문입니다. JS 라이브러리(Framer Motion 등)는 "JS 구동 방식을 보여주는 데모"에서만 씁니다.

---

## 0. 프로젝트 개요

### 0.1 한 줄 정의
**"호버·클릭·스크롤·슬라이더로 직접 만져보고, 그 자리에서 생성된 코드를 복사해 가는, CSS와 SVG 애니메이션 통합 인터랙티브 도감 + 플레이그라운드."**

### 0.2 핵심 가치 (왜 만드는가)
- 애니메이션은 본질이 '움직임'이라 **정지 이미지·영상으로는 핵심이 전달되지 않는다.** 그래서 모든 항목을 "실제로 돌아가는 라이브 데모"로 보여준다.
- 각 데모 옆에 **실시간으로 갱신되는 코드**를 붙여, "보고 → 만지고 → 복사"의 한 흐름을 만든다.
- "이 효과를 **어디에(어떤 제품 화면에)** 쓰는가"를 항상 함께 보여줘서, 개념이 곧장 실무로 연결되게 한다.
- CSS와 SVG를 **하나의 도구 안에서** 다뤄, 둘의 경계와 조합을 자연스럽게 익히게 한다.

### 0.3 타깃 사용자
- 프런트엔드 개발자 / 퍼블리셔 / UI 디자이너(코드 친화)
- "버튼 호버를 몇 ms로 줄까", "로고 그려지는 효과 코드 줘", "스크롤 리빌 어떻게 해" 같은 질문을 가진 사람
- 한국어가 1차 언어 (KO 우선, EN 토글 지원)

### 0.4 성공 기준
- [ ] 누구나 설치/계정 없이 **즉시 열어 만질 수 있다.**
- [ ] 모든 데모는 **60fps**로 부드럽게 돈다(transform/opacity 중심).
- [ ] 모든 데모에 **복사 가능한 코드**가 붙어 있고, 그 코드를 빈 HTML에 붙여도 동작한다.
- [ ] **`prefers-reduced-motion`을 존중**하고, 앱 안에서 그 동작을 토글로 시뮬레이션할 수 있다.
- [ ] 모바일~데스크톱 반응형으로 무너지지 않는다.

### 0.5 핵심 설계 원칙 (5)
1. **라이브 우선(Live-first)** — 스크린샷 금지. 전부 실제 동작 데모.
2. **정직한 코드(Honest code)** — 데모 모션은 순수 CSS/SVG. 복사 코드 = 실제 동작 코드.
3. **만질 수 있는 파라미터(Tweakable)** — duration·easing·transform 값 등을 컨트롤로 조절 → 코드 즉시 반영.
4. **맥락 동봉(Context-rich)** — 모든 항목에 "실제 적용 화면" 1줄 매핑.
5. **접근성·성능 내장(A11y/Perf by default)** — 옵션이 아니라 기본값.

---

## 1. 기술 스택 & 프로젝트 초기화

### 1.1 권장 스택
| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | **Next.js 15 (App Router)** + TypeScript | 라우팅/메타/배포 표준, 익숙한 스택 |
| 스타일 | **Tailwind CSS** + CSS 변수(디자인 토큰) | 셸은 유틸리티, 모션은 raw CSS로 분리 |
| 컴포넌트 | **shadcn/ui** (Button, Tabs, Slider, Select, Switch, Tooltip, Dialog, ScrollArea) | 접근성 좋은 프리미티브 |
| 전역 상태 | **Zustand** | 테마·모션·속도 등 전역 컨트롤 |
| 코드 하이라이트 | **Shiki**(또는 prism-react-renderer) | 코드 패널 가독성 |
| JS 모션 데모용 | **Framer Motion(=motion)**, 그리고 SVG용 **GSAP / anime.js / Vivus / lottie-react** | "JS 구동" 데모에서만 |
| 아이콘 | **lucide-react** | 일관된 아이콘 |

> 🔁 **대안**: "웹앱"보다 가벼운 단일 플레이그라운드면 **Vite + React + TS**로 대체 가능. 구조/컴포넌트 계약은 그대로 유지.

### 1.2 초기화 명령 (에이전트가 실행)
```bash
npx create-next-app@latest motion-lab --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd motion-lab
npx shadcn@latest init
npx shadcn@latest add button tabs slider select switch tooltip dialog scroll-area
npm i zustand lucide-react shiki
# 모션 데모 라이브러리(필요 모듈에서만 import)
npm i framer-motion gsap animejs vivus lottie-react
```

### 1.3 전역 설정
- 다크 모드: `class` 전략(`<html class="dark">`), 기본값 **dark**.
- `globals.css`에 디자인 토큰(2장)과 `prefers-reduced-motion` 글로벌 규칙(7장)을 넣는다.
- 폰트: 본문 Pretendard(한글) + 코드 JetBrains Mono / Fira Code.

---

## 2. 디자인 시스템

### 2.1 무드 (레퍼런스 이미지 기반)
첨부된 인포그래픽 PNG의 톤을 그대로 계승한다: **딥블루 그라데이션 배경 + 프로스티드 글래스(글래스모피즘) 카드 + 은은한 보더 + soft glow**. 다크 퍼스트, 라이트는 깨끗한 화이트/슬레이트.

### 2.2 색 토큰 (`globals.css`)
```css
:root {
  /* Light */
  --bg: 210 40% 98%;
  --surface: 0 0% 100%;
  --surface-glass: 255 255 255 / 0.7;
  --border: 214 32% 91%;
  --text: 222 47% 11%;
  --text-muted: 215 16% 47%;
  --accent: 221 83% 53%;      /* 블루 */
  --accent-2: 199 89% 48%;    /* 시안 */
  --success: 142 71% 45%;
  --warn: 38 92% 50%;
  --danger: 0 72% 51%;
}
.dark {
  --bg: 222 47% 11%;
  --bg-grad-1: 224 64% 14%;
  --bg-grad-2: 230 50% 9%;
  --surface: 222 30% 16%;
  --surface-glass: 255 255 255 / 0.06;  /* 카드 글래스 */
  --border: 255 255 255 / 0.10;
  --text: 210 40% 96%;
  --text-muted: 217 19% 67%;
  --accent: 217 91% 60%;
  --accent-2: 189 94% 55%;
  --success: 142 69% 58%;
  --warn: 38 95% 62%;
  --danger: 0 84% 67%;
}
body {
  background:
    radial-gradient(1200px 600px at 20% -10%, hsl(var(--bg-grad-1)/.6), transparent),
    radial-gradient(1000px 500px at 100% 0%, hsl(var(--accent)/.12), transparent),
    hsl(var(--bg));
  color: hsl(var(--text));
}
```

### 2.3 글래스 카드 유틸 (Tailwind `@layer`)
```css
@layer components {
  .glass {
    background: hsl(var(--surface-glass));
    border: 1px solid hsl(var(--border));
    backdrop-filter: blur(14px) saturate(120%);
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgb(0 0 0 / .25);
  }
  .pill {
    @apply inline-flex items-center rounded-full px-3 py-1 text-xs;
    background: hsl(var(--accent)/.15);
    color: hsl(var(--accent-2));
    border: 1px solid hsl(var(--border));
  }
}
```

### 2.4 타이포 / 간격 / 반경
- 제목 스케일: `text-4xl/3xl/2xl/xl`, 본문 `text-base`, 캡션 `text-sm/xs`.
- 라운드: 카드 `1rem`, 컨트롤 `0.75rem`, pill `full`.
- 그림자/블러는 위 글래스 유틸 재사용.

### 2.5 모션 원칙 (앱 전체가 따르는 토큰)
앱은 "자기가 가르치는 규칙"을 스스로 지킨다.
```css
:root {
  /* duration scale */
  --t-fast: 150ms;   /* 버튼 피드백 */
  --t-base: 240ms;   /* 일반 전환 */
  --t-slow: 380ms;   /* 모달/카드 등장 */
  /* easing scale */
  --ease-out:  cubic-bezier(.2,.8,.2,1);     /* 등장 */
  --ease-in:   cubic-bezier(.4,0,1,1);       /* 퇴장 */
  --ease-soft: cubic-bezier(.2,.8,.2,1);
  --ease-overshoot: cubic-bezier(.68,-0.6,.32,1.6); /* 통통 */
}
```
- **등장=ease-out, 퇴장=ease-in, 진행률/회전=linear, 살아있는 느낌=overshoot, 스프라이트=steps(n).**

---

## 3. 정보 구조 & 라우팅

### 3.1 레이아웃
- **좌측 고정 사이드바**(모바일은 상단 드로어) — 모듈 A~J 목록 + 스크롤스파이 활성 표시.
- **상단 헤더** — 로고/타이틀, 전역 컨트롤(테마·모션정지·속도·reduce-motion·언어).
- **메인** — 모듈 섹션들. 각 모듈은 라우트(`/css/basics` …)이자 앵커. 사이드바 클릭 시 스무스 스크롤 + URL 동기화.

### 3.2 모듈 맵 (좌측 네비 순서)
```
개요(Overview)  — 6카드 그리드 + 4엔진 인포그래픽 + 선택 규칙
── CSS ──────────────────────────
A. 기초 메커니즘   Transition · @keyframes · Transform · Timing
B. 마이크로 인터랙션  버튼·리플·하트·토글·햄버거·로딩버튼
C. UI 컴포넌트 모션  스켈레톤·모달·토스트·아코디언·탭·진행률
D. 스크롤 & 화면 전환  Scroll-driven · View Transition
E. 이미지 & 영상 UI  zoom/reveal · clip-path · 플레이어 오버레이 · reel
── SVG ──────────────────────────
F. SVG 엔진 비교   CSS vs SMIL vs JS vs Lottie (같은 스피너 3종)
G. SVG 기법 도감   10기법(아래 6장 G 참고)
H. 실전 와이어프레임  상태기반 결제버튼/업로드/빈상태
── 가이드 ────────────────────────
I. 적용사례 매트릭스 & 선택 가이드(결정 트리)
J. 성능 & 접근성 도구  FPS미터 · reduce-motion 시뮬 · 체크리스트
```

### 3.3 폴더 구조
```
src/
  app/
    layout.tsx            # 셸(헤더+사이드바)
    page.tsx              # 개요
    (modules)/.../page.tsx
  components/
    shell/                # Header, Sidebar, ThemeToggle, GlobalControls, ScrollSpy
    demo/                 # DemoFrame, CodePanel, ControlPanel, CopyButton, PresetBar
    ui/                   # shadcn 컴포넌트
  modules/                # 모듈별 데모 컴포넌트 (A~J)
  data/
    techniques.ts         # 도감 데이터(스키마는 5.4)
    usecases.ts           # 적용사례 매트릭스
  styles/
    motion.css            # 데모용 raw @keyframes/transition 모음
    globals.css
  store/
    useMotionStore.ts     # 전역 컨트롤(Zustand)
  lib/
    useScrollSpy.ts, copy.ts, getPathLength.ts
```

---

## 4. 전역 상태 & 셸

### 4.1 전역 컨트롤 (헤더에 노출)
1. **테마 토글** — light/dark (`<html>`의 `dark` 클래스 토글, localStorage 저장).
2. **모션 일시정지** — 켜면 `<html class="motion-paused">` → 전역 `*{animation-play-state:paused!important}` 적용. (그 자체가 `animation-play-state` 메타 데모)
3. **속도 배율** — 0.25×/0.5×/1×/2× — CSS 변수 `--speed`를 두고 데모 duration을 `calc(var(--t-base) / var(--speed))`로 곱해 해석. (간단히는 `:root{--speed:1}` 갱신)
4. **동작 줄이기 시뮬** — 켜면 `<html class="rm-sim">` → 7장의 reduced-motion 규칙을 강제 적용해 "접근성 모드 미리보기".
5. **언어 토글** — KO/EN (콘텐츠 사전 기반, 10장).

### 4.2 Zustand 스토어 스키마
```ts
// store/useMotionStore.ts
import { create } from "zustand";

type Lang = "ko" | "en";
interface MotionState {
  theme: "light" | "dark";
  paused: boolean;
  speed: 0.25 | 0.5 | 1 | 2;
  reduceMotionSim: boolean;
  lang: Lang;
  toggleTheme: () => void;
  togglePaused: () => void;
  setSpeed: (s: MotionState["speed"]) => void;
  toggleReduceMotionSim: () => void;
  setLang: (l: Lang) => void;
}
export const useMotionStore = create<MotionState>((set) => ({
  theme: "dark", paused: false, speed: 1, reduceMotionSim: false, lang: "ko",
  toggleTheme: () => set(s => ({ theme: s.theme === "dark" ? "light" : "dark" })),
  togglePaused: () => set(s => ({ paused: !s.paused })),
  setSpeed: (speed) => set({ speed }),
  toggleReduceMotionSim: () => set(s => ({ reduceMotionSim: !s.reduceMotionSim })),
  setLang: (lang) => set({ lang }),
}));
```
- 상태 변화 → `<html>` 클래스/`data-` 속성/CSS 변수에 동기화하는 `useSyncHtmlFlags()` 훅 작성.

### 4.3 개요(Overview) 화면
- 첨부 PNG의 **6장 카드 그리드** 재현: Transition / @keyframes / Scroll-driven / View Transition / Image UI / Video UI — 각 카드에 "언제 쓰나 / 적용사례 / 대표 CSS" 요약 + 해당 모듈로 점프 버튼.
- 그 아래 **4엔진 인포그래픽**(SVG): CSS · SMIL · JavaScript · Lottie 한 줄 요약.
- 하단 **실무 선택 규칙 4줄**: ① 목적이 피드백/방향/계층 중 무엇? ② transform·opacity 우선인가? ③ prefers-reduced-motion 대응했나? ④ 미지원 브라우저 fallback 있나?

---

## 5. 공통 컴포넌트 계약 (★ 이 앱의 백본 ★)

모든 모듈은 아래 4개 컴포넌트를 **재사용**한다. 모듈마다 UI를 새로 짜지 않는다.

### 5.1 `<DemoFrame>` — 데모 1칸의 표준 골격
```
┌─ glass 카드 ─────────────────────────────┐
│  제목 + pill(엔진/분류 태그)   [▷재생][↺리셋]  │
│  ──────────────────────────────────────  │
│  [ 라이브 스테이지 ]      |  [ 컨트롤 패널 ]  │ ← 데스크톱 2열
│  (실제 모션 영역)         |  슬라이더/셀렉트   │
│  ──────────────────────────────────────  │
│  ▸ 적용사례: "버튼 호버 · 토글 · 드롭다운"      │
│  ▾ 코드 보기 (CodePanel: 탭 + 복사)          │
└──────────────────────────────────────────┘
```
Props 계약:
```ts
interface DemoFrameProps {
  title: string;
  tags?: string[];                 // ["Transition","CSS"] 등 → pill
  useCase: string;                 // "버튼 호버 · 토글 · 드롭다운"
  stage: React.ReactNode;          // 라이브 모션 영역
  controls?: React.ReactNode;      // ControlPanel (옵션)
  code: CodeBlock[];               // CodePanel용 (5.2)
  replayable?: boolean;            // 재생/리셋 버튼 노출
}
```
- 재생/리셋: 스테이지에 `key`를 증가시켜 리마운트(애니메이션 재시작)하거나, 클래스 토글로 재트리거.

### 5.2 `<CodePanel>` — 탭 + 복사
```ts
interface CodeBlock { lang: "css" | "html" | "svg" | "js" | "tsx"; label: string; code: string; }
```
- 여러 언어를 **탭**으로 전환(CSS/HTML/SVG/JS).
- Shiki로 하이라이트, 우상단 **복사 버튼**(클릭 시 `navigator.clipboard.writeText` → "복사됨!" 토스트 1.5s).
- **컨트롤 값이 바뀌면 코드 문자열도 즉시 갱신**(아래 5.5).

```ts
// lib/copy.ts
export async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
}
```

### 5.3 `<ControlPanel>` — 만지는 부분
- shadcn `Slider`/`Select`/`Switch` 조합. 각 컨트롤은 `{ id, label, type, min, max, step, unit, options, value }` 스펙으로 선언적으로 렌더.
- 값은 **CSS 변수**로 스테이지에 전달: 스테이지 래퍼에 `style={{ "--dur": `${dur}ms`, "--ease": ease, ... }}`.
- 데모 CSS는 그 변수를 읽음: `transition: transform var(--dur) var(--ease);`

### 5.4 도감 데이터 모델 (`data/techniques.ts`)
```ts
export interface Technique {
  id: string;
  module: "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H";
  title: string;
  engine: ("CSS"|"SMIL"|"JS"|"Lottie")[];
  category: string;          // "선 그리기", "경로 이동" 등
  useCase: string;           // 적용사례 한 줄
  products?: string[];       // ["Instagram","Material Design"]
  controls?: ControlSpec[];
  code: CodeBlock[];
  notes?: string;            // 원리/주의점
}
```
- 가능한 한 **데이터 주도**로 만들어, 새 기법 추가가 객체 1개 추가로 끝나게 한다.

### 5.5 코드 ↔ 파라미터 동기화 규약
- 각 데모는 `buildCode(params): CodeBlock[]` 순수 함수를 가진다.
- 컨트롤 변경 → params 상태 갱신 → (a) CSS 변수로 스테이지 반영, (b) `buildCode(params)`로 CodePanel 갱신.
- 즉 "보이는 모션"과 "보이는 코드"가 항상 같은 params에서 파생 → **거짓말하지 않는 코드**.

### Phase 0~2 완료 기준 (셸+공통)
- [ ] 헤더의 테마/일시정지/속도/reduce-sim/언어 토글이 실제로 동작.
- [ ] `<DemoFrame>` 하나에 더미 모션을 넣어 재생/리셋, 코드 탭/복사가 동작.
- [ ] 슬라이더를 움직이면 스테이지 모션과 코드 문자열이 **동시에** 바뀐다.
- [ ] 사이드바 스크롤스파이가 현재 섹션을 표시.

---

## 6. 모듈별 상세 스펙

> 각 모듈은 (목표 / 데모 목록 / 컨트롤 / 노출 코드 / 적용사례 / 완료 기준)으로 기술. 모두 `<DemoFrame>`으로 렌더.

### 🟦 Module A — CSS 기초 메커니즘
**목표**: "엔진 2종(Transition·@keyframes) + 재료(Transform) + 성격(Timing)"을 직접 만져 체득.

**데모**
1. **Transition 탐색기** — 사각형 타깃에 hover/클릭 토글. 컨트롤: `property`(transform/opacity/background/all), `duration`(0~1000ms), `easing`(linear/ease/ease-in/ease-out/custom), `delay`. 노출 코드(CSS): `transition: <prop> <dur> <ease> <delay>;`
2. **@keyframes 탐색기** — 0%→100% 박스 이동+페이드. 컨트롤: `duration`, `iteration-count`(1~∞), `direction`(normal/alternate), `fill-mode`(none/forwards), `play-state`. 노출 코드: `@keyframes` + `animation` 단축.
3. **Transform 플레이그라운드** — 타깃 1개 + 슬라이더 `translateX/Y`, `scale`, `rotate`, `skewX/Y`, (3D) `rotateX/Y/Z`, `perspective`. 노출 코드: 합성된 `transform:` 한 줄. (transform-origin 토글 포함)
4. **Timing function 비교 레이서** — 5개 점이 같은 거리를 `linear/ease-in/ease-out/ease/overshoot`로 동시에 출발 → 차이를 눈으로 비교. 추가로 **드래그 가능한 cubic-bezier 에디터**(핸들 2개)로 커스텀 곡선 생성 → 코드 출력.

**적용사례 매핑**: Transition=버튼/토글/드롭다운, @keyframes=스피너/스켈레톤/배지 pulse, Transform=카드 이동/모달/이미지 zoom.

**완료 기준**: 4데모 모두 컨트롤→모션·코드 동기화. cubic-bezier 핸들이 실제 곡선·모션에 반영.

---

### 🟦 Module B — CSS 마이크로 인터랙션
**목표**: 손끝 피드백 패턴을 실제 제품과 묶어 보여준다.

**데모**
1. **버튼 호버 3종** — lift(`translateY(-2px)`+shadow), 채움 스와이프, 보더 글로우. (150~250ms, ease-out)
2. **클릭 리플(Material)** — 클릭 좌표에서 원이 퍼짐(JS로 좌표 받아 CSS 변수에 주입). → *Material Design / Android*
3. **좋아요 하트 팝 + 파티클** — scale 팝 + 방사형 파티클. → *Instagram / X*
4. **토글 스위치 & 햄버거 → X** — 손잡이 슬라이드 / 3선이 X로 회전 변형.
5. **로딩 버튼 상태 시퀀스** — idle → spinner → check(성공). 클릭하면 진행. → *결제/제출 버튼*

**컨트롤(공통)**: duration, easing(overshoot 포함), (해당 시) 파티클 개수.

**완료 기준**: 5개 모두 트리거 동작 + 각 데모에 제품 예시 pill.

---

### 🟦 Module C — CSS UI 컴포넌트 모션
**목표**: 실제 컴포넌트 등장/전환 모션.

**데모**
1. **스켈레톤 + 시머** — `linear-gradient`를 `translateX`로 흘림. → *Facebook/LinkedIn/YouTube/Slack*
2. **모달 등장/퇴장** — backdrop opacity + 카드 `translateY+scale+opacity`, 약간의 delay 차이로 깊이감. → *iOS/웹 다이얼로그*
3. **토스트/스낵바 슬라이드** — 가장자리에서 진입 후 자동 소멸(비차단). → *Gmail/Slack/Android*
4. **아코디언 펼침** — `grid-template-rows: 0fr→1fr`(높이 애니메이션 트릭, reflow 없이).
5. **탭 슬라이딩 인디케이터** — 밑줄이 활성 탭으로 미끄러짐(`transform: translateX`+`width`는 transform로). → *모바일 탭바*
6. **진행률 바** — 0→100% 채움(`scaleX`/`width`), 퍼센트 라벨.

**완료 기준**: 모달/토스트/아코디언이 열고 닫힘 모두 부드럽게, reflow 유발 속성 사용 금지(transform/opacity·grid-fr 허용).

---

### 🟦 Module D — 고급 CSS: 스크롤 & 화면 전환
**목표**: 최신 기능을 **feature-detection + fallback**과 함께 정직하게 보여준다.

**데모**
1. **Scroll-driven 진행률 바 / 섹션 reveal** — `animation-timeline: view()` 사용.
   - 지원 시: 네이티브 스크롤 타임라인. 미지원 시: `IntersectionObserver` 폴백.
   ```css
   @supports (animation-timeline: view()) {
     .reveal { animation: reveal linear both; animation-timeline: view();
               animation-range: entry 10% cover 40%; }
   }
   @keyframes reveal { from{opacity:0; transform:translateY(32px)} to{opacity:1; transform:none} }
   ```
   - 코드 패널에 **두 버전(네이티브 / IO 폴백)** 탭으로 모두 제공.
2. **View Transition: 목록 → 상세** — 썸네일이 상세 히어로로 이어지는 전환.
   ```js
   function go(update){ if(!document.startViewTransition) update();
                        else document.startViewTransition(update); }
   ```
   ```css
   .thumb, .detail-hero { view-transition-name: hero-img; }
   ::view-transition-group(hero-img){ animation-duration: 420ms; }
   ```
   - 미지원 브라우저면 즉시 전환(크로스페이드 없이)으로 graceful degradation.

**완료 기준**: 미지원 환경에서도 깨지지 않고 기능 안내 배지("이 브라우저는 X 미지원 → 폴백 동작") 표시.

---

### 🟦 Module E — 이미지 & 영상 UI 모션 (CSS)
**목표**: 미디어 몰입 패턴. (영상 재생은 `<video>`, CSS는 "상태 표현" 담당)

**데모**
1. **이미지 zoom + caption reveal** — wrapper `overflow:hidden`, 내부 `<img>`만 `scale(1.12)`, 캡션 슬라이드 인. → *커머스/여행/포트폴리오*
2. **갤러리 썸네일 트랜지션** — hover 시 살짝 lift + 밝기.
3. **clip-path / mask reveal** — 이미지가 좌→우로 닦이듯 등장.
4. **영상 플레이어 오버레이** — play 버튼 fade(`is-playing`), 컨트롤 바, progress(`width 0→100%`), 자막 등장. → *OTT/강의*
5. **숏폼 reel 전환** — 세로 카드가 위로 스냅 전환.

**완료 기준**: 이미지 zoom 시 레이아웃 고정(wrapper 고정), 플레이어 상태 토글 동작.

---

### 🟪 Module F — SVG 엔진 비교 (CSS vs SMIL vs JS vs Lottie)
**목표**: **같은 결과(예: 로딩 스피너)를 3~4가지 엔진으로** 나란히 구현해 차이를 체감.

**데모(나란히 배치)**
1. **CSS 구동 SVG** — `transform-box:fill-box; transform-origin:center; animation: spin 1s linear infinite;`
2. **SMIL** — `<animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite"/>`
3. **JS (Web Animations API)** — `el.animate([{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:1000,iterations:Infinity})`
4. **(설명) 라이브러리** — GSAP/anime.js/Vivus/Lottie/Framer Motion이 각각 강한 지점 표로 요약.

**엔진별 노트(앱이 가르칠 핵심)**
- SMIL: 외부 CSS/JS 없이 SVG 파일 자체로 재생, 단독 아이콘에 강함. 복잡한 상태 분기는 약함.
- CSS: 가장 보편·고성능(transform/opacity). UI 마이크로 인터랙션의 99%.
- JS: 클릭/스크롤/데이터/물리 등 정밀 제어.
- Lottie: After Effects → Bodymovin JSON → 렌더. 디자이너 타임라인 재현, 온보딩/빈상태.

**완료 기준**: 동일 스피너 3엔진이 시각적으로 동일하게 돌고, 각 코드 복사 가능.

---

### 🟪 Module G — SVG 기법 도감 (10기법)
**목표**: SVG 애니메이션의 "종류"를 라이브로 모두 보여주는 핵심 모듈. 데이터 주도(5.4)로.

각 기법: 라이브 데모 + 핵심 원리 1줄 + 적용사례 + 코드.

1. **속성 변화(`<animate>`)** — `r/cx/fill/opacity` 보간. 예: 맥동 점, `rect`의 `rx` 4↔20. → 장식 배너/이메일 벡터.
2. **변형(`<animateTransform>` / CSS transform)** — rotate/scale/translate. → 새로고침·설정 톱니, 업로드 구름.
3. **경로 이동(`<animateMotion>` / CSS `offset-path`)** — `mpath` + `rotate="auto"`. → 배달 라이더, 지도 마커, 온보딩 흐름.
   ```html
   <path id="route" d="M20 80 C80 10 160 150 240 60" fill="none"/>
   <circle r="8"><animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
     <mpath href="#route"/></animateMotion></circle>
   ```
4. **선 그리기(stroke)** — `stroke-dasharray:L; stroke-dashoffset:L → 0`. **정확한 L은 JS `getTotalLength()`로 측정**. → 로고/서명/성공 체크.
   ```ts
   // lib/getPathLength.ts
   export function drawPath(path: SVGPathElement, dur = 2000) {
     const L = path.getTotalLength();
     path.style.strokeDasharray = `${L}`;
     path.style.strokeDashoffset = `${L}`;
     path.getBoundingClientRect(); // reflow
     path.style.transition = `stroke-dashoffset ${dur}ms ease`;
     path.style.strokeDashoffset = "0";
   }
   ```
5. **형태 모핑(morphing)** — `path`의 `d` 보간(재생↔정지, 햄버거↔X, blob). **앵커 점 개수·명령 구조가 같아야 부드럽다**; 다르면 GSAP MorphSVG / flubber로 점 개수 자동 매칭.
6. **Mask / clipPath 리빌** — 보이는 영역을 움직여 콘텐츠가 닦이듯 등장. → 히어로 reveal, 원형 progress, 쿠폰 긁기, 스켈레톤→콘텐츠.
   ```html
   <clipPath id="reveal"><rect x="0" y="0" width="0" height="120">
     <animate attributeName="width" values="0;300" dur="1s" fill="freeze"/></rect></clipPath>
   <g clip-path="url(#reveal)"><image href="product.png" width="300" height="120"/></g>
   ```
7. **Filter 애니메이션** — `feGaussianBlur`(glow), `feTurbulence`(noise/liquid), gooey. → 알림 pulse, 비주얼라이저, AI "생성 중" orb.
8. **viewBox / 카메라 워크** — `viewBox`를 보간해 줌인/이동. → 아키텍처 전체→특정 서버 확대, 지도 국가→매장.
9. **데이터 시각화** — 막대 자라남/도넛 차오름/선 그려짐. 옵션으로 D3 `transition()` 노트.
10. **Lottie 임베드** — `lottie-react`로 JSON 재생(루프/자동재생). → 온보딩, 결제 성공, 빈 상태, 404.

**완료 기준**: 10기법 전부 라이브 + 코드. 선 그리기의 L 측정, 모핑 토글, animateMotion 경로 이동이 실제 동작.

---

### 🟪 Module H — 실전 와이어프레임 (상태 기반)
**목표**: 진짜 제품 컴포넌트처럼 **상태 머신**으로 SVG 모션을 묶는다. (React로 옮기기 좋은 패턴)

**데모**
1. **결제/제출 버튼** — `idle → loading(스피너) → success(원→체크 순차 그리기) → error(X + shake)`. 상태 전환 버튼으로 직접 트리거. (Claude 데모의 상태 컨트롤 패턴 계승)
2. **업로드 진행률** — 원형(stroke-dashoffset) + 막대, % 라벨, 완료 시 체크.
3. **빈 상태 / 404** — 짧게 반복하는 SVG 일러스트(구름/박스/로봇), `role="img"` + `<title>`/`<desc>`.

**완료 기준**: 결제 버튼이 4상태를 깔끔히 순회(특히 성공 체크가 "원→체크" 순차).

---

### 🟩 Module I — 적용사례 매트릭스 & 선택 가이드
**목표**: "어디에 무엇을" 한 화면에서 결정.

1. **화면별 매트릭스(표)** — 행: 랜딩 히어로 / 온보딩 / 결제·저장·업로드 / 대시보드 / 지도·물류 / 기술문서 / 광고배너 / 빈상태·에러. 열: 추천 기법 · 주 엔진 · 구체 예시 · (클릭 시 해당 데모로 점프).
2. **결정 트리(인터랙티브)** — 질문을 따라가며 추천 기법 도출:
   - Q1 "두 상태 사이 전환인가, 스스로 반복인가?" → Transition / @keyframes
   - Q2 "스크롤 위치가 진행률인가?" → Scroll-driven
   - Q3 "목록→상세 이동인가?" → View Transition
   - Q4 "선이 그려지는 느낌?" → SVG stroke
   - Q5 "디자이너 AE 타임라인?" → Lottie
3. **엔진 선택 요약표** — 목적(아이콘/로더, 단독 SVG 반복, 클릭·스크롤·API, 복잡 일러스트, 차트, path morph/고급) → 추천(CSS/SMIL/JS/Lottie/D3/GSAP·Motion).

**완료 기준**: 매트릭스 행 클릭 시 해당 모듈/데모로 이동, 결정 트리가 끝에서 추천 + 데모 링크 제시.

---

### 🟩 Module J — 성능 & 접근성 도구
**목표**: 앱이 "성능·접근성"을 측정·시연하는 도구가 된다.

1. **FPS 미터** — `requestAnimationFrame` 기반 실시간 FPS 표시. 토글로 "나쁜 예(`left`/`width`/`margin` 애니메이션 = reflow)" vs "좋은 예(`transform`/`opacity`)"를 동시에 돌려 프레임 드랍 비교.
2. **reduce-motion 시뮬 패널** — 전역 토글(4.1-④)의 효과를 한 화면에서 미리보기.
3. **`will-change` 데모** — 사용/남용 비교 + "마지막 수단" 경고.
4. **접근성 체크리스트** — `prefers-reduced-motion` 대응 / 자동반복 모션 끌 수단 / SVG `role="img"`·`<title>`·`<desc>` / 포커스 가시성 / 모션이 정보 유일 전달수단이 아닐 것. 각 항목에 "예/아니오" 셀프체크 + 코드 스니펫.

**완료 기준**: FPS 미터가 두 예시의 차이를 수치로 보여주고, reduce-motion 토글이 전 페이지에 즉시 반영.

---

## 7. 접근성 요구사항 (전역)
`globals.css`에 기본 포함. (앱 자체가 모범이 되어야 함)
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
```
추가 규칙:
- 의미 있는 SVG에는 `role="img"` + `<title>`(+필요 시 `<desc>`). 장식용 SVG는 `aria-hidden="true"`.
- 모든 인터랙티브 요소 키보드 포커스 가능 + `:focus-visible` 스타일.
- 자동반복/시차 같은 **앰비언트 모션은 reduce 시 끄되, 사용자가 직접 누른 결과의 핵심 피드백은 남긴다.**
- 색만으로 상태를 전달하지 않는다(체크/텍스트 병행).

## 8. 성능 요구사항 (전역)
- **transform / opacity만 애니메이션**(레이아웃·페인트 회피, 합성 단계 유지). `width/height/top/left/margin` 애니메이션 금지(트릭으로 `scale`·`translate`·`grid-fr` 사용).
- `will-change`는 무거운 모션 직전에만, 끝나면 제거. 남발 금지.
- 무한 루프 데모는 화면 밖이면 일시정지(IntersectionObserver) 고려.
- 코드 하이라이트(Shiki)는 서버 컴포넌트/빌드 타임에 처리해 클라 부담 최소화.
- 60fps 목표, J 모듈의 FPS 미터로 자가 검증.

## 9. 반응형 요구사항
- 브레이크포인트: `sm 640 / md 768 / lg 1024 / xl 1280`.
- 데스크톱: 사이드바 고정 + DemoFrame 2열(스테이지|컨트롤). 모바일: 사이드바→상단 드로어, DemoFrame 1열(스테이지 위, 컨트롤 아래, 코드 접힘).
- 터치에서 hover 데모는 "탭=토글"로 동작 대체.

## 10. 콘텐츠 / 카피 (KO 우선)
- 기본 한국어. EN 토글 시 사전 교체(`messages/ko.ts`, `messages/en.ts` 또는 next-intl).
- 톤: 짧고 명확. 각 데모 1줄 적용사례 + 필요 시 "원리" 1~2줄.
- 코드 주석은 한국어 OK(복사 코드에 한 줄 설명 포함 가능).

---

## 11. 단계적 빌드 플랜 (Phase 0 → 9)

> 각 Phase는 **독립적으로 검증** 후 다음으로. 코딩 에이전트에게 "지금은 Phase N만 하라"고 못박기.

### Phase 0 — 셋업 & 디자인 토큰
- 작업: 1.2 초기화, 2장 토큰/글래스 유틸, 폰트, 다크 기본.
- 완료: 빈 페이지에 글래스 카드 하나가 레퍼런스 톤으로 보인다.

### Phase 1 — 셸(헤더·사이드바·라우팅·스크롤스파이)
- 작업: 3장 레이아웃, 4.1/4.2 전역 컨트롤+Zustand, `useSyncHtmlFlags`.
- 완료: 5.1 완료기준의 토글들 + 스크롤스파이 동작.

### Phase 2 — 공통 컴포넌트(DemoFrame/CodePanel/ControlPanel/CopyButton)
- 작업: 5장 전체 + 더미 데모로 동기화 검증.
- 완료: 슬라이더↔모션↔코드 동기화 + 복사 동작.

### Phase 3 — Module A (CSS 기초)
- 완료: Transition/@keyframes/Transform/Timing 4데모 + cubic-bezier 에디터.

### Phase 4 — Module B + C (마이크로 인터랙션 + UI 컴포넌트)
- 완료: 11개 데모 동작, 제품 예시 pill.

### Phase 5 — Module D + E (스크롤/전환 + 이미지/영상)
- 완료: feature-detection 폴백 동작 + 미지원 배지.

### Phase 6 — Module F (SVG 엔진 비교)
- 완료: 동일 스피너 3엔진 + 라이브러리 요약표.

### Phase 7 — Module G (SVG 10기법 도감)  ← 가장 큰 분량
- 완료: 10기법 라이브 + 코드 + getTotalLength/morph/animateMotion 동작.

### Phase 8 — Module H + I (실전 와이어프레임 + 매트릭스/가이드)
- 완료: 결제버튼 4상태 + 매트릭스 점프 + 결정 트리.

### Phase 9 — Module J + 접근성/성능 패스 + 마감
- 작업: FPS 미터, reduce-motion 시뮬, 7·8장 전수 점검, 반응형 QA, Overview 화면 마감, 배포(Vercel).
- 완료: 0.4 성공 기준 전부 체크.

### 전체 최종 체크리스트
- [ ] 모든 데모 라이브 + 코드 복사 가능(붙여넣어 동작)
- [ ] transform/opacity 외 레이아웃 애니메이션 없음(아코디언 grid-fr 예외)
- [ ] prefers-reduced-motion 존중 + 앱 내 시뮬 토글
- [ ] 키보드 포커스/`:focus-visible`/SVG 타이틀
- [ ] 모바일~데스크톱 반응형 무결
- [ ] 다크/라이트 모두 정상
- [ ] FPS 미터로 60fps 확인

---

## 12. 바이브코딩 실전 팁 (프롬프트 운영)

**Phase 시작 프롬프트 템플릿**
```
첨부한 사양서의 Phase {N}만 구현해줘.
- 공통 컴포넌트 계약(5장)을 반드시 재사용하고 새 UI를 임의로 만들지 마.
- 모션은 순수 CSS/네이티브 SVG로 작성하고, 복사 코드는 프레임워크 없이 동작해야 해.
- 끝나면 이 Phase의 '완료 기준' 체크리스트를 스스로 점검해서 통과 여부를 표로 보고해줘.
```

**가드레일(매번 상기시킬 것)**
- "transform/opacity만 애니메이션. `left/width/top/margin` 쓰지 마."
- "데모 모션을 Framer Motion으로 만들지 마. (F 모듈의 JS 엔진 데모 제외)"
- "컨트롤 값과 표시 코드는 동일 params에서 파생(5.5). 둘이 어긋나면 버그."
- "새 기법은 `data/techniques.ts` 객체 추가로 끝나게 데이터 주도로."

**회귀 방지**
- Phase마다 커밋(`feat(moduleG): ...`). Mac에서 작업하고 GitHub로 동기화하는 기존 워크플로 그대로.
- 데모가 깨지면 "어떤 데모/어떤 컨트롤에서 모션과 코드가 어긋나는지" 구체적으로 적어 수정 요청.

**디버깅 프롬프트 예**
```
Module G의 '선 그리기' 데모에서 stroke가 한 번에 다 보여. getTotalLength로 L을 재고
dasharray/dashoffset=L에서 0으로 transition 하는 흐름(5.4 코드)대로 고쳐줘.
reflow 트리거(getBoundingClientRect) 빠졌는지 확인해.
```

---

## 13. 확장 아이디어 (마감 후, 선택)
- **코드 → 라이브 에디터**: 사용자가 CSS를 직접 편집하면 스테이지가 실시간 반영(미니 CodeMirror).
- **공유 URL**: 컨트롤 상태를 쿼리스트링/persistent storage로 직렬화해 "내 설정" 공유.
- **즐겨찾기/스니펫함**: 자주 쓰는 패턴 북마크.
- **Export**: 선택 데모를 독립 HTML/`.css`로 내려받기.
- **프레임워크 토글**: 같은 데모를 "Vanilla / React+Framer Motion / Vue" 코드로 전환 표시.
- **GSAP/anime.js 심화 탭**: 모핑·스크롤트리거(ScrollTrigger) 고급 예제.

---

## 부록 A — 앱이 "정확히" 가르쳐야 할 사실 (코드 패널/노트 검증용)
- `transition` 단축 = `property | duration | timing-function | delay`. **`transition-duration` 기본값 `0s`** → 시간을 안 주면 보이는 전환이 없다.
- `animation` 단축 = `name | duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | timeline`. **`animation-duration` 기본 `0s`**.
- 헷갈리는 3개: `iteration-count: infinite`(반복), `direction: alternate`(왕복), `fill-mode: forwards`(끝 프레임 유지 — 없으면 원위치로 튕김).
- Scroll-driven: 시간(document timeline) 대신 **스크롤 기반 timeline**으로 값 애니메이션(`animation-timeline: view()`/`scroll()`).
- View Transition: `document.startViewTransition()` + `view-transition-name`으로 이전/새 뷰를 스냅샷 연결, 특정 요소만 별도 전환.
- SMIL `<animate>`(속성), `<animateMotion>`(경로 이동), `<animateTransform>`(이동/회전/확대/skew)은 최신 브라우저에서 widely available.
- 성능: 가능하면 `opacity`/`transform`으로 제한해 compositing 단계 유지. `will-change`는 성능 문제 **마지막 수단**.
- 접근성: `prefers-reduced-motion`은 사용자가 비필수 모션 줄이기를 요청했는지 감지. SVG `<title>`/`<desc>`는 보조기술용 텍스트 대안.

> (위 사실들은 MDN / web.dev 등 공개 문서 기준의 안정적 동작이며, 최신 기능은 **feature-detection + 폴백**으로 어느 브라우저에서도 깨지지 않게 구현한다.)

## 부록 B — 라이브러리 빠른 레퍼런스 (F·I 모듈 표/노트용)
| 라이브러리 | 성격 | 언제 |
|---|---|---|
| **Animate.css** | 프리셋 클래스 | 빠르게 가져다 쓰는 등장/강조 |
| **AOS** | 스크롤 등장 전용 | 마케팅/랜딩 reveal |
| **GSAP**(+ScrollTrigger/DrawSVG/MorphSVG) | 정밀 타임라인·스크롤·모핑 | 복잡/고급 모션, SVG morph |
| **Framer Motion (motion)** | React 제스처·스프링 물리 | React 환경 인터랙션 |
| **anime.js** | 경량 JS 타임라인 | 가벼운 JS 제어 |
| **Vivus** | SVG 선 그리기 전용 | 로고 드로잉 |
| **Lottie (lottie-web / lottie-react)** | AE→JSON 렌더 | 온보딩/빈상태/일러스트 모션 |
| **Web Animations API** | 브라우저 내장 `element.animate()` | 무의존 JS 모션 |
| **D3** | 데이터 시각화 + `transition()` | 차트 보간 |
| **flubber** | path 보간 보조 | 점 개수 다른 모핑 매칭 |

---

### ✅ 요약
이 프롬프트대로 만들면, **CSS(기초·마이크로·컴포넌트·스크롤/전환·미디어) + SVG(엔진 비교·10기법 도감·상태기반 와이어프레임) + 적용 가이드 + 성능/접근성 도구**를 하나의 다크 글래스모피즘 웹앱에 담은, "보고 → 만지고 → 복사하는" 통합 모션 랩이 나옵니다. Phase 0부터 순서대로, 각 단계 완료 기준을 통과시키며 진행하세요.
