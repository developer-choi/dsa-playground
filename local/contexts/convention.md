## 원칙

- 분류 기준: 그 문제의 **최적 풀이 기법** 기준으로 하나만 골라 배치
- 폴더는 미리 만들지 않음. 인강 진도에 맞춰 하나씩 생성

## 파일명 컨벤션

`출처-번호.ts` / `출처-번호.test.ts`

| 출처 | 접두사 |
|------|--------|
| 백준 | `boj` |
| 프로그래머스 | `pg` |
| GeeksForGeeks | `gfg` |
| 기업 코딩테스트 | `wf` |

이 표가 쓸 수 있는 접두사의 전부이고 `yarn path-convention`이 이걸 읽어 강제한다. 새 출처는 문제를 만들기 전에 여기 먼저 등재한다.

## 함수명 컨벤션

- 풀이 함수명은 기법 기반으로 작성 (예: `bruteForce`, `greedy`, `bfs`, `dp`)

## 폴더구조

```text
problems/
  implementation/
  greedy/
  dynamic-programming/
  binary-search/       # 파라메트릭 서치 포함
  dfs-bfs/             # 완전탐색 포함
  backtracking/
  shortest-path/       # 다익스트라, 벨만포드, 플로이드
  sort/
  two-pointer/
  sliding-window/
  stack-queue/
  heap/
  hash/
  tree/
  graph/               # 위상정렬, MST, 유니온파인드
  string/
  math/

data-structure/        # 코테용 구현체 (필요할 때 하나씩 생성)
  heap.ts
  linked-list.ts

utils/                 # 테스트 유틸리티
```

## 테스트 컨벤션

### 풀이 함수 설계 원칙

- **Pure Function**: 같은 입력 → 같은 출력, side effect 없음
- **Single Responsibility**: 한 함수가 하나의 일만

### 테스트 구조

- `General cases / Boundary cases / Edge cases` 3개 describe로 분리
- `describe.each`로 여러 풀이 함수를 동시에 순회

```typescript
const solutions = [
  {name: 'stack', fn: stack},
  {name: 'bruteForce', fn: bruteForce},
];

describe.each(solutions)('문제 제목 > $name', ({fn}) => {
  describe('General cases', () => {
    it('각 탑이 레이저를 수신하는 탑 번호를 반환한다', () => {
      expect(fn([6, 9, 5, 7, 4])).toEqual([0, 0, 2, 2, 4]);
    });
  });

  describe('Boundary cases', () => {
    // TODO
  });

  describe('Edge cases', () => {
    // TODO
  });
});
```

### 데이터 처리

같은 값이 반복되거나 변환이 포함되면 로컬 변수로 추출한다. 기댓값도 그 변수에서 파생시킨다.

반복 assertion은 데이터 기반 반복문으로 처리한다.
