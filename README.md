# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## 1단계

- React의 form, ref, state만 사용하여 구현
- (아직 React Hook Form 등의 라이브러리 사용 ❌)
- UI 구현은 Chakura.ui 이용

### ProductDetail 페이지 구현

- [x] 페이지 라우팅
- [x] 페이지 UI 구현
- [x] `/api/v1/products/{productId}/detail` API 구현
- [x] `/api/v1/products/{productId}/options` API 구현
- [x] 없는 상품의 경우, 메인 페이지로 연결
- [x] ‘나에게 선물하기’ 버튼 클릭 시, 로그인 안 했다면 로그인 페이지로 이동

### Order 페이지 구현

- [x] 페이지 라우팅
- [x] 페이지 UI 구현

## 2단계

### ProductDetail 페이지

- [x] 상품의 개수가 giftOrderLimit을 초과한 경우, 선택 불가

### Order 페이지

- [x] 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내
- [x] 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내
- [x] 현금 영수증 checkbox 클릭 시, 현금 영수증 번호가 입력되었는지 확인
- [x] 현금 영수증 입력은 숫자만 입력하도록 안내

## 3단계

- [x] 기존 작성한 form 관리를 react-hook-form을 이용해 변경
