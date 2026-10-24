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
 *   특정 배너 고정: data-ad-id="kakao-saved-money" (promo-banners.json 의 id)
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

/* ── 통계(2026-10-24) — 전 사이트 공통: 구글 애널리틱스 GA4 + 네이버 애널리틱스 ──────────────
 * 사이트마다 head/footer 에 넣지 않고 이 로더 한 곳에서 붙인다(모든 사이트가 이 로더를 거치게 하는 게 목표).
 * - 한 페이지에서 로더가 두 번 불려도 한 번만(window.__itxAnalytics)
 * - 페이지에 이미 같은 GA ID 를 직접 넣은 경우는 건너뜀(이중 집계 방지)
 * - localhost·127.0.0.1·file: 미리보기는 수집하지 않음
 * 대시보드: tools/traffic-dashboard(GA4 Data API, 속성 G-5F1VQXMC1N) */
(function () {
  'use strict';
  var GA_ID = 'G-5F1VQXMC1N';
  var NAVER_WA = '1ba708d70b53fe0';
  if (window.__itxAnalytics) return;
  window.__itxAnalytics = true;
  var h = location.hostname;
  if (location.protocol === 'file:' || h === 'localhost' || h === '127.0.0.1' || h === '') return;
  function load(src, onload) {
    var s = document.createElement('script');
    s.async = true; s.src = src;
    if (onload) s.onload = onload;
    (document.head || document.documentElement).appendChild(s);
  }
  try {
    // 구글 애널리틱스(GA4)
    var hasGa = document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + GA_ID + '"]');
    if (!hasGa) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
      load('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
    }
    // 네이버 애널리틱스
    if (!document.querySelector('script[src*="wcs.pstatic.net/wcslog.js"]')) {
      window.wcs_add = window.wcs_add || {};
      window.wcs_add['wa'] = NAVER_WA;
      load('https://wcs.pstatic.net/wcslog.js', function () { if (window.wcs) window.wcs_do(); });
    }
  } catch (e) { /* 통계 실패가 광고·화면을 막지 않게 */ }
})();

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
      '.ad-slot.kakao-channel .ad-cta:hover,.ad-slot[data-ad-type="kakao-channel"] .ad-cta:hover{background:#1f100f !important;color:#FEE500 !important}'
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
          id: 'fallback-kakao-saved-money',
          type: 'kakao-channel',
          title: '잠자는 내돈 확인',
          subtitle: '숨은돈 알리미에서 확인해요',
          cta: '채널 바로가기',
          url: 'https://pf.kakao.com/_tJpjX/friend',
          image: 'images/kakao-channel-bg-wide.png'
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
      html += '<img class="ad-bg" src="' + esc(imgUrl) + '" alt="" loading="lazy"'
        + ' onerror="var p=this.parentElement; this.remove(); if(p) p.classList.remove(\'has-image\');">';
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
        // data-ad-id 가 있으면 그 배너로 고정한다 (랜덤 대신 특정 채널만 띄우고 싶을 때).
        // 같은 호스트 제외 필터를 타지 않도록 원본 banners 에서 찾는다.
        var wantId = (el.getAttribute('data-ad-id') || '').trim();
        if (wantId) {
          var fixed = null;
          for (var i = 0; i < banners.length; i++) {
            if (banners[i].id === wantId) { fixed = banners[i]; break; }
          }
          if (fixed) { render(el, fixed); return; }
          // 없는 id 면 조용히 평소대로 랜덤으로 넘어간다
        }
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

