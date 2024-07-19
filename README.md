# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## step1

1. 폼 로직 구현(상품 상세 페이지, 결제 페이지)

- [o] Chakra UI를 이용해 사용자 상세 페이지와 결제 페이지 UI 구현

2. 상세 페이지

- [o] oas.yaml 파일에 기술된 엔드포인트를 사용해 상품 정보와 옵션 데이터 불러움

3. 리다이렉트

- [o] 존재하지 않는 상품을 조회할 경우 메인페이지로 리다이렉트
- [o] 비로그인 시 로그인 페이지로 리다이렉트

## step2

1. 상품 상세 페이지

- [o] gitOrderLimit을 초과한경우 상품 선택 불가능하게 구현

2. 결제 페이지

- [o] 카드 메시지 - 입력 필수, 100자 이내
- [o] 현금 영수증 - 번호 입력 확인, 숫자만 입력하도록 안내

## step3

- [] 기존에 만든 form/input을 react-hook-form으로 변경
- [] validate를 react-hook-form 기능 활용
