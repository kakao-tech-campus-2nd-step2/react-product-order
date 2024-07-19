# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## **경북대 FE\_정솔빈\_4주차 과제 Week 4**

### 1단계 - 상품 상세 페이지 & 상품 결제하기 Form 구현하기

**할 일 목록**

1. Theme 페이지의 상품 상세 페이지 구현

- [x] 상품 클릭 시 상품 상세 페이지 열기
- [x] 상품 사진, 상품명, 금액 표시
- [x] 수량 조절 기능 구현 ( + / - 버튼)
- [x] 총 결제 금액 표시
- [x] 나에게 선물하기 버튼 구현

2. 로그인 여부에 따른 결제하기 버튼 동작 구현

- [x] 로그인하지 않은 경우 로그인 페이지로 이동하는 팝업창 구현
- [x] 로그인한 경우 결제 페이지로 이동

3. 결제 페이지 구현

- [x] 선물 메세지 입력 칸 구현
- [x] 선택한 상품 내역 표시
- [x] 현금 영수증 신청 옵션 구현 (개인소득공제, 사업자증빙용)
- [x] 전화번호 입력 칸 구현
- [x] 최종 결제 금액 표시
- [x] 결제하기 버튼 구현

### 2단계 - validation 구현하기

**할 일 목록**

- [x] 카드 메시지를 입력하지 않으면 메시지를 입력 안내
- [x] 카드 메시지가 100글자가 넘어가면 100자 이내로 입력 안내
- [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인 (번호가 입력되지 않았다면 현금 영수증 선택을 해제하거나 현금영수증 번호를 입력하세요 출력)
- [x] 현금 영수증 입력은 숫자만 입력하도록 안내

### 3단계 - React Hook Form를 사용하여 기존의 form을 리팩터링

- [ ] 기존에 만든 form / input을 react-hook-form으로 변경

## 4단계 - 질문의 답변을 README에 작성

- **질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.**

  제어 컴포넌트는 항상 최신값을 유지하며 새로운 입력 값이 생길 때 상태를 새롭게 갱신하지만, 비제어 컴포넌트는 오직 사용자만 값과 상호작용하며 React는 해당 값 변경에 영향을 받지 않는다는 차이점이 있습니다.

  간단한 폼의 경우 비제어 컴포넌트를 사용하는게 좋지만 실시간 값이 필요하다면 제어 컴포넌트를 사용하는 것이 좋습니다. 아직은 내용이 간단하지만 실시간으로 재고를 반영하고 결제 창까지 구현한다면 이번 과제의 상품 결제 부분에서 제어 컴포넌트가 필요합니다. 실시간으로 결제 정보를 검증하고 데이터를 제출해야하기 때문입니다.

  또, 자기소개서 작성이나 이력서 제출 사이트에는 제어 컴포너트가 꼭 필요합니다. 변경된 값을 실시간으로 감지하고 폼의 데이터를 중앙에서 관리하고 상황에 따라 조작할 수 있기 때문입니다.

- **질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.**

  **text와 textarea**는 텍스트를 입력받습니다. 한 줄 입력은 text, 여러 줄 입력은 textarea를 이용합니다.

  **number**는 숫자만 입력할 수 있어 수량 입력에 사용할 수 있습니다. 최소값, 최대값, 단계 속성을 설정할 수 있다는 특징이 있습니다.

  **checkbox**는 이번 코드의 현금영수증 신청과 같이 사용할 수 있습니다. 여러 개의 항목을 다중 선택할 수 있다는 특징이 있으며, 라디오 버튼은 단일 선택만 가능합니다.

  **seclect**는 이번 코드의 현금영수증 종류를 선택하는 것처럼 여러 개의 드롭 다운 리스트 중에서 한개의 옵션을 선택할 수 있습니다.

  **button**은 이번 코드의 '나에게 선물하기'버튼과 '결제하기' 버튼 처럼 사용가능 하며 다양한 동작을 구현할 수 있습니다.

- **질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.**

---

### 질문

- 현재 코드에서 현금 영수증 체크박스가 보이지 않는데 글씨를 선택하면 체크 표시가 나타납니다. 테두리를 설정했는데 빈체크박스가 나오지 않는 이유를 모르겠습니다. 어떻게 수정하면 좋을까요?
