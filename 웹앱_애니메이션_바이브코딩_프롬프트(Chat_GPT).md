# CSS & SVG 애니메이션 웹앱 기능 확장용 바이브코딩 프롬프트

이 문서는 기존 **CSS 애니메이션 + SVG 애니메이션 웹앱**에 아래 8개 기능을 추가하기 위한 바이브코딩 프롬프트 모음입니다.

- 3번: JavaScript Timeline Lab
- 4번: Canvas Particle Lab
- 5번: Lottie Lab
- 6번: Scroll Animation Lab
- 7번: 3D / WebGL Lab
- 8번: Page Transition Lab
- 9번: Micro Interaction Lab
- 10번: Accessibility Lab

기본 전제는 **React + Vite + TypeScript** 기반 웹앱입니다. 프로젝트가 Next.js, Vue, Svelte, 순수 HTML/CSS/JS 구조라면 프롬프트 안의 “기존 프로젝트 구조에 맞춰 적용” 지시를 유지하고, 라우팅·컴포넌트 경로만 현재 구조에 맞게 바꾸면 됩니다.

---

## 0. 전체 작업 원칙

아래 프롬프트들은 Cursor, Claude Code, Windsurf, Replit Agent, Lovable, Bolt 같은 AI 코딩 도구에 그대로 붙여 넣는 것을 목표로 작성했습니다.

### 공통 요구사항

모든 기능 추가 작업에서 다음 원칙을 지켜줘.

1. 기존 CSS Animation Lab과 SVG Animation Lab 기능을 삭제하거나 깨뜨리지 않는다.
2. 새 기능은 각각 독립적인 Lab 페이지 또는 탭으로 추가한다.
3. 기존 라우팅 구조가 있으면 그대로 따른다.
4. 라우팅 구조가 없으면 상단/사이드 내비게이션에 탭 방식으로 추가한다.
5. TypeScript를 사용하는 경우 `any` 사용을 최소화한다.
6. 애니메이션은 사용자가 직접 조절할 수 있어야 한다.
7. 각 Lab에는 다음 요소를 기본 포함한다.
   - 미리보기 영역
   - 컨트롤 패널
   - 현재 효과 설명
   - 코드 예시 보기 영역
   - 초기화 버튼
8. 모바일에서도 레이아웃이 깨지지 않게 반응형으로 구현한다.
9. `prefers-reduced-motion` 사용자를 고려하여 모션 감소 옵션을 적용한다.
10. 무한 루프 애니메이션, Canvas, WebGL, 타이머, 이벤트 리스너는 컴포넌트 언마운트 시 반드시 정리한다.
11. 새 라이브러리를 설치해야 한다면 먼저 이유를 설명하고, `package.json`에 필요한 의존성을 추가한다.
12. 구현 후에는 직접 실행 가능한 검수 체크리스트를 남긴다.

---

## 1. 먼저 실행할 프로젝트 분석 프롬프트

아래 프롬프트를 가장 먼저 사용하세요.

```text
너는 시니어 프론트엔드 엔지니어야.

현재 프로젝트는 CSS 애니메이션과 SVG 애니메이션을 설명하고 테스트하는 웹앱이야. 이 프로젝트에 JavaScript Timeline Lab, Canvas Particle Lab, Lottie Lab, Scroll Animation Lab, 3D/WebGL Lab, Page Transition Lab, Micro Interaction Lab, Accessibility Lab을 단계적으로 추가하려고 해.

먼저 코드를 수정하지 말고 프로젝트 구조를 분석해줘.

분석할 항목:
1. 사용 중인 프레임워크와 빌드 도구 확인
2. 라우팅 방식 확인
3. 현재 페이지/컴포넌트 구조 확인
4. 스타일링 방식 확인
   - CSS Modules인지
   - Tailwind인지
   - 일반 CSS인지
   - styled-components인지
5. 기존 Animation Lab 컴포넌트가 있다면 구조 파악
6. 새 Lab 페이지를 추가하기 가장 좋은 위치 제안
7. 공통 컴포넌트로 분리할 수 있는 요소 제안
   - LabShell
   - PreviewPanel
   - ControlPanel
   - CodeBlock
   - CopyButton
   - RangeSlider
   - ToggleSwitch
8. 추가 설치가 필요한 라이브러리 후보 정리
   - lottie-web
   - three
   - gsap은 선택 사항으로만 제안
9. 기존 코드를 깨뜨리지 않고 기능을 확장하는 작업 순서 제안

출력 형식:
- 프로젝트 구조 요약
- 수정해야 할 파일 목록
- 새로 만들 파일 목록
- 기능별 구현 순서
- 주의해야 할 리스크

아직 파일을 수정하지 말고 분석 결과만 보여줘.
```

---

## 2. 공통 레이아웃과 내비게이션 추가 프롬프트

각 Lab을 추가하기 전에 공통 구조를 먼저 잡으면 이후 작업이 훨씬 편합니다.

```text
이제 새 애니메이션 Lab 기능들을 담을 공통 구조를 만들어줘.

목표:
기존 CSS Animation Lab과 SVG Animation Lab을 유지하면서, 아래 Lab 메뉴를 추가할 수 있는 확장 가능한 구조를 만든다.

추가할 Lab 메뉴:
1. CSS Motion Lab
2. SVG Motion Lab
3. JavaScript Timeline Lab
4. Canvas Particle Lab
5. Lottie Lab
6. Scroll Animation Lab
7. 3D / WebGL Lab
8. Page Transition Lab
9. Micro Interaction Lab
10. Accessibility Lab

구현 요구사항:
1. 기존 라우터가 있으면 라우터에 새 경로를 추가해줘.
2. 라우터가 없으면 상태 기반 탭 내비게이션으로 구현해줘.
3. 공통 Lab 레이아웃 컴포넌트를 만들어줘.
   - 이름 예시: `LabShell`
   - props 예시:
     - `title`
     - `description`
     - `children`
     - `controls`
     - `code`
     - `tips`
4. 공통 코드 블록 컴포넌트를 만들어줘.
   - 이름 예시: `CodeBlock`
   - 코드 복사 버튼 포함
   - 복사 성공 상태 표시
5. 공통 컨트롤 컴포넌트를 만들어줘.
   - `RangeControl`
   - `SelectControl`
   - `ToggleControl`
   - `ButtonGroup`
6. 내비게이션에서 현재 선택된 Lab을 명확히 표시해줘.
7. 모바일에서는 메뉴가 가로 스크롤 또는 드롭다운으로 동작하게 해줘.
8. 다크 모드가 이미 있으면 유지하고, 없으면 기존 디자인을 해치지 않는 중립적인 스타일로 작성해줘.
9. 접근성을 고려해 버튼, 탭, 내비게이션에 적절한 `aria-label`, `aria-current`, `role`을 추가해줘.
10. CSS 변수 기반으로 애니메이션 속도와 모션 감소 옵션을 나중에 연결할 수 있게 준비해줘.

예상 파일 구조:
- `src/components/lab/LabShell.tsx`
- `src/components/lab/CodeBlock.tsx`
- `src/components/lab/controls/RangeControl.tsx`
- `src/components/lab/controls/SelectControl.tsx`
- `src/components/lab/controls/ToggleControl.tsx`
- `src/components/lab/controls/ButtonGroup.tsx`
- `src/data/labs.ts`
- 기존 라우터 또는 App 컴포넌트 수정

검수 기준:
1. 기존 CSS/SVG Lab에 접근할 수 있다.
2. 새 Lab 메뉴들이 화면에 표시된다.
3. 아직 구현되지 않은 Lab은 “준비 중” 안내를 표시한다.
4. 코드 복사 버튼이 정상 작동한다.
5. 모바일 폭에서도 레이아웃이 깨지지 않는다.

작업 후 변경 파일 목록과 실행 방법을 알려줘.
```

---

# 3번 기능: JavaScript Timeline Lab

## 기능 목표

CSS만으로는 어려운 **재생, 정지, 역재생, 속도 조절, 진행률 조절, 타임라인 제어**를 Web Animations API 기반으로 테스트할 수 있는 Lab을 추가합니다.

## 구현할 핵심 기능

- Web Animations API 기반 애니메이션 실행
- Play / Pause / Reverse / Cancel / Finish 버튼
- 속도 조절
- 반복 횟수 조절
- easing 선택
- duration 조절
- delay 조절
- progress scrubber
- keyframes preset 선택
- 현재 애니메이션 코드 예시 표시
- reduced motion 상태에서는 자동 재생 제한

## 3-1. JavaScript Timeline Lab 기본 구현 프롬프트