/* ── 그물망 관리(2026-10-24, 운영자 승인 — 이 셋만 자동) ─────────────────────────────
 *  ① 숨은돈 알리미 카톡 고정 블록(.kko-cta)이 없는 페이지 → 본문 끝(footer 앞)에 한 번 넣는다(랜덤 배너 슬롯은 고정 블록으로 치지 않음)
 *  ② 블로그 글 → 주제가 맞는 우리 계산기 1~4개 '함께 보면 좋은 계산기'(같은 탭, 현재 사이트 제외)
 *  ③ 블로그 '관련 정보' 박스(.smart-button-container) 안 외부 링크 → 주제 맞는 우리 사이트, 없으면 숨은돈 알리미
 *     (박스 안은 공공기관 링크까지 전부 — 10-24 운영자. 예외가 필요하면 설정 keepHosts. 본문 속 출처 링크는 손대지 않음)
 * 설정·끄기: ads/network-keeper.json (enabled=false 면 전부 꺼짐) · 시험: ?nk=off 끄기 / ?nk=debug 콘솔 기록
 * 건너뜀: 토스 웹뷰(?client=toss-app · .toss-app-mode) · privacy/terms · excludeHosts · 설정을 못 읽으면 아무것도 안 함
 * 바꾼 건 GA4 이벤트 network_keeper(nk_action) 로 남는다. 주제 판정은 auto-posting controltower.match_many 와 같은 방식
 * (tools/analytics-dashboard/keeper.py 가 같은 규칙으로 서버 쪽에서 미리 계산·기록). */
