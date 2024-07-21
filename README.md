# react-product-order

FE 카카오 선물하기 4주차 과제: Form

## step1

- [x] 상품 상세 페이지 및 상품 결제 페이지 UI ( Chakra UI 사용 )
- [x] oas.yaml 파일의 api 구현
  - [x] /api/v1/products/{productId}/detail
- [x] 없는 상품의 경우 메인페이지로 이동
- [x] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동
- [x] React의 form, ref, state만 사용하여 구현

## step2

- [x] 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택이 불가하게 설정
- [x] 결제 페이지의 Form validation
  - [x] 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내
  - [x] 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내
  - [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인
  - [x] 현금 영수증 입력은 숫자만 입력하도록 안내

## step3

- [x] 기존에 만든 form / input을 react-hook-form으로 변경
- [x] validate 또한 react-hook-form 활용

## step4

### 질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

_Controlled Components_

제어 컴포넌트는 폼 요소의 값이 상태(state)로 관리되는 컴포넌트이다. 입력 값이 변경될 때마다 이벤트 핸들러가 호출되어 상태를 업데이트하며, 폼 요소의 값은 항상 컴포넌트의 상태와 동기화된다.

_Uncontrolled Components_

비제어 컴포넌트는 DOM 자체가 폼 요소의 값을 관리하는 컴포넌트이다. 입력 값은 컴포넌트의 상태가 아니라 DOM에서 직접 참조하며, 폼 데이터에 접근하기 위해 ref를 사용한다.

_제어 컴포넌트로 Form을 만들어야 하는 경우_

복잡한 상태 로직을 처리해야 하는 경우
실시간 유효성 검사 및 사용자 피드백을 제공해야 하는 경우
폼 데이터를 다른 상태나 컴포넌트와 동기화해야 하는 경우

### 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

- text: 기본적인 단일 줄 텍스트 입력 필드
- password: 입력한 텍스트가 마스킹된 단일 줄 텍스트 입력 필드
- email: 이메일 주소 형식을 검증하는 단일 줄 텍스트 입력 필드
- number: 숫자만 입력할 수 있는 필드
- tel: 전화번호 입력 필드
- url: URL 형식을 검증하는 단일 줄 텍스트 입력 필드
- search: 검색어 입력을 위한 필드
- date: 날짜 입력 필드
- time: 시간 입력 필드
- datetime-local: 날짜와 시간을 입력할 수 있는 필드
- checkbox: 다중 선택이 가능한 체크박스
- radio: 단일 선택이 가능한 라디오 버튼
- file: 파일 업로드를 위한 입력 필드
- range: 범위 값을 선택할 수 있는 슬라이더
- color: 색상 선택 필드
- hidden: 사용자에게 보이지 않는 숨겨진 입력 필드

### 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.

label 태그는 폼 요소의 설명을 정의하며, 사용자가 입력해야 하는 내용이나 선택해야 하는 항목을 알려준다. for 속성을 사용하여 특정 폼 요소의 id를 참조하거나, 폼 요소를 직접 감쌀 수 있다. label을 클릭할 때 해당 폼 요소가 자동으로 활성화되어 사용자가 폼을 더 쉽게 사용할 수 있도록 도와준다.
