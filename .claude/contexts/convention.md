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
