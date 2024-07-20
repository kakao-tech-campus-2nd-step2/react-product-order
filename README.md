# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

# 🚀상품 상세 페이지 & 상품 결제하기 Form 구현하기

## 과제 진행 요구 사항

1. 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
2. Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다.
3. AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성한다.

## 기능 요구 사항

- 상품 상세 페이지와 상품 결제하기 페이지의 Form 로직을 구현합니다. (4주차 미션 결과물 참고)
- 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현합니다.
- UI 구현 시 chakra-ui를 사용합니다. (직접 구현해도 무방하나 다른 UI 라이브러리 사용은 금지)
- 이번 과제는 Form을 다루는 것이 중점이므로 UI 구현에 어려움을 겪는다면 임의로 변경 가능합니다.
- 상세 페이지에서 첨부된 oas.yaml 파일의 `/api/v1/products/{productId}/detail`, `/api/v1/products/{productId}/options`를 참고하여 API를 구현합니다.
- 없는 상품의 경우 메인 페이지로 연결되도록 합니다.
- 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동합니다.
- React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현합니다.

## 구현할 기능 목록

1. **상품 상세 페이지 구현**

   - [ ] 상품 상세 정보를 불러오는 API 구현 (`/api/v1/products/{productId}/detail`)
   - [ ] 상품 옵션 정보를 불러오는 API 구현 (`/api/v1/products/{productId}/options`)
   - [ ] 상품 상세 페이지 UI 구현
   - [ ] 상품 옵션 선택 기능 구현
   - [ ] 상품 수량 선택 기능 구현
   - [ ] 잘못된 상품 ID 입력 시 메인 페이지로 리디렉션

2. **상품 결제 페이지 구현**

   - [ ] 상품 결제 페이지 UI 구현
   - [ ] 결제 Form 구현 (이름, 주소, 연락처 등)
   - [ ] 결제 정보 검증 기능 구현
   - [ ] 결제 버튼 클릭 시 결제 처리 로직 구현

3. **공통 기능**
   - [ ] 나에게 선물하기 버튼 클릭 시 로그인 여부 확인
   - [ ] 로그인하지 않은 경우 로그인 페이지로 이동
   - [ ] 공통 UI 컴포넌트 구현 (헤더, 푸터 등)
   - [ ] Chakra UI를 사용한 스타일링

# 상품 상세 페이지 & 상품 결제하기 Form 구현하기

## 과제 진행 요구 사항

1. 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
2. Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다.
3. AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성한다.

## 기능 요구 사항

- 상품 상세 페이지와 상품 결제하기 페이지의 Form 로직을 구현합니다. (4주차 미션 결과물 참고)
- 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현합니다.
- UI 구현 시 chakra-ui를 사용합니다. (직접 구현해도 무방하나 다른 UI 라이브러리 사용은 금지)
- 이번 과제는 Form을 다루는 것이 중점이므로 UI 구현에 어려움을 겪는다면 임의로 변경 가능합니다.
- 상세 페이지에서 첨부된 oas.yaml 파일의 `/api/v1/products/{productId}/detail`, `/api/v1/products/{productId}/options`를 참고하여 API를 구현합니다.
- 없는 상품의 경우 메인 페이지로 연결되도록 합니다.
- 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동합니다.
- React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현합니다.

## 구현할 기능 목록

1. **상품 상세 페이지 구현**

   - [ ] 상품 상세 정보를 불러오는 API 구현 (`/api/v1/products/{productId}/detail`)
   - [ ] 상품 옵션 정보를 불러오는 API 구현 (`/api/v1/products/{productId}/options`)
   - [ ] 상품 상세 페이지 UI 구현
   - [ ] 상품 옵션 선택 기능 구현
   - [ ] 상품 수량 선택 기능 구현
   - [ ] 잘못된 상품 ID 입력 시 메인 페이지로 리디렉션

2. **상품 결제 페이지 구현**

   - [ ] 상품 결제 페이지 UI 구현
   - [ ] 결제 Form 구현 (이름, 주소, 연락처 등)
   - [ ] 결제 정보 검증 기능 구현
   - [ ] 결제 버튼 클릭 시 결제 처리 로직 구현

3. **공통 기능**
   - [ ] 나에게 선물하기 버튼 클릭 시 로그인 여부 확인
   - [ ] 로그인하지 않은 경우 로그인 페이지로 이동
   - [ ] 공통 UI 컴포넌트 구현 (헤더, 푸터 등)
   - [ ] Chakra UI를 사용한 스타일링

# 🚀Validation 구현하기

## 과제 진행 요구 사항

1. 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
2. Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다.
3. AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성한다

