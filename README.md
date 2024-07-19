# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

<h1>1단계 - 상품 상세 페이지 & 상품 결제하기 Form 구현하기 </h1>
<p>결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현 (이 과정에서 UI를 chakra-ui 사용)</p>
<p>상세 페이지에서 첨부된 oas.yaml 파일의 /api/v1/products/{productId}/detail, /api/v1/products/{productId}/options를 참고하여 API를 구현</p>
<p>없는 상품의 경우 메인 페이지로 연결되도록</p>
<p>나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동</p>
<p>React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현</p><br><br>

<h1>2단계 - validation 구현하기 </h1>
<p>카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내.</p>
<p>카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내</p>
<p>현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인</p>
<p>현금 영수증 입력은 숫자만 입력하도록 안내</p><br><br>

<h1>3단계 -  React Hook Form를 사용하여 기존의 form을 리팩터링 </h1>
<p>기존에 만든 form / input을 react-hook-form으로 변경</p>
<p>validate 또한 react-hook-form 기능을 적극적으로 활용해요</p><br><br>

<h1>4단계 - 질문의 답변을 README에 작성</h1>
<p>- 질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.</p>
<p>A: </p><br>
<p>- 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.</p>
<p>A: </p><br>
<p>- 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.</p>
<p>A: </p><br>
