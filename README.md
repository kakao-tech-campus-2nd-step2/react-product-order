# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## project structure

- `src/`: 소스 코드가 위치하는 디렉토리입니다. 주요 하위 디렉토리 및 파일은 다음과 같습니다.
  - `components/`: 재사용 가능한 컴포넌트들이 위치하는 디렉토리입니다.
    - `common/`: 공통 컴포넌트들이 위치하는 디렉토리입니다.
    - `features/`: 푸터 및 헤더 컴포넌트 등이 위치하는 디렉토리입니다.
  - `context/`: 상태 관리 로직이 위치하는 디렉토리입니다.
  - `pages/`: 각 페이지 컴포넌트들이 위치하는 디렉토리입니다. 로그인, 메인 페이지 등이 포함됩니다.
  - `styles/`: 전역 스타일 및 CSS 변수가 정의된 파일들이 위치하는 디렉토리입니다.
  - `App.tsx`, `index.tsx`: 애플리케이션의 진입점 및 루트 컴포넌트 파일입니다.

## 요구사항

### 1단계

- [x] Chakra UI 라이브러리 추가 + 테스트용 numberInput 컴포넌트 구현
- 상품 상세 페이지 UI
  - [x] 상품 상세 정보 섹션
  - [ ] 상품 옵션 섹션
  - [x] 개수 input + 가격 뷰
  - [x] 라우팅 버튼
- 상품 결제하기 페이지 UI
  - [x] 메세지 입력 섹션
  - [x] 선물 내역 섹션
  - 결제 정보 섹션
    - [x] 현금영수증
    - [x] 최종 결재
    - [x] 결재버튼
- [x] 상품 상세 데이터 fetch `/api/v1/products/{productId}/detail`, `/api/v1/products/{productId}/options`
- [x] 상품 결제 기능 구현 `/api/v1/order` (React의 form, ref, state만 사용)
- 추가 구현해야할 기능
  - [x] localStorge 재사용성 높이기 (객체화)
  - [x] 로그인 후 이전페이지로 라우팅
  - [x] 상품이 없는 경우 메인으로 연결
  - [x] 주문페이지에서 로그인이 되어있지 않은 경우 로그인 요청

### 2단계

- [x]  giftOrderLimit를 초과할 수 없게 하기 (option API)
- 결제 페이지 Form validation
  - [ ]  카드 메시지 입력 필수(100글자 이내로)
  - [ ]  현금 영수증 checkbox가 true이면 번호 입력 강제(숫자만 입력 가능)

## 🎸

### 과제 수행 일지

- [0단계](https://www.notion.so/Day-17-36603129a52f4fa59bb99e0009819343?pvs=4#4db2c1d20c5d4b0a8f4722bdd044eb95)
- [1단계: 초기 세팅 및 상품상세페이지 UI 구현](https://www.notion.so/Day-17-36603129a52f4fa59bb99e0009819343?pvs=4#4726de35512d466a96f6df72649bb9a2)
- [1단계: 주문페이지 UI 구현 및 api 요청](https://www.notion.so/Day-18-a9bd5597c5ca48dab55074606256190a?pvs=4#479b338777ca406594622b3abbc87b4f)
