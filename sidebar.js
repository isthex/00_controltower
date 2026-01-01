// 사이드바 공통 관리 도구 (Control Tower)
// 이 파일은 모든 프로젝트에서 공통으로 로드되어 사용됩니다.

// 전체 프로젝트 메타데이터 (ID 기반 관리)
const allProjects = {
    '01_character-counter': {
        name: '온라인 글자 수 세기',
        url: 'https://character-counter.o2u.kr/',
        desc: '자기소개서 공백 포함/제외'
    },
    '02_lotto-simulator': {
        name: '로또 번호 시뮬레이터',
        url: 'https://lotto.8949ok.kr/',
        desc: '역대 당첨 번호 기반'
    },
    '03_d-day-countdown': {
        name: 'D-Day 카운트다운',
        url: 'https://d-day.o2u.kr/',
        desc: '중요한 날짜 관리'
    },
    '04_timer-stopwatch': {
        name: '웹용 스톱워치/타이머',
        url: 'https://timer.8949ok.kr/',
        desc: '업무용 타이머'
    },
    '05_wedding-gift-calculator': {
        name: '축의금 가이드 계산기',
        url: 'https://weddingpay.8949ok.kr',
        desc: '경조사비 고민 해결'
    },
    '06_retirement-dc-db': {
        name: '퇴직연금 DC/DB 유불리 계산기',
        url: 'https://dcdb.ryunadb.kr',
        desc: '내 퇴직금, 어떤 게 유리할까?'
    },
    '07_us-stock-tax-calculator': {
        name: '해외주식 양도소득세 계산기',
        url: 'https://ustax.ryunadb.kr/',
        desc: '환율 변동 반영 세금 계산'
    },
    '08_pension-reform-calculator': {
        name: '연령별 국민연금 인상액 계산기',
        url: 'https://npension.ssp2021.kr/',
        desc: '2025 개혁안 반영 시뮬레이터'
    },
    '09_snowball-effect-calculator': {
        name: '복리계산기 (스노우볼)',
        url: 'https://snowball.8949ok.kr/',
        desc: '주식/코인 투자 복리 시뮬레이터'
    },
    '10_bitcoin-futures-calculator': {
        name: '비트코인 선물 진입수량 계산기',
        url: 'https://btccalculator.seosann.kr/',
        desc: '리스크 관리 필수 도구'
    },
    '11_national-pension-calculator': {
        name: '국민연금 예상수령액 계산기',
        url: 'https://mypension.8949ok.kr/',
        desc: '내 연금, 얼마나 받을 수 있을까?'
    },
    '12_size-converter': {
        name: '해외 국가별 사이즈 변환기',
        url: 'https://sizeconvert.o2u.kr/',
        desc: '신발/의류 사이즈 즉시 변환'
    },
    '13_pension-breakeven-calculator': {
        name: '국민연금 본전 계산기',
        url: 'https://npensionprofit.seosann.kr/',
        desc: '몇 살까지 살아야 본전일까?'
    }
};

// 사이드바 초기화 함수
// config = {
//   relatedSites: [{ name, url }],  // 프로젝트별 관련 사이트
//   relatedTools: ['project-id']     // 프로젝트별 관련 도구 (ID 배열)
// }
function initSidebar(config = {}) {
    // 하위 호환성: config가 배열이면 relatedSites로 처리
    if (Array.isArray(config)) {
        config = { relatedSites: config };
    }

    const sidebarContainer = document.getElementById('sidebar');
    if (!sidebarContainer) {
        console.warn('Sidebar container not found');
        return;
    }

    // 현재 보고 있는 도구는 추천 목록에서 제외
    const currentHostname = window.location.hostname;
    const allToolsList = Object.values(allProjects);
    const filteredTools = allToolsList.filter(tool => {
        try {
            const toolHostname = new URL(tool.url).hostname;
            return toolHostname !== currentHostname;
        } catch (e) {
            return true;
        }
    });

    // 랜덤 섞기 & 10개만 추출
    const shuffledTools = filteredTools
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    let html = '';

    // 1) 관련 사이트 (프로젝트별 - 선택적)
    if (config.relatedSites && config.relatedSites.length > 0) {
        html += `
            <div class="sidebar-card">
                <h3>🔗 관련 사이트</h3>
                <ul class="sidebar-list">
                    ${config.relatedSites.map(site => `
                        <li>
                            <a href="${site.url}">
                                <span class="link-icon">🔗</span>
                                <span class="link-text">${site.name}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    // 2) 관련 도구 (프로젝트별 - 선택적)
    if (config.relatedTools && config.relatedTools.length > 0) {
        const relatedToolsList = config.relatedTools
            .map(id => allProjects[id])
            .filter(tool => tool); // 존재하는 프로젝트만

        if (relatedToolsList.length > 0) {
            html += `
                <div class="sidebar-card">
                    <h3>🛠️ 관련 도구</h3>
                    <ul class="sidebar-list">
                        ${relatedToolsList.map(tool => `
                            <li>
                                <a href="${tool.url}">
                                    <span class="link-icon">🔧</span>
                                    <div class="link-content">
                                        <span class="link-title">${tool.name}</span>
                                        ${tool.desc ? `<span class="link-desc">${tool.desc}</span>` : ''}
                                    </div>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }
    }

    // 3) 추천 도구 모음 (전체 공통)
    html += `
        <div class="sidebar-card recommended-card">
            <h3>📦 추천 도구 모음</h3>
            <ul class="sidebar-list">
                ${shuffledTools.map(tool => `
                    <li>
                        <a href="${tool.url}">
                            <span class="link-icon">🎯</span>
                            <div class="link-content">
                                <span class="link-title">${tool.name}</span>
                                ${tool.desc ? `<span class="link-desc">${tool.desc}</span>` : ''}
                            </div>
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    sidebarContainer.innerHTML = html;
}
