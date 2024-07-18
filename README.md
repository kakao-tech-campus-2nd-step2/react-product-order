# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

### 1단계 기능 구현 목록
- [x] 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현
  - [x] chakra-ui를 사용해서 구현
- [ ] 상세 페이지에서 첨부된 oas.yaml 파일의 /api/v1/products/{productId}/detail, /api/v1/products/{productId}/options를 참고하여 API를 구현
- [x] 없는 상품의 경우 메인 페이지로 연결
- [x] 나에게 선물하기 버튼 클릭 시, 로그인 되어 있지 않다면 로그인 페이지로 이동
- [x] React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용해서 구현