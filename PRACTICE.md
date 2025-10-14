# 왕초보를 위한 스톱워치 확장 실습

## 현재 코드 상태 분석

### 사용 중인 Hook

- [x] `useState`: secondsPassed, laps, isRunning, stopCount (4개)
- [x] `useRef`: startTime, intervalId (2개)
- [x] `useEffect`: 키보드 이벤트 리스너 (1개)
- [ ] `useMemo`: 아직 사용 안 함
- [ ] `useCallback`: 아직 사용 안 함

### 구현된 기능

- [x] Start/Stop/Reset 버튼
- [x] 밀리초 단위 시간 측정 (0.001초 정확도)
- [x] 멈췄다가 다시 시작 가능
- [x] 랩타임 기록 (최신 항목이 위로)
- [x] 실행 상태 표시 (실행 중/정지)
- [x] 일시정지 횟수 카운터
- [x] 키보드 단축키 (스페이스바, R, L)

---

## 단계별 실습 과제 (쉬운 순서대로!)

---

## LEVEL 1: useState 연습 (완료!)

### [완료] 과제 1-1: 랩타임(Lap) 기능 추가

**배운 Hook**: `useState` (배열 상태 관리)

**구현된 기능**:

- [x] Lap 버튼 추가
- [x] 버튼 클릭하면 현재 시간을 기록 배열에 저장
- [x] 기록된 랩타임들을 화면에 리스트로 표시
- [x] 최신 랩타임이 위로 오도록 정렬

**배운 것**:

- 배열을 상태로 관리하는 방법
- `map()`으로 리스트 렌더링하는 방법
- 불변성을 지키며 배열에 값 추가하기 (`[secondsPassed, ...laps]`)

**난이도**: ⭐ (매우 쉬움)

---

### [완료] 과제 1-2: 실행 중 상태 표시

**배운 Hook**: `useState` (boolean 상태)

**구현된 기능**:

- [x] `isRunning` 상태 추가 (true/false)
- [x] 실행 중일 때 "실행 중" 표시
- [x] 정지 중일 때 "정지" 표시
- [x] 실행 중일 때 Start 버튼 비활성화
- [x] 정지 중일 때 Stop 버튼 비활성화
- [x] 정지 중일 때 Lap 버튼 비활성화

**배운 것**:

- boolean 상태로 조건부 렌더링
- `disabled` 속성 사용법
- 삼항 연산자 (`condition ? A : B`)

**난이도**: ⭐ (매우 쉬움)

---

### [완료] 과제 1-3: 일시정지 횟수 카운터

**배운 Hook**: `useState` (숫자 상태)

**구현된 기능**:

- [x] Stop 버튼 누를 때마다 횟수 증가
- [x] "일시정지 횟수: N회" 표시
- [x] Reset 하면 횟수도 0으로 초기화

**배운 것**:

- 여러 개의 상태를 동시에 관리
- 상태 업데이트 타이밍 이해
- 함수형 업데이트 (`prev => prev + 1`)

**난이도**: ⭐ (매우 쉬움)

---

## LEVEL 2: useEffect 연습 (진행 중)

### [완료] 과제 2-1: 키보드 단축키

**배운 Hook**: `useEffect` (이벤트 리스너)

**구현된 기능**:

- [x] 스페이스바: Start/Stop 토글
- [x] R키: Reset
- [x] L키: Lap
- [x] 키보드 단축키 안내 표시

**배운 것**:

- `useEffect`의 기본 사용법
- 이벤트 리스너 등록/제거 (cleanup)
- 의존성 배열 이해 (`[isRunning]`)
- 메모리 누수 방지

**난이도**: ⭐⭐ (쉬움)

**구현 코드**:

```jsx
useEffect(() => {
  function handleKeyPress(event) {
    if (event.code === "Space") {
      event.preventDefault();
      isRunning ? handleStop() : handleStart();
    }
    if (event.code === "KeyR") {
      handleReset();
    }
    if (event.code === "KeyL") {
      if (isRunning) handleLap();
    }
  }

  window.addEventListener("keydown", handleKeyPress);

  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
}, [isRunning]);
```

