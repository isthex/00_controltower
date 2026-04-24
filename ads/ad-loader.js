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
    if (ad && ad.type === 'kakao-channel') return '무료';
    return 'AD';
  }

  // 카카오 채널 전용 공용 스타일을 host 페이지에 1회 주입
  // (30+ 사이트 + WordPress 플러그인 동시 반영)
  var KAKAO_STYLE_ID = 'central-ads-kakao-style';
  function injectKakaoStyles() {
    if (document.getElementById(KAKAO_STYLE_ID)) return;
    var css = [
      '.ad-slot.kakao-channel,.ad-slot[data-ad-type="kakao-channel"]{background:#FEE500 !important;color:#3C1E1E !important;border-color:rgba(0,0,0,.08) !important}',
      '.ad-slot.kakao-channel.has-image .ad-inner,.ad-slot[data-ad-type="kakao-channel"].has-image .ad-inner{background:linear-gradient(90deg,rgba(254,229,0,1) 0%,rgba(254,229,0,.95) 38%,rgba(254,229,0,.55) 58%,rgba(254,229,0,0) 88%) !important}',
      '.ad-slot.kakao-channel .ad-title,.ad-slot[data-ad-type="kakao-channel"] .ad-title{color:#3C1E1E !important;text-shadow:none !important}',
      '.ad-slot.kakao-channel .ad-subtitle,.ad-slot[data-ad-type="kakao-channel"] .ad-subtitle{color:rgba(60,30,30,.82) !important;opacity:1 !important}',
      '.ad-slot.kakao-channel .ad-label,.ad-slot[data-ad-type="kakao-channel"] .ad-label{background:#3C1E1E !important;color:#FEE500 !important;font-weight:700 !important;letter-spacing:.3px !important}',
      '.ad-slot.kakao-channel .ad-cta,.ad-slot[data-ad-type="kakao-channel"] .ad-cta{background:#3C1E1E !important;color:#FEE500 !important;border:1px solid transparent !important}',
      '.ad-slot.kakao-channel .ad-cta:hover,.ad-slot[data-ad-type="kakao-channel"] .ad-cta:hover{background:#1f100f !important;color:#FEE500 !important}',
      // has-profile 레이아웃 — 상단 [로고박스+텍스트 row] + 하단 [독립 CTA] (로고 침범 없음)
      // .ad-inner 자체는 column 유지 (WFM 플러그인 호환), 내부 .ad-top-row 가 row
      'body a.ad-slot.has-profile .ad-inner,body .ad-slot.has-profile[data-ad-type] .ad-inner{flex-direction:column !important;align-items:flex-start !important;justify-content:center !important;gap:14px !important}',
      'body a.ad-slot.has-profile .ad-top-row,body .ad-slot.has-profile .ad-top-row{display:flex !important;flex-direction:row !important;align-items:center !important;gap:18px !important;width:100% !important;margin:0 !important;padding:0 !important}',
      'body a.ad-slot .ad-logo-box,body .ad-slot .ad-logo-box{width:84px !important;height:84px !important;flex-shrink:0 !important;border-radius:14px !important;overflow:hidden !important;background:transparent !important;box-shadow:0 3px 10px rgba(0,0,0,.18) !important;display:block !important;padding:0 !important;margin:0 !important;position:relative !important;z-index:2 !important}',
      'body a.ad-slot .ad-profile-img,body .ad-slot .ad-profile-img{width:100% !important;height:100% !important;object-fit:cover !important;display:block !important;border-radius:14px !important;margin:0 !important;padding:0 !important;background:#fff !important}',
      'body a.ad-slot.has-profile .ad-text,body .ad-slot.has-profile .ad-text{display:flex !important;flex-direction:column !important;justify-content:center !important;flex:1 1 auto !important;min-width:0 !important;margin:0 !important;padding:0 !important}',
      'body a.ad-slot.has-profile .ad-cta,body .ad-slot.has-profile .ad-cta{align-self:flex-start !important;margin:0 !important}',
      'body a.ad-slot.kakao-channel .ad-logo-box,body .ad-slot[data-ad-type="kakao-channel"] .ad-logo-box{box-shadow:0 3px 8px rgba(60,30,30,.25) !important}',
      // 모바일
      '@media (max-width:640px){body a.ad-slot.has-profile .ad-inner{gap:10px !important}body a.ad-slot.has-profile .ad-top-row{gap:12px !important}body a.ad-slot .ad-logo-box,body .ad-slot .ad-logo-box{width:62px !important;height:62px !important;border-radius:12px !important}}'
    ].join('');
    var s = document.createElement('style');
    s.id = KAKAO_STYLE_ID;
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  function render(el, ad) {
    if (!ad) {
      // fetch 실패 / 풀 고갈 fallback — 슬롯 타입별 실제 배너로 대체
      var slotType = (el.getAttribute('data-ad-type') || '').trim();
      if (slotType === 'kakao-channel') {
        ad = {
          id: 'fallback-kakao-parking-alert',
          type: 'kakao-channel',
          channel_name: '주정차단속알리미',
          title: '주정차단속알리미 바로가기',
          subtitle: '주정차단속 10분 전 문자 알림 · 완전 무료',
          cta: '채널 바로가기',
          url: 'https://pf.kakao.com/_CEtCX/friend',
          image: 'images/kakao-channel-bg-wide.png',
          profile_image: 'images/kakao-profile-parking-alert.png'
        };
      } else {
        ad = {
          id: 'fallback-my-pension',
          type: 'project',
          title: '내 국민연금 예상수령액',
          subtitle: '가입기간·월소득 입력 1분 계산',
          cta: '계산하기',
          url: 'https://mypension.8949ok.kr/',
          image: 'images/banner-my-pension.png'
        };
      }
      // fallback 도 자기 호스트면 렌더 생략 (자기 사이트 광고 방지)
      try {
        if (new URL(ad.url).host === currentHost()) {
          el.style.display = 'none';
          return;
        }
      } catch (e) {}
      // 이후 아래 정상 렌더 로직 그대로 이어짐
    }

    var hasImg = ad.image && String(ad.image).length > 0;
    var imgUrl = hasImg ? resolveImage(ad.image) : '';
    var title = esc(ad.title || '');
    var subtitle = esc(ad.subtitle || '');
    var cta = esc(ad.cta || (ad.type === 'kakao-channel' ? '친구 추가' : '자세히 보기'));
    var url = ad.url || '#';
    var typeClass = ad.type === 'kakao-channel' ? ' kakao-channel' : '';

    var hasProfile = ad.profile_image && String(ad.profile_image).length > 0;
    var profileUrl = hasProfile ? resolveImage(ad.profile_image) : '';
    var channelName = esc(ad.channel_name || '');

    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'sponsored noopener';
    anchor.className = el.className + (hasImg ? ' has-image' : '') + (hasProfile ? ' has-profile' : '') + typeClass;
    anchor.setAttribute('aria-label', title);
    anchor.setAttribute('data-slot', el.getAttribute('data-slot') || '');
    anchor.setAttribute('data-ad-id', ad.id || '');
    anchor.setAttribute('data-ad-type', ad.type || 'project');

    var html = '';
    if (hasImg) {
      html += '<img class="ad-bg" src="' + esc(imgUrl) + '" alt="" loading="lazy"'
        + ' onerror="this.remove(); this.parentElement.classList.remove(\'has-image\');">';
    }
    html += '<div class="ad-inner">';
    if (hasProfile) {
      // 상단 행: [로고박스] + [텍스트 블록(라벨·제목·서브)]
      html += '<div class="ad-top-row">'
        + '<div class="ad-logo-box">'
        + '<img class="ad-profile-img" src="' + esc(profileUrl) + '"'
        + (channelName ? ' alt="' + channelName + '"' : ' alt=""')
        + ' loading="lazy"'
        + ' onerror="this.parentElement.parentElement.parentElement.parentElement.classList.remove(\'has-profile\'); this.parentElement.remove();">'
        + '</div>'
        + '<div class="ad-text">'
        + '<span class="ad-label">' + esc(labelFor(ad)) + '</span>'
        + '<div class="ad-title">' + title + '</div>'
        + (subtitle ? '<div class="ad-subtitle">' + subtitle + '</div>' : '')
        + '</div>'
        + '</div>';
      // 하단 독립 CTA (로고 침범 없음)
      html += '<span class="ad-cta">' + cta + '</span>';
    } else {
      html += '<div class="ad-text">'
        + '<span class="ad-label">' + esc(labelFor(ad)) + '</span>'
        + '<div class="ad-title">' + title + '</div>'
        + (subtitle ? '<div class="ad-subtitle">' + subtitle + '</div>' : '')
        + '<span class="ad-cta">' + cta + '</span>'
        + '</div>';
    }
    html += '</div>';

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
    injectKakaoStyles();
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
