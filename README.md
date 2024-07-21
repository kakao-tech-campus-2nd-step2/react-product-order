# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

#Step 1

### Requirements

- 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI 구현
  - chakra-ui를 사용하여 UI 구현(UI구현에 어려움을 겪으면 임의로 변경해도 됨)
- 상세 페이지에서 첨부된 `oas.yaml`파일의 `/api/v1/products/{productId}/detail`,`/api/v1/products/{productId}/options`를 참고하여 API를 구현
- 없는 상품의 경우 메인 페이지로 연결되도록 함
- 나에게 선물하기 버튼 클릭시 로그인이 되어있지 않다면 로그인 페이지로 이동
- React Hook Form등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현

#Step 2

### Requirements

- 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택이 불가하게 함
- 결제 페이지의 Form을 validation함
  - 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내
  - 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내
  - 현금 영수증 checkboc 클릭 시 현금영수증 번호가 입력되었는지 확인
  - 현금 영수증 입력은 숫자만 입력하도록 안내

#Step 4

### Requirements

- 질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

  > **제어 컴포넌트** : 입력 값이 React의 상태(state)로 관리되는 방식
  > -> 입력필드의 값이 변경될 때마다 상태를 업데이트하고, 상태가 변경될 때마다 입력 필등의 값 갱신

  <제어 컴포넌트로 Form을 만들어야 하는 경우>

  - 유효성 검사할 때
  - 유효한 데이터가 없는 경우 전송 버튼의 상태 disabled 표시하기

  > **비제어 컴포넌트** : 전통적인 HTML처럼 DOM에 제어되는 Input Element 방식
  > 입력 필드의 값은 React state가 아닌 DOM 노드에 저장되고 필요할 때 ref를 통해 값을 가져옴

- 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

  - text : text를 입력할 수 있음
  - password : 타입을 패스워드로 하여, 사용자가 어떤 값을 입력했는지 공개되지 않음
  - email : email을 입력할 수 있음
  - submit : 제출 버튼 생성
  - checkbox : 사용자가 여러개를 선택할 수 있게 함
  - radio : 사용자가 한가지를 선택하게 함

- 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.
  - label tag는 폼 요소에 이름을 붙이기 위한 것 만약 label태그를 input field를 감싸면 label태그를 클릭해도 input field에 입력이 가능하다
