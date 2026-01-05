// 사이드바 공통 관리 도구 (Control Tower)
// 이 파일은 모든 프로젝트에서 공통으로 로드되어 사용됩니다.

// 전체 프로젝트 메타데이터 (ID 기반 관리)
const allProjects = {
    '01_character-counter': {
        name: '온라인 글자 수 세기',
        url: 'https://character-counter.o2u.kr/',
        desc: '자기소개서 공백 포함/제외',
        categories: ['문서작성', '업무도구'],
        keywords: ['글자수세기', '자기소개서', '공백포함', '공백제외', '문자수카운터', '텍스트분석', '워드카운트']
    },
    '02_lotto-simulator': {
        name: '로또 번호 시뮬레이터',
        url: 'https://lotto.8949ok.kr/',
        desc: '역대 당첨 번호 기반',
        categories: ['게임', '시뮬레이터'],
        keywords: ['로또', '로또번호', '당첨번호', '로또시뮬레이터', '번호생성', '로또분석', '확률', '복권']
    },
    '03_d-day-countdown': {
        name: 'D-Day 카운트다운',
        url: 'https://d-day.o2u.kr/',
        desc: '중요한 날짜 관리',
        categories: ['일정관리', '생산성도구'],
        keywords: ['디데이', 'D-Day', '카운트다운', '날짜계산', '기념일', '일정관리', '타이머', '남은날짜']
    },
    '04_timer-stopwatch': {
        name: '웹용 스톱워치/타이머',
        url: 'https://timer.8949ok.kr/',
        desc: '업무용 타이머',
        categories: ['생산성도구', '시간관리'],
        keywords: ['스톱워치', '타이머', '시간측정', '업무타이머', '알람', '카운트다운', '시간관리', '포모도로']
    },
    '05_wedding-gift-calculator': {
        name: '축의금 가이드 계산기',
        url: 'https://weddingpay.8949ok.kr',
        desc: '경조사비 고민 해결',
        categories: ['생활정보', '계산기'],
        keywords: ['축의금', '결혼축의금', '경조사비', '축의금계산', '결혼식', '부조금', '축하금', '경조사']
    },
    '06_retirement-dc-db': {
        name: '퇴직연금 DC/DB 유불리 계산기',
        url: 'https://dcdb.ryunadb.kr',
        desc: '내 퇴직금, 어떤 게 유리할까?',
        categories: ['재무계산', '연금'],
        keywords: ['퇴직연금', 'DC', 'DB', '퇴직금', '연금계산', '유불리', '재무설계', '노후준비', '퇴직연금비교']
    },
    '07_us-stock-tax-calculator': {
        name: '해외주식 양도소득세 계산기',
        url: 'https://ustax.ryunadb.kr/',
        desc: '환율 변동 반영 세금 계산',
        categories: ['재무계산', '투자'],
        keywords: ['해외주식', '양도소득세', '세금계산', '미국주식', '환율', '투자세금', '양도세', '주식세금', '해외투자']
    },
    '08_pension-reform-calculator': {
        name: '연령별 국민연금 인상액 계산기',
        url: 'https://npension.ssp2021.kr/',
        desc: '2025 개혁안 반영 시뮬레이터',
        categories: ['재무계산', '연금', '정책정보'],
        keywords: ['국민연금', '연금개혁', '연금인상', '2025개혁안', '연금계산', '노후준비', '연금시뮬레이터', '연금정책']
    },
    '09_snowball-effect-calculator': {
        name: '복리계산기 (스노우볼)',
        url: 'https://snowball.8949ok.kr/',
        desc: '주식/코인 투자 복리 시뮬레이터',
        categories: ['재무계산', '투자'],
        keywords: ['복리계산', '스노우볼', '투자시뮬레이터', '복리효과', '주식투자', '코인투자', '재테크', '자산증식', '투자계산']
    },
    '10_bitcoin-futures-calculator': {
        name: '비트코인 선물 진입수량 계산기',
        url: 'https://btccalculator.seosann.kr/',
        desc: '리스크 관리 필수 도구',
        categories: ['투자', '암호화폐'],
        keywords: ['비트코인', '선물거래', '진입수량', '리스크관리', '레버리지', '암호화폐', '선물계산', '포지션관리', '투자도구']
    },
    '11_national-pension-calculator': {
        name: '국민연금 예상수령액 계산기',
        url: 'https://mypension.8949ok.kr/',
        desc: '내 연금, 얼마나 받을 수 있을까?',
        categories: ['재무계산', '연금'],
        keywords: ['국민연금', '연금계산', '예상수령액', '노후준비', '연금수령', '연금예측', '노령연금', '연금가입']
    },
    '12_size-converter': {
        name: '해외 국가별 사이즈 변환기',
        url: 'https://sizeconvert.o2u.kr/',
        desc: '신발/의류 사이즈 즉시 변환',
        categories: ['생활정보', '쇼핑도구'],
        keywords: ['사이즈변환', '신발사이즈', '의류사이즈', '해외직구', '사이즈표', '국가별사이즈', '치수변환', '사이즈컨버터']
    },
    '13_pension-breakeven-calculator': {
        name: '국민연금 본전 계산기',
        url: 'https://npensionprofit.seosann.kr/',
        desc: '몇 살까지 살아야 본전일까?',
        categories: ['재무계산', '연금'],
        keywords: ['국민연금', '본전계산', '손익분기점', '연금수익', '노후준비', '연금분석', '수익률계산', '연금손익']
    },
    '14_salary-calculator': {
        name: '연봉 실수령액 계산기',
        url: 'https://salary.winevisionshop.kr/',
        desc: '4대보험 및 세금 공제 상세 분석',
        categories: ['재무계산', '급여정보'],
        keywords: ['연봉계산', '실수령액', '4대보험', '세금계산', '급여계산', '월급계산', '소득세', '건강보험', '국민연금']
    },
    '15_ev-subsidy-calculator': {
        name: '전기차 구매 보조금 계산기',
        url: 'https://evcar.ryunadb.kr/',
        desc: '2026 국비·지방비 통합 조회',
        categories: ['생활정보', '자동차', '정책정보'],
        keywords: ['전기차', '보조금', '전기차보조금', '국비지원', '지방비', '전기차구매', '2026보조금', '친환경차', 'EV보조금']
    },
    '16_vat-calculator': {
        name: '부가세계산기',
        url: 'https://addtax.ledgolf.kr/',
        desc: '공급가액·부가세 즉시 계산',
        categories: ['재무계산', '계산기'],
        keywords: ['부가세계산기', '부가세계산', '부가가치세', 'VAT계산', '공급가액', '세금계산서', '사업자부가세', '부가세역계산', '10%부가세', '부가세분리', '부가세', '부가세신고', '부가가치세']
    },
    '17_retirement-pay-calculator': {
        name: '퇴직금 계산기',
        url: 'https://retire.ledgolf.kr/',
        desc: '평균임금·퇴직금 자동 계산',
        categories: ['재무계산', '연금'],
        keywords: ['퇴직금계산기', '퇴직연금계산기', '평균임금', '퇴직금', '근로기준법', '퇴직금중간정산', '퇴직소득세', '퇴직금산정', '1일평균임금']
    },
    '18_real-estate-acquisition-tax-calculator': {
        name: '부동산 취등록세/복비 계산기',
        url: 'https://estatecal.8949ok.kr/',
        desc: '취득세, 중개수수료, 이사비 통합 견적',
        categories: ['재무계산', '생활정보', '부동산'],
        keywords: ['부동산취득세', '취등록세', '복비계산', '이사비용', '아파트세금', '부동산계산기', '중개수수료', '취득세율', '다주택자세금', '주택취득새', '오피스텔취득세']
    },
    '19_modoo-card-calculator': {
        name: '모두의 카드 환급액 계산기',
        url: 'https://modoocard.seosann.kr/',
        desc: '대중교통비 최대 53% 환급 예상액',
        categories: ['생활정보', '교통', '계산기'],
        keywords: ['모두의카드', '교통비환급', 'K패스', '기후동행카드', '대중교통할인', '교통카드', '환급계산기', '2026정책']
    },
    '20_year-end-tax-preview': {
        name: '연말정산 미리보기 (2026)',
        url: 'https://yearendtax.o2u.kr/',
        desc: '로그인 없이 3분 만에 확인하는 2026년 소득공제/세액공제 시뮬레이션',
        categories: ['재무계산', '세금', '계산기'],
        keywords: ['연말정산', '연말정산미리보기', '2026연말정산', '소득공제', '세액공제', '결혼세액공제', '자녀세액공제', '월세공제', '연말정산계산기', '환급금조회']
    },
    '21_median-income-calculator': {
        name: '중위소득 계산기',
        url: 'https://medianincome.8949ok.kr/',
        desc: '2026년 기준 중위소득 확인 + 맞춤형 복지 혜택 안내',
        categories: ['재무계산', '복지정보', '계산기'],
        keywords: ['중위소득', '중위소득계산기', '기준중위소득', '2026년중위소득', '생계급여', '주거급여', '교육급여', '의료급여', '복지혜택', '소득인정액']
    },
    '22_youth-rent-support': {
        name: '청년 월세지원 자격 판독기',
        url: 'https://housesupport.ssp2021.kr/',
        desc: '2026년 기준 자격 여부 + 예상 지원금 5초 확인',
        categories: ['복지정보', '계산기', '주거지원'],
        keywords: ['청년월세지원', '청년월세', '월세지원', '주거지원', '청년복지', '월세보조금', '청년주거', '부모님소득', '중위소득60%', '복지로']
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

    // 관련도구 개수 계산
    const relatedToolsCount = (config.relatedTools && config.relatedTools.length) || 0;

    // 추천도구 개수 = 10 - 관련도구 개수 (최소 0개)
    const recommendedCount = Math.max(0, 10 - relatedToolsCount);

    // 랜덤 섞기 & 조정된 개수만큼 추출
    const shuffledTools = filteredTools
        .sort(() => Math.random() - 0.5)
        .slice(0, recommendedCount);

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
