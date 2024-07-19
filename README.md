# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

### 🚀 1단계

- [x]  상세 페이지 및 상품 결제 페이지 UI를 구현 (Chakra-UI 사용)
- [x]  **`/api/v1/products/{productId}/detail`**, **`/api/v1/products/{productId}/options`**를 참고하여 API 구현
- [x]  없는 상품의 경우 메인 페이지로 연결
- [x]  나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동
- [x]  React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현

### 🚀 2단계

- [x] 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택 block
- [x] 결제 페이지의 Form validation 검증
    - [x] 카드 메시지를 입력 필수
    - [x] 카드 메시지가 100자 이내로 입력
    - [x] 현금 영수증 checkbox 클릭 시 현금영수증 번호 입력 필수
    - [x] 현금 영수증 숫자만 입력 가능

### 🚀 3단계

- [x] 기존에 만든 form / input을 react-hook-form으로 변경
- [x] validate react-hook-form 기능 활용(이 과정에서 zod를 사용 가능)

### 🚀 4단계

> 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

**`제어 컴포넌트 (Controlled Component)`**

제어 컴포넌트는 React 컴포넌트가 그 상태(state)를 제어하는 입력 요소를 의미한다. 이 컴포넌트는 모든 폼 데이터가 React 상태에 저장되며, 상태 변화에 따라 입력 값이 갱신된다. 즉, 사용자가 입력 필드에 입력할 때마다 onChange 이벤트 핸들러가 호출되고, 그 핸들러는 상태를 업데이트한다.

특징
    - 상태는 컴포넌트의 state에 저장됩니다.
    - 입력 요소의 값은 상태(state)를 통해 제어됩니다.
    - 입력값 변경은 항상 이벤트 핸들러를 통해 상태를 변경합니다.

예시
```typescript
import React, { useState } from 'react';

function ControlledForm() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted value: ${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**`비제어 컴포넌트 (Uncontrolled Component)`**

비제어 컴포넌트는 React가 아닌 DOM 자체에서 그 상태를 관리하는 입력 요소를 의미한다. 비제어 컴포넌트는 참조(ref)를 통해 DOM 요소에 접근하고 값을 읽어온다. 초기값은 설정할 수 있지만, 이후의 상태 변화는 React가 제어하지 않는다.

특징
    - 상태는 DOM 자체에 저장됩니다.
    - React는 입력 요소의 값을 직접 제어하지 않습니다.
    - 값 접근은 ref를 통해 이루어집니다.

예시
```typescript
import React, { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted value: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

> 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

`text`
    - 기본 입력 타입으로, 사용자가 텍스트를 입력할 수 있는 단일 줄 텍스트 필드이다.
    - 최대 글자 수를 maxlength 속성으로 제한할 수 있다.

`password`
    - 사용자가 입력하는 텍스트를 가려주는 입력 필드이다. 비밀번호와 같은 민감한 정보를 입력할 때 사용한다.
    - 입력된 텍스트는 화면에 보이지 않으며, 대부분의 브라우저는 점(.)이나 별표(*)로 표시한다.

`email`
    - 이메일 주소 형식을 입력받기 위한 필드이다.
    - 기본적으로 이메일 형식을 유효성 검사하며, 올바른 이메일 형식이 아닌 경우 제출할 수 없다.
    - 일부 브라우저는 자동 완성 및 이메일 주소와 관련된 키보드를 제공한다.

`number`
    - 숫자 입력을 받기 위한 필드이다.
    - 최소값(min), 최대값(max), 증분 단위(step) 등을 지정할 수 있다.
    - 브라우저는 숫자 입력에 적합한 UI(예: 스피너)를 제공할 수 있다.

`tel`
    - 전화번호 입력을 받기 위한 필드이다.
    - 전화번호 형식에 대한 유효성 검사는 제공하지 않으며, 일반 텍스트 필드와 비슷하게 작동한다.
    - 모바일 장치에서 전화번호 키패드를 제공할 수 있다.

`url`
    - URL 입력을 받기 위한 필드이다.
    - 유효한 URL 형식인지 검사하며, 올바르지 않은 경우 제출할 수 없다.

`date`
    - 날짜 입력을 받기 위한 필드이다.
    - 브라우저는 날짜 선택 UI(예: 달력)를 제공한다.
    - min 및 max 속성을 사용하여 날짜 범위를 제한할 수 있다.

`time`
    - 시간 입력을 받기 위한 필드이다.
    - 브라우저는 시간 선택 UI를 제공한다.
    - min 및 max 속성을 사용하여 시간 범위를 제한할 수 있다.

`datetime-local`
    - 로컬 날짜와 시간을 입력받기 위한 필드이다.
    - 브라우저는 날짜 및 시간 선택 UI를 제공한다.

`month`
    - 연도와 월을 입력받기 위한 필드이다.
    - 브라우저는 월 선택 UI를 제공한다.

`week`
    - 연도와 주를 입력받기 위한 필드이다.
    - 브라우저는 주 선택 UI를 제공한다.

`color`
    - 색상을 선택하기 위한 필드이다.
    - 브라우저는 색상 선택 UI를 제공한다.

`checkbox`
    - 사용자가 체크할 수 있는 체크박스이다.
    - 단일 선택 또는 다중 선택이 가능하다.

`radio`
    - 라디오 버튼으로, 같은 이름(name) 그룹에서 단일 선택만 가능하다.

`file`
    - 파일 업로드를 위한 입력 필드이다.
    - 사용자가 파일을 선택하면 해당 파일의 정보를 가져올 수 있다.
    - accept 속성으로 허용할 파일 유형을 지정할 수 있다.

`hidden`
    - 사용자에게 보이지 않는 숨겨진 입력 필드이다.
    - 폼 데이터에 추가 정보를 포함시킬 때 사용한다.

`range`
    - 범위 값을 입력받기 위한 슬라이더이다.
    - 최소값(min), 최대값(max), 증분 단위(step) 등을 지정할 수 있다.

`search`
    - 검색어를 입력받기 위한 필드이다.
    - 텍스트 입력과 비슷하지만, 일부 브라우저는 검색을 위한 추가 UI를 제공한다.

> 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.

`<label>` 태그는 HTML 폼에서 사용되는 요소로, 사용자에게 입력 필드의 목적을 설명하거나 접근성을 향상시키는 역할을 한다. label 태그를 사용하면 폼 요소와 관련된 텍스트를 보다 명확하게 제공할 수 있다. 특히, label 태그는 시각적으로는 물론, 스크린 리더와 같은 보조 기술을 사용하는 사용자에게도 중요한 정보를 제공하는 데 유용하다.

**주요 역할 및 특징**

입력 필드와 연관된 텍스트 제공: `label` 태그는 입력 필드와 연관된 설명 텍스트를 제공하여 사용자가 필드의 목적을 쉽게 이해할 수 있도록 한다.

접근성 향상: `label` 태그는 스크린 리더와 같은 보조 기술을 사용하는 사용자가 입력 필드의 목적을 이해하는 데 도움을 준다. 이는 웹 접근성을 높이는 중요한 요소이다.

클릭 영역 확장: `label` 태그를 클릭하면 자동으로 관련된 입력 필드가 포커스를 받는다. 이는 특히 작은 체크박스나 라디오 버튼을 클릭하는 경우 사용자 경험을 향상시킨다.

**동작 방식**

- for 속성을 사용하는 경우: label 태그의 for 속성은 해당 속성의 값이 일치하는 input 요소의 id 속성과 연결된다. label 태그를 클릭하면 브라우저는 자동으로 해당 input 요소에 포커스를 맞춘다.
```typescript
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

- input 요소를 label 태그로 감싸는 경우: label 태그 내에 input 요소를 포함하면, label 태그의 클릭 이벤트가 내부의 input 요소로 전달된다. 이 경우 for 속성 없이도 동일한 동작을 수행할 수 있다.
```typescript
<label>
  Password:
  <input type="password" name="password">
</label>
```