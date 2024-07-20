# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편


### Step 4

- 질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

제어 컴포넌트는 Form의 상태를 컴포넌트의 상태로 관리하며, 사용자 입력에 따라 상태를 업데이트하여 입력값이 컴포넌트의 상태에 의해 제어되는 방식입니다. 이를 통해 Form의 값은 항상 컴포넌트의 상태와 동기화되며, 상태 변화를 통해 값이 즉각적으로 반영됩니다. 예를 들어, 사용자가 텍스트 입력 필드에 문자를 입력하면 onChange 이벤트 핸들러를 통해 상태가 업데이트되고, 그 상태값이 입력 필드의 값으로 설정됩니다.

비제어 컴포넌트는 Form의 값을 DOM이 직접 관리하는 방식으로 Form의 참조를 통해 값을 읽거나 설정합니다. 이러한 방식에서는 상태를 통해 입력값을 관리하지 않으며, 주로 ref를 사용해 폼 요소에 접근합니다. 예를 들어, 폼 제출 시 ref를 통해 입력 필드의 값을 가져오거나 설정할 수 있습니다. 비제어 컴포넌트는 초기값을 설정하거나 단순한 폼을 다룰 때 유용할 수 있지만, 복잡한 폼의 경우 관리가 어려울 수 있다는 단점을 갖고 있습니다.

제어 컴포넌트로 Form을 만들어야 하는 경우에 대해 예시를 세우면 사용자의 입력을 실시간으로 검증해야 할 때입니다.
예를 들어, 비밀번호 입력란에서 입력된 비밀번호가 조건을 충족하는지 실시간으로 확인하고 피드백을 제공해야 하는 경우 제어 컴포넌트가 유용합니다. 상태를 통해 입력값을 검증하고, 조건에 따라 적절한 메시지를 사용자에게 보여줄 수 있기 때문입니다.

- 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

1. text
설명: 기본적인 단일 행 텍스트 입력 필드입니다.
특징: 사용자가 짧은 텍스트를 입력할 수 있습니다.

2. password
설명: 비밀번호 입력 필드입니다.
특징: 입력된 텍스트가 화면에 표시되지 않고, 대신 점이나 별표로 표시되며 보안이 필요한 정보 입력에 사용됩니다.

3. email
설명: 이메일 주소 입력 필드입니다.
특징: 이메일 주소 형식을 검증합니다. 사용자에게 이메일 입력에 대한 힌트를 제공합니다.

4. number
설명: 숫자 입력 필드입니다.
특징: 숫자만 입력할 수 있으며, 최대값과 최소값을 설정할 수 있습니다.

5. tel
설명: 전화번호 입력 필드입니다.
특징: 전화번호 입력에 적합한 키패드가 모바일 장치에서 표시됩니다.

6. url
설명: URL 입력 필드입니다.
특징: 올바른 URL 형식을 검증합니다. 사용자에게 URL 입력에 대한 힌트를 제공합니다.

7. search
설명: 검색어 입력 필드입니다.
특징: 검색어 입력에 최적화된 입력 필드로, 검색어를 지울 수 있는 "x" 버튼이 포함될 수 있습니다.

8. color
설명: 색상 선택 입력 필드입니다.
특징: 색상 선택기가 표시되어 사용자가 색상을 선택할 수 있습니다.

9. date
설명: 날짜 선택 입력 필드입니다.
특징: 날짜 선택기가 표시되어 사용자가 날짜를 선택할 수 있습니다. 'YYYY-MM-DD' 형식으로 값을 반환합니다.

10. datetime-local
설명: 로컬 날짜와 시간 입력 필드입니다.
특징: 날짜와 시간 선택기가 표시됩니다. 'YYYY-MM-DDTHH:MM' 형식으로 값을 반환합니다.

11. time
설명: 시간 입력 필드입니다.
특징: 시간 선택기가 표시됩니다. 'HH:MM' 형식으로 값을 반환합니다.

