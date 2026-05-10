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
        keywords: ['퇴직연금', 'DC형퇴직금', 'DB형퇴직금', '퇴직금', '퇴직연금계산', 'DC유불리', '확정기여형', '확정급여형', '퇴직연금비교']
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
        keywords: ['국민연금', '국민연금개혁', '국민연금인상', '2025국민연금개혁안', '국민연금계산', '국민연금시뮬레이터', '국민연금정책', '연령별국민연금']
    },
    '09_snowball-effect-calculator': {
        name: '복리계산기 (스노우볼)',
        url: 'https://snowball.8949ok.kr/',
        desc: '주식/코인 투자 복리 시뮬레이터',
        categories: ['재무계산', '투자'],
        keywords: ['복리계산', '복리계산기', '스노우볼복리', '복리시뮬레이터', '복리효과', '주식복리', '코인복리', '복리재테크', '복리자산증식', '복리투자계산']
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
        keywords: ['국민연금', '국민연금계산', '국민연금예상수령액', '국민연금수령', '국민연금예측', '노령연금', '국민연금가입', '국민연금조견표']
    },
    '12_size-converter': {
        name: '사이즈 변환기',
        url: 'https://sizeconvert.o2u.kr/',
        desc: '신발·의류·반지·모자·속옷 9종 변환',
        categories: ['생활정보', '쇼핑도구'],
        keywords: ['사이즈변환', '신발사이즈', '의류사이즈', '반지사이즈', '모자사이즈', '속옷사이즈', '벨트사이즈', '장갑사이즈', '아동신발', '해외직구', '사이즈표', '국가별사이즈', '치수변환', '사이즈컨버터', '한국호수', '미국사이즈', '유럽사이즈', '일본사이즈']
    },
    '13_pension-breakeven-calculator': {
        name: '국민연금 본전 계산기',
        url: 'https://npensionprofit.seosann.kr/',
        desc: '몇 살까지 살아야 본전일까?',
        categories: ['재무계산', '연금'],
        keywords: ['국민연금본전', '국민연금손익분기점', '국민연금수익', '국민연금분석', '국민연금수익률', '국민연금손익', '국민연금본전계산', '국민연금몇살까지']
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
        keywords: ['전기차', '전기차보조금', '국비지원', '지방비보조금', '전기차구매', '2026전기차보조금', '친환경차보조금', 'EV보조금', '환경부보조금']
    },
    '16_vat-calculator': {
        name: '부가세계산기',
        url: 'https://addtax.ledgolf.kr/',
        desc: '공급가액·부가세 즉시 계산',
        categories: ['재무계산', '계산기'],
        keywords: ['부가세계산기', '부가세계산', '부가가치세계산기', 'VAT계산기', '부가세공급가액', '부가세세금계산서', '사업자부가세', '부가세역계산', '10%부가세', '부가세분리', '부가세신고일정', '부가세환급', '간이과세자부가세', '일반과세자부가세', '부가세면세', '부가세매입세액공제', '2026부가세']
    },
    '17_retirement-pay-calculator': {
        name: '퇴직금 계산기',
        url: 'https://retire.ledgolf.kr/',
        desc: '평균임금·퇴직금 자동 계산',
        categories: ['재무계산', '연금'],
        keywords: ['퇴직금계산기', '퇴직연금계산기', '퇴직금평균임금', '퇴직금', '근로기준법퇴직금', '퇴직금중간정산', '퇴직소득세', '퇴직금산정', '1일평균임금']
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
        keywords: ['모두의카드', '모두의카드환급', '교통비환급', 'K패스환급', '기후동행카드', '대중교통할인', '교통카드환급', '교통비환급계산기', '2026교통정책']
    },
    '20_year-end-tax-preview': {
        name: '연말정산 미리보기 (2026)',
        url: 'https://yearendtax.o2u.kr/',
        desc: '로그인 없이 3분 만에 확인하는 2026년 소득공제/세액공제 시뮬레이션',
        categories: ['재무계산', '세금', '계산기'],
        keywords: ['연말정산', '연말정산미리보기', '2026연말정산', '연말정산소득공제', '연말정산세액공제', '연말정산결혼세액공제', '연말정산자녀세액공제', '연말정산월세공제', '연말정산계산기', '연말정산환급금조회', '연말정산의료비공제', '연말정산교육비공제', '연말정산기부금공제', '연말정산연금저축공제', '연말정산IRP공제', '13월의월급', '연말정산일정', '홈택스간소화']
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
    },
    '23_house-pension-calculator': {
        name: '주택연금 예상수령액 계산기',
        url: 'https://housepension.seosann.kr/',
        desc: '2026년 최신 정책 반영, 지금 vs 1년 뒤 가입 유불리 분석',
        categories: ['재무계산', '연금', '부동산'],
        keywords: ['주택연금', '주택연금계산기', '역모기지', '주택담보노후연금', '주택연금수령액', '주택연금가입시기', '주택연금조견표', '2026주택연금', '주택연금노후준비', '주택연금비교']
    },
    '24_personal-pension-calculator': {
        name: '개인연금 절세 인출 계산기',
        url: 'https://personalpension.ryunadb.kr/',
        desc: '120% 한도 + 1,500만원 기준 비교, 최적 인출 전략',
        categories: ['재무계산', '연금', '세금'],
        keywords: ['개인연금인출', '연금수령한도', '연금절세', 'IRP인출', '연금저축인출', '1500만원기준', '연금소득세', '120%한도', '개인연금세금', '소득크레바스']
    },
    '25_credit-score-calculator': {
        name: '신용점수 대출한도 계산기',
        url: 'https://credit.ledgolf.kr/',
        desc: '신용점수 등급 계산기 NICE/KCB 기반 대출한도·금리 조회',
        categories: ['재무계산', '금융정보'],
        keywords: ['신용점수', '신용등급', '대출한도', '대출이자', '금리계산기', 'NICE', 'KCB', '대출심사', '신용평가', '대출금리', 'DSR', '신용점수조회']
    },
    '26_worker-meal-support': {
        name: '직장인 든든한 한끼 자격 판독기',
        url: 'https://hanggi.8949ok.kr/',
        desc: '2026 인구감소지역 식비 지원 자격 확인 + 캐시백 계산',
        categories: ['정책정보', '복지혜택', '재무계산'],
        keywords: ['든든한한끼', '직장인식비지원', '인구감소지역', '중소기업혜택', '캐시백계산', '월4만원', '식비지원', '정부지원금', '근로자복지', '점심할인', '아침밥지원', '89개지역']
    },
    '27_rural-basic-income': {
        name: '농어촌 기본소득 자격 판독기',
        url: 'https://ruralsupport.seosann.kr/',
        desc: '농촌 지원금 통합 계산 - 월 15만원 기본소득 + 청년농업인 월 110만원',
        categories: ['정책정보', '복지혜택', '재무계산'],
        keywords: ['농어촌기본소득', '농민기본소득', '경기도농어민기회소득', '청년농업인지원', '영농정착지원', '인구감소지역기본소득', '농어촌월15만원', '귀농귀촌지원', '농업경영체', '후계농자금', '농촌이주지원']
    },
    '28_work-support-system': {
        name: '국민취업지원제도 자격 판독기',
        url: 'https://worksupport.ryunadb.kr/',
        desc: '5초 만에 확인하는 1유형/2유형 지원금 계산',
        categories: ['정책정보', '복지혜택', '재무계산'],
        keywords: ['국민취업지원제도', '국민취업구직촉진수당', '국민취업1유형', '국민취업2유형', '국민취업청년특례', '국민취업중위소득60', '고용24', '국민취업지원금', '국민취업구직활동', '병역기간가산', '청년구직자지원']
    },
    '29_ipo-allocation-calculator': {
        name: '공모주 청약일정 주식배정 예측기',
        url: 'https://ipo.seosann.kr/',
        desc: '균등배정·비례배정 5초 계산',
        categories: ['투자', '재무계산', '주식'],
        keywords: ['공모주', '공모주청약', 'IPO', '균등배정', '비례배정', '5사6입', '청약배정', '공모주계산기', '경쟁률', '증거금', '주식청약', '공모주일정', '38커뮤니케이션', '투자전략']
    },
    '30_average-price-calculator': {
        name: '주식 코인 물타기 계산기',
        url: 'https://average.ssp2021.kr/',
        desc: '평단가 계산 + 목표가 역계산 + 수익률 분석',
        categories: ['투자', '암호화폐', '재무계산'],
        keywords: ['물타기', '평단가계산기', '코인물타기', '주식물타기', '목표평단가', '수익률', '비트코인', '평균단가', '물타기계산', '분할매수', '손익분기점']
    },
    '31_unemployment-benefits-calculator': {
        name: '실업급여 자격판독기',
        url: 'https://unemp.winevisionshop.kr/',
        desc: '5초 자격확인 + 예상수령액 계산',
        categories: ['재무계산', '복지정보', '정책정보'],
        keywords: ['실업급여', '실업급여 자격', '실업급여 금액', '실업급여 계산기', '실업급여 신청', '구직급여', '자진퇴사 실업급여', '권고사직', '실업급여 조건', '실업급여 정당한 사유', '실업급여 알바', '실업급여 200만원', '실업급여 300만원', '실업급여 수급기간', '2026 실업급여']
    },
    '32_esim-compatibility-checker': {
        name: 'eSIM 호환 기기 확인 + 로밍 요금 비교',
        url: 'https://esim.winevisionshop.kr/',
        desc: '5초 기기 확인 + 실시간 요금 비교',
        categories: ['생활정보', '여행', '통신'],
        keywords: ['eSIM', 'eSIM 호환 기기', 'eSIM 지원 기기', '아이폰 eSIM', '갤럭시 eSIM', 'eSIM 로밍 비교', 'eSIM 요금 비교', '해외여행 eSIM', 'eSIM 절약', '로밍 vs eSIM', 'eSIM 설정', '일본 eSIM', '미국 eSIM', '유럽 eSIM', 'iPhone 15 eSIM', 'Galaxy S24 eSIM', 'eSIM 7일', 'eSIM 무제한', 'Airalo', 'Holafly', 'Nomad', 'eSIM 가격', 'eSIM 추천', '여행 데이터', 'eSIM 구매']
    },
    '33_national-scholarship-checker': {
        name: '2026 국가장학금 자격 판독기',
        url: 'https://scholarship.ledgolf.kr/',
        desc: '5초 자격 확인 + 예상 지원금액 계산',
        categories: ['재무계산', '복지정보', '교육'],
        keywords: ['국가장학금', '장학금자격', '소득분위', '장학금계산기', '2026장학금', 'I유형', 'II유형', '다자녀장학금', '9구간', '학자금지원', '대학생장학금', '한국장학재단', '소득인정액', '장학금신청']
    },
    '34_savings-deposit-calculator': {
        name: '적금·예금 계산기',
        url: 'https://saving.ledgolf.kr/',
        desc: '이자 예상수령액 5초 계산 + 적금금리비교',
        categories: ['재무계산', '금융정보', '계산기'],
        keywords: ['적금계산기', '예금계산기', '적금이자계산', '예금이자계산', '적금예상수령액', '예금예상수령액', '적금만기금액', '예금만기금액', '적금실수령액', '예금실수령액', '적금금리비교', '풍차돌리기', '월10만원적금', '1000만원예금', '단리계산', '복리계산', '이자소득세', '비과세저축', '은행연합회', '적금상품', '예금상품', '저축계산', '만기수령액', '세후이자']
    },
    '35_housing-subscription-calculator': {
        name: '주택청약 가점 계산기',
        url: 'https://house.ssp2021.kr/',
        desc: '5초 가점 계산 + 2026년 개정안 반영',
        categories: ['재무계산', '부동산', '계산기'],
        keywords: ['주택청약', '청약가점', '청약가점계산기', '무주택기간', '부양가족', '청약통장', '청약홈', '신혼부부특별공급', '2026청약', '배우자통장합산', '청약점수', '가점제', '청약자격', '청약당첨', '주택청약가점', '청약시뮬레이션', '신생아특별공급', '청약84점', '청약가점표']
    },
    '36_cartax-yearly-calculator': {
        name: '자동차세 연납 할인 계산기',
        url: 'https://cartax.ryunadb.kr/',
        desc: '2026 1·3·6·9월 연납 시 절약액 즉시 계산',
        categories: ['생활정보', '자동차', '계산기', '세무'],
        keywords: ['자동차세', '자동차세연납', '자동차세할인', '연납할인', '위택스', '자동차세계산기', '1월연납', '3월연납', '6월연납', '9월연납', '차령감면', '자동차세선납', '비영업승용차', '자동차세납부', '2026자동차세']
    },
    '37_hipass-toll-discount': {
        name: '하이패스 톨게이트 할인 자가진단',
        url: 'https://hipass.wedclub.kr/',
        desc: '다둥이·전기차·심야·출퇴근·장애인 50% 감면 진단',
        categories: ['생활정보', '자동차', '운전자'],
        keywords: ['하이패스할인', '톨게이트할인', '다둥이하이패스', '전기차하이패스', '심야하이패스', '출퇴근하이패스', '장애인하이패스', '하이패스50%', '한국도로공사', '통행료감면', '화물차야간할인', '하이패스카드', 'hipass']
    },
    '38_scrapcar-subsidy': {
        name: '조기폐차 보조금 자가진단',
        url: 'https://scrapcar.ryunadb.kr/',
        desc: '5등급(2026 마지막) · 4등급 70%+30% 자격·신청 진단',
        categories: ['생활정보', '자동차', '보조금', '환경'],
        keywords: ['조기폐차', '조기폐차보조금', '5등급폐차', '4등급폐차', '노후경유차', '한국자동차환경협회', 'aea', 'mecar', '폐차지원금', '저소득폐차', '소상공인폐차', '배출가스등급', 'DPF']
    },
    '39_carinsure-refund': {
        name: '자동차 보험료 환급 계산기',
        url: 'https://carinsure.ledgolf.kr/',
        desc: '매매·해지·마일리지·다이렉트 4종 환급 1분 계산',
        categories: ['생활정보', '자동차', '보험', '환급'],
        keywords: ['자동차보험환급', '자동차보험해지', '일할계산', '단기요율', '마일리지환급', '다이렉트자동차보험', '보험료환급금', '매매환급', '폐차환급', '양도환급', '18000km환급']
    },
    '40_oilcard-compare': {
        name: '주유 할인 카드 비교',
        url: 'https://oilcard.seosann.kr/',
        desc: '주행 패턴별 카드 추천 — 정률 vs 정액 · 8 카드사',
        categories: ['생활정보', '자동차', '카드', '금융'],
        keywords: ['주유할인카드', '주유카드추천', '신한RPM', '삼성카드1.5', '현대카드M', 'KB탄탄대로', 'NH올원파이', '롯데경차스마트', '알뜰주유소카드', 'SK엔크린', '정률할인', '정액할인', '무실적주유카드']
    },
    '41_usedcar-price': {
        name: '중고차 시세조회 사이트 비교',
        url: 'https://usedcar.ryunadb.kr/',
        desc: 'KB차차차·엔카·K카·헤이딜러·보배드림 5대 시세 비교 + 매도 팁',
        categories: ['생활정보', '자동차', '매매', '시세'],
        keywords: ['중고차시세', '내차시세', '중고차시세조회', 'KB차차차', '엔카', 'K카', '헤이딜러', '보배드림', '내차팔기', '중고차가격', '중고차매매', '자동차시세표', '그랜저시세', '아반떼시세', 'SUV시세', '하이브리드중고차', '직영매입', '경쟁입찰', '카히스토리', '자동차365']
    },
    '42_retirement-dcdb': {
        name: '퇴직금 DC vs DB 유불리 계산기',
        url: 'https://dcdb.ryunadb.kr/',
        desc: '확정기여형(DC) vs 확정급여형(DB) 시나리오별 비교 분석',
        categories: ['재무계산', '연금', '퇴직', '계산기'],
        keywords: ['퇴직금', 'DC형퇴직금', 'DB형퇴직금', '확정기여형', '확정급여형', '퇴직연금계산기', 'DC퇴직금계산', 'DB퇴직금계산', '퇴직금계산기', '퇴직연금', 'DC수익률', '퇴직금비교', '퇴직금연봉상승률', '퇴직금근속연수', '퇴직금시나리오']
    },
    '43_credit-score': {
        name: '신용점수 계산기 · 대출한도',
        url: 'https://credit.ledgolf.kr/',
        desc: 'NICE/KCB 기준 신용점수 무료 조회 + 대출한도·금리·등급별 혜택',
        categories: ['재무계산', '금융', '대출', '신용', '계산기'],
        keywords: ['신용점수', '신용등급', 'NICE', 'KCB', '신용점수조회', '신용등급무료조회', '대출한도', '대출한도계산기', '대출금리', 'DSR', '신용카드발급', '신용점수올리는법', '햇살론', '서민금융', '1금융권', '2금융권', '연체관리']
    },
    '44_retirement-pay': {
        name: '퇴직금 계산기',
        url: 'https://retire.ledgolf.kr/',
        desc: '근로기준법 평균임금 × 근속연수 + 퇴직소득세 즉시 계산',
        categories: ['재무계산', '퇴직', '근로', '계산기'],
        keywords: ['퇴직금', '퇴직금계산기', '퇴직금평균임금', '퇴직금평균임금계산', '퇴직연금', '퇴직소득세', '근로기준법퇴직금', '퇴직금중간정산', '퇴직금근속연수', '1일평균임금', '퇴직금세금', '퇴직급여', '퇴직금공식', '퇴직금시뮬레이션']
    },
    '45_growthfund': {
        name: '국민성장펀드 안내',
        url: 'https://growthfund.ssp2021.kr/',
        desc: '5년 150조 정부 정책 펀드 · 국민참여형 공모펀드 가입 가이드',
        categories: ['정책', '금융', '투자', '정부지원'],
        keywords: ['국민성장펀드', '국민성장펀드 가입', '국민참여형 공모펀드', '150조 펀드', '정책펀드', '첨단전략산업기금', 'KDB산업은행', '미래에셋 국민성장펀드', '삼성자산운용 공모', 'KB자산운용 펀드', 'AI 펀드', '반도체 펀드', '바이오 펀드', '소버린AI', 'OLED 초격차', '메가프로젝트', '모태펀드 차이', '뉴딜펀드 차이', '국민성장펀드 출범', '국민성장펀드 운용사', '재정모펀드']
    },
    '46_youthsave': {
        name: '청년미래적금 가입 가이드',
        url: 'https://youthsave.winevisionshop.kr/',
        desc: '2026.6 출시 · 만 19~34세 · 월 50만원 · 3년 만기 2,200만원 · 정부 기여금 6~12%',
        categories: ['정책', '청년', '적금', '정부지원'],
        keywords: ['청년미래적금', '청년미래적금 가입', '청년미래적금 자격', '청년미래적금 기여금', '청년미래적금 신청', '청년미래적금 만기', '청년미래적금 6%', '청년미래적금 12%', '청년미래적금 우대형', '청년미래적금 일반형', '청년 정부지원 적금', '청년 자유적립적금', '청년도약계좌 비교', '2026 청년 적금', '만 19 34세 청년적금', '서민금융진흥원 적금', '비과세 청년적금', '6월 출시 청년적금', '3년 만기 2200만원', '월 50만원 청년적금', '청년 자산형성 지원']
    },
    '47_npsbought': {
        name: '국민연금은 뭐샀지',
        url: 'https://npsbought.8949ok.kr/',
        desc: 'NPS 1,610조 운용 · 5% 이상 보유 142개 종목 · 자산배분·DART 공시 추적',
        categories: ['연금', '투자', '공시', '정보추적'],
        keywords: ['국민연금 보유 종목', '국민연금 매수', '국민연금 매도', '국민연금 비중', 'NPS 포트폴리오', 'NPS 5% 보유', 'NPS 보유 종목', 'NPS 매수 종목', 'NPS 매도 종목', '국민연금공단 보유', '국민연금 분기 포트폴리오', '국민연금 자산배분', '국민연금 자산배분 2026', '국민연금 운용 현황', '5% 대량보유 보고서', 'DART 국민연금', '국민연금 매매 내역', '국민연금이 산 주식', '국민연금 따라가기', '국민연금 종목 추적', '1610조 운용', '1600조 포트폴리오', '국민연금 국내주식 비중', '국민연금 해외주식 비중', '국민연금 채권 비중', '국민연금 대체투자', 'NPS 분기 공시']
    },
    'lifesajoo': {
        name: '인생사주',
        url: 'https://lifesajoo.com',
        desc: '사주팔자 무료 만세력 + AI 사주 분석',
        categories: ['운세', '사주'],
        keywords: ['사주', '사주팔자', '인생사주', '만세력', '무료사주', 'AI사주', '인터넷사주', '사주보는곳', '사주팔자보는법', '오행', '사주사이트', '운세', '사주분석']
    },
    'hangul-is-hard': {
        name: '한글은 어렵다 맞춤법 테스트',
        url: 'https://hangle.o2u.kr/',
        desc: '되/돼·안/않·로서/로써 맞춤법 퀴즈',
        categories: ['국어', '교육', '퀴즈'],
        keywords: ['맞춤법테스트', '맞춤법퀴즈', '되돼', '안않', '로서로써', '띄어쓰기', '한국어맞춤법', '맞춤법공부', '맞춤법검사']
    },
    'toothpaste-ingredient': {
        name: '내 치약 성분분석기',
        url: 'https://tooth.o2u.kr/',
        desc: 'SLS·트리클로산·불소 안전성 검색',
        categories: ['건강', '생활정보', '분석기'],
        keywords: ['치약성분', 'SLS', '트리클로산', '불소치약', '치약성분확인', '불화나트륨', '치약안전성', '라우릴황산나트륨', '구내염치약']
    },
    'oilsupport': {
        name: '고유가피해지원금 안내',
        url: 'https://oilsupport.wedclub.kr/',
        desc: '민생지원금 대상·금액·신청방법 참고 정보',
        categories: ['정부지원', '생활정보', '금융'],
        keywords: ['고유가피해지원금', '민생지원금', '고유가지원금', '소득하위70지원금', '2026추경지원금', '민생지원금신청', '고유가피해지원금대상']
    },
    'school-lunch': {
        name: '오늘 급식 뭐야?',
        url: 'https://school.o2u.kr/',
        desc: '전국 초중고 학교 급식 메뉴 조회',
        categories: ['생활정보', '교육', '학교'],
        keywords: ['학교급식', '오늘급식', '급식메뉴', '초등학교급식', '중학교급식', '고등학교급식', '급식조회', '학교식단', '오늘뭐먹지', '급식달력', 'NEIS급식']
    },
    'eitc-grant': {
        name: '근로장려금 계산기',
        url: 'https://eitc.ryunadb.kr/',
        desc: '2026 근로·자녀장려금 예상 수령액·신청일정',
        categories: ['정부지원', '금융', '생활정보'],
        keywords: ['근로장려금', '근로장려금신청', '자녀장려금', '2026근로장려금', '근로장려금계산기', '근로장려금지급일', '홈택스장려금', '반기신청', 'EITC', '근로장려금자격']
    },
    'jongso-tax': {
        name: '종합소득세 계산기',
        url: 'https://jongso.ryunadb.kr/',
        desc: '2026 프리랜서 3.3% 환급·종소세 예상액 조회',
        categories: ['정부지원', '금융', '생활정보'],
        keywords: ['종합소득세', '종소세', '종합소득세계산기', '프리랜서3.3환급', '종합소득세세율표', '종합소득세신고기간', '홈택스종합소득세', '모두채움', '단순경비율', '종합소득세환급']
    },
    'health-refund': {
        name: '건강보험료 환급금 계산기',
        url: 'https://healthfee.o2u.kr/',
        desc: '본인부담상한제 환급금 평균 135만원 예상 계산',
        categories: ['정부지원', '건강', '금융', '생활정보'],
        keywords: ['본인부담상한제', '건강보험료환급금', '건보료환급', '건강보험환급', '본인부담상한액', '요양병원본인부담상한제', '건보료환급신청', '국민건강보험환급', '병원비환급', '본인부담상한제소급']
    },
    'health-checkup': {
        name: '2026 건강검진 대상자 조회',
        url: 'https://checkup.o2u.kr/',
        desc: '일반건강검진·6대 암검진 무료 대상 30초 조회',
        categories: ['정부지원', '건강', '생활정보'],
        keywords: ['건강검진대상자조회', '2026건강검진', '국가건강검진', '일반건강검진', '암검진대상', '짝수년생검진', '홀수년생검진', '위암검진', '대장암검진', '자궁경부암검진', '공단검진', '사무직건강검진', '비사무직건강검진']
    },
    'pharmacy-open': {
        name: '지금열린약국',
        url: 'https://pharmacy.ryunadb.kr/',
        desc: '전국 약국 찾기 · 야간·공휴일 안내',
        categories: ['건강', '생활정보', '약국'],
        keywords: ['약국찾기', '근처약국', '야간약국', '공휴일약국', '전국약국', '약국검색', '약국전화번호', '지금열린약국', '주변약국', '약국위치']
    },
    'today-tarot-draw': {
        name: '오늘타로뽑기',
        url: 'https://tarot.itembook.co.kr/',
        desc: '연애·직장·금전 3장 타로카드 무료 운세',
        categories: ['운세', '라이프', '오락'],
        keywords: ['타로카드', '오늘타로', '타로뽑기', '타로운세', '무료타로', '연애타로', '직장타로', '금전타로', '타로점', '오늘운세']
    },
    'dream-dictionary': {
        name: '꿈해몽 사전',
        url: 'https://dream.o2u.kr/',
        desc: '뱀꿈·돼지꿈·이빨꿈 해몽 300가지+',
        categories: ['운세', '라이프', '생활정보'],
        keywords: ['꿈해몽', '꿈풀이', '뱀꿈', '돼지꿈', '이빨꿈', '돈꿈', '똥꿈', '태몽', '길몽', '흉몽', '꿈의미', '꿈사전']
    },
    'daily-horoscope': {
        name: '별자리 운세',
        url: 'https://horoscope.o2u.kr/',
        desc: '생년월일로 내 별자리 찾아 오늘의 운세 확인',
        categories: ['운세', '라이프', '오락'],
        keywords: ['별자리운세', '오늘별자리', '12별자리', '양자리운세', '황소자리운세', '쌍둥이자리운세', '무료운세']
    },
    'bmi-calculator': {
        name: 'BMI 계산기',
        url: 'https://bmi.ledgolf.kr/',
        desc: '대한비만학회 기준 체질량지수 측정',
        categories: ['건강', '계산기', '생활정보'],
        keywords: ['BMI', 'BMI계산기', '체질량지수', '비만도', '비만측정', '체중관리', '다이어트', '건강관리', 'KSSO', '비만도계산']
    },
    'apt-trade-price': {
        name: '아파트 실거래가 조회',
        url: 'https://aptprice.8949ok.kr/',
        desc: '전국 아파트 매매 실거래가 조회',
        categories: ['부동산', '금융', '생활정보'],
        keywords: ['아파트실거래가', '실거래가', '아파트시세', '아파트매매', '부동산시세', '아파트가격', '집값', '매매가', '국토교통부']
    },
    'ovulation-calculator': {
        name: '배란일 계산기',
        url: 'https://baeran.seosann.kr/',
        desc: '생리주기 기반 배란일·가임기 예측',
        categories: ['건강', '계산기', '여성건강'],
        keywords: ['배란일', '배란일계산기', '생리주기', '가임기', '배란', '생리달력', '안전기', '생리기간', '배란기', '임신계획']
    },
    'bmr-calculator': {
        name: '기초대사량 계산기',
        url: 'https://bmr.ttjc.co.kr/',
        desc: 'BMR·TDEE 칼로리 계산',
        categories: ['건강', '계산기', '피트니스'],
        keywords: ['기초대사량', 'BMR', 'TDEE', '칼로리계산', '다이어트칼로리', '하루소모칼로리', '칼로리계산기', '대사량', '체중관리']
    },
    'cosmetic-ingredient': {
        name: '화장품 성분 검색',
        url: 'https://cosmetic.ttjc.co.kr/',
        desc: '식약처 공인 2만 성분 DB 검색',
        categories: ['뷰티', '생활정보', '검색'],
        keywords: ['화장품', '화장품성분', '성분검색', '성분분석', '전성분', '성분사전', '원료성분', '피부성분', '식약처', '화장품원료']
    },
    'zodiac-fortune': {
        name: '12띠별 운세',
        url: 'https://zodiak-f.8949ok.kr/',
        desc: '12간지 일진 기반 오늘의 운세',
        categories: ['운세', '라이프', '생활정보'],
        keywords: ['12띠별운세', '띠운세', '오늘운세', '12간지', '일일운세', '쥐띠', '호랑이띠', '일진', '삼합', '토정비결']
    },
    'billiard': {
        name: '당구 용어사전',
        url: 'https://bill.itembook.co.kr/',
        desc: '3쿠션·4구·포켓 용어 55+ 핸디캡 계산',
        categories: ['스포츠', '취미', '생활정보'],
        keywords: ['당구', '당구용어', '당구용어사전', '3쿠션', '4구', '포켓당구', '당구핸디', '당구핸디캡', '당구에버리지', '파이브앤하프시스템', '당구뒤돌리기', '당구빈쿠션', '당구초보', '당구퀴즈']
    },
    'parking-alert': {
        name: '주정차단속 알림 서비스',
        url: 'https://parking.wedclub.kr/',
        desc: '전국 229개 시군구 무료 SMS 신청 + 과태료 조회·20% 할인',
        categories: ['운전', '생활정보', '공공'],
        keywords: ['주정차단속알림', '주정차단속문자', '주정차알리미', '불법주차단속', '과태료조회', '과태료할인', '과태료20%할인', '어린이보호구역과태료', '소화전앞주정차', '유류세환급', '경차유류구매카드', '공영주차장', '견인차량조회', '주정차단속CCTV', '무료SMS신청']
    },
    'beach-weather': {
        name: '해수욕장 날씨',
        url: 'https://beach.ledgolf.kr/',
        desc: '전국 420개 해변 수온·파고·조석·일출일몰',
        categories: ['날씨', '여행', '생활정보'],
        keywords: ['해수욕장', '해수욕장날씨', '해수욕장수온', '해변날씨', '파고', '조석', '만조간조', '일출일몰', '동해해수욕장', '서해해수욕장', '제주해변', '해운대날씨', '경포대날씨']
    },
    'imhero': {
        name: '임영웅 소식 알리미',
        url: 'https://imhero.o2u.kr/',
        desc: '콘서트·신곡·방송 일정 매일 자동 갱신',
        categories: ['연예', '팬덤', '엔터테인먼트'],
        keywords: ['임영웅', '영웅시대', 'IM HERO', '임영웅콘서트', '임영웅신곡', '임영웅일정', '임영웅팬미팅', '임영웅방송', '임영웅유튜브', '임영웅차트', '임영웅생일', '트로트']
    },
    'trot-concert': {
        name: '트로트 콘서트 알리미',
        url: 'https://trot.ryunadb.kr/',
        desc: '즐겨찾는 가수 D-Day 자동 알림 · KOPIS 공식 데이터',
        categories: ['연예', '콘서트', '엔터테인먼트'],
        keywords: ['트로트콘서트', '트로트일정', '임영웅콘서트', '송가인콘서트', '영탁콘서트', '진성콘서트', '이찬원콘서트', '주현미콘서트', '트로트D-Day', '트로트티켓', 'KOPIS트로트', '트로트알리미']
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

    // 추천도구 개수 = 15 - 관련도구 개수 (최소 0개)
    const recommendedCount = Math.max(0, 15 - relatedToolsCount);

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
