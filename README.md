# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

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