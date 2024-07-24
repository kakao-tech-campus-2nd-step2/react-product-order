# FE 카카오 선물하기 4주차 과제: Form 데이터 다루기 (상품 상세, 주문)

## 🚀 1단계 - 상품 상세 페이지 & 상품 결제하기 Form 구현하기

- [x] 상품 상세 페이지 UI 구현
  - [x] 상품 상세 페이지
  - [x] 상품 결제 페이지
- [x] API 구현
  - [x] **`/api/v1/products/{productId}/detail`**
  - [ ] **`/api/v1/products/{productId}/options`**
        productId와 실제 응답으로 오는 id가 다른 문제가 있음
- [x] 없는 상품의 경우 메인 페이지로 연결
- [x] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동
- [x] React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용

## 🚀 2단계 - validation 구현하기

- [ ] 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택이 불가하게 해요.
- 결제 페이지의 Form을 validation 해요.
  - [x] 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내해요.
  - [x] 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내해요.
  - [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인해요.
  - [x] 현금 영수증 입력은 숫자만 입력하도록 안내해요.

## 🚀 3단계 - React Hook Form를 사용하여 기존의 form을 리팩터링 해요.

- [x] 기존에 만든 form / input을 react-hook-form으로 변경
- [x] react-hook-form 기능 사용하여 유효성 검사

## 🚀 4단계 - 질문의 답변을 README에 작성

### 질문 1.

제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

> #### 제어 컴포넌트와 비제어 컴포넌트 비교
>
> 리액트의 상태 관리 시스템 내에서 제어가 가능한지에 따라 차이가 있습니다.
>
> **제어 컴포넌트**는 입력 값이 *리액트의 state로 관리*되는 방식입니다. 값이 갱신될 때마다 상태가 업데이트되고, 추적, 검증, 변환이 용이합니다. 반면 매번 리액트, 리얼 DOM, 사용자의 화면을 동기화해야 하며 리렌더링이 일어나 성능이 저하될 수 있고, 매 상태마다 이벤트 핸들러가 필요해 코드가 길어집니다.
>
> **비제어 컴포넌트**는 입력 값이 state가 아니라 *DOM 자체에서 관리*되는 방식이고, 사용자만 입력 값과 상호작용할 수 있으며 필요할 시 리액트 ref로 가져올 수 있습니다. 장점은 코드가 간결하고 초기 렌더링 속도가 향상된다는 점이고, 단점은 값의 추적이 어렵고 여러 입력 필드의 상태를 관리하기 까다롭다는 점입니다.

> #### 제어 컴포넌트로 Form을 만들어야 하는 경우
>
> 제어 컴포넌트는 실시간으로 입력 값을 제어하기 용이하기 때문에 실시간 검증이 필요하거나, 입력 값에 따라 다른 동작을 해야할 때, 입력 값을 중앙에서 관리하고 조작해야할 때 사용합니다.  
> 예시) 즉각적인 유효성 검사, 제출 버튼 조건부 활성화, 실시간으로 입력 형식 적용하기 (숫자만 가능하게 등), 하나의 데이터에 여러 인풋, 동적 인풋  
> 업데이트할 필요 없는 상태도 계속 업데이트 된다면... 쓰로틀링 혹은 디바운싱을 이용하여 리소스 낭비를 줄일 수 있습니다.

### 질문 2.

input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

> `<input type="text">`: 텍스트 인풋  
> <input type="text">
>
> `<input type="password">`: \*\*\*\*으로 가려져서 나옴 (보기/가리기 선택하게 하고 싶다면 버튼 누를 때마다 타입을 바꾸도록 하면 됨)  
> <input type="password">
>
> `<input type="number">`: 숫자 인풋
>
> `<input type="date">`: 날짜 형식 인풋  
> <input type="date">
>
> `<input type="email">`: 이메일 형식 인풋
>
> `<input type="range" min="0" max="50">`: 범위 인풋  
> <input type="range" min="0" max="50">
>
> `<input type="radio">`: 단일 선택 가능  
> <input type="radio">
>
> `<input type="checkbox">`: 다중 선택 가능  
> <input type="checkbox">
>
> `<select>``<option>`: 드롭다운  
> <select>
>
>  <option value="PERSONAL">개인소득공제</option>
>  <option value="BUSINESS">사업자증빙용</option>
> </select>
>
> `<input type="file">`: 파일 인풋 (프로그래밍적으로 값을 설정 할 수 없고 사용자만이 값을 설정할 수 있으므로 항상 비제어 컴포넌트)  
> <input type="file">
>
> `<input type="button">`: 버튼
>
> `<input type="submit">`: 폼을 서버에 전송
>
> `<input type="reset">`: 폼 초기화

### 질문 3.

label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.

> label은 input 요소에 이름 붙이는 역할을 합니다.
>
> 브라우저가 input 요소를 인식하는 식별자가 되어줍니다.
