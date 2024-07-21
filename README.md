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

- 질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

**제어 컴포넌트**  
React에 의해서 값이 제어되는 컴포넌트  
요소에 입력되는 값을 state로 DOM element의 값을 다루는 컴포넌트  
사용자가 값을 입력할 때마다 handleChange 를 통해 state 값을 업데이트 해준다.

**비제어 컴포넌트**  
React에 의해서 값이 제어되지 않는 컴포넌트  
요소에 입력되는 값을 DOM API를 통해서 관리하는 컴포넌트  
input 의 값은 사용자만이 상호작용할 수 있고, 우리는 필요한 시점에 이벤트 핸들러를 통해 ref 에 저장된 엘리먼트의 값을 가져와 활용한다.  
값을 업데이트할 때마다 리렌더링이 발생하지 않아 성능상의 이점이 존재한다.

실시간으로 값을 입력할 때 마다 validation을 체크하는 경우 등은 제어 컴포넌트를 사용해서 form을 작성해야한다.

- 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

text: 텍스트 입력 받기  
password: 비밀번호 입력 받기(\*\*\* text 안보임)  
radio: 단일 선택 체크박스  
checkbox: 다중 선택 체크박스  
submit: 폼 양식 서버에 전송  
button: 버튼  
reset: 폼 초기화  
file: 파일 업로드  
date: 날짜 정보 입력  
number: 숫자 정보 입력  
email: 이메일 형식 입력  
color: 색상 입력  
range: 범위 입력  
search: 검색 인풋 요소  
select-box: option태그를 select로 감싼 형태, select 박스

- 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.

input 요소에 이름을 붙일 수 있다.
label for속성으로 input요소의 id 속성과 일치시켜 연결시킬 수 있다.
input 태그는 셀프 클로징 태그 이다. (<input~~ />)
내부에 다른 태그를 넣거나 텍스트를 삽입할 공간이 존재하지 않다.
그래서 label로 input 태그에 대한 정보를 표시한다.
연결된 label을 누르면 input태그를 누른 것과 같은 동작이 일어나기에 사용자 경험이 더 좋다.
