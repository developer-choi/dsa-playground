## 원칙

- 분류 기준: 그 문제의 **최적 풀이 기법** 기준으로 하나만 골라 배치
- 파일 남기는 목적: "이 문제 전에 풀어봤나?" 빠른 확인 (grep으로 번호 검색)
- 폴더는 미리 만들지 않음. 인강 진도에 맞춰 하나씩 생성

## 파일명 컨벤션

`출처-번호.ts` / `출처-번호.test.ts`

| 출처 | 접두사 | 예시 |
|------|--------|------|
| 백준 | `boj` | `boj-11047.ts` |
| 프로그래머스 | `pg` | `pg-42862.ts` |
| GeeksForGeeks | `gfg` | `gfg-12345.ts` |

## 함수명 컨벤션

- 풀이 함수명은 기법 기반으로 작성 (예: `bruteForce`, `greedy`, `bfs`, `dp`)
- import/테스트에서 어떤 접근법인지 바로 알 수 있게

## 폴더구조

```text
problems/
  implementation/      # 구현, 시뮬레이션
  greedy/              # 그리디
  dynamic-programming/ # 다이나믹 프로그래밍
  binary-search/       # 이분탐색, 파라메트릭 서치
  dfs-bfs/             # DFS/BFS, 완전탐색
  backtracking/        # 백트래킹
  shortest-path/       # 최단경로 (다익스트라, 벨만포드, 플로이드)
  sort/                # 정렬 활용 문제
  two-pointer/         # 투포인터
  sliding-window/      # 슬라이딩 윈도우
  stack-queue/         # 스택/큐 활용 문제
  heap/                # 힙/우선순위큐 활용 문제
  hash/                # 해시맵/셋 활용 문제
  tree/                # 트리 순회, BST 문제
  graph/               # 그래프 (위상정렬, MST, 유니온파인드)
  string/              # 문자열 처리
  math/                # 수학, 정수론

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

같은 값이 반복되거나 변환이 포함되면 로컬 변수로 추출한다.

```typescript
// before
expect(fn([1, 2, 3])).toEqual([1, 2, 3]);
expect(fn([1, 2, 3])).toHaveLength(3);

// after
const input = [1, 2, 3];
expect(fn(input)).toEqual([1, 2, 3]);
expect(fn(input)).toHaveLength(input.length);
```

반복 assertion은 데이터 기반 반복문으로 처리한다.

```typescript
// before
expect(fn(1)).toBe(true);
expect(fn(2)).toBe(true);
expect(fn(3)).toBe(true);

// after
[1, 2, 3].forEach((n) => {
  expect(fn(n)).toBe(true);
});
```