---

### [진행 예정] 과제 2-2: 브라우저 탭 제목 실시간 업데이트

**배울 Hook**: `useEffect` (부수 효과)

**요구사항**:

- [ ] 스톱워치 실행 중일 때 탭 제목에 시간 표시
- [ ] 예: "12.345초 - Stopwatch"
- [ ] 정지하면 원래 제목으로 복구
- [ ] 페이지 떠날 때도 원래 제목으로 복구

**왜 이걸 배우나요?**:

- DOM 조작 (`document.title`)
- `useEffect`로 외부 시스템 제어
- cleanup 함수의 중요성

**난이도**: ⭐⭐ (쉬움)

**힌트**:

```jsx
useEffect(() => {
  if (isRunning) {
    document.title = `${(secondsPassed / 1000).toFixed(1)}초`;
  } else {
    document.title = "Stopwatch";
  }
}, [isRunning, secondsPassed]);
```

---

### [진행 예정] 과제 2-3: 자동 포커스

**배울 Hook**: `useEffect` + `useRef`

**요구사항**:

- [ ] input 요소 하나 추가
- [ ] 페이지 로드하자마자 자동으로 포커스
- [ ] input에 메모 기능 (선택사항)

**왜 이걸 배우나요?**:

- `useRef`로 DOM 요소 참조
- `useEffect`로 마운트 시점 제어
- 빈 의존성 배열 (`[]`) 이해

**난이도**: ⭐⭐ (쉬움)

**힌트**:

```jsx
const inputRef = useRef(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);

// JSX
<input ref={inputRef} placeholder="메모..." />;
```

---

### [진행 예정] 과제 2-4: 로컬 스토리지 저장

**배울 Hook**: `useEffect` (데이터 영속성)

**요구사항**:

- [ ] 랩타임 기록을 로컬 스토리지에 저장
- [ ] 페이지 새로고침해도 기록 유지
- [ ] "기록 전체 삭제" 버튼 추가

**왜 이걸 배우나요?**:

- `localStorage` API 사용법
- JSON 직렬화/역직렬화
- `useEffect`로 데이터 동기화
- 초기값 설정

**난이도**: ⭐⭐⭐ (보통)

**힌트**:

```jsx
// 초기값 로드
const [laps, setLaps] = useState(() => {
  const saved = localStorage.getItem("laps");
  return saved ? JSON.parse(saved) : [];
});

// 저장
useEffect(() => {
  localStorage.setItem("laps", JSON.stringify(laps));
}, [laps]);
```

---

## LEVEL 3: useMemo 연습 (예정)

### [진행 예정] 과제 3-1: 시간 포맷팅

**배울 Hook**: `useMemo` (계산 최적화)

**요구사항**:

- [ ] "123.456초" 대신 "02:03.456" (분:초.밀리초) 형식으로 표시
- [ ] 1시간 넘으면 "01:02:03.456" (시:분:초.밀리초)
- [ ] useMemo로 포맷 계산 최적화

**왜 이걸 배우나요?**:

- `useMemo`의 필요성 이해
- 불필요한 재계산 방지
- 의존성 배열로 캐싱 제어
- 성능 최적화 개념

**난이도**: ⭐⭐⭐ (보통)

**힌트**:

```jsx
const formattedTime = useMemo(() => {
  const minutes = Math.floor(secondsPassed / 60000);
  const seconds = Math.floor((secondsPassed % 60000) / 1000);
  const ms = Math.floor((secondsPassed % 1000) / 10);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}, [secondsPassed]);
```

---

### [진행 예정] 과제 3-2: 랩타임 통계

**배울 Hook**: `useMemo` (복잡한 계산)

**요구사항**:

- [ ] 랩타임 평균 계산
- [ ] 최고 기록(가장 빠른 랩)
- [ ] 최저 기록(가장 느린 랩)
- [ ] 총 랩 횟수
- [ ] 통계 섹션 따로 표시

**왜 이걸 배우나요?**:

- 배열 메서드 (`reduce`, `Math.min`, `Math.max`)
- `useMemo`로 무거운 계산 최적화
- laps 배열이 바뀔 때만 재계산

**난이도**: ⭐⭐⭐ (보통)

---

### [진행 예정] 과제 3-3: 색상 변화 (시간 구간별)

**배울 Hook**: `useMemo` (조건부 계산)

**요구사항**:

- [ ] 0~10초: 파란색
- [ ] 10~30초: 초록색
- [ ] 30~60초: 주황색
- [ ] 60초 이상: 빨간색
- [ ] 배경색도 같이 변경

**왜 이걸 배우나요?**:

- 조건부 스타일링
- `useMemo`로 스타일 객체 캐싱
- 시간 범위 계산

**난이도**: ⭐⭐ (쉬움)

---

## LEVEL 4: useCallback 연습 (예정)

### [진행 예정] 과제 4-1: 랩타임 항목 삭제

**배울 Hook**: `useCallback` (함수 최적화)

**요구사항**:

- [ ] 각 랩타임 옆에 "삭제" 버튼
- [ ] 클릭하면 해당 랩타임만 삭제
- [ ] `useCallback`으로 함수 메모이제이션

**왜 이걸 배우나요?**:

- `useCallback`의 필요성
- 함수 재생성 방지
- 자식 컴포넌트 최적화 준비

**난이도**: ⭐⭐⭐ (보통)

---

### [진행 예정] 과제 4-2: 컴포넌트 분리

**배울 Hook**: `useCallback` + `React.memo`

**요구사항**:

- [ ] LapList 컴포넌트 분리
- [ ] LapItem 컴포넌트 분리
- [ ] `React.memo`로 불필요한 리렌더링 방지
- [ ] `useCallback`으로 props 함수 최적화

**왜 이걸 배우나요?**:

- 컴포넌트 재사용
- 성능 최적화 (리렌더링 제어)
- `React.memo`와 `useCallback` 조합

**난이도**: ⭐⭐⭐⭐ (어려움)

---

## LEVEL 5: 고급 기능 (예정)

### [진행 예정] 과제 5-1: 다크모드 토글

**배울 Hook**: `useState` + `useEffect` + `localStorage`

**요구사항**:

- [ ] 다크모드 토글 버튼
- [ ] 다크모드 설정 저장
- [ ] CSS 변수로 테마 관리
- [ ] 시스템 설정 감지 (선택사항)

**난이도**: ⭐⭐⭐ (보통)

---

### [진행 예정] 과제 5-2: 애니메이션 효과 (GSAP)

**배울 Hook**: `useEffect` + `useRef`

**요구사항**:

- [ ] 랩 추가될 때 fade-in 애니메이션
- [ ] 시간이 특정 값 넘으면 깜빡임
- [ ] 버튼 클릭 시 ripple 효과

**난이도**: ⭐⭐⭐⭐ (어려움)

---

### [진행 예정] 과제 5-3: 렌더링 횟수 디버깅

**배울 Hook**: `useRef` (디버깅)

**요구사항**:

- [ ] 컴포넌트가 렌더링될 때마다 횟수 증가
- [ ] 개발자 도구에 렌더링 정보 표시
- [ ] "렌더링 횟수: 15회" 표시
- [ ] 성능 문제 발견하기

**왜 이걸 배우나요?**:

- `useRef`로 값 추적 (리렌더링 안 함)
- React 렌더링 최적화 이해
- 디버깅 스킬

**난이도**: ⭐⭐⭐ (보통)

**힌트**:

```jsx
const renderCount = useRef(0);

renderCount.current += 1;
console.log("렌더링 횟수:", renderCount.current);
```

---

### [진행 예정] 과제 5-4: 카운트다운 모드