```text
JavaScript Timeline Lab을 구현해줘.

목표:
Web Animations API를 사용해서 DOM 요소 애니메이션을 JavaScript로 제어하는 실험실 페이지를 만든다.

전제:
- 기존 CSS/SVG Lab은 유지한다.
- 이미 LabShell, CodeBlock, RangeControl, SelectControl, ToggleControl 같은 공통 컴포넌트가 있다면 재사용한다.
- 없으면 현재 프로젝트 스타일에 맞춰 최소 구현한다.

새 페이지 이름:
- `JavaScriptTimelineLab`

추천 경로:
- `src/pages/JavaScriptTimelineLab.tsx`
- 또는 현재 프로젝트의 pages/components 구조에 맞춰 생성

구현 UI:
1. 상단 제목
   - 제목: `JavaScript Timeline Lab`
   - 설명: `Web Animations API로 애니메이션을 재생, 정지, 역재생, 속도 조절할 수 있습니다.`
2. 미리보기 영역
   - 중앙에 애니메이션 대상 박스 1개 표시
   - 박스 안 텍스트: `Animate me`
   - 현재 상태에 따라 이동, 회전, 확대, 투명도 변경 등이 일어남
3. 컨트롤 패널
   - Preset 선택 셀렉트
   - Duration range input: 300ms ~ 5000ms
   - Delay range input: 0ms ~ 2000ms
   - Iterations range input: 1 ~ 10, 그리고 Infinity 옵션
   - Playback Rate range input: 0.25 ~ 3
   - Easing 선택
     - linear
     - ease
     - ease-in
     - ease-out
     - ease-in-out
     - cubic-bezier(.34,1.56,.64,1)
   - Direction 선택
     - normal
     - reverse
     - alternate
     - alternate-reverse
   - Progress range input: 0% ~ 100%
4. 버튼 그룹
   - Play
   - Pause
   - Reverse
   - Cancel
   - Finish
   - Restart
5. 상태 표시
   - currentTime
   - playState
   - playbackRate
   - progress percent
6. 코드 예시 영역
   - 현재 설정값을 반영한 `element.animate(keyframes, options)` 코드 표시

애니메이션 preset:
1. Slide + Fade
   - translateX(-80px) opacity 0 → translateX(0) opacity 1
2. Pop
   - scale(.6) opacity 0 → scale(1.08) opacity 1 → scale(1)
3. Rotate Card
   - rotateY(0deg) → rotateY(180deg)
4. Bounce
   - translateY(0) → translateY(-40px) → translateY(0)
5. Glow Pulse
   - boxShadow와 scale을 함께 변경

구현 세부사항:
1. `useRef`로 애니메이션 대상 DOM을 참조한다.
2. `Animation` 객체를 `useRef<Animation | null>`로 관리한다.
3. 설정이 바뀌면 기존 animation을 cancel하고 새 animation을 만든다.
4. 자동 재생은 기본 true로 하되, reduced motion이 감지되면 자동 재생하지 않는다.
5. progress slider를 움직이면 `animation.currentTime`을 직접 변경한다.
6. `requestAnimationFrame` 또는 짧은 interval로 currentTime과 playState를 UI에 반영한다.
7. 컴포넌트 unmount 시 animation을 cancel하고 timer를 정리한다.
8. TypeScript 타입 오류가 없게 작성한다.
9. 모바일에서는 미리보기와 컨트롤이 세로로 쌓이게 한다.
10. 키보드 접근성을 위해 버튼에 명확한 label을 넣는다.

가능하면 다음 훅을 분리해줘:
- `src/hooks/useWebAnimation.ts`

`useWebAnimation` 훅이 제공할 값:
- `targetRef`
- `play()`
- `pause()`
- `reverse()`
- `cancel()`
- `finish()`
- `restart()`
- `setProgress(percent)`
- `playState`
- `currentTime`
- `progress`

검수 기준:
1. Preset을 바꾸면 미리보기 애니메이션이 바뀐다.
2. Play, Pause, Reverse, Cancel, Finish, Restart가 모두 작동한다.
3. Playback Rate를 바꾸면 속도가 즉시 반영된다.
4. Progress slider를 움직이면 애니메이션 위치가 바뀐다.
5. 코드 예시가 현재 설정값과 일치한다.
6. unmount 시 콘솔 에러가 없다.
7. TypeScript 빌드가 통과한다.

구현 후 변경 파일과 주요 로직을 요약해줘.
```

## 3-2. JavaScript Timeline Lab 개선 프롬프트

```text
JavaScript Timeline Lab을 한 단계 개선해줘.

개선 목표:
개발자가 Web Animations API를 학습하고 복사해서 쓸 수 있도록 실용성을 높인다.

추가 기능:
1. 현재 설정을 JSON으로 볼 수 있는 패널 추가
2. `Copy JS Code` 버튼 추가
3. `Copy CSS Equivalent` 버튼 추가
   - CSS로 완전히 동일하게 구현하기 어려운 경우 최대한 비슷한 `@keyframes` 예시를 생성
4. animation event log 추가
   - onfinish
   - oncancel
   - playState changes
5. timeline tick 표시
   - 0%, 25%, 50%, 75%, 100%
6. “성능 팁” 박스 추가
   - transform과 opacity 중심으로 애니메이션하라는 안내
   - layout을 자주 발생시키는 속성 width, height, top, left는 주의하라는 안내
7. reduced motion 상태 표시 배지 추가

구현 세부사항:
1. 이벤트 로그는 최근 10개만 보관한다.
2. Copy 버튼은 복사 성공 시 1.5초 동안 `Copied!` 표시한다.
3. CSS Equivalent는 현재 preset에 맞는 `@keyframes` 문자열을 생성한다.
4. 설정 JSON은 보기 좋게 들여쓰기해서 표시한다.
5. 기존 기능을 깨뜨리지 않는다.

검수 기준:
1. JS 코드 복사가 작동한다.
2. CSS 코드 복사가 작동한다.
3. 이벤트 로그가 정상적으로 쌓인다.
4. reduced motion 상태가 화면에 표시된다.
5. 기존 Play/Pause/Reverse 기능이 그대로 작동한다.
```

---

# 4번 기능: Canvas Particle Lab

## 기능 목표

`<canvas>`를 사용해 CSS/SVG로는 표현하기 어려운 **입자, 눈, 비, 폭죽, 커서 트레일, 별 배경** 같은 실시간 그래픽 효과를 구현합니다.

## 구현할 핵심 기능

- Canvas 2D 렌더링
- requestAnimationFrame 기반 루프
- Particle class 또는 engine 분리
- 프리셋 선택
- 입자 수, 속도, 크기, 중력, 마찰, 색상 조절
- 마우스/터치 인터랙션
- FPS 표시
- Pause / Resume / Reset
- 화면 resize 대응
- reduced motion 대응

## 4-1. Canvas Particle Lab 기본 구현 프롬프트

```text
Canvas Particle Lab을 구현해줘.

목표:
Canvas 2D API와 requestAnimationFrame을 사용해서 다양한 파티클 효과를 실험할 수 있는 Lab 페이지를 만든다.

새 페이지 이름:
- `CanvasParticleLab`

추천 파일:
- `src/pages/CanvasParticleLab.tsx`
- `src/components/canvas/ParticleCanvas.tsx`
- `src/lib/particles/particleTypes.ts`
- `src/lib/particles/particlePresets.ts`
- `src/lib/particles/ParticleEngine.ts`

구현 UI:
1. 제목
   - `Canvas Particle Lab`
2. 설명
   - `Canvas로 눈, 비, 폭죽, 커서 트레일 같은 실시간 파티클 효과를 구현합니다.`
3. 미리보기 영역
   - canvas가 카드형 패널 안에 표시됨
   - 최소 높이 360px
   - 모바일에서는 260px 이상
4. 컨트롤 패널
   - Preset 선택
   - Particle Count: 20 ~ 800
   - Speed: 0.1 ~ 5
   - Size: 1 ~ 16
   - Gravity: -1 ~ 2
   - Friction: 0.8 ~ 1
   - Trail/Fade Amount: 0 ~ 1
   - Color Mode 선택
     - single
     - random
     - rainbow
     - theme
   - Interactivity toggle
   - Pause/Resume 버튼
   - Reset 버튼
5. 상태 표시
   - FPS
   - 현재 particle count
   - canvas size
   - reduced motion 여부
6. 코드 예시 영역
   - 현재 preset과 설정값 기반의 Canvas 코드 예시 표시

Preset 목록:
1. Snow
   - 천천히 아래로 떨어지는 흰색 입자
   - 좌우 흔들림 포함
2. Rain
   - 빠르게 떨어지는 선형 입자
   - 아래 도달 시 재생성
3. Confetti
   - 다양한 색상의 사각형/원 입자가 중력 영향을 받음
4. Fireworks
   - 클릭 위치 또는 중앙에서 폭발
   - 입자가 퍼지고 서서히 사라짐
5. Cursor Trail
   - 마우스 이동 경로를 따라 작은 입자 생성
6. Starfield
   - 중앙에서 바깥으로 이동하는 별 배경 느낌

구현 세부사항:
1. `requestAnimationFrame` 루프를 사용한다.
2. 컴포넌트 unmount 시 animation frame을 cancel한다.
3. canvas 크기는 `ResizeObserver` 또는 window resize 이벤트로 반응형 처리한다.
4. devicePixelRatio를 고려해서 고해상도 화면에서도 선명하게 렌더링한다.
5. `ParticleEngine` 클래스는 다음 메서드를 갖게 한다.
   - `init()`
   - `update(deltaTime)`
   - `draw(ctx)`
   - `reset(config)`
   - `resize(width, height)`
   - `handlePointerMove(x, y)`
   - `handlePointerDown(x, y)`
   - `destroy()`
6. 파티클 데이터 타입을 명확히 정의한다.
7. reduced motion이 켜져 있으면 particle count를 자동으로 낮추고 자동 폭발 효과를 끈다.
8. canvas 위에 마우스를 올려도 페이지 스크롤이 불필요하게 막히지 않게 한다.
9. 터치 이벤트도 기본 지원한다.
10. FPS 계산은 최근 프레임 평균으로 표시한다.

검수 기준:
1. 모든 preset이 선택 가능하다.
2. Particle Count를 바꾸면 입자 수가 변한다.
3. Pause/Resume이 작동한다.
4. Reset이 현재 preset을 다시 시작한다.
5. Fireworks는 클릭 또는 터치 위치에서 폭발한다.
6. Cursor Trail은 포인터 이동에 반응한다.
7. 창 크기를 바꿔도 canvas가 깨지지 않는다.
8. 페이지 이동 시 animation frame이 정리된다.
9. TypeScript 빌드가 통과한다.

구현 후 변경 파일과 사용 방법을 요약해줘.
```

