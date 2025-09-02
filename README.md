# Unity WebGL Project

Unity로 개발된 WebGL 프로젝트를 Vercel에 배포하는 예제입니다.

## 프로젝트 구조

```
├── Build/                    # Unity WebGL 빌드 파일들
│   ├── *.data               # 게임 데이터 파일
│   ├── *.framework.js       # Unity 프레임워크
│   ├── *.loader.js          # Unity 로더
│   └── *.wasm               # WebAssembly 파일
├── StreamingAssets/         # 스트리밍 에셋
├── TemplateData/           # UI 템플릿 데이터
├── index.html              # 메인 HTML 파일
├── manifest.webmanifest    # PWA 매니페스트
├── ServiceWorker.js        # 서비스 워커
├── vercel.json             # Vercel 배포 설정
└── package.json            # 프로젝트 메타데이터
```

## Vercel 배포 설정

### vercel.json 주요 설정

1. **정적 파일 서빙**: 모든 파일을 정적 파일로 서빙
2. **캐싱 최적화**: Build, StreamingAssets, TemplateData 폴더의 파일들을 1년간 캐싱
3. **MIME 타입 설정**: 
   - `.wasm` → `application/wasm`
   - `.data` → `application/octet-stream`
   - `.mem` → `application/octet-stream`
   - `.js` → `application/javascript`
   - `.css` → `text/css`
   - `.png` → `image/png`
   - `.ico` → `image/x-icon`
   - `.webmanifest` → `application/manifest+json`

4. **보안 헤더**: CORS, XSS 보호, 콘텐츠 타입 보호 등
5. **WebAssembly 지원**: COOP/COEP 헤더로 SharedArrayBuffer 지원

## 배포 방법

### 1. Vercel CLI 사용
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 2. GitHub 연동
1. GitHub에 프로젝트 푸시
2. Vercel 대시보드에서 GitHub 저장소 연결
3. 자동 배포 설정

### 3. 수동 업로드
1. Vercel 대시보드에서 "New Project" 클릭
2. 프로젝트 폴더를 드래그 앤 드롭

## 로컬 테스트

로컬에서 테스트하려면 정적 파일 서버를 사용하세요:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 설치 필요)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

## 주의사항

1. **파일 크기**: Unity WebGL 빌드는 파일 크기가 클 수 있으므로 Vercel의 제한사항을 확인하세요
2. **메모리 제한**: WebAssembly 메모리 사용량을 모니터링하세요
3. **브라우저 호환성**: 최신 브라우저에서 WebAssembly를 지원하는지 확인하세요
4. **HTTPS**: Vercel은 자동으로 HTTPS를 제공하므로 Service Worker가 정상 작동합니다

## 문제 해결

### WebAssembly 로딩 실패
- `vercel.json`의 MIME 타입 설정 확인
- COOP/COEP 헤더 설정 확인

### 캐싱 문제
- 브라우저 캐시 클리어
- Vercel 캐시 무효화

### 성능 최적화
- Unity 빌드 설정에서 압축 옵션 활성화
- 불필요한 에셋 제거
- 텍스처 압축 설정 최적화
