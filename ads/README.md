# ads — 앱in토스 중앙 광고 시스템

컨트롤타워에서 호스팅되는 **전 사이트 공통 프로모션 배너 풀**.
여기 파일만 수정하면 모든 웹사이트 광고 슬롯이 즉시 갱신됨 (GitHub Pages CDN 캐시 갱신 속도).

호스팅 URL: `https://isthex.github.io/00_controltower/ads/`

## 파일 구성

| 파일 | 용도 |
|------|------|
| `ad-loader.js` | 각 사이트가 1줄 로드하는 광고 렌더 엔진 |
| `promo-banners.json` | 내 사이트끼리 교차 홍보 배너 풀 (메인) |
| `channels.json` | 카카오 채널 연결 풀 (별도 용도) |
| `images/` | 배너 이미지 (옵션 — 없으면 CSS 그라디언트 fallback) |
| `fonts/` | 이미지 생성용 폰트 (Pillow 오버레이) |

## 사용법 (각 사이트 index.html)

```html
<!-- 슬롯 자리 (위치는 자유) -->
<div class="ad-slot banner-wide" data-slot="banner_wide_top"></div>
<div class="ad-slot banner-square" data-slot="banner_square"></div>

<!-- 로더 1줄 (</body> 직전) -->
<script src="https://isthex.github.io/00_controltower/ads/ad-loader.js"></script>
```

`.ad-slot` 클래스 CSS 는 각 사이트 `css/style.css` 에 정의 (브랜드 그라디언트).
레퍼런스: `webs/30_parking-alert/css/style.css` 의 `/* 광고 슬롯 시스템 */` 섹션.

## 새 광고 추가 (promo-banners.json)

```json
{
  "id": "새사이트slug",
  "title": "17자 이내 강한 소구",
  "subtitle": "28자 이내 서브카피",
  "cta": "2~5자",
  "url": "https://신규사이트.도메인/",
  "image": null,
  "tags": ["카테고리1", "카테고리2"],
  "weight": 1,
  "active": true
}
```

- `weight` — 기본 1. 핵심 수익 사이트는 2~3으로 가중치 부여
- `active: false` 로 로테이션에서 임시 제외
- `image` 는 `null` 이면 CSS 그라디언트 fallback. 있으면 `images/파일명.png`

## 자기 제외 로직

`ad-loader.js` 는 **현재 사이트 host 와 같은 URL 을 자동 제외**.
즉 `beach.ledgolf.kr` 페이지에서는 `beach-weather` 배너가 뽑히지 않음.

## 같은 페이지 중복 방지

한 페이지에 슬롯이 여러 개 있으면 **이미 뽑힌 배너는 pool 에서 제거** 후 다음 슬롯 선정.
3슬롯 × 서로 다른 광고 = 보장.

## 이미지 통일 규격

| 종류 | 비율 | 권장 크기 |
|------|------|-----------|
| `wide` | 4:1 | 1200 × 300 |
| `square` | 1:1 | 800 × 800 |

## 배포

이 폴더는 `isthex/00_controltower` GitHub repo. push 시 GitHub Pages 가 자동 배포.
```bash
cd 00_controltower
git add ads/
git commit -m "feat(ads): ..."
git push
```