## 4-2. Canvas Particle Lab 성능 최적화 프롬프트

```text
Canvas Particle Lab의 성능을 최적화해줘.

목표:
파티클 수가 많아져도 프레임 드랍을 줄이고, 저사양 기기와 모바일에서 안정적으로 작동하게 한다.

개선 항목:
1. deltaTime 기반 업데이트로 프레임레이트가 달라도 움직임 속도가 일정하게 유지되도록 수정
2. 비활성 탭 또는 페이지가 보이지 않을 때 루프 일시정지
   - `document.visibilityState` 사용
3. reduced motion이 켜져 있으면 기본 particle count를 80 이하로 제한
4. 모바일 화면에서는 기본 particle count를 낮춤
5. FPS가 30 이하로 2초 이상 유지되면 particle count를 자동으로 20% 줄이는 adaptive quality 옵션 추가
6. adaptive quality toggle 추가
7. draw 과정에서 불필요한 객체 생성을 줄임
8. particle 배열 재생성을 최소화
9. 이벤트 리스너 cleanup 확인
10. canvas context가 null일 때 안전하게 처리

추가 UI:
- Adaptive Quality toggle
- Performance Mode 선택
  - Quality
  - Balanced
  - Battery Saver

검수 기준:
1. particle count 800에서도 브라우저가 멈추지 않는다.
2. 탭을 다른 곳으로 전환하면 루프가 멈추고 돌아오면 재개된다.
3. Adaptive Quality가 켜져 있으면 FPS 저하 시 입자 수가 줄어든다.
4. 모바일에서도 조작이 가능하다.
5. 콘솔 에러가 없다.
```

---

# 5번 기능: Lottie Lab

## 기능 목표

After Effects 기반 JSON 애니메이션을 웹에서 재생할 수 있는 **Lottie 실험실**을 추가합니다. 로딩, 성공 체크, 빈 상태, 온보딩 캐릭터 같은 제품 UI 애니메이션에 적합합니다.

## 필요한 라이브러리

```bash
npm install lottie-web
```

## 구현할 핵심 기능

- Lottie JSON 렌더링
- 기본 샘플 애니메이션
- JSON 업로드
- URL 입력 로드 옵션
- Play / Pause / Stop
- Loop toggle
- Autoplay toggle
- Speed 조절
- Direction 조절
- Frame slider
- Segment play
- hover 시 재생 옵션
- 코드 예시 출력

## 5-1. Lottie Lab 기본 구현 프롬프트

```text
Lottie Lab을 구현해줘.

목표:
`lottie-web`을 사용해서 Lottie JSON 애니메이션을 불러오고, 재생 옵션을 실시간으로 조절할 수 있는 Lab 페이지를 만든다.

필요한 의존성:
- `lottie-web`

먼저 package.json을 확인해서 lottie-web이 없으면 추가해줘.
설치 명령이 필요한 경우 다음을 안내해줘.
- `npm install lottie-web`

새 페이지 이름:
- `LottieLab`

추천 파일:
- `src/pages/LottieLab.tsx`
- `src/components/lottie/LottiePreview.tsx`
- `src/hooks/useLottieAnimation.ts`
- `src/data/lottieSamples.ts`

구현 UI:
1. 제목
   - `Lottie Lab`
2. 설명
   - `Lottie JSON 애니메이션을 업로드하고 재생 속도, 방향, 반복 여부를 테스트합니다.`
3. 미리보기 영역
   - Lottie animation container 표시
   - 로딩 상태 표시
   - 에러 상태 표시
4. 샘플 선택 영역
   - 기본 샘플 3개 제공
     - Loading Dots
     - Success Check
     - Empty State
   - 외부 파일 없이 동작하도록 최소한의 inline Lottie JSON 샘플을 하나 이상 포함
5. JSON 업로드 영역
   - `.json` 파일 drag & drop 지원
   - 파일 선택 버튼 지원
   - 잘못된 JSON일 경우 에러 메시지 표시
6. URL 입력 영역
   - Lottie JSON URL 입력
   - Load 버튼
   - CORS 에러 가능성을 사용자에게 안내
7. 컨트롤 패널
   - Play
   - Pause
   - Stop
   - Restart
   - Loop toggle
   - Autoplay toggle
   - Hover to Play toggle
   - Speed range: 0.25 ~ 3
   - Direction 선택: forward / reverse
   - Frame slider
   - Segment start frame
   - Segment end frame
   - Play Segment 버튼
8. 상태 표시
   - totalFrames
   - currentFrame
   - duration
   - isPaused
   - loop
   - speed
9. 코드 예시 영역
   - 현재 설정으로 `lottie.loadAnimation()`을 사용하는 코드 표시

구현 세부사항:
1. lottie-web은 브라우저 환경에서만 실행되도록 처리한다.
2. container ref를 사용해서 animation을 mount한다.
3. 설정 변경 시 기존 animation instance를 destroy하고 새로 만든다.
4. 컴포넌트 unmount 시 반드시 `animation.destroy()`를 호출한다.
5. frame slider는 animation의 `goToAndStop(frame, true)`를 사용한다.
6. speed 변경은 `setSpeed()`를 사용한다.
7. direction 변경은 `setDirection(1 또는 -1)`을 사용한다.
8. play segment는 `playSegments([start, end], true)`를 사용한다.
9. hover to play가 켜져 있으면 mouseenter에서 play, mouseleave에서 pause한다.
10. reduced motion 상태에서는 autoplay를 기본 false로 설정한다.
11. 업로드한 JSON은 화면 새로고침 전까지만 메모리에 보관한다.
12. TypeScript 타입이 부족한 경우 안전한 타입 가드를 작성한다.

검수 기준:
1. 기본 샘플 애니메이션이 표시된다.
2. Play/Pause/Stop/Restart가 작동한다.
3. Loop toggle이 작동한다.
4. Speed 조절이 반영된다.
5. Reverse 방향 재생이 가능하다.
6. Frame slider로 특정 프레임을 볼 수 있다.
7. JSON 파일 업로드가 작동한다.
8. 잘못된 JSON 업로드 시 앱이 죽지 않고 에러 메시지를 표시한다.
9. unmount 시 destroy가 호출되어 메모리 누수가 없다.
10. TypeScript 빌드가 통과한다.

구현 후 변경 파일과 사용 방법을 정리해줘.
```

## 5-2. Lottie Lab UX 개선 프롬프트

```text
Lottie Lab의 UX를 개선해줘.

추가 기능:
1. Drag & Drop 업로드 영역을 더 명확하게 표시
2. 업로드 중, 파싱 중, 로드 성공, 로드 실패 상태를 각각 UI에 표시
3. 최근 업로드한 애니메이션 이름 표시
4. 배경 스타일 선택 추가
   - transparent
   - light grid
   - dark grid
   - checkerboard
5. 미리보기 크기 조절 추가
   - 100px ~ 500px
6. animation renderer 선택 추가
   - svg
   - canvas
   - html
   - 기본값은 svg
7. 현재 Lottie 설정을 공유 가능한 JSON config로 표시
8. `Copy React Component` 버튼 추가
   - 현재 설정을 반영한 간단한 React 컴포넌트 코드 생성
9. 에러 메시지는 사용자가 이해하기 쉽게 표시
   - JSON 파싱 실패
   - URL 로드 실패
   - Lottie 포맷이 아님
   - CORS 문제 가능성

검수 기준:
1. 업로드 상태가 명확하게 보인다.
2. 배경 스타일을 바꿔도 애니메이션이 정상 표시된다.
3. renderer 변경 후에도 애니메이션이 다시 로드된다.
4. React 컴포넌트 코드 복사가 작동한다.
5. 에러 상황에서 앱 전체가 멈추지 않는다.
```

---

# 6번 기능: Scroll Animation Lab

## 기능 목표

스크롤 위치에 따라 요소가 등장하거나 이동하는 **reveal, parallax, sticky story, horizontal scroll** 효과를 테스트합니다.

## 구현 방식 선택

외부 라이브러리 없이 구현하는 것을 기본으로 합니다.

- 기본: IntersectionObserver + CSS transform + requestAnimationFrame
- 선택: GSAP ScrollTrigger

처음에는 라이브러리 없이 구현하고, 나중에 필요할 때 GSAP 버전을 추가하는 것을 추천합니다.

## 6-1. Scroll Animation Lab 기본 구현 프롬프트

