# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

### 🚀 1단계

- [x]  상세 페이지 및 상품 결제 페이지 UI를 구현 (Chakra-UI 사용)
- [x]  **`/api/v1/products/{productId}/detail`**, **`/api/v1/products/{productId}/options`**를 참고하여 API 구현
- [x]  없는 상품의 경우 메인 페이지로 연결
- [x]  나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동
- [x]  React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현

### 🚀 2단계

- [x] 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택 block
- [x] 결제 페이지의 Form validation 검증
    - [x] 카드 메시지를 입력 필수
    - [x] 카드 메시지가 100자 이내로 입력
    - [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호 입력 필수
    - [x] 현금 영수증 숫자만 입력 가능

### 🚀 3단계

- [x] 기존에 만든 form / input을 react-hook-form으로 변경
- [x] validate react-hook-form 기능 활용(이 과정에서 zod를 사용 가능)