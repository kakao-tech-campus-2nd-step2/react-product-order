<h1> 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편 </h1>

<h3>1️⃣ Step 1 체크리스트</h3>

- [x] 상세 페이지 및 상품 결제 페이지 UI 구현

  - [x] UI 구현 시 `chakra-ui` 를 사용하여 구현하기

  - [x] Form 다루는 것이 메인, UI 구현은 임의로 변경 가능

- [x] 상세 페이지에 첨부된 `oas.yaml` 파일의 `/api/v1/products/{productID}/detail`, `/api/v1/products/{productID}/options` 를 참고하여 API 구현

- [x] 존재하지 않는 상품의 경우 메인 페이지로 연결되도록 구현

- [x] `나에게 선물하기` 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동하도록 구현

- [x] React Hook Form 등의 라이브러리를 사용하지 않고 React 의 form, ref, state 만을 사용하여 구현

<br>

<h3>2️⃣ Step 2 체크리스트</h3>

- [x] 상품 상세 페이지에서 상품의 개수를 Option API 의 giftOrderLimit 을 초과한 경우 선택이 불가능하도록 구현

- [x] 결제 페이지의 Form 을 Validation 하도록 구현

  - [x] 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내

  - [x] 카드 메시지가 100자를 넘어가면 100자 이내로 입력하라고 안내

  - [x] 현금 영수증 checkbox 클릭 시 현금 영수증 번호가 입력되었는지 확인

  - [x] 현금 영수증 입력은 숫자만 입력하도록 안내 


<br>

<h3>3️⃣ Step 3 체크리스트</h3>

- [x] 기존에 만든 Form / Input 을 react-hook-form 으로 변경

- [x] Validate 또한 react-hook-form 기능을 활용