```text
Scroll Animation Lab을 구현해줘.

목표:
스크롤 위치에 따라 요소가 나타나고, 이동하고, 고정되고, 가로로 흐르는 애니메이션을 테스트할 수 있는 Lab 페이지를 만든다.

새 페이지 이름:
- `ScrollAnimationLab`

추천 파일:
- `src/pages/ScrollAnimationLab.tsx`
- `src/components/scroll/ScrollRevealDemo.tsx`
- `src/components/scroll/ParallaxDemo.tsx`
- `src/components/scroll/StickyStoryDemo.tsx`
- `src/components/scroll/HorizontalScrollDemo.tsx`
- `src/hooks/useIntersectionReveal.ts`
- `src/hooks/useScrollProgress.ts`

구현 UI:
1. 제목
   - `Scroll Animation Lab`
2. 설명
   - `스크롤 위치에 따라 reveal, parallax, sticky, horizontal animation을 테스트합니다.`
3. 데모 선택 탭
   - Reveal
   - Parallax
   - Sticky Story
   - Horizontal Scroll
4. 공통 컨트롤 패널
   - Animation Type
   - Threshold: 0 ~ 1
   - Offset: -200px ~ 200px
   - Duration: 200ms ~ 2000ms
   - Easing 선택
   - Stagger: 0ms ~ 300ms
   - Once toggle
   - Debug markers toggle
5. 코드 예시 영역
   - 선택된 데모에 맞는 React/CSS 코드 표시

Reveal 데모 요구사항:
1. 카드 6개가 스크롤하면서 등장한다.
2. 효과 선택 가능
   - fade-up
   - fade-left
   - fade-right
   - zoom-in
   - blur-in
   - rotate-in
3. IntersectionObserver를 사용한다.
4. once가 false이면 화면 밖으로 나갔다가 다시 들어올 때 재실행된다.
5. stagger 값에 따라 카드가 순차적으로 등장한다.

Parallax 데모 요구사항:
1. 배경 레이어, 중간 레이어, 전경 레이어를 만든다.
2. 스크롤 진행률에 따라 각 레이어가 다른 속도로 움직인다.
3. parallax strength를 조절할 수 있다.
4. requestAnimationFrame으로 scroll 이벤트를 최적화한다.

Sticky Story 데모 요구사항:
1. 왼쪽 또는 상단에 sticky visual 영역을 둔다.
2. 오른쪽 또는 아래쪽에 story step 4개를 둔다.
3. 현재 step에 따라 visual 내용이 바뀐다.
4. step 진입은 IntersectionObserver로 감지한다.
5. 모바일에서는 sticky 구조가 자연스럽게 세로 흐름으로 변경된다.

Horizontal Scroll 데모 요구사항:
1. 세로 스크롤을 하면서 카드들이 가로로 이동하는 효과를 만든다.
2. container의 scroll progress를 계산한다.
3. transform: translateX를 사용한다.
4. 카드 5개 이상 표시한다.
5. reduced motion 상태에서는 일반 세로 목록으로 대체한다.

구현 세부사항:
1. 스크롤 이벤트는 passive listener를 사용한다.
2. 매 스크롤마다 setState를 과도하게 호출하지 않는다.
3. transform과 opacity 중심으로 구현한다.
4. reduced motion이면 reveal은 즉시 표시, parallax/horizontal 이동은 끈다.
5. Debug markers를 켜면 threshold 또는 active section을 시각적으로 보여준다.
6. URL hash나 라우팅이 있다면 스크롤 이동과 충돌하지 않게 한다.
7. 컴포넌트 unmount 시 observer와 event listener를 정리한다.

검수 기준:
1. Reveal 카드가 스크롤 시 등장한다.
2. Parallax 레이어가 다른 속도로 움직인다.
3. Sticky Story의 active step이 바뀐다.
4. Horizontal Scroll이 세로 스크롤에 따라 가로 이동한다.
5. Debug markers toggle이 작동한다.
6. reduced motion 상태에서 과도한 움직임이 제거된다.
7. 모바일 레이아웃이 깨지지 않는다.
8. TypeScript 빌드가 통과한다.

구현 후 변경 파일과 동작 방식을 설명해줘.
```

## 6-2. Scroll Animation Lab 고급 옵션 프롬프트

```text
Scroll Animation Lab에 고급 옵션을 추가해줘.

추가 목표:
실제 랜딩페이지 제작에 바로 활용할 수 있도록 스크롤 애니메이션 설정과 코드 복사 기능을 강화한다.

추가 기능:
1. Reveal preset별 CSS 코드 자동 생성
2. IntersectionObserver options 표시
   - root
   - rootMargin
   - threshold
3. Scroll progress bar 추가
   - 현재 데모 섹션 진행률 표시
4. Active section mini map 추가
5. Parallax 레이어 속도 개별 조절
   - background speed
   - middle speed
   - foreground speed
6. Sticky Story step별 애니메이션 선택
7. Horizontal Scroll 방향 선택
   - left-to-right
   - right-to-left
8. Copy Hook Code 버튼 추가
   - `useIntersectionReveal`
   - `useScrollProgress`
9. 성능 경고 표시
   - 너무 많은 scroll listener가 있으면 안내
   - transform/opacity가 아닌 속성을 애니메이션할 때 주의 안내

검수 기준:
1. 생성된 CSS 코드가 현재 설정과 일치한다.
2. progress bar가 스크롤에 따라 업데이트된다.
3. Parallax 레이어 속도를 개별 조절할 수 있다.
4. Copy Hook Code가 작동한다.
5. 성능 안내가 화면에 표시된다.
```

---

# 7번 기능: 3D / WebGL Lab

## 기능 목표

Three.js 또는 WebGL 기반의 **3D 카드, 회전 로고, 입체 오브젝트, 조명, 카메라, 머티리얼** 효과를 실험할 수 있는 Lab을 추가합니다.

## 필요한 라이브러리

```bash
npm install three
npm install -D @types/three
```

## 구현할 핵심 기능

- Three.js Scene 생성
- Camera, Renderer, Light 구성
- 회전하는 Mesh
- 3D 카드 효과
- 마우스 움직임에 따른 tilt
- material 변경
- 조명 강도 조절
- 자동 회전 on/off
- WebGL 지원 여부 감지
- cleanup/dispose 처리
- reduced motion 대응

## 7-1. 3D / WebGL Lab 기본 구현 프롬프트

```text
3D / WebGL Lab을 구현해줘.

목표:
Three.js를 사용해서 브라우저 안에서 3D 오브젝트와 WebGL 애니메이션을 테스트할 수 있는 Lab 페이지를 만든다.

필요한 의존성:
- `three`
- TypeScript 프로젝트라면 `@types/three`

먼저 package.json을 확인해서 three가 없으면 추가해줘.
설치 명령이 필요한 경우 다음을 안내해줘.
- `npm install three`
- `npm install -D @types/three`

새 페이지 이름:
- `ThreeDWebGLLab`

추천 파일:
- `src/pages/ThreeDWebGLLab.tsx`
- `src/components/three/ThreePreview.tsx`
- `src/components/three/Css3DCardDemo.tsx`
- `src/hooks/useThreeScene.ts`
- `src/lib/three/createScene.ts`
- `src/lib/three/disposeScene.ts`

구현 UI:
1. 제목
   - `3D / WebGL Lab`
2. 설명
   - `Three.js와 CSS 3D transform으로 입체적인 웹 인터랙션을 테스트합니다.`
3. 데모 선택
   - Three.js Object
   - CSS 3D Card
   - Mouse Tilt Panel
4. Three.js 미리보기 영역
   - canvas 표시
   - 기본 오브젝트는 회전하는 cube 또는 torus knot
   - WebGL 미지원 시 fallback 메시지 표시
5. CSS 3D Card 미리보기
   - hover 또는 pointer move에 따라 카드가 기울어짐
   - 카드 앞/뒤 flip 옵션
6. 컨트롤 패널
   - Object 선택
     - cube
     - sphere
     - torus
     - torusKnot
   - Material 선택
     - normal
     - standard
     - wireframe
     - glass-like
   - Auto Rotate toggle
   - Rotation Speed: 0 ~ 5
   - Light Intensity: 0 ~ 5
   - Camera Z: 2 ~ 10
   - Background 선택
     - transparent
     - gradient
     - dark
   - Wireframe toggle
   - Pointer Tilt toggle
7. 상태 표시
   - WebGL supported 여부
   - renderer size
   - pixel ratio
   - object type
8. 코드 예시 영역
   - 현재 선택된 오브젝트와 설정을 반영한 Three.js 코드 표시

구현 세부사항:
1. Three.js renderer는 컴포넌트 mount 시 생성한다.
2. canvas는 container 크기에 맞게 resize한다.
3. devicePixelRatio는 최대 2 정도로 제한해서 성능을 보호한다.
4. animation loop는 requestAnimationFrame으로 구현한다.
5. Auto Rotate가 꺼져 있으면 rotation 업데이트를 멈춘다.
6. reduced motion이 켜져 있으면 Auto Rotate 기본값을 false로 한다.
7. 오브젝트 변경 시 이전 geometry와 material을 dispose한다.
8. 컴포넌트 unmount 시 다음을 정리한다.
   - animation frame cancel
   - renderer.dispose()
   - geometry.dispose()
   - material.dispose()
   - event listener 제거
9. WebGL context 생성 실패 시 앱이 죽지 않고 fallback UI를 표시한다.
10. CSS 3D Card 데모는 Three.js 없이 CSS transform으로 구현한다.
11. Pointer Tilt는 pointer 위치를 기준으로 rotateX, rotateY를 계산한다.
12. 모바일에서는 pointer tilt 대신 touch move 또는 자동 gentle tilt를 제한적으로 적용한다.

검수 기준:
1. Three.js canvas가 정상 표시된다.
2. Object 선택 시 모양이 바뀐다.
3. Material 선택 시 시각 스타일이 바뀐다.
4. Auto Rotate toggle이 작동한다.
5. Rotation Speed가 반영된다.
6. Light Intensity가 반영된다.
7. CSS 3D Card가 hover 또는 pointer move에 반응한다.
8. 페이지 이동 시 WebGL 리소스가 정리된다.
9. WebGL 미지원 환경에서 fallback이 표시된다.
10. TypeScript 빌드가 통과한다.

구현 후 변경 파일과 사용 방법을 요약해줘.
```