# 상품 상세 페이지 & 상품 결제하기 Form 구현하기

## 과제 진행 요구 사항

1. 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
2. Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다.
3. AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성한다.

## 기능 요구 사항

- 상품 상세 페이지와 상품 결제하기 페이지의 Form 로직을 구현합니다. (4주차 미션 결과물 참고)
- 결과 링크를 참고하여 상세 페이지 및 상품 결제 페이지의 UI를 구현합니다.
- UI 구현 시 chakra-ui를 사용합니다. (직접 구현해도 무방하나 다른 UI 라이브러리 사용은 금지)
- 이번 과제는 Form을 다루는 것이 중점이므로 UI 구현에 어려움을 겪는다면 임의로 변경 가능합니다.
- 상세 페이지에서 첨부된 oas.yaml 파일의 `/api/v1/products/{productId}/detail`, `/api/v1/products/{productId}/options`를 참고하여 API를 구현합니다.
- 없는 상품의 경우 메인 페이지로 연결되도록 합니다.
- 나에게 선물하기 버튼 클릭 시 로그인이 되어있지 않다면 로그인 페이지로 이동합니다.
- React Hook Form 등의 라이브러리를 사용하지 않으며 React의 form, ref, state만 사용하여 구현합니다.

## 구현할 기능 목록

1. **상품 상세 페이지 구현**

   - [ ] 상품 상세 정보를 불러오는 API 구현 (`/api/v1/products/{productId}/detail`)
   - [ ] 상품 옵션 정보를 불러오는 API 구현 (`/api/v1/products/{productId}/options`)
   - [ ] 상품 상세 페이지 UI 구현
   - [ ] 상품 옵션 선택 기능 구현
   - [ ] 상품 수량 선택 기능 구현
   - [ ] 잘못된 상품 ID 입력 시 메인 페이지로 리디렉션

2. **상품 결제 페이지 구현**

   - [ ] 상품 결제 페이지 UI 구현
   - [ ] 결제 Form 구현 (이름, 주소, 연락처 등)
   - [ ] 결제 정보 검증 기능 구현
   - [ ] 결제 버튼 클릭 시 결제 처리 로직 구현

3. **공통 기능**
   - [ ] 나에게 선물하기 버튼 클릭 시 로그인 여부 확인
   - [ ] 로그인하지 않은 경우 로그인 페이지로 이동
   - [ ] 공통 UI 컴포넌트 구현 (헤더, 푸터 등)
   - [ ] Chakra UI를 사용한 스타일링

# Validation 구현하기

## 과제 진행 요구 사항

1. 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
2. Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다.
3. AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성한다.

## 기능 요구 사항

- 상품 상세 페이지에서 상품의 개수를 option API의 giftOrderLimit을 초과한 경우 선택이 불가하게 합니다.
- 결제 페이지의 Form을 validation 합니다. (4주차 미션 결과물 참고)
- 카드 메시지를 입력하지 않으면 메시지를 입력하라고 안내합니다.
- 카드 메시지가 100글자가 넘어가면 100자 이내로 입력하라고 안내합니다.
- 현금 영수증 checkbox 클릭 시 현금영수증 번호가 입력되었는지 확인합니다.
- 현금 영수증 입력은 숫자만 입력하도록 안내합니다.

# 🚀 React Hook Form를 사용하여 기존의 form을 리팩터링 하기

## 과제 진행 요구 사항

1. 기능을 구현하기 전 README.md에 구현할 기능 목록을 정리해 추가한다.
2. Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가한다.
3. AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성한다.

## 기능 요구 사항

- 기존에 만든 form/input을 react-hook-form으로 변경합니다.
- validate 또한 react-hook-form 기능을 적극적으로 활용합니다. (이 과정에서 zod를 사용해도 좋습니다.)

## 구현할 기능 목록

1. **React Hook Form 적용**
   - [ ] 상품 상세 페이지의 form을 React Hook Form으로 변경
   - [ ] 상품 결제 페이지의 form을 React Hook Form으로 변경
   - [ ] 각 form 필드의 validation을 React Hook Form의 기능으로 구현
   - [ ] zod를 사용한 validation 적용 (선택 사항)

# 🚀 질문의 답변을 README에 작성

### 질문 1. 제어 컴포넌트와 비제어 컴포넌트의 차이가 무엇이고 제어 컴포넌트로 Form을 만들어야 하는 경우가 있다면 어떤 경우인지 예시와 함께 설명해주세요.

