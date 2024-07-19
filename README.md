# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

#### 4주차 1단계

상품 상세 페이지 & 상품 결제하기 Form 구현하기

1. 상품 상세 페이지 구현  
   `/api/v1/products/{productId}/detail` API 연결
2. 상품 결제 페이지 구현  
   `/api/v1/products/{productId}/options` API 연결
3. 없는 상품일 경우 메인 페이지로 연결
4. 나에게 선물하기 버튼 클릭시 로그인 여부 확인 및 미로그인시 로그인 페이지로 이동

#### 4주차 2단계

validation 구현하기

1. 상품 상세 페이지에서 상품 개수가 giftOrderLimit을 초과한 경우 더 선택 못하게 구현
2. 결제 페이지 내 카드 메시지 입력 안했을 경우 메시지 입력을 안내
3. 카드 메시지가 100글자 넘어가면 100글자 이내로 입력하라고 안내
4. 현금 영수증 체크된 경우 현금영수증 번호가 입력되었는지 확인
5. 번호 입력은 숫자만 입력되도록 안내

#### 4주차 3단계

react hook form 사용하기

1. react hook form 설치
2. 기존 일반 form으로 작성된 부분 react hook form으로 변경  
   각각 input validation 설정  
   errror 처리  
   submit 처리

#### 4주차 4단계