## 7-2. 3D / WebGL Lab 고급 개선 프롬프트

```text
3D / WebGL Lab을 고급 데모로 개선해줘.

추가 기능:
1. Environment-like gradient background 추가
2. OrbitControls 없이도 간단한 drag rotate 구현
   - pointer down
   - pointer move
   - pointer up
3. 오브젝트 색상 변경 컨트롤 추가
4. emissive glow 느낌의 material 옵션 추가
5. floating animation toggle 추가
6. screenshot export 버튼 추가
   - 현재 canvas를 PNG로 저장
7. Reset Camera 버튼 추가
8. Performance Mode 추가
   - High
   - Balanced
   - Low
9. Low 모드에서는 pixel ratio를 1로 제한
10. 코드 예시를 다음 두 가지로 분리
   - Vanilla Three.js
   - React component version

주의사항:
- screenshot export는 canvas 보안 제한 때문에 외부 텍스처를 사용하지 않는 현재 scene에서만 지원한다.
- WebGL 리소스 dispose 로직을 유지한다.
- reduced motion이 켜져 있으면 floating animation과 auto rotate를 꺼둔다.

검수 기준:
1. drag로 오브젝트를 회전할 수 있다.
2. 색상 변경이 material에 반영된다.
3. screenshot export가 작동한다.
4. Performance Mode 변경 시 renderer 설정이 바뀐다.
5. Reset Camera가 작동한다.
6. 기존 기능이 깨지지 않는다.
```

---

# 8번 기능: Page Transition Lab

## 기능 목표

화면 전환, 탭 전환, 카드 상세 전환, 모달 전환을 부드럽게 만드는 **View Transition API 기반 페이지 전환 실험실**을 추가합니다.

## 구현할 핵심 기능

- View Transition API 지원 여부 감지
- 목록 → 상세 전환
- 탭 전환
- 모달 전환
- shared element transition
- fallback transition
- reduced motion 대응
- 코드 예시 표시

## 8-1. Page Transition Lab 기본 구현 프롬프트

```text
Page Transition Lab을 구현해줘.

목표:
View Transition API를 사용해서 페이지 또는 UI 상태 전환을 부드럽게 보여주는 실험실 페이지를 만든다. View Transition API를 지원하지 않는 브라우저에서는 CSS 기반 fallback을 제공한다.

새 페이지 이름:
- `PageTransitionLab`

추천 파일:
- `src/pages/PageTransitionLab.tsx`
- `src/hooks/useViewTransition.ts`
- `src/components/transitions/TransitionCardGrid.tsx`
- `src/components/transitions/TransitionDetail.tsx`
- `src/components/transitions/TransitionTabs.tsx`
- `src/components/transitions/TransitionModal.tsx`
- `src/styles/view-transitions.css`

구현 UI:
1. 제목
   - `Page Transition Lab`
2. 설명
   - `View Transition API와 CSS fallback으로 화면 전환 애니메이션을 테스트합니다.`
3. 지원 여부 배지
   - View Transition API supported / fallback mode
4. 데모 선택 탭
   - Card to Detail
   - Tab Transition
   - Modal Transition
   - Route-like Transition
5. 컨트롤 패널
   - Transition Type
     - fade
     - slide
     - scale
     - shared-card
     - blur
   - Duration: 150ms ~ 1200ms
   - Easing 선택
   - Reduced Motion Preview toggle
   - Disable Transition toggle
6. 코드 예시 영역
   - `document.startViewTransition()` 예시
   - fallback CSS 예시

Card to Detail 데모 요구사항:
1. 카드 6개를 그리드로 표시한다.
2. 카드를 클릭하면 상세 화면으로 전환한다.
3. 클릭한 카드 이미지/상징 영역이 상세 화면의 큰 영역으로 자연스럽게 이어지는 shared element 느낌을 구현한다.
4. 뒤로 가기 버튼을 누르면 목록으로 돌아간다.
5. 각 카드에는 고유한 `view-transition-name`을 부여한다.

Tab Transition 데모 요구사항:
1. 탭 3개를 만든다.
2. 탭 변경 시 콘텐츠가 fade 또는 slide로 전환된다.
3. active tab indicator가 부드럽게 이동한다.

Modal Transition 데모 요구사항:
1. Open Modal 버튼을 제공한다.
2. 모달이 열릴 때 scale + fade 전환을 적용한다.
3. 닫을 때도 부드럽게 사라진다.
4. Escape 키와 backdrop click으로 닫을 수 있다.
5. focus trap까지 구현하기 어렵다면 최소한 열릴 때 modal title에 focus를 이동한다.

Route-like Transition 데모 요구사항:
1. 실제 라우터를 변경하지 않더라도 가상의 page A/B/C 상태를 만든다.
2. page 전환 시 View Transition API를 사용한다.
3. API 미지원 시 CSS class 기반 fallback을 적용한다.

구현 세부사항:
1. `useViewTransition` 훅을 만든다.
2. 훅은 다음 함수를 제공한다.
   - `runTransition(callback)`
   - `isSupported`
   - `isTransitioning`
3. `document.startViewTransition`이 있으면 사용한다.
4. 없으면 callback을 바로 실행하고 fallback animation class를 적용한다.
5. reduced motion이 켜져 있으면 transition duration을 0 또는 매우 짧게 한다.
6. View Transition 관련 CSS는 별도 파일로 분리한다.
7. `::view-transition-old(root)`와 `::view-transition-new(root)` 스타일을 작성한다.
8. transition type에 따라 body 또는 root에 data attribute를 넣어 CSS를 전환한다.
9. 브라우저 지원 여부를 UI에 명확히 표시한다.
10. 기존 라우터와 충돌하지 않게 구현한다.

검수 기준:
1. 지원 브라우저에서 View Transition API가 사용된다.
2. 미지원 브라우저에서도 화면 전환이 어색하게 깨지지 않는다.
3. Card to Detail 전환이 작동한다.
4. Tab Transition이 작동한다.
5. Modal Transition이 작동한다.
6. Disable Transition을 켜면 전환 없이 즉시 바뀐다.
7. reduced motion preview가 작동한다.
8. TypeScript 빌드가 통과한다.

구현 후 변경 파일과 핵심 로직을 설명해줘.
```

## 8-2. 실제 라우팅 전환 연결 프롬프트

```text
Page Transition Lab에서 만든 View Transition 로직을 실제 앱 내비게이션에도 선택적으로 연결해줘.

목표:
Lab 메뉴 간 이동 또는 주요 페이지 이동 시 View Transition API를 사용할 수 있게 한다.

구현 요구사항:
1. 기존 라우터가 React Router라면 `TransitionLink` 컴포넌트를 만든다.
2. 기존 라우터가 Next.js라면 현재 구조에 맞는 client-side transition wrapper를 만든다.
3. 라우터가 없고 상태 기반 탭이면 tab 변경 함수에 `runTransition`을 적용한다.
4. 전환 적용 여부를 전역 설정으로 제어할 수 있게 한다.
5. Accessibility Lab에서 만들 전역 reduced motion 설정과 연결할 수 있도록 구조를 열어둔다.
6. 전환 중 중복 클릭을 방지한다.
7. transition 실패 시 일반 navigation으로 fallback한다.

추천 컴포넌트:
- `src/components/transitions/TransitionLink.tsx`
- `src/context/MotionSettingsContext.tsx`가 이미 있으면 연동

검수 기준:
1. Lab 메뉴 이동 시 부드러운 전환이 적용된다.
2. Disable Transition 설정 시 일반 이동으로 바뀐다.
3. reduced motion 상태에서는 전환이 최소화된다.
4. 기존 라우팅이 깨지지 않는다.
5. 브라우저 콘솔 에러가 없다.
```

---

# 9번 기능: Micro Interaction Lab

## 기능 목표

버튼, 토글, 좋아요, 알림, 진행률, 입력창 등 실제 UI에서 자주 쓰이는 **작은 인터랙션 효과**를 모아 테스트하고 재사용할 수 있게 합니다.

## 구현할 핵심 기능

- 버튼 ripple
- magnetic button
- like heart burst
- toggle switch
- toast notification
- progress animation
- skeleton loading
- input focus animation
- copy-to-clipboard interaction
- drag card interaction
- 코드 예시 표시

## 9-1. Micro Interaction Lab 기본 구현 프롬프트

