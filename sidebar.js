// 사이드바 공통 관리 도구 (Control Tower)
// 이 파일은 모든 프로젝트에서 공통으로 로드되어 사용됩니다.

// 1. 공통 추천 도구 리스트 (모든 프로젝트 공유)
const recommendedTools = [
    { name: '온라인 글자 수 세기', url: 'https://character-counter.o2u.kr/', desc: '자기소개서 공백 포함/제외' },
    { name: '로또 번호 시뮬레이터', url: 'https://lotto.8949ok.kr/', desc: '역대 당첨 번호 기반' },
    { name: 'D-Day 카운트다운', url: 'https://d-day.o2u.kr/', desc: '중요한 날짜 관리' },
    { name: '웹용 스톱워치/타이머', url: 'https://timer.8949ok.kr/', desc: '업무용 타이머' },
    { name: '축의금 가이드 계산기', url: 'https://weddingpay.8949ok.kr', desc: '경조사비 고민 해결' },
    { name: '해외주식 양도소득세 계산기', url: 'https://ustax.ryunadb.kr/', desc: '환율 변동 반영 세금 계산' },
    { name: '퇴직연금 DC/DB 유불리 계산기', url: 'https://dcdb.ryunadb.kr', desc: '내 퇴직금, 어떤 게 유리할까?' },
    // 추후 프로젝트 추가 시 여기에만 추가하면 됩니다.
];

// 2. 사이드바 초기화 함수 (relatedSites: 프로젝트별 개별 링크 리스트)
function initSidebar(relatedSites = []) {
    const sidebarContainer = document.getElementById('sidebar');
    if (!sidebarContainer) {
        console.warn('Sidebar container not found');
        return;
    }

    // 랜덤 섞기 & 10개만 추출
    const shuffledTools = [...recommendedTools]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    let html = '';

    // 1) 관련 사이트 (이 프로젝트 전용 - 상단)
    if (relatedSites && relatedSites.length > 0) {
        html += `
            <div class="sidebar-card">
                <h3>🔖 관련 사이트</h3>
                <ul class="sidebar-list">
                    ${relatedSites.map(site => `
                        <li>
                            <a href="${site.url}" target="_blank" rel="noopener noreferrer">
                                <span class="link-icon">🔗</span>
                                <span class="link-text">${site.name}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    // 2) 추천 도구 모음 (전체 공통 - 하단)
    html += `
        <div class="sidebar-card recommended-card">
            <h3>🧰 추천 도구 모음</h3>
            <ul class="sidebar-list">
                ${shuffledTools.map(tool => `
                    <li>
                        <a href="${tool.url}" target="_blank" rel="noopener noreferrer">
                            <span class="link-icon">👉</span>
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
