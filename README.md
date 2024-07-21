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
