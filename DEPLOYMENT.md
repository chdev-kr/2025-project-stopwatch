# GitHub Pages 배포 가이드

## 🚀 배포 방법

### 1. GitHub Repository 설정

1. GitHub에서 새 repository 생성 (예: `2025-react-stopwatch`)
2. 로컬 프로젝트를 GitHub에 push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[사용자명]/2025-react-stopwatch.git
   git push -u origin main
   ```

### 2. GitHub Pages 설정

1. GitHub repository의 **Settings** 탭으로 이동
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**를 **GitHub Actions**로 설정
4. 저장 후 자동으로 워크플로우가 실행됩니다

### 3. 자동 배포 확인

- `main` 브랜치에 코드를 push하면 자동으로 배포됩니다
- Actions 탭에서 배포 상태를 확인할 수 있습니다
- 배포 완료 후 `https://[사용자명].github.io/2025-react-stopwatch/`에서 확인 가능

### 4. 수동 배포

- GitHub repository의 **Actions** 탭에서 **Deploy to GitHub Pages** 워크플로우를 수동으로 실행할 수 있습니다

## 📝 주의사항

- `vite.config.js`의 `base` 경로가 repository 이름과 일치해야 합니다
- 모든 정적 파일은 `dist` 폴더에 빌드됩니다
- GitHub Pages는 HTTPS를 사용하므로 Three.js 등의 라이브러리에서 HTTPS가 필요한 기능을 사용할 수 있습니다

## 🔧 문제 해결

### 빌드 실패 시

```bash
cd stopwatch
npm install
npm run build
```

### 경로 문제 시

- `vite.config.js`의 `base` 설정을 확인하세요
- 상대 경로를 사용하는 경우 절대 경로로 변경하세요

### Three.js 모델 로딩 실패 시

- `public` 폴더의 경로를 확인하세요
- 모델 파일이 올바른 위치에 있는지 확인하세요
