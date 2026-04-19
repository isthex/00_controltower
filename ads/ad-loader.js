/**
 * ad-loader.js — 중앙 광고 로더 (앱in토스 전 사이트 공통)
 *
 * 사용법: 각 사이트 index.html `</body>` 직전에 1줄 로드
 *   <script src="https://isthex.github.io/00_controltower/ads/ad-loader.js"></script>
 *
 * 동작:
 *   1. .ad-slot[data-slot] 요소를 모두 찾음
 *   2. promo-banners.json 에서 weighted random 으로 1개씩 뽑아 렌더
 *   3. 현재 사이트 host 와 같은 URL 은 자동 제외 (자기 자신 노출 방지)
 *   4. fetch 실패 시 기본 하우스 광고 표시
 *
 * HTML 슬롯:
 *   <div class="ad-slot banner-wide" data-slot="banner_wide_top"></div>
 *   <div class="ad-slot banner-wide" data-slot="banner_wide_bottom"></div>
 *   <div class="ad-slot banner-square" data-slot="banner_square"></div>
 *
 * CSS: 각 사이트 css/style.css 에 `.ad-slot` 클래스 정의 (브랜드 그라디언트)
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
    var cta = esc(ad.cta || '자세히 보기');
    var url = ad.url || '#';

    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'sponsored noopener';
    anchor.className = el.className + (hasImg ? ' has-image' : '');
    anchor.setAttribute('aria-label', title);
    anchor.setAttribute('data-slot', el.getAttribute('data-slot') || '');
    anchor.setAttribute('data-ad-id', ad.id || '');

    var html = '';
    if (hasImg) {
      html += '<img src="' + esc(imgUrl) + '" alt="" loading="lazy"'
        + ' onerror="this.remove(); this.parentElement.classList.remove(\'has-image\');">';
    }
    html += '<div class="ad-inner">'
      + '<span class="ad-label">AD</span>'
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

  function loadAds() {
    var slots = document.querySelectorAll('.ad-slot[data-slot]');
    if (!slots.length) return;

    fetchBanners().then(function (banners) {
      var host = currentHost();
      // 현재 사이트와 같은 URL 은 풀에서 제외
      var pool = banners.filter(function (b) { return !sameHost(b.url, host); });

      // 같은 페이지에 여러 슬롯이 있으면 광고가 중복되지 않게 뽑아가며 제거
      var remaining = pool.slice();

      slots.forEach(function (el) {
        var picked = weightedPick(remaining);
        if (picked) {
          remaining = remaining.filter(function (b) { return b !== picked; });
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
