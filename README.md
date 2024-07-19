# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## 단계별 요구사항

<details>
<summary style="font-size:150%"><b>📝 0단계 요구사항</b></summary>
<div markdown="1">

- [x] 미션은 상품 주문하기 저장소를 포크하고 클론하는 것으로 시작한다.
- [x] 온라인 코드 리뷰 요청 1단계 문서를 참고하여 실습 환경을 구축한다.

1. 미션 시작 버튼을 클릭하여 미션을 시작한다.
2. 저장소에 GitHub 사용자 이름으로 브랜치가 생성되었는지 확인한다.
3. 저장소를 내 계정으로 포크한다.

- [x] 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
- [x] Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로
      추가한다.
  - [x] AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를
        작성한다.

</div>
</details>

<br />

<details>
<summary style="font-size:150%"><b>📝 1단계 요구사항</b></summary>
<div markdown="1">

- [x] 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현한다.
- [x] 이 과정에서 UI를 chakra-ui 사용해서 구현한다. (단, 직접 구현해도 무방하나
      다른 UI 라이브러리 사용은 금지)
- [x] 이번 과제는 Form을 다루는 것이 중점이기 때문에 UI 구현에 어려움을 겪는다면
      임의로 변경해도 됨
- [x] 상세 페이지에서 첨부된 oas.yaml 파일의
      `/api/v1/products/{productId}/detail`,
      `/api/v1/products/{productId}/options`를 참고하여 API를 구현한다.
- [x] 없는 상품의 경우 메인 페이지로 연결되도록 한다.
- [x] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로
      이동한다.
- [x] React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref,
      state만 사용하여 구현한다.

</div>
</details>

<br />

<details>
<summary style="font-size:150%"><b>📝 2단계 요구사항</b></summary>
<div markdown="1">

- [x] 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한
      경우 선택이 불가하게 해요.

### 결제 페이지의 Form을 validation 해요. (4주차 미션 결과물 참고)

- [x] 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내해요. 카드 메시지가
      100글자가 넘어가면 100자 이내로 입력하라고 안내해요.
- [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인해요.
- [x] 현금 영수증 입력은 숫자만 입력하도록 안내해요.

</div>
</details>

<br />

<details>
<summary style="font-size:150%"><b>📝 3단계 요구사항</b></summary>
<div markdown="1">

- [x] 기존에 만든 form / input을 react-hook-form으로 변경해요.
- [x] validate 또한 react-hook-form 기능을 적극적으로 활용해요. (이 과정에서
      zod를 사용해도 좋아요.)

</div>
</details>

<br />

<details>
<summary style="font-size:150%"><b>📝 4단계 요구사항</b></summary>
<div markdown="1">

## 4주차 질문

### 질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.
1. 제어 컴포넌트 : React 에 의해 값이 제어되는 입력 폼 엘리먼트
- 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트
- React 에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며 setState()에 의해 업데이트 된다. 
=> 제어 컴포넌트는 사용자가 입력한 값과 저장되는 값이 실시간으로 동기화된다.

2. 비제어 컴포넌트 : React에서 값을 보장하지 않는 방식
- setState()를 쓰지 않고 ref를 사용해서 값을 관리
- State로 값을 관리하지 않기 때문에 입력할 때마다 리렌더링, API가 호출되지 않아서 성능상 이점이 있음.
- 특정한 작업을 해야한다면, ref를 통해서 접근해 value를 얻을 수 있음
=> 실시간으로 변경된 값이 필요하지 않고, 제출시에만 필요할 때 비제어 컴포넌트를 사용한다.

### 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.
모든 input type을 설명하기에는 너무나도 많다고 생각하여, 이번 과제를 하면서 주로 사용했던 속성값들을 생각해보며 정리해보겠습니다.
1. text : 일반적인 텍스트 입력
- 단순한 문자열 입력 가능

2. number : 숫자 입력
- 숫자만 입력이 가능함

3. checkbox : 체크박스 입력
- check와 uncheck 상태를 설정할 수 있음.
- check 상태일때는 true, uncheck 상태일때는 false를 반환

4. button : 버튼 기능
- submit 라는 옵션을 활용하여 button 태그와 비슷하게 이용할 수 있다.

### 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.
- label tag의 for 속성을 활용하여 input tage의 id와 연결할 수 있다. 이때 label을 click하면 input창으로 입력할 수 있도록 focus 된다.
- label tag로 감싸게 되면은 for 속성과 비슷하게 동작하게 된다.

</div>
</details>
