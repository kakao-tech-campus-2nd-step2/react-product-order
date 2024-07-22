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
  - [ ] 개수 input + 가격 뷰
  - [ ] 라우팅 버튼
  - [ ] 레이아웃 구성
- 상품 결제하기 페이지 UI
  - [ ] 메세지 입력 섹션
  - [ ] 선물 내역 섹션
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
  - [x]  카드 메시지 입력 필수(100글자 이내로)
  - [x]  현금 영수증 checkbox가 true이면 번호 입력 강제(숫자만 입력 가능)

### 3단계

- ReactHookForm 사용하기
- [x] 라이브러리 세팅
- [x] order 페이지에 적용

## 🎸

### 4단계

- **질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.**
  - controlled component
    - react가 컴포넌트의 상태를 완전히 관리하는 방식
    - React 컴포넌트가 입력 요소의 상태를 항상 추적하며, 복잡한 상호작용과 유효성 검사를 수행할 수 있다.
  - uncontrolled component
    - dom과 직접 상호작용해 상태를 관리하는 방식
    - react가 상태를 관리하지 않으니, 리렌더링이 덜 일어난다.
  
  - 지속적인 변화가 있을 때는 제어 컴포넌트! [예시(colab power level 설정 시)](https://x.com/i/status/1112708634905964545)
- **질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.**
  - `button`, `checkbox`, `radio`, `range`: 특수 입력
  - `date`, `datetime-local`, `month`, `time`, `week`: 시간 관련
  - `color`, `number`, `text`: 입력 형식으로 정의
  - `email`, `file`, `password`, `search`, `tel`, `url`: 입력되는 값으로 정의
  - `reset`, `submit`: form으로 묶인 데이터 컨트롤
  - `image`: image를 버튼으로 사용할 때 사용해야 하는 타입
- **질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.**
  - **`<label>`** 태그는 사용자 인터페이스 요소의 설명을 나타냅니다.
  - **`<label>`**을 **`<input>`** 요소와 연결하면 몇 가지 이점이 있습니다:
    - 화면 리더기는 **`<label>`**을 읽어서 보조 기술 사용자가 입력해야 하는 텍스트를 이해할 수 있게 합니다.
    - **`<label>`**을 클릭하면 연관된 **`<input>`** 요소에 초점을 맞추거나 활성화할 수 있습니다.
    - 터치스크린 사용자를 포함한 모든 사람에게 누를 수 있는 영역을 제공합니다.
  - **`<label>`**을 **`<input>`** 요소와 연결하려면 **`<input>`**에 **`id`** 속성을 추가하고, **`<label>`**에 **`for`** 속성(react의 경우 `htmlFor` 속성)을 사용하여 연결합니다.

### 과제 수행 일지

- [0단계](https://www.notion.so/Day-17-36603129a52f4fa59bb99e0009819343?pvs=4#4db2c1d20c5d4b0a8f4722bdd044eb95)

### 궁금한 점
