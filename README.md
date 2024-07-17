# react-product-order
FE 카카오 선물하기 4주차 과제: 상품 주문하기
### 🌱 1단계 - 상품 상세 페이지 & 상품 결제하기 Form 구현
- [X] 상세 페이지의 UI 구현
- [ ] 상품 결제 페이지의 UI 구현
	- `chakra-ui` 사용해서 구현(직접 구현해도 무방하나 다른 UI 라이브러리 사용은 금지)
	- Form을 다루는 것이 중점이기 때문에 UI 구현에 어려움을 겪는다면 임의로 변경 가능
- [ ] 상세 페이지에서 첨부된 `oas.yaml` 파일의 `/api/v1/products/{productId}/detail`, `/api/v1/products/{productId}/options`를 참고하여 API 구현
- [X] 없는 상품의 경우 메인 페이지로 연결
- [ ] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동
- [ ] React Hook Form 등의 라이브러리를 사용하지 않으며 React의 `form`, `ref`, `state`만 사용하여 구현