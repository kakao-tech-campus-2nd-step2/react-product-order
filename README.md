# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## Week 4. 1단계 - 상품 상세 페이지 & 상품 결제하기 Form 구현하기

### 📝Requirements

- [x] 상세 페이지 UI
- [ ] 상품 결제 페이지의 UI
- [ ] 없는 상품의 경우 메인 페이지로 연결
- [ ] 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동

## Week 4. 2단계 - validation 구현하기

### 📝Requirements

- [ ] 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택이 불가하게 해요.
- [ ] 결제 페이지의 Form을 validation 해요.

## Week 4. 3단계 - React Hook Form를 사용하여 기존의 form을 리팩터링

### 📝Requirements

- [ ] 기존에 만든 form / input을 react-hook-form으로 변경
- [ ] validate react-hook-form 기능 활용

## Week 4. 4단계 - 질문의 답변을 README에 작성

### 📝Requirements

질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

### 제어 컴포넌트(Controlled Component)와 비제어 컴포넌트(Uncontrolled Component)의 차이점

- **제어 컴포넌트(Controlled Component)**:

  - React의 상태(state)를 사용하여 입력 양식을 제어하는 컴포넌트이다.
  - 입력 양식의 값이 React 컴포넌트의 상태에 의해 제어된다.
  - 사용자 입력에 따라 상태가 업데이트되며, 상태 변경에 따라 입력 양식의 값이 동적으로 업데이트됩니다.
  - 예시: `<input value={value} onChange={(e) => setValue(e.target.value)} />`

- **비제어 컴포넌트(Uncontrolled Component)**:

  - React의 상태(state)를 사용하지 않고 원시 DOM API를 사용하여 입력 양식을 처리하는 컴포넌트이다.
  - 일반적으로 `ref`를 사용하여 DOM 요소에 직접 접근하여 값을 읽거나 조작한다.
  - React의 상태 업데이트 없이 직접 DOM 조작을 통해 입력 양식의 값을 변경할 수 있다.
  - 예시: `<input ref={inputRef} />`

  ### 제어 컴포넌트를 사용해야 하는 경우

1. 입력 양식의 값에 대한 유효성 검사 및 제어가 필요한 경우:
2. 여러 입력 필드 간의 상호 의존성이 있는 경우:
3. 입력 양식의 값을 React 컴포넌트에서 직접 조작하고 싶은 경우:

- 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

- **`password`**:
  - 비밀번호 입력 필드.
  - 입력한 텍스트가 마스킹되어 표시(보안상).
  - 예시: `<input type="password" />`
- **`text`**:
  - 일반적인 텍스트 입력 필드.
  - 사용자가 텍스트를 입력할 수 있다. - 예시: `<input type="text" />`
- **`number`**:
  - 숫자 입력 필드.
  - 사용자가 숫자를 입력할 수 있으며, 키보드의 숫자 키패드를 통해 접근성이 좋다.
  - 예시: `<input type="number" />`
- **`checkbox`**:
  - 체크박스.
  - 선택 여부를 토글할 수 있다.
  - 예시: `<input type="checkbox" />`
- **`radio`**:
  - 라디오 버튼.
  - 여러 옵션 중 하나를 선택할 수 있는 방식.
  - 그룹 내에서 하나의 옵션만 선택할 수 있다.
  - 예시: `<input type="radio" />`
- **`date`, `time`, `datetime-local`**:

  - 날짜, 시간, 날짜와 시간을 입력할 수 있는 특정 타입들.
  - 각각의 입력 타입에 맞는 형식으로 사용자 입력을 받을 수 있다.

- 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.

### label tag의 역할

- label 태그는 사용자 인터페이스의 입력 필드(예: input, textarea 등)와 관련된 설명을 제공함다.
- label은 입력 필드의 레이블을 정의하며, 보통 입력 필드 앞에 나타난다.

### label로 input field를 감싼 경우 동작 방식

- label을 클릭하면 해당 입력 필드가 포커스를 받는다. 이는 사용자 경험을 향상시킨다.
  또한, 화면 판독기 사용자에게도 더 좋은 접근성을 제공한다. 즉, label이 제대로 구성되면 화면 판독기가 입력 필드와 그 설명을 쉽게 인식할 수 있다.
