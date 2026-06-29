---
description: 문제 URL이나 정보를 받아 적절한 폴더에 풀이 파일과 테스트 파일을 생성한다.
---

문제 URL 또는 문제 정보(출처, 번호)를 받아 풀이 파일을 셋업하라.

## 컨벤션 참조

- `local/contexts/convention.md` — 파일명·카테고리·테스트 작성 컨벤션

## 절차

1. `local/contexts/convention.md` 읽기
2. URL 또는 정보에서 출처(boj/pg/gfg)와 문제 번호를 파싱
3. 이미 존재하는지 grep으로 확인 → 있으면 알려주고 중단
4. 문제 페이지를 읽고 최적 풀이 기법을 판단하여 카테고리 폴더 결정
5. 카테고리 폴더가 없으면 생성
6. 풀이 파일과 테스트 파일 생성

## 생성 파일

### 풀이 파일

`src/problems/{카테고리}/{출처}-{번호}.ts`

- 함수명: 풀이 기법 기반 (예: `bruteForce`, `greedy`, `bfs`, `stack`, `dp`)
- 템플릿: `local/contexts/study-flow/example.md` 참조
- 타입 에러 방지를 위해 반환 타입에 맞는 기본값을 리턴한다 (예: `return []`, `return 0`, `return false`)
- 함수 본문 최상단에 2단계 접근법 템플릿을 블록 주석으로 미리 박아둔다 (사용자가 채울 수 있도록):
  ```
  /*
   * 접근법 — 목적/방법의 연쇄로 순서대로 서술.
   *
   * 형식: "X를 하고 싶다 → 그러려면 Y가 필요하다 ..."
   * 각 단계가 바로 앞 단계에서 논리적으로 도출되어야 함. 직감 점프 금지.
   *
   * Tip: 무엇을 원해서 그 알고리즘을 선택했고, 그 자료구조를 선택했고,
   *      그 자료구조에 어떤 규칙으로 데이터를 저장했는지 적는다.
   */
  ```

### 테스트 파일

`src/problems/{카테고리}/{출처}-{번호}.test.ts`

- 템플릿: `local/contexts/study-flow/test-template.md` 참조 (`local/contexts/study-flow/test-template.md`에 있는 import만 작성한다. `compareFunctionsWithRandomInputs`는 2단계 Random 블록 추가 시점에 넣는다 — 초기 스캐폴딩엔 미포함)
- 문제 페이지의 예제 입력/출력을 `General cases` 블록에 채운다
- it 설명은 함수 동작/조건 기반으로 서술한다 (예: `'각 탑이 레이저를 수신하는 탑 번호를 반환한다'`). 입력값을 문구에 박지 않는다. 입력이 길면 로컬 변수로 분리한다 (`convention.md` 참고)
- `Boundary cases`, `Edge cases`는 비워둔다

## 주의

- 사용자에게 문제 제목, 설명, 카테고리, 풀이 기법을 **절대 언급하지 않는다** — 모두 힌트가 된다.
- 완료 후 "파일 생성했습니다" 한 줄만 출력한다.