(function () {
  'use strict';
  if (window.__itxKeeper) return;
  window.__itxKeeper = true;
  var BASE = window.NK_BASE || 'https://isthex.github.io/00_controltower';   // NK_BASE = 로컬 시험용
  var qs = location.search || '';
  if (/[?&]nk=off\b/.test(qs) || window.NK_DISABLE) return;
  var DEBUG = /[?&]nk=debug\b/.test(qs);
  function log() { if (DEBUG && window.console) console.log.apply(console, ['[keeper]'].concat([].slice.call(arguments))); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function getJSON(u) { return fetch(u, { cache: 'default' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
  function getText(u) { return fetch(u, { cache: 'default' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }); }
  function hostOf(u) { try { return new URL(u, location.href).hostname.toLowerCase(); } catch (e) { return ''; } }
  function apex(h) {
    var p = h.split('.');
    var n = (/\.(co|or|go|ne|re|pe)\.kr$/.test(h)) ? 3 : 2;
    return p.slice(-n).join('.');
  }
  function ev(action, n) {
    try { if (window.gtag) window.gtag('event', 'network_keeper', { nk_action: action, nk_count: n || 1 }); } catch (e) {}
  }

  // sidebar.js 의 allProjects 를 정규식으로 읽는다(eval 없이 — auto-posting controltower._parse_projects 와 같은 방식)
  function parseProjects(js) {
    var s = js.indexOf('const allProjects'); if (s < 0) s = js.indexOf('allProjects'); if (s < 0) return [];
    var b = js.indexOf('{', s), d = 0, e = b;
    for (var i = b; i < js.length; i++) { var c = js.charAt(i); if (c === '{') d++; else if (c === '}') { d--; if (!d) { e = i; break; } } }
    var block = js.slice(b + 1, e), out = [], re = /'([^']+)'\s*:\s*\{([^}]+?)\}/g, m;
    while ((m = re.exec(block))) {
      var body = m[2], n = /name\s*:\s*'([^']*)'/.exec(body), u = /url\s*:\s*'([^']*)'/.exec(body),
        ds = /desc\s*:\s*'([^']*)'/.exec(body), k = /keywords\s*:\s*\[([^\]]*)\]/.exec(body);
      if (!n || !u) continue;
      var kw = k ? k[1].split(',').map(function (x) { return x.trim().replace(/^['"]|['"]$/g, ''); }).filter(Boolean) : [];
      out.push({ id: m[1], name: n[1], url: u[1], desc: ds ? ds[1] : '', keywords: kw, host: hostOf(u[1]) });
    }
    return out;
  }

  // 주제 판정 — controltower.match_many 와 같은 점수(토막 단위). 이웃 토막을 붙인 말(꿈+해몽=꿈해몽)은 '정확히 같을 때만' 친다.
  // 두 글자 토막이 긴 키워드 속에 들어 있기만 한 건(소득⊂연금소득세) 약하게(1점), 짧은 말이 긴 키워드 귀퉁이에 걸린 건(신청방법⊂문화누리카드신청방법) 안 침
  // — 우연한 겹침이 쌓여 엉뚱한 사이트가 붙는 걸 막는다.
  function rawTokens(t) { return String(t || '').toLowerCase().split(/[^0-9a-z가-힣]+/).filter(Boolean); }
  function tokens(t, stop, pairs) {
    var raw = rawTokens(t), set = {};
    raw.forEach(function (x) { if (x.length >= 2 && !stop[x]) set[x] = 0; });
    if (pairs) for (var i = 0; i + 1 < raw.length; i++) { var j = raw[i] + raw[i + 1]; if (j.length >= 3 && !stop[j] && !stop[raw[i]] && !stop[raw[i + 1]] && !(j in set)) set[j] = 1; }
    return Object.keys(set).map(function (k) { return [k, set[k]]; });   // [토막, 이웃결합이면 1]
  }
  function lcs(a, b) {
    var p = new Array(b.length + 1).fill(0);
    for (var i = 1; i <= a.length; i++) { var prev = 0; for (var j = 1; j <= b.length; j++) { var t = p[j]; p[j] = a[i - 1] === b[j - 1] ? prev + 1 : Math.max(p[j], p[j - 1]); prev = t; } }
    return p[b.length];
  }
  function match(text, projects, cfg, exclude) {
    var stop = {}; (cfg.stop || []).forEach(function (w) { stop[w] = 1; });
    var kt = tokens(text, stop, true), scored = [];
    if (!kt.length) return [];
    projects.forEach(function (p) {
      if (exclude[p.host]) return;
      var pts = {}; p.keywords.concat([p.name]).forEach(function (k) { tokens(k, stop, false).forEach(function (x) { pts[x[0]] = 1; }); });
      pts = Object.keys(pts);
      var total = 0, top = 0;
      kt.forEach(function (tk) {
        var t = tk[0], pair = tk[1], best = 0;
        pts.forEach(function (pt) {
          if (pt === t) best = Math.max(best, t.length * 2);
          else if (!pair && (t.indexOf(pt) >= 0 || (pt.indexOf(t) >= 0 && t.length * 2 >= pt.length))) { var mn = Math.min(t.length, pt.length); best = Math.max(best, mn >= 3 ? mn + 1 : 1); }
          else if (t.length >= 4 && pt.length >= 4) { var r = 2 * lcs(t, pt) / (t.length + pt.length); if (r >= 0.8) best = Math.max(best, Math.floor(Math.min(t.length, pt.length) * r)); }
        });
        total += best; top = Math.max(top, best);
      });
      if (total >= (cfg.minScore || 8) || top >= (cfg.minTop || 6)) scored.push([total, p]);
    });
    scored.sort(function (a, b) { return b[0] - a[0]; });
    return scored.map(function (x) { return x[1]; });
  }

  var STYLE = '.nk-kko.kko-cta{display:block;width:calc(100% - 32px);max-width:600px;margin:40px auto 20px;padding:24px 22px 22px;background:#FFFCEB;border:1px solid #F2E3A0;border-radius:18px;color:#1A2233!important;text-decoration:none!important;box-shadow:0 10px 26px rgba(120,95,0,.07);box-sizing:border-box;text-align:left;font-family:inherit;line-height:1.5}'
    + '.nk-kko .kko-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;background:#FEE500;color:#2B1A16;font-size:11.5px;font-weight:800}'
    + '.nk-kko .kko-dot{width:6px;height:6px;border-radius:50%;background:#2B1A16;display:inline-block}'
    + '.nk-kko .kko-head{display:block;margin:14px 0 8px;font-size:18px;font-weight:900;letter-spacing:-.03em;line-height:1.4;word-break:keep-all;color:#1A2233}'
    + '.nk-kko .kko-sub{display:block;font-size:14px;line-height:1.75;color:#5A6579;word-break:keep-all}'
    + '.nk-kko .kko-chips{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 18px}'
    + '.nk-kko .kko-chips span{padding:4px 11px;border-radius:999px;background:#fff;color:#6B5A00;border:1px solid #EFE2A2;font-size:11.5px;font-weight:700}'
    + '.nk-kko .kko-btn{display:block;padding:15px;border-radius:12px;background:#FEE500;color:#2B1A16;font-size:15.5px;font-weight:900;text-align:center}'
    + '.nk-kko.kko-cta:hover .kko-btn{background:#FFD900}'
    + '.nk-rel{display:block;width:calc(100% - 32px);max-width:640px;margin:32px auto;padding:18px 18px 14px;border-radius:18px;background:linear-gradient(135deg,#eff6ff,#fff);border:1px solid #c9dcf8;box-sizing:border-box;text-align:left;font-family:inherit}'
    + '.nk-rel .nk-rel-t{display:block;margin:0 0 10px;font-size:16px;font-weight:800;color:#0f172a;line-height:1.4}'
    + '.nk-rel .nk-rel-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:8px}'
    + '.nk-rel a.nk-card{display:block;min-width:0;padding:12px 14px;border-radius:12px;background:#fff;border:1px solid #dbe7fb;text-decoration:none!important;color:#101c33!important;box-sizing:border-box}'
    + '.nk-rel a.nk-card:hover{border-color:#2563eb}'
    + '.nk-rel a.nk-card b{display:block;font-size:14.5px;color:#1d4ed8;line-height:1.4;word-break:keep-all;overflow-wrap:anywhere}'
    + '.nk-rel a.nk-card span{display:block;margin-top:3px;font-size:12.5px;color:#5b6b8c;line-height:1.5;word-break:keep-all;overflow-wrap:anywhere}';
  function injectStyle() {
    if (document.getElementById('nk-style')) return;
    var s = document.createElement('style'); s.id = 'nk-style'; s.textContent = STYLE;
    (document.head || document.documentElement).appendChild(s);
  }
  function footerEl() {
    var fs = document.querySelectorAll('footer');
    for (var i = fs.length - 1; i >= 0; i--) { if (!fs[i].closest('article,.kko-cta,.nk-rel')) return fs[i]; }
    return null;
  }
  function insertBeforeFooter(el) {
    var f = footerEl();
    if (f && f.parentNode) { f.parentNode.insertBefore(el, f); return; }
    var m = document.querySelector('main');
    (m || document.body).appendChild(el);
  }

  function run(cfg) {
    if (!cfg || cfg.enabled === false) return log('off');
    var host = location.hostname.toLowerCase(), path = decodeURIComponent(location.pathname || '/');
    if ((cfg.excludeHosts || []).indexOf(host) >= 0) return log('excluded host');
    if ((cfg.excludePaths || []).some(function (p) { return path.toLowerCase().indexOf(p) >= 0; })) return log('excluded path');
    var ov = (cfg.overrides || {})[host] || {};
    var isBlog = (cfg.blogHosts || []).indexOf(host) >= 0;
    var isPost = isBlog && path !== '/' && !!document.querySelector('article, .post, .entry-content');
    injectStyle();

    // ① 카톡 고정 블록
    var k = cfg.kko || {};
    if (k.enabled !== false && ov.kko !== false && !document.querySelector('.kko-cta')) {
      var a = document.createElement('a');
      a.className = 'kko-cta nk-kko'; a.href = k.url || 'https://pf.kakao.com/_tJpjX/friend'; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('data-nk', 'kko');
      a.innerHTML = '<span class="kko-badge"><i class="kko-dot"></i>' + esc(k.badge) + '</span><strong class="kko-head">' + esc(ov.kkoHead || k.head) + '</strong>'
        + '<span class="kko-sub">' + esc(ov.kkoSub || k.sub) + '</span><span class="kko-chips">' + (k.chips || []).map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</span>'
        + '<span class="kko-btn">' + esc(k.btn) + '</span>';
      insertBeforeFooter(a);
      ev('kko'); log('kko inserted');
    }

    // ②③ 블로그만 — 사이트 목록(sidebar.js)이 필요할 때만 받는다
    var boxes = document.querySelectorAll((cfg.rewrite || {}).selector || '.smart-button-container a[href]');
    var wantRel = isPost && (cfg.related || {}).enabled !== false && ov.related !== false && !document.querySelector('.nk-rel');
    var wantRw = (isBlog || boxes.length) && (cfg.rewrite || {}).enabled !== false && ov.rewrite !== false && boxes.length;
    if (!wantRel && !wantRw) return;
    getText(BASE + '/sidebar.js').then(function (js) {
      var projects = parseProjects(js);
      var ourApex = {}; projects.forEach(function (p) { ourApex[apex(p.host)] = 1; });
      (cfg.blogHosts || []).forEach(function (h) { ourApex[apex(h)] = 1; });
      var exclude = {}; exclude[host] = 1;
      var h1 = document.querySelector('h1');
      var text = (h1 && h1.textContent.trim()) || document.title.split(/\s[|\-–]\s/)[0];
      var picks = ov.sites ? projects.filter(function (p) { return ov.sites.indexOf(p.id) >= 0; }) : match(text, projects, cfg, exclude);
      log('topic', text, '→', picks.map(function (p) { return p.name; }));
      // 이 페이지에 이미 링크가 있는 사이트는 다시 넣지 않는다
      var linked = {}; [].forEach.call(document.querySelectorAll('a[href]'), function (x) { linked[hostOf(x.href)] = 1; });
      var keep = ((cfg.rewrite || {}).keepHosts || []).map(function (r) { return new RegExp(r); });
      var queue = picks.filter(function (p) { return !linked[p.host]; });
      // ③ 관련 정보 박스 외부 링크 교체
      if (wantRw) {
        var n = 0, fb = [].concat((cfg.rewrite || {}).fallback || []), fi = 0;   // 숨은돈 알리미 여러 페이지를 돌아가며(같은 링크 반복 방지)
        [].forEach.call(boxes, function (x) {
          var h = hostOf(x.href);
          if (!h || ourApex[apex(h)] || keep.some(function (r) { return r.test(h); })) return;
          var p = queue.shift() || fb[fi++ % fb.length];  // 주제 맞는 우리 사이트 → 없으면 숨은돈 알리미
          if (!p) return;
          x.setAttribute('data-nk-orig', x.href);
          x.href = p.url;
          x.textContent = p.name;
          x.removeAttribute('target'); x.setAttribute('rel', 'noopener'); x.setAttribute('data-nk', 'rewrite');
          linked[hostOf(x.href)] = 1; n++;
        });
        if (n) { ev('rewrite', n); log('rewrote', n); }
      }
      // ② 함께 보면 좋은 계산기
      if (wantRel) {
        var rel = queue.filter(function (p) { return !linked[p.host]; }).slice(0, (cfg.related || {}).max || 4);
        if (rel.length >= ((cfg.related || {}).min || 1)) {
          var box = document.createElement('section');
          box.className = 'nk-rel'; box.setAttribute('data-nk', 'related');
          box.innerHTML = '<strong class="nk-rel-t">🧮 ' + esc((cfg.related || {}).title || '함께 보면 좋은 계산기') + '</strong><div class="nk-rel-g">'
            + rel.map(function (p) { return '<a class="nk-card" href="' + esc(p.url) + '"><b>' + esc(p.name) + '</b>' + (p.desc ? '<span>' + esc(p.desc) + '</span>' : '') + '</a>'; }).join('') + '</div>';
          var art = document.querySelector('article') || document.querySelector('.entry-content') || document.querySelector('.post');
          if (art && art.parentNode) art.parentNode.insertBefore(box, art.nextSibling);
          else insertBeforeFooter(box);
          ev('related', rel.length); log('related', rel.length);
        }
      }
    }).catch(function (e) { log('catalog fail', e); });
  }

  function start() {
    var tossApp = /[?&]client=toss-app\b/.test(qs) || document.documentElement.classList.contains('toss-app-mode');
    if (tossApp) return log('toss webview');
    getJSON(BASE + '/ads/network-keeper.json').then(run).catch(function (e) { log('config fail', e); });
  }
  window.__itxKeeperTest = { parseProjects: parseProjects, match: match, run: run };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
