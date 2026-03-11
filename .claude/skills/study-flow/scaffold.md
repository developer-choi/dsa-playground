---
description: 문제 URL이나 정보를 받아 적절한 폴더에 풀이 파일과 테스트 파일을 생성한다.
---

문제 URL 또는 문제 정보(출처, 번호)를 받아 풀이 파일을 셋업하라.

## 절차

1. `.claude/contexts/convention.md`를 읽고 컨벤션 확인
2. URL 또는 정보에서 출처(boj/pg/gfg)와 문제 번호를 파싱
3. 이미 존재하는지 grep으로 확인 → 있으면 알려주고 중단
4. 문제 페이지를 읽고 최적 풀이 기법을 판단하여 카테고리 폴더 결정
5. 카테고리 폴더가 없으면 생성
6. 풀이 파일과 테스트 파일 생성

## 생성 파일

`src/problems/{카테고리}/{출처}-{번호}.ts`
```typescript
/**
 * URL: {문제 URL}
 * Description: {문제 제목 및 간단한 설명}
 */

export function {기법명}() {
  // TODO
}
```

- 함수명은 풀이 기법 기반으로 작성 (예: `bruteForce`, `greedy`, `bfs`)

`src/problems/{카테고리}/{출처}-{번호}.test.ts`
- 템플릿: `./test-template.md` 참조
- Success / Boundary / Edge 3개 describe 구조
- `describe.each`로 여러 풀이 함수 순회
- 풀이 파일에서 export한 함수를 테스트 파일에서 import까지 세팅
- 결과물 예시: `./example.md` 참조