12. month
설명: 연도와 월 선택 입력 필드입니다.
특징: 연도와 월 선택기가 표시됩니다. 'YYYY-MM' 형식으로 값을 반환합니다.

13. week
설명: 연도와 주 선택 입력 필드입니다.
특징: 연도와 주 선택기가 표시됩니다. 'YYYY-Www' 형식으로 값을 반환합니다.

14. checkbox
설명: 체크박스 입력 필드입니다.
특징: 체크 상태와 해제 상태를 가질 수 있으며, 다중 선택이 가능합니다.

15. radio
설명: 라디오 버튼 입력 필드입니다.
특징: 동일한 이름을 가진 그룹 내에서 하나의 옵션만 선택할 수 있습니다.

16. file
설명: 파일 선택 입력 필드입니다.
특징: 사용자가 로컬 파일 시스템에서 파일을 선택할 수 있습니다. 선택된 파일의 경로를 반환합니다.

17. range
설명: 슬라이더 입력 필드입니다.
특징: 최소값과 최대값 사이의 숫자 값을 선택할 수 있는 슬라이더가 표시됩니다.

18. hidden
설명: 숨겨진 입력 필드입니다.
특징: 사용자에게는 표시되지 않지만, 폼 제출 시 값이 함께 전송됩니다.

19. image
설명: 이미지 입력 버튼입니다.
특징: 클릭하면 이미지를 통해 폼이 제출됩니다. 이미지의 src 속성을 사용하여 버튼 이미지를 지정합니다.

20. submit
설명: 폼 제출 버튼입니다.
특징: 클릭하면 폼이 제출됩니다.

21. reset
설명: 폼 재설정 버튼입니다.
특징: 클릭하면 폼의 모든 입력값이 초기화됩니다.


- 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.

<label> tag는 HTML에서 사용자 인터페이스를 제공하는 컨트롤 요소들의 이름표(label, 레이블)를 나타내는 태그입니다.

<label> 태그로 <input> 필드를 감싸면, 레이블과 입력 필드 간에 자연스러운 연결이 생깁니다. 이렇게 하면 사용자가 레이블을 클릭할 때 자동으로 해당 입력 필드에 포커스가 이동합니다. 이 방식은 레이블과 입력 필드 간의 명시적인 연결을 제공하여 접근성을 향상시킵니다.

## 과제 진행 요구 사항
- [x] 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
- [x] Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다.
- [x] AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성한다.

## 기능 요구 사항

### Step 1
- [x] 상품 상세 페이지와 상품 결제하기 페이지의 Form 로직을 구현해주세요. (4주차 미션 결과물 참고)

- [x] 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현한다.
    이 과정에서 UI를 chakra-ui 사용해서 구현한다. (단, 직접 구현해도 무방하나 다른 UI 라이브러리 사용은 금지)
    이번 과제는 Form을 다루는 것이 중점이기 때문에 UI 구현에 어려움을 겪는다면 임의로 변경해도 됨

- [x] 상세 페이지에서 첨부된 oas.yaml 파일의 /api/v1/products/{productId}/detail, /api/v1/products/{productId}/options를 참고하여 API를 구현한다.
- [x] 없는 상품의 경우 메인 페이지로 연결되도록 한다.
- [x] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동한다.
- [x]React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현한다.


### Step 2
- [x] 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택이 불가하게 해요.
- [x] 결제 페이지의 Form을 validation 해요. (4주차 미션 결과물 참고)
  - [x] 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내해요.
  - [x] 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내해요.
  - [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인해요.
  - [x] 현금 영수증 입력은 숫자만 입력하도록 안내해요.

### Step 3

  - [x] 기존에 만든 form / input을 react-hook-form으로 변경해요.
  - [x] validate 또한 react-hook-form 기능을 적극적으로 활용해요. (이 과정에서 zod를 사용해도 좋아요.)