**배울 Hook**: `useState` + `useEffect`

**요구사항**:

- [ ] 스톱워치 모드 / 타이머 모드 토글
- [ ] 타이머 모드: 설정한 시간부터 0까지 카운트다운
- [ ] 0초 되면 알림음 or 알림창
- [ ] 목표 시간 input으로 설정

**난이도**: ⭐⭐⭐⭐ (어려움)

---

### [진행 예정] 과제 5-5: 세션 기록 관리

**배울 Hook**: `useState` + `useEffect` + `useMemo`

**요구사항**:

- [ ] 여러 세션 저장 (예: "운동1", "공부1")
- [ ] 세션 이름 입력 가능
- [ ] 세션별 통계 보기
- [ ] 세션 간 비교 기능
- [ ] 로컬 스토리지에 저장

**난이도**: ⭐⭐⭐⭐⭐ (매우 어려움)

---

## 학습 추천 순서

### 1주차: 기초 다지기 (완료)

- [x] 과제 1-1: 랩타임 기능
- [x] 과제 1-2: 실행 중 상태
- [x] 과제 1-3: 카운터

### 2주차: useEffect 마스터 (진행 중)

- [x] 과제 2-1: 키보드 단축키
- [ ] 과제 2-2: 탭 제목 업데이트
- [ ] 과제 2-3: 자동 포커스
- [ ] 과제 2-4: 로컬 스토리지

### 3주차: 최적화 배우기 (예정)

- [ ] 과제 3-1: 시간 포맷팅
- [ ] 과제 3-2: 통계 계산
- [ ] 과제 3-3: 색상 변화

### 4주차: 고급 기능 (예정)

- [ ] 과제 4-1: 랩타임 삭제
- [ ] 과제 5-1: 다크모드
- [ ] 과제 5-3: 렌더링 디버깅

### 5주차: 최종 프로젝트 (예정)

- [ ] 과제 4-2: 컴포넌트 분리
- [ ] 과제 5-5: 세션 관리

---

## 각 Hook을 언제 사용하나요?

### useState

```jsx
const [state, setState] = useState(초기값);
```

**사용 시점**: 값이 바뀌면 화면도 바뀌어야 할 때

**예시**:

- 시간, 카운터, 리스트, boolean 플래그
- 사용자 입력값

---

### useRef

```jsx
const ref = useRef(초기값);
// ref.current로 접근
```

**사용 시점**:

1. 값은 바뀌지만 화면은 안 바뀌어도 될 때
2. DOM 요소를 직접 조작할 때

**예시**:

- setInterval ID 저장
- input 요소 포커스
- 렌더링 횟수 추적

---

### useEffect

```jsx
useEffect(() => {
  // 실행할 코드
  return () => {
    // cleanup (선택사항)
  };
}, [의존성]);
```

**사용 시점**:

- 컴포넌트가 화면에 나타날 때
- 특정 값이 바뀔 때
- 외부 시스템과 연동할 때

**예시**:

- 이벤트 리스너
- API 호출
- 타이머 설정
- localStorage 저장

---

### useMemo

```jsx
const value = useMemo(() => {
  return 계산로직;
}, [의존성]);
```

**사용 시점**: 무거운 계산을 캐싱하고 싶을 때

**예시**:

- 복잡한 통계 계산
- 배열 필터링/정렬
- 포맷 변환

---

### useCallback

```jsx
const fn = useCallback(() => {
  // 함수 로직
}, [의존성]);
```

**사용 시점**: 함수를 props로 넘길 때 최적화

**예시**:

- 자식 컴포넌트에 전달하는 함수
- `React.memo`와 함께 사용

---

## 시작하기

1. 다음 과제부터 시작 (과제 2-2: 탭 제목 업데이트)
2. 한 번에 하나씩 (욕심 X)
3. 코드 직접 타이핑 (복붙 X)
4. 에러 나면 읽어보기
5. 완성되면 다음 과제로

행운을 빕니다! 화이팅!