```text
Micro Interaction Lab을 구현해줘.

목표:
실제 웹앱 UI에서 자주 쓰는 작은 인터랙션 효과를 한 페이지에서 테스트하고 코드 예시를 복사할 수 있게 만든다.

새 페이지 이름:
- `MicroInteractionLab`

추천 파일:
- `src/pages/MicroInteractionLab.tsx`
- `src/components/micro/RippleButton.tsx`
- `src/components/micro/MagneticButton.tsx`
- `src/components/micro/LikeBurstButton.tsx`
- `src/components/micro/AnimatedToggle.tsx`
- `src/components/micro/ToastDemo.tsx`
- `src/components/micro/ProgressDemo.tsx`
- `src/components/micro/SkeletonDemo.tsx`
- `src/components/micro/FloatingLabelInput.tsx`
- `src/components/micro/DraggableCard.tsx`
- `src/data/microInteractions.ts`

구현 UI:
1. 제목
   - `Micro Interaction Lab`
2. 설명
   - `버튼, 토글, 좋아요, 토스트, 프로그레스 등 작은 UI 반응 효과를 테스트합니다.`
3. 인터랙션 목록 또는 탭
   - Ripple Button
   - Magnetic Button
   - Like Burst
   - Animated Toggle
   - Toast Notification
   - Progress Animation
   - Skeleton Loading
   - Floating Label Input
   - Draggable Card
4. 미리보기 영역
   - 선택한 micro interaction을 크게 보여준다.
5. 컨트롤 패널
   - Duration: 100ms ~ 1500ms
   - Intensity: 0 ~ 100
   - Easing 선택
   - Sound-like visual feedback toggle
   - Reduced motion preview toggle
6. 코드 예시 영역
   - 선택된 컴포넌트의 React 코드
   - 필요한 CSS 코드
   - 사용 예시

각 인터랙션 요구사항:

A. Ripple Button
1. 클릭 위치에서 원형 ripple이 퍼진다.
2. 버튼 밖으로 ripple이 넘치지 않는다.
3. 여러 번 빠르게 클릭해도 ripple이 자연스럽게 제거된다.
4. 키보드 Enter/Space 클릭에서도 동작한다.

B. Magnetic Button
1. pointer 위치에 따라 버튼이 살짝 따라온다.
2. pointer leave 시 원위치로 돌아온다.
3. intensity로 이동 범위를 조절한다.
4. reduced motion이면 magnetic 이동을 끈다.

C. Like Burst
1. 하트 버튼 클릭 시 liked 상태가 토글된다.
2. liked가 될 때 작은 하트/점 입자가 주변으로 퍼진다.
3. aria-pressed를 적용한다.
4. 애니메이션 종료 후 파티클 DOM을 정리한다.

D. Animated Toggle
1. on/off 상태가 부드럽게 전환된다.
2. knob가 이동하고 배경이 바뀐다.
3. keyboard 조작 가능해야 한다.
4. role="switch"와 aria-checked를 적용한다.

E. Toast Notification
1. 버튼 클릭 시 toast가 나타난다.
2. success, warning, error, info 타입을 제공한다.
3. 자동 닫힘 progress bar를 표시한다.
4. 닫기 버튼 제공
5. screen reader를 위해 aria-live 영역을 사용한다.

F. Progress Animation
1. Progress bar가 0%에서 목표값까지 애니메이션된다.
2. 숫자 count up도 함께 표시한다.
3. Reset 버튼 제공
4. duration 조절 가능

G. Skeleton Loading
1. 카드형 skeleton UI를 표시한다.
2. shimmer 효과를 제공한다.
3. reduced motion이면 shimmer 대신 정적인 skeleton으로 표시한다.
4. 실제 content로 전환하는 버튼 제공

H. Floating Label Input
1. focus 또는 값 입력 시 label이 위로 이동한다.
2. error 상태 스타일 제공
3. helper text 제공
4. 접근성 label 연결 유지

I. Draggable Card
1. 카드를 드래그할 수 있다.
2. 놓으면 스프링 느낌으로 원위치 복귀한다.
3. drag distance를 표시한다.
4. pointer capture를 사용해서 안정적으로 드래그한다.
5. reduced motion이면 즉시 원위치로 복귀한다.

구현 세부사항:
1. 가능한 한 외부 라이브러리 없이 구현한다.
2. transform과 opacity 중심으로 애니메이션한다.
3. 이벤트 리스너는 cleanup한다.
4. 접근성 속성을 반드시 포함한다.
5. 모든 인터랙션은 모바일 터치에서도 동작해야 한다.
6. 코드 예시는 실제 현재 컴포넌트와 최대한 일치하게 만든다.
7. 컨트롤 값이 바뀌면 CSS 변수 또는 props로 반영한다.

검수 기준:
1. 모든 인터랙션 탭이 동작한다.
2. Ripple은 클릭 위치에서 시작한다.
3. Magnetic button은 pointer에 반응한다.
4. Like Burst는 파티클이 생성되고 정리된다.
5. Toggle은 키보드로 조작 가능하다.
6. Toast는 aria-live를 사용한다.
7. Skeleton은 reduced motion에서 shimmer가 꺼진다.
8. Draggable card는 터치와 마우스에서 작동한다.
9. TypeScript 빌드가 통과한다.

구현 후 변경 파일과 사용 방법을 요약해줘.
```

## 9-2. Micro Interaction Lab 코드 생성 강화 프롬프트

```text
Micro Interaction Lab의 코드 복사 기능을 강화해줘.

목표:
사용자가 마음에 드는 micro interaction을 바로 프로젝트에 붙여 넣을 수 있게 한다.

추가 기능:
1. 각 인터랙션별 코드 탭 추가
   - React
   - CSS
   - HTML 구조
   - Usage
2. `Copy All` 버튼 추가
3. `Copy React Only` 버튼 추가
4. `Copy CSS Only` 버튼 추가
5. 설정값에 따라 코드가 동적으로 바뀌게 한다.
   - duration
   - easing
   - intensity
6. “Dependency 없음” 또는 “필요 의존성” 표시
7. 접근성 체크리스트 표시
8. 사용 추천 상황 표시
   - CTA 버튼
   - Form UI
   - Feedback UI
   - Loading UI

검수 기준:
1. 선택한 인터랙션에 맞는 코드가 표시된다.
2. duration/easing 변경이 코드에 반영된다.
3. Copy All이 정상 작동한다.
4. 접근성 체크리스트가 인터랙션별로 다르게 표시된다.
5. 기존 미리보기 기능이 깨지지 않는다.
```

---

# 10번 기능: Accessibility Lab

## 기능 목표

애니메이션이 많은 웹앱에서 꼭 필요한 **접근성, 모션 감소, 깜빡임 제한, 키보드 조작, 일시정지, 전역 모션 설정**을 관리하는 Lab을 추가합니다.

## 구현할 핵심 기능

- `prefers-reduced-motion` 감지
- 앱 내부 reduced motion override
- 전역 animation speed 설정
- Pause all animations
- Flashing warning
- keyboard navigation test
- focus visible test
- ARIA live region test
- 모션 접근성 체크리스트
- 다른 Lab들과 설정 연동

## 10-1. Accessibility Lab 기본 구현 프롬프트

```text
Accessibility Lab을 구현해줘.

목표:
애니메이션 중심 웹앱에서 사용자가 모션 강도와 접근성 옵션을 직접 조절할 수 있는 Lab 페이지를 만든다. 또한 전역 모션 설정을 다른 Lab에서도 사용할 수 있는 구조를 만든다.

새 페이지 이름:
- `AccessibilityLab`

추천 파일:
- `src/pages/AccessibilityLab.tsx`
- `src/context/MotionSettingsContext.tsx`
- `src/hooks/usePrefersReducedMotion.ts`
- `src/hooks/useMotionSettings.ts`
- `src/components/accessibility/MotionSettingsPanel.tsx`
- `src/components/accessibility/ReducedMotionDemo.tsx`
- `src/components/accessibility/KeyboardNavigationDemo.tsx`
- `src/components/accessibility/FocusVisibleDemo.tsx`
- `src/components/accessibility/AriaLiveDemo.tsx`
- `src/components/accessibility/AnimationSafetyChecklist.tsx`

전역 Motion Settings 요구사항:
1. `MotionSettingsContext`를 만든다.
2. 다음 상태를 관리한다.
   - `systemPrefersReducedMotion`
   - `reducedMotionOverride`
     - `system`
     - `reduce`
     - `no-preference`
   - `effectiveReducedMotion`
   - `animationSpeed`
     - 0
     - 0.25
     - 0.5
     - 1
     - 1.5
     - 2
   - `pauseAllAnimations`
   - `disablePageTransitions`
   - `disableParallax`
   - `disableAutoplay`
   - `flashSafetyMode`
3. localStorage에 사용자 설정을 저장한다.
4. 앱 root에 data attribute를 반영한다.
   - `data-reduced-motion="true|false"`
   - `data-animation-speed="1"`
   - `data-pause-animations="true|false"`
5. CSS 변수로 전역 애니메이션 속도를 제공한다.
   - `--motion-speed-multiplier`
   - `--motion-duration-fast`
   - `--motion-duration-normal`
   - `--motion-duration-slow`

Accessibility Lab UI:
1. 제목
   - `Accessibility Lab`
2. 설명
   - `모션 감소, 일시정지, 키보드 조작, 포커스 표시 등 애니메이션 접근성을 테스트합니다.`
3. 시스템 설정 표시
   - OS/browser prefers-reduced-motion 상태
4. 모션 설정 패널
   - Reduced Motion Override radio
     - Follow System
     - Reduce Motion
     - Allow Motion
   - Animation Speed select
   - Pause All Animations toggle
   - Disable Page Transitions toggle
   - Disable Parallax toggle
   - Disable Autoplay toggle
   - Flash Safety Mode toggle
5. 데모 영역
   - Reduced Motion Demo
   - Keyboard Navigation Demo
   - Focus Visible Demo
   - ARIA Live Demo
   - Flash Safety Demo
6. 체크리스트 영역
   - 애니메이션 접근성 체크리스트 표시
7. 코드 예시 영역
   - `prefers-reduced-motion` CSS 예시
   - React hook 예시
   - MotionSettingsProvider 예시

Reduced Motion Demo 요구사항:
1. 같은 카드 애니메이션을 normal/reduced 두 버전으로 보여준다.
2. reduced motion에서는 이동 거리와 반복을 줄이고 opacity 중심으로 전환한다.
3. 현재 effectiveReducedMotion 상태를 표시한다.

Keyboard Navigation Demo 요구사항:
1. 버튼, 토글, 카드 링크를 키보드 Tab으로 이동 가능하게 한다.
2. Enter/Space 조작을 지원한다.
3. 현재 focused element를 시각적으로 표시한다.
4. focus trap이 필요한 예시 모달을 간단히 포함한다.

Focus Visible Demo 요구사항:
1. 마우스 클릭과 키보드 focus 차이를 보여준다.
2. `:focus-visible` 스타일을 사용한다.
3. outline을 제거하지 말라는 설명을 포함한다.

ARIA Live Demo 요구사항:
1. Toast 또는 status message가 aria-live 영역에 전달되는 예시를 만든다.
2. polite/assertive 선택 옵션을 제공한다.
3. screen reader 사용자를 위한 텍스트 상태를 별도로 제공한다.

Flash Safety Demo 요구사항:
1. 빠르게 깜빡이는 효과를 기본적으로 사용하지 않는다.
2. Flash Safety Mode가 켜져 있으면 깜빡임 효과를 차단한다.
3. 위험할 수 있는 효과는 warning을 보여주고 사용자가 명시적으로 preview 버튼을 눌렀을 때만 짧게 보여준다.
4. 깜빡임 주기가 너무 빠른 설정은 허용하지 않는다.

구현 세부사항:
1. `usePrefersReducedMotion` 훅은 matchMedia를 사용한다.
2. matchMedia listener cleanup을 정확히 처리한다.
3. localStorage 접근은 SSR 가능성을 고려해 안전하게 처리한다.
4. 앱 최상단에 `MotionSettingsProvider`를 감싼다.
5. 기존 Lab에서 접근성 설정을 사용할 수 있도록 `useMotionSettings`를 export한다.
6. 기존 Canvas, Lottie, Scroll, 3D, Page Transition Lab이 있다면 다음 설정을 연결한다.
   - effectiveReducedMotion true → 자동 재생/반복/큰 이동 감소
   - pauseAllAnimations true → requestAnimationFrame 루프 정지 또는 CSS animation-play-state paused
   - disableAutoplay true → Lottie/Timeline 자동 재생 중지
   - disableParallax true → Scroll parallax 중지
   - disablePageTransitions true → View Transition 중지
7. CSS 전역 규칙을 추가한다.
   - `[data-pause-animations="true"] * { animation-play-state: paused !important; transition-duration: 0ms 또는 매우 짧게; }`
   - `[data-reduced-motion="true"]` 상태에서는 큰 transform 이동 줄이기
8. 단, 사용자 조작에 필요한 focus transition까지 완전히 제거하지는 않는다.

검수 기준:
1. OS의 prefers-reduced-motion 상태가 감지된다.
2. Override 설정이 effectiveReducedMotion에 반영된다.
3. 설정이 localStorage에 저장되고 새로고침 후 유지된다.
4. 앱 root에 data attribute가 적용된다.
5. Pause All Animations가 CSS 애니메이션에 영향을 준다.
6. Canvas/Lottie/Scroll/3D/Page Transition Lab이 존재한다면 설정이 일부 이상 연동된다.
7. Keyboard Navigation Demo를 Tab과 Enter/Space로 조작할 수 있다.
8. ARIA Live Demo가 메시지를 표시한다.
9. TypeScript 빌드가 통과한다.

구현 후 변경 파일, 설정 연동 방식, 남은 개선점을 정리해줘.
```

## 10-2. Accessibility Lab 전체 연동 프롬프트

```text
Accessibility Lab의 MotionSettingsContext를 기존 모든 애니메이션 Lab과 연결해줘.

목표:
전역 모션 설정이 CSS, SVG, JavaScript Timeline, Canvas, Lottie, Scroll, 3D/WebGL, Page Transition, Micro Interaction Lab에 일관되게 적용되도록 만든다.

연동 요구사항:
1. CSS Motion Lab
   - pauseAllAnimations true이면 CSS animation-play-state를 paused로 변경
   - effectiveReducedMotion true이면 큰 이동/회전 애니메이션 대신 opacity 중심 애니메이션 사용
2. SVG Motion Lab
   - stroke drawing 반복 애니메이션 중지 옵션 적용
   - morph 또는 회전 애니메이션 속도 감소
3. JavaScript Timeline Lab
   - disableAutoplay true이면 자동 재생 금지
   - pauseAllAnimations true이면 animation.pause()
   - animationSpeed 값에 따라 playbackRate 조절
4. Canvas Particle Lab
   - pauseAllAnimations true이면 RAF loop pause
   - effectiveReducedMotion true이면 particle count 감소
   - flashSafetyMode true이면 폭발/깜빡임 효과 제한
5. Lottie Lab
   - disableAutoplay true이면 autoplay false
   - pauseAllAnimations true이면 animation.pause()
   - animationSpeed 값에 따라 setSpeed 적용
6. Scroll Animation Lab
   - disableParallax true이면 parallax/horizontal transform 중지
   - effectiveReducedMotion true이면 reveal을 즉시 표시하거나 단순 fade로 대체
7. 3D/WebGL Lab
   - pauseAllAnimations true이면 RAF loop pause 또는 rotation update 중지
   - effectiveReducedMotion true이면 autoRotate/floating 기본 false
   - animationSpeed 값에 따라 rotationSpeed 배율 적용
8. Page Transition Lab
   - disablePageTransitions true이면 View Transition 실행하지 않음
   - effectiveReducedMotion true이면 duration 0 또는 최소화
9. Micro Interaction Lab
   - effectiveReducedMotion true이면 ripple, burst, magnetic, drag spring 강도 감소
   - pauseAllAnimations true이면 반복성 shimmer/loop 중지

구현 세부사항:
1. 모든 Lab에서 `useMotionSettings` 훅을 사용한다.
2. 각 Lab의 기본값을 MotionSettings에 맞게 계산한다.
3. 사용자 개별 컨트롤과 전역 설정이 충돌하지 않게 한다.
   - 전역 설정이 안전 쪽이면 전역 설정을 우선한다.
4. 코드가 중복되면 helper 함수를 만든다.
   - `getMotionDuration(baseMs, settings)`
   - `shouldAutoplay(settings)`
   - `shouldReduceMotion(settings)`
   - `getAnimationPlaybackRate(settings, localRate)`
5. 전역 설정이 켜졌을 때 UI에 작은 배지를 표시한다.
   - Reduced Motion Active
   - Animations Paused
   - Autoplay Disabled
6. 기존 Lab의 수동 컨트롤은 유지한다.

검수 기준:
1. Accessibility Lab에서 Pause All Animations를 켜면 다른 Lab의 반복 애니메이션이 멈춘다.
2. Reduced Motion Override를 Reduce로 설정하면 큰 움직임이 줄어든다.
3. Animation Speed 변경이 Timeline, Lottie, 3D에 반영된다.
4. Disable Parallax를 켜면 Scroll Lab의 parallax가 중지된다.
5. Disable Page Transitions를 켜면 Page Transition Lab 전환이 중지된다.
6. localStorage 설정이 새로고침 후에도 유지된다.
7. 기존 기능이 깨지지 않는다.
8. TypeScript 빌드가 통과한다.

작업 후 어떤 Lab에 어떤 설정이 연결되었는지 표로 정리해줘.
```

---

# 11. 전체 통합 테스트 프롬프트

모든 기능을 추가한 뒤 아래 프롬프트로 통합 검수를 요청하세요.

```text
지금까지 추가한 애니메이션 Lab 전체를 통합 검수해줘.

검수 대상:
1. JavaScript Timeline Lab
2. Canvas Particle Lab
3. Lottie Lab
4. Scroll Animation Lab
5. 3D / WebGL Lab
6. Page Transition Lab
7. Micro Interaction Lab
8. Accessibility Lab
9. 기존 CSS Motion Lab
10. 기존 SVG Motion Lab

검수 항목:
1. 앱 실행 여부
   - npm install 후 npm run dev 가능 여부
   - npm run build 가능 여부
2. TypeScript 오류 여부
3. 라우팅/탭 이동 정상 여부
4. 각 Lab 진입 시 콘솔 에러 여부
5. 각 Lab을 나갔다 돌아왔을 때 리소스 cleanup 여부
6. Canvas RAF cleanup 여부
7. Three.js renderer/geometry/material dispose 여부
8. Lottie animation destroy 여부
9. View Transition fallback 여부
10. reduced motion 설정 반영 여부
11. pause all animations 설정 반영 여부
12. 모바일 반응형 레이아웃 확인
13. 키보드 접근성 확인
14. aria 속성 기본 확인
15. 코드 복사 버튼 작동 여부

수정 방식:
1. 먼저 문제 목록을 표로 정리해줘.
2. 심각도 High/Medium/Low를 표시해줘.
3. High 문제부터 수정해줘.
4. 수정 후 다시 검수 결과를 정리해줘.
5. 최종적으로 남은 이슈가 있으면 명확히 알려줘.

출력 형식:
- 발견한 문제 표
- 수정한 파일 목록
- 수정 내용 요약
- 남은 리스크
- 최종 실행 명령어
```

---

# 12. 최종 README 업데이트 프롬프트

기능 구현 후 README를 업데이트할 때 사용하세요.

