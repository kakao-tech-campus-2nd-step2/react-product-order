# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## 1단계 기능 구현할 내용

- 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현한다.
  - 이 과정에서 UI를 chakra-ui 사용해서 구현한다. (단, 직접 구현해도 무방하나 다른 UI 라이브러리 사용은 금지)
  - 이번 과제는 Form을 다루는 것이 중점이기 때문에 UI 구현에 어려움을 겪는다면 임의로 변경해도 됨
- 세 페이지에서 첨부된 oas.yaml 파일의 /api/v1/products/{productId}/detail, /api/v1/products/{productId}/options를 참고하여 API를 구현한다.
  없는 상품의 경우 메인 페이지로 연결되도록 한다.
- 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동한다.
- React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현한다.

## 2단계 기능 구현할 내용

- 결제 페이지의 Form을 validation 해요. (4주차 미션 결과물 참고)
  - 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내해요.
  - 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내해요.
  - 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인해요.
  - 현금 영수증 입력은 숫자만 입력하도록 안내해요.
