/**
 * ad-loader.js — 중앙 광고 로더 (앱in토스 전 사이트 공통)
 *
 * 사용법: 각 사이트 index.html `</body>` 직전에 1줄 로드
 *   <script src="https://isthex.github.io/00_controltower/ads/ad-loader.js"></script>
 *
 * 기본 3단 컨셉:
 *   상단 = 카카오톡 채널 친구추가 (랜덤)  — `data-ad-type="kakao-channel"`
 *   중단 = Google AdSense (각 사이트 직접 삽입)
 *   하단 = 프로젝트 사이트 배너 (랜덤)    — 기본 슬롯
 *
 * 슬롯 예시:
 *   <!-- 상단: 카카오채널 -->
 *   <div class="ad-slot banner-wide" data-slot="kakao_top" data-ad-type="kakao-channel"></div>
 *
 *   <!-- 하단: 프로젝트 배너 -->
 *   <div class="ad-slot banner-wide" data-slot="project_bottom"></div>
 *
 * 동작:
 *   1. .ad-slot[data-slot] 요소를 모두 찾음
 *   2. 슬롯의 data-ad-type 으로 배너 풀 필터
 *      - `kakao-channel` → banners[].type === "kakao-channel" 만
 *      - 미지정/그 외 → banners[].type !== "kakao-channel" (프로젝트 배너)
 *   3. 필터된 풀에서 weighted random 으로 1개 렌더
 *   4. 현재 사이트 host 와 같은 URL 은 자동 제외 (자기 자신 노출 방지)
 *   5. fetch 실패 시 기본 하우스 광고 표시
 *
 * CSS: 각 사이트 css/style.css 에 `.ad-slot` · `.ad-slot.kakao-channel` 정의
 */

(function () {
  'use strict';

  var BASE = 'https://isthex.github.io/00_controltower/ads';
  var BANNERS_URL = BASE + '/promo-banners.json';

  var cache = null;

  function fetchBanners() {
    if (cache) return Promise.resolve(cache);
    return fetch(BANNERS_URL, { cache: 'default' })
      .then(function (r) {
        if (!r.ok) throw new Error('status ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var list = (data && data.banners) || [];
        cache = list.filter(function (b) { return b && b.active !== false; });
        return cache;
      })
      .catch(function (e) {
        console.warn('[ad-loader] fetch failed', e);
        cache = [];
        return cache;
      });
  }

  function weightedPick(items) {
    if (!items || !items.length) return null;
    var total = 0;
    for (var i = 0; i < items.length; i++) total += (items[i].weight || 1);
    var r = Math.random() * total;
    for (var j = 0; j < items.length; j++) {
      r -= (items[j].weight || 1);
      if (r <= 0) return items[j];
    }
    return items[items.length - 1];
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function resolveImage(img) {
    if (!img) return '';
    if (/^https?:\/\//i.test(img)) return img;
    if (img.charAt(0) === '/') return BASE + img;
    return BASE + '/' + img;
  }

  function labelFor(ad) {
    if (ad && ad.type === 'kakao-channel') return '카톡 채널';
    return 'AD';
  }

  function render(el, ad) {
    if (!ad) {
      // fetch 실패 fallback: 현 사이트 자체 CTA
      el.innerHTML = '<div class="ad-inner">'
        + '<span class="ad-label">AD</span>'
        + '<div class="ad-title">앱in토스 · 일상 도구 모음</div>'
        + '<div class="ad-subtitle">계산기·운세·공공정보 50+</div>'
        + '<span class="ad-cta">둘러보기</span>'
        + '</div>';
      return;
    }

    var hasImg = ad.image && String(ad.image).length > 0;
    var imgUrl = hasImg ? resolveImage(ad.image) : '';
    var title = esc(ad.title || '');
    var subtitle = esc(ad.subtitle || '');
    var cta = esc(ad.cta || (ad.type === 'kakao-channel' ? '친구 추가' : '자세히 보기'));
    var url = ad.url || '#';
    var typeClass = ad.type === 'kakao-channel' ? ' kakao-channel' : '';

    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'sponsored noopener';
    anchor.className = el.className + (hasImg ? ' has-image' : '') + typeClass;
    anchor.setAttribute('aria-label', title);
    anchor.setAttribute('data-slot', el.getAttribute('data-slot') || '');
    anchor.setAttribute('data-ad-id', ad.id || '');
    anchor.setAttribute('data-ad-type', ad.type || 'project');

    var html = '';
    if (hasImg) {
      html += '<img src="' + esc(imgUrl) + '" alt="" loading="lazy"'
        + ' onerror="this.remove(); this.parentElement.classList.remove(\'has-image\');">';
    }
    html += '<div class="ad-inner">'
      + '<span class="ad-label">' + esc(labelFor(ad)) + '</span>'
      + '<div class="ad-title">' + title + '</div>'
      + (subtitle ? '<div class="ad-subtitle">' + subtitle + '</div>' : '')
      + '<span class="ad-cta">' + cta + '</span>'
      + '</div>';

    anchor.innerHTML = html;
    if (el.parentElement) el.parentElement.replaceChild(anchor, el);
  }

  function currentHost() {
    try { return location.host; } catch (e) { return ''; }
  }

  function sameHost(adUrl, host) {
    try { return new URL(adUrl).host === host; }
    catch (e) { return false; }
  }

  function poolForSlot(el, banners) {
    var wanted = (el.getAttribute('data-ad-type') || '').trim();
    if (wanted === 'kakao-channel') {
      return banners.filter(function (b) { return b.type === 'kakao-channel'; });
    }
    // default: 프로젝트 배너 (카카오채널 제외)
    return banners.filter(function (b) { return b.type !== 'kakao-channel'; });
  }

  function loadAds() {
    var slots = document.querySelectorAll('.ad-slot[data-slot]');
    if (!slots.length) return;

    fetchBanners().then(function (banners) {
      var host = currentHost();
      // 현재 사이트와 같은 URL 은 전체 풀에서 제외
      var base = banners.filter(function (b) { return !sameHost(b.url, host); });

      // 같은 타입의 슬롯이 여러 개면 중복 방지를 위해 타입별 남은 풀 관리
      var remainingByType = {};

      slots.forEach(function (el) {
        var typeKey = (el.getAttribute('data-ad-type') || 'project').trim() || 'project';
        if (!remainingByType[typeKey]) {
          remainingByType[typeKey] = poolForSlot(el, base).slice();
        }
        var picked = weightedPick(remainingByType[typeKey]);
        if (picked) {
          remainingByType[typeKey] = remainingByType[typeKey].filter(function (b) { return b !== picked; });
        }
        render(el, picked);
      });
    });
  }

  // 재실행 API (필요시 수동)
  window.loadCentralAds = loadAds;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAds);
  } else {
    loadAds();
  }
})();
