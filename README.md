## WEEK4

### ✨How to start

```
npm install
cd react-product-order
npm run start
```

### STEP1

#### 📜Requirements

- React의 form, ref, state만 사용하여 구현한다.
- UI 구현
  - [x] 상품 상세 페이지 UI
  - [x] 결제 페이지 UI
- API 구현
  - [x] `/api/v1/products/{productId}/detail`
  - [x] `/api/v1/products/{productId}/options`
  - [x] 없는 상품의 경우 메인 페이지로 연결
- [x] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동하도록 함.

### STEP2

#### 📜Requirements

- 상품 상세 페이지
  - [x] 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택이 불가하도록 함.
- 결제 페이지 Form validation
  - [x] 카드 메시지를 입력하지 않으면 메시지를 입력하도록 안내
  - [x] 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하도록 안내
  - [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인
  - [x] 현금 영수증 입력은 숫자만 입력하도록 안내

### STEP3

#### 📜Requirements

- react-hook-form 사용하여 리팩터링
  - [x] form / input
  - [x] validate
