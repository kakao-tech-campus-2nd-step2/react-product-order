# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## 4주차 과제 Step1
주의할 점
- React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현
- 이 과정에서 UI를 chakra-ui 사용해서 구현

1. 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현
2. 상세 페이지에서 첨부된 oas.yaml 파일의 /api/v1/products/{productId}/detail, /api/v1/products/{productId}/options를 참고하여 API를 구현
3. 없는 상품의 경우 메인 페이지로 연결
4. 상품 선택 페이지의 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않으면 로그인 페이지로 이동
- 테마 선택 -> 제품 선택(수량 조절 및 결제 금액) -> message와 결제 정보입력(현금 영수증 정보는 번호만 유효함) -> 주문이 완료되었습니다.