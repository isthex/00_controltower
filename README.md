# 00_controltower (통합 관리소)

모든 프로젝트에서 공통으로 사용하는 자산(Asset)을 중앙에서 관리하는 폴더입니다.

## 📂 파일 목록
- **sidebar.js**: 모든 웹사이트의 우측 하단(모바일) 또는 우측(PC)에 표시되는 '사이드바' 스크립트입니다.
  - 관련 사이트 (프로젝트별 주입)
  - 추천 도구 모음 (통합 관리)

## 🚀 GitHub 저장소 설정 가이드
이 폴더를 별도의 GitHub 저장소에 올리고 **GitHub Pages**를 활성화하면 CDN처럼 사용할 수 있습니다.

### 1. 저장소 공개 범위 (Public vs Private)
**✅ Public (공개) 추천**
- **이유**: `sidebar.js` 파일은 사용자의 웹 브라우저에서 직접 로드되어야 합니다. Private으로 설정하면 인증 토큰 없이는 로드할 수 없어 실제 웹사이트에서 사용하기 매우 어렵습니다.
- **보안**: 이 파일에는 자바스크립트 로직과 링크만 포함되어 있으며, 민감한 키나 비밀번호가 없으므로 공개해도 안전합니다.

### 2. 적용 방법 (예시)
저장소를 만들고 Pages를 켠 후, 각 프로젝트의 `index.html`에서 스크립트 연결 주소만 변경합니다.

```html
<!-- 변경 전 (로컬 파일) -->
<!-- <script src="js/sidebar.js"></script> -->

<!-- 변경 후 (Control Tower CDN) -->
<script src="https://[github-id].github.io/00_controltower/sidebar.js"></script>
```

이렇게 하면 `controltower`의 파일 하나만 수정해도 모든 사이트가 동시에 업데이트됩니다!
