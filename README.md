# 2025-project-stopwatch

React Hook을 학습하기 위한 스톱워치 프로젝트(주더지)

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