**제어 컴포넌트**는 React에서 state를 통해 입력값을 관리하는 컴포넌트다. 입력값이 변경될 때마다 `setState`를 호출하여 state를 업데이트하고, 이를 통해 입력값이 항상 state와 동기화된다. 제어 컴포넌트의 장점은 폼의 데이터가 컴포넌트의 state에 존재하기 때문에 폼 데이터를 쉽게 검증하거나 조작할 수 있다는 점이다.

**비제어 컴포넌트**는 React에서 직접 DOM 요소를 조작하여 입력값을 관리하는 컴포넌트다. 주로 `ref`를 사용하여 DOM 요소에 접근하고, 필요할 때 DOM의 값을 가져온다. 비제어 컴포넌트는 초기 렌더링 후에는 React가 아닌 DOM에서 입력값을 관리하므로 간단한 폼이나 작은 프로젝트에서 유용하다.

**제어 컴포넌트로 Form을 만들어야 하는 경우**
제어 컴포넌트를 사용해야 하는 경우는 폼의 데이터를 검증하거나 폼 제출 전에 데이터를 조작해야 할 때다. 예를 들어, 사용자 입력에 따라 실시간으로 오류 메시지를 표시해야 하거나, 폼 제출 시 입력값을 검증하는 경우가 있다.

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email address');
    } else {
      // 폼 제출 로직
      console.log('Form submitted:', { name, email });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledForm;
```

### 질문 2. input type의 종류와 각각 어떤 특징을 가지고 있는지 설명해 주세요.

- `text`: 기본적인 단일 행 텍스트 입력 필드로, 자유롭게 텍스트를 입력할 수 있다.
- `password`: 입력된 텍스트가 마스킹되어 보이지 않게 하는 입력 필드다. 주로 비밀번호 입력에 사용된다.
- `email`: 이메일 주소 형식을 입력받기 위한 필드다. 일부 브라우저는 이메일 형식을 자동으로 검증한다.
- `number`: 숫자를 입력받기 위한 필드로, 숫자 이외의 문자는 입력할 수 없다. 추가로 최소값(`min`), 최대값(`max`), 증가 단위(`step`) 등을 설정할 수 있다.
- `tel`: 전화번호 입력 필드로, 형식 검증 없이 자유롭게 입력할 수 있다.
- `url`: URL을 입력받기 위한 필드다. 일부 브라우저는 URL 형식을 자동으로 검증한다.
- `date`: 날짜를 선택할 수 있는 입력 필드로, 날짜 선택기를 제공한다.
- `checkbox`: 체크박스로, 다중 선택이 가능하다. 체크 여부는 `checked` 속성으로 관리한다.
- `radio`: 라디오 버튼으로, 동일한 이름을 가진 그룹에서 하나의 옵션만 선택할 수 있다.
- `file`: 파일 업로드를 위한 입력 필드로, 사용자가 파일을 선택하면 파일 정보가 `File` 객체로 전달된다.
- `hidden`: 화면에 표시되지 않는 숨김 입력 필드로, 주로 폼 데이터에 추가 정보를 포함할 때 사용된다.
- `range`: 슬라이더 형태의 입력 필드로, 특정 범위 내에서 값을 선택할 수 있다.
- `color`: 색상을 선택할 수 있는 입력 필드로, 색상 선택기를 제공한다.
- `search`: 검색어 입력 필드로, 텍스트 입력 필드와 유사하지만 검색 기능을 위한 추가 스타일과 기능이 제공된다.

### 질문 3. label tag는 어떤 역할을 하며 label로 input field를 감싸면 어떻게 동작하는지 설명해 주세요.

`label` 태그는 폼 요소의 설명을 제공하는데 사용된다. `label` 태그를 사용하면 접근성(Accessibility)이 향상되어 스크린 리더 등의 보조 기술이 폼 요소의 목적을 이해하기 쉽게 한다.

`label` 태그는 두 가지 방식으로 `input` 요소와 연결할 수 있다:

1. `for` 속성을 사용하여 `input` 요소의 `id` 속성과 연결
2. `input` 요소를 `label` 태그 내부에 포함

`label` 태그로 `input` 필드를 감싸면, `label`을 클릭할 때 해당 `input` 필드가 자동으로 포커스를 받는다.

```jsx
<!-- for 속성을 사용하는 방법 -->
<label for="name">Name:</label>
<input type="text" id="name" name="name" />

<!-- label 태그로 input 필드를 감싸는 방법 -->
<label>
  Name:
  <input type="text" name="name" />
</label>
```

위 두 예제에서 `label` 태그를 클릭하면 해당 `input` 필드가 포커스를 받게 된다. 이는 사용자가 작은 `input` 요소를 클릭하지 않고도 쉽게 입력 필드를 활성화할 수 있게 해준다.
