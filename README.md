# CSS & SVG Motion Lab

설치 없이 `index.html`만 열어 CSS, SVG, 그리고 고급 웹 모션을 직접 만지고 복사할 수 있는 바닐라 인터랙티브 랩입니다. 기본 CSS/SVG 도감 위에 MotionSettings 허브, WAAPI 타임라인, Canvas 입자, Web Audio, 3D/WebGL, Scroll Storytelling, Page Transition, 고급 Micro Interaction Lab을 확장했습니다.

## 실행법

- 가장 간단한 방법: `index.html` 더블클릭
- 로컬 서버로 보기: `npx serve`

## 기능

- CSS Lab: transition, keyframes, transform, timing, micro interaction, UI component, scroll/view fallback, media UI
- SVG Lab: CSS/SMIL/WAAPI 비교, stroke drawing, animate, animateTransform, motion path, morph, mask, filter, viewBox, dataviz
- 실전 시나리오: 결제 상태머신, 업로드 진행률, 대시보드 갱신, 배송 경로, 빈 상태
- MotionSettings Hub: reduced motion override, animation speed, pause all, autoplay/parallax/page transition/flash safety 제어
- JS Timeline Lab: Web Animations API 재생, 정지, 역재생, finish/cancel, progress scrub
- Canvas Particle Lab: Snow, Rain, Confetti, Fireworks, Cursor Trail, Starfield, 리퀴드 왜곡 느낌
- Web Audio Lab: AudioContext, OscillatorNode, GainNode 기반 클릭음/성공음/오류음
- 3D/WebGL Lab: Three.js CDN 비동기 로드, CSS 3D fallback, 스프링 드래그, 센서 감지
- Scroll Storytelling Lab: reveal, parallax, horizontal scroll, progress
- Page Transition Lab: View Transition API + CSS fallback
- Advanced Micro Lab: magnetic button, like burst, floating label, draggable card
- Recipe Library: 15개 이상 복사 가능한 패턴

## 기술 스택

- HTML5 + 순수 CSS + Vanilla JavaScript
- 외부 빌드 도구 없음
- 3D Lab만 Three.js CDN을 비동기로 로드
- 나머지 Canvas, Web Audio, WAAPI, Scroll, Transition, Micro Interaction은 브라우저 내장 API와 직접 구현

## 접근성

- `prefers-reduced-motion` 감지와 앱 내부 override 제공
- 전체 애니메이션 일시정지와 속도 배율 제공
- 의미 있는 SVG에는 `role="img"`, `title`, `desc` 제공
- 상태 피드백은 `aria-live`와 텍스트를 병행
- 키보드 포커스는 `:focus-visible`로 확인 가능
- Flash Safety Mode로 깜빡임/폭발 효과를 차단

## 성능 원칙

- transform, opacity, stroke-dashoffset 중심 모션
- Canvas와 WAAPI는 RAF/Animation 객체를 정리하는 cleanup 훅 보유
- Web Audio는 명시적 사용자 제스처 후에만 시작하고, 노드는 종료 시 disconnect
- Three.js는 geometry/material/renderer dispose 경로를 둠
- 숨겨진 탭과 pause/reduced 설정을 고려해 자동재생과 루프를 줄임

## 향후 아이디어

- 프리셋 저장과 공유 URL
- 선택 데모별 코드 ZIP export
- 오디오 반응형 visualizer 확장
- WebGPU 실험 Lab
- GitHub Pages 자동 배포 설정