```text
README.md를 업데이트해줘.

목표:
이 웹앱이 CSS/SVG 애니메이션 예제 모음이 아니라, 다양한 웹 애니메이션 기술을 실험하고 학습할 수 있는 Animation Lab임을 명확히 설명한다.

README에 포함할 내용:
1. 프로젝트 소개
2. 주요 기능 목록
   - CSS Motion Lab
   - SVG Motion Lab
   - JavaScript Timeline Lab
   - Canvas Particle Lab
   - Lottie Lab
   - Scroll Animation Lab
   - 3D / WebGL Lab
   - Page Transition Lab
   - Micro Interaction Lab
   - Accessibility Lab
3. 기술 스택
4. 설치 방법
5. 실행 방법
6. 빌드 방법
7. 각 Lab의 사용 목적
8. 접근성 지원 내용
   - prefers-reduced-motion
   - pause all animations
   - keyboard navigation
   - ARIA live examples
9. 성능 고려사항
   - Canvas RAF cleanup
   - Three.js dispose
   - transform/opacity 중심 애니메이션
10. 향후 개선 아이디어
   - preset 저장
   - code export 강화
   - 사용자 커스텀 keyframe editor
   - WebGPU demo
   - audio reactive visualizer

문체:
- 한국어
- 개발자가 빠르게 이해할 수 있게 간결하지만 충분히 구체적으로 작성
- 명령어는 코드블록으로 표시

검수 기준:
1. 새 기능이 README에 모두 반영된다.
2. 설치/실행 명령어가 현재 package.json과 일치한다.
3. 프로젝트 구조 설명이 실제 구조와 크게 다르지 않다.
4. 접근성 지원 내용이 명확하다.
```

---

# 13. 추천 작업 순서

실제 바이브코딩에서는 한 번에 모든 기능을 추가하기보다 아래 순서로 진행하는 것을 추천합니다.

```text
1단계: 프로젝트 분석
2단계: 공통 LabShell, CodeBlock, Control 컴포넌트 생성
3단계: JavaScript Timeline Lab 구현
4단계: Micro Interaction Lab 구현
5단계: Accessibility Lab 기본 구현
6단계: Canvas Particle Lab 구현
7단계: Lottie Lab 구현
8단계: Scroll Animation Lab 구현
9단계: Page Transition Lab 구현
10단계: 3D / WebGL Lab 구현
11단계: Accessibility Lab 전체 연동
12단계: 통합 테스트
13단계: README 업데이트
```

이 순서를 추천하는 이유는 다음과 같습니다.

- Timeline Lab과 Micro Interaction Lab은 DOM/CSS 기반이라 비교적 빠르게 안정화할 수 있습니다.
- Accessibility Lab을 중간에 먼저 만들면 이후 Canvas, Lottie, Scroll, 3D 기능에 모션 설정을 연결하기 쉽습니다.
- Canvas와 WebGL은 리소스 cleanup이 중요하므로 후반에 독립적으로 검수하는 것이 좋습니다.
- Page Transition은 라우팅 구조와 충돌할 수 있으므로 기본 구조가 안정된 뒤 추가하는 것이 좋습니다.

---

# 14. 기능별 완료 기준 요약표

| 기능 | 완료 기준 |
|---|---|
| JavaScript Timeline Lab | Web Animations API로 play/pause/reverse/progress 제어 가능 |
| Canvas Particle Lab | 6개 파티클 preset, FPS 표시, pause/reset, cleanup 구현 |
| Lottie Lab | JSON 로드, 업로드, 재생 제어, speed/direction/frame 조절 가능 |
| Scroll Animation Lab | reveal, parallax, sticky story, horizontal scroll 구현 |
| 3D / WebGL Lab | Three.js object 렌더링, material/light/camera 조절, dispose 구현 |
| Page Transition Lab | View Transition API와 fallback 전환 구현 |
| Micro Interaction Lab | ripple, magnetic, like burst, toggle, toast 등 UI 반응 구현 |
| Accessibility Lab | reduced motion, pause all, speed, autoplay, parallax/page transition 제어 |

---

# 15. 전체 기능 추가용 단일 마스터 프롬프트

아래는 모든 기능을 한 번에 맡기고 싶을 때 사용하는 통합 프롬프트입니다. 다만 실제 작업에서는 기능별 프롬프트를 나눠 쓰는 것이 더 안정적입니다.

```text
너는 시니어 프론트엔드 엔지니어이자 웹 애니메이션 전문가야.

현재 프로젝트는 CSS 애니메이션과 SVG 애니메이션을 설명하고 테스트하는 웹앱이야. 여기에 아래 기능을 추가해서 종합 Animation Lab으로 확장해줘.

추가할 기능:
1. JavaScript Timeline Lab
   - Web Animations API
   - play/pause/reverse/cancel/finish/restart
   - duration/delay/iterations/easing/direction/playbackRate/progress 제어
2. Canvas Particle Lab
   - snow/rain/confetti/fireworks/cursor trail/starfield
   - particle count/speed/size/gravity/friction/color/interactivity 제어
   - FPS 표시와 RAF cleanup
3. Lottie Lab
   - lottie-web 사용
   - 샘플 JSON, 업로드, URL 로드
   - play/pause/stop/restart/loop/autoplay/speed/direction/frame/segment 제어
4. Scroll Animation Lab
   - reveal/parallax/sticky story/horizontal scroll
   - IntersectionObserver와 scroll progress hook 사용
5. 3D / WebGL Lab
   - Three.js 사용
   - cube/sphere/torus/torusKnot
   - material/light/camera/rotation/pointer tilt 제어
   - WebGL fallback과 dispose 처리
6. Page Transition Lab
   - View Transition API
   - card-to-detail/tab/modal/route-like transition
   - fallback CSS transition
7. Micro Interaction Lab
   - ripple/magnetic/like burst/toggle/toast/progress/skeleton/input/drag card
8. Accessibility Lab
   - prefers-reduced-motion 감지
   - MotionSettingsContext
   - animation speed
   - pause all animations
   - disable autoplay/parallax/page transitions
   - flash safety mode
   - keyboard/focus/aria-live demo

작업 방식:
1. 먼저 프로젝트 구조를 분석한다.
2. 기존 CSS/SVG 기능을 깨뜨리지 않는다.
3. 공통 LabShell, CodeBlock, Control 컴포넌트가 없으면 만든다.
4. 각 Lab은 독립 페이지 또는 탭으로 추가한다.
5. 필요 라이브러리는 package.json에 추가한다.
   - lottie-web
   - three
   - @types/three
6. 모든 requestAnimationFrame, observer, event listener, Lottie instance, Three.js resource는 cleanup한다.
7. 모든 Lab은 reduced motion과 pause all animations 설정을 고려한다.
8. TypeScript 오류 없이 빌드되게 한다.
9. 모바일 반응형을 적용한다.
10. 각 Lab에 코드 복사 영역을 포함한다.

최종 검수:
1. npm run build 통과
2. 모든 Lab 접근 가능
3. 콘솔 에러 없음
4. reduced motion 작동
5. pause all animations 작동
6. Canvas/Three/Lottie cleanup 확인
7. 코드 복사 버튼 작동
8. 모바일 레이아웃 확인

출력:
- 변경 파일 목록
- 새로 추가한 기능 요약
- 설치한 의존성
- 실행 명령어
- 남은 리스크 또는 후속 개선 제안
```

---

# 16. 추가로 넣으면 좋은 후속 기능 프롬프트

아래 기능들은 3번~10번을 구현한 뒤 확장하기 좋습니다.

## 16-1. Preset 저장 기능

```text
각 Animation Lab의 현재 설정을 preset으로 저장하고 다시 불러오는 기능을 추가해줘.

요구사항:
1. localStorage 기반으로 preset 저장
2. preset 이름 입력
3. preset 목록 표시
4. preset 불러오기
5. preset 삭제
6. Lab별 preset namespace 분리
7. JSON export/import 기능 추가
8. 잘못된 import JSON에 대한 에러 처리

검수 기준:
1. 설정 저장 후 새로고침해도 유지된다.
2. Lab별 preset이 섞이지 않는다.
3. export/import가 정상 작동한다.
```

## 16-2. Animation Code Exporter

```text
모든 Lab에 공통 Animation Code Exporter를 추가해줘.

요구사항:
1. 선택한 효과를 React 컴포넌트 코드로 export
2. CSS 코드 export
3. HTML 구조 export
4. 필요한 dependency 표시
5. 접근성 주의사항 포함
6. Copy All 버튼 제공
7. 파일명 추천 제공

검수 기준:
1. 각 Lab에서 export 패널을 열 수 있다.
2. 현재 설정이 코드에 반영된다.
3. 복사 버튼이 작동한다.
```

## 16-3. Audio Reactive Visualizer

```text
Audio Reactive Visualizer Lab을 추가해줘.

목표:
Web Audio API로 오디오 입력을 분석하고 Canvas 또는 SVG로 반응형 비주얼을 만든다.

요구사항:
1. 오디오 파일 업로드
2. 마이크 입력 옵션은 사용자 명시 허용 후에만 사용
3. frequency bars
4. waveform
5. radial spectrum
6. sensitivity 조절
7. smoothing 조절
8. reduced motion 대응
9. 오디오 정지 시 animation loop 정리

검수 기준:
1. 오디오 파일 업로드 후 시각화가 동작한다.
2. waveform과 frequency bars를 전환할 수 있다.
3. 정지/재생/cleanup이 정상 작동한다.
```

---

## 끝

이 문서는 기능 구현용 프롬프트 자체를 상세하게 작성한 것입니다. 실제 코드 생성 도구에는 한 번에 전체를 넣기보다, **0번 프로젝트 분석 → 2번 공통 구조 → 3번~10번 기능별 구현 → 11번 통합 테스트** 순서로 붙여 넣는 것을 권장합니다.
