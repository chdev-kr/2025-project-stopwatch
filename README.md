# 2025-project-stopwatch

React Hook을 학습하기 위한 스톱워치 프로젝트

## 설치 및 실행

### 1. Node.js 설치 확인

```bash
# Node.js 버전 확인
node --version
# 또는
node -v

# npm 버전 확인
npm --version
# 또는
npm -v
```

### 2. 프로젝트 생성 및 실행

```bash
# Vite React 프로젝트 생성
npx my-react-vite-app stopwatch

# 프로젝트 디렉토리로 이동
cd stopwatch

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 현재 구현된 기능

### 완료된 기능

- [x] 기본 스톱워치 (Start/Stop/Reset)
- [x] 밀리초 단위 정확도 (0.001초)
- [x] 랩타임 기록 기능
- [x] 실행 상태 표시 (실행 중/정지)
- [x] 일시정지 횟수 카운터
- [x] 키보드 단축키 (스페이스바, R, L)

### 사용 중인 React Hook

- `useState`: 상태 관리 (secondsPassed, laps, isRunning, stopCount)
- `useRef`: 값 저장 및 참조 (startTime, intervalId)
- `useEffect`: 부수 효과 처리 (키보드 이벤트 리스너)

### 키보드 단축키

- **스페이스바**: 시작/정지 토글
- **R**: 리셋
- **L**: 랩타임 기록 (실행 중일 때만)

## 학습 진행 상황

상세한 학습 과제는 `PRACTICE.md` 파일을 참고하세요.

### LEVEL 1: useState 연습 (완료)

- [x] 과제 1-1: 랩타임 기능
- [x] 과제 1-2: 실행 중 상태 표시
- [x] 과제 1-3: 일시정지 횟수 카운터

### LEVEL 2: useEffect 연습 (진행 중)

- [x] 과제 2-1: 키보드 단축키
- [ ] 과제 2-2: 브라우저 탭 제목 업데이트
- [ ] 과제 2-3: 자동 포커스
- [ ] 과제 2-4: 로컬 스토리지 저장

### LEVEL 3: useMemo 연습 (예정)

- [ ] 과제 3-1: 시간 포맷팅
- [ ] 과제 3-2: 랩타임 통계
- [ ] 과제 3-3: 색상 변화

### LEVEL 4: useCallback 연습 (예정)

- [ ] 과제 4-1: 랩타임 삭제
- [ ] 과제 4-2: 컴포넌트 분리

### LEVEL 5: 고급 기능 (예정)

- [ ] 과제 5-1: 다크모드
- [ ] 과제 5-2: 애니메이션 (GSAP)
- [ ] 과제 5-3: 렌더링 디버깅
- [ ] 과제 5-4: 카운트다운 모드
- [ ] 과제 5-5: 세션 관리
