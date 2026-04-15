---
description: 문제 URL이나 정보를 받아 적절한 폴더에 풀이 파일과 테스트 파일을 생성한다.
---

문제 URL 또는 문제 정보(출처, 번호)를 받아 풀이 파일을 셋업하라.

## 컨벤션 참조

- `.claude/contexts/convention.md` — 파일명·카테고리·테스트 작성 컨벤션

## 절차

1. `.claude/contexts/convention.md` 읽기
2. URL 또는 정보에서 출처(boj/pg/gfg)와 문제 번호를 파싱
3. 이미 존재하는지 grep으로 확인 → 있으면 알려주고 중단
4. 문제 페이지를 읽고 최적 풀이 기법을 판단하여 카테고리 폴더 결정
5. 카테고리 폴더가 없으면 생성
6. 풀이 파일과 테스트 파일 생성

## 생성 파일

### 풀이 파일

`src/problems/{카테고리}/{출처}-{번호}.ts`

- 함수명: 풀이 기법 기반 (예: `bruteForce`, `greedy`, `bfs`, `stack`, `dp`)
- 템플릿: `./example.md` 참조

### 테스트 파일

`src/problems/{카테고리}/{출처}-{번호}.test.ts`

- 템플릿: `./test-template.md` 참조
- 문제 페이지의 예제 입력/출력을 `General cases` 블록에 채운다
- it 설명은 "입력값이 X이면 Y를 반환한다" 형태로 함수 동작을 서술한다
- `Boundary cases`, `Edge cases`는 비워둔다

## 주의

- 사용자에게 문제 제목, 설명, 카테고리, 풀이 기법을 **절대 언급하지 않는다** — 모두 힌트가 된다.
- 완료 후 "파일 생성했습니다" 한 줄만 출력한다.
