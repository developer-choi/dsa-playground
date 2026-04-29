## 동점자 ranking — 정렬 1회 + lookup 테이블

내림차순 정렬한 배열에서 어떤 값이 **처음 등장하는 자리(인덱스) i**가 곧 그 값의 등수 - 1이다.

> 등수 = i + 1

근거: 정렬돼있고 "처음 등장"이라 자리 i 앞의 i개는 전부 더 큰 값.

원본 순서를 보존하며 정렬해야 할 때, 객체에 인덱스를 박아두고 정렬 2회 하는 대신 `Map<값, 등수>` 한 번 만들고 원본은 lookup만 하면 된다. 결과값이 입력값의 함수로 표현될 때(같은 값 → 같은 결과) 일반화 가능 — 등수·백분위·빈도순위·좌표 압축이 모두 이 형태.

```ts
const sorted = [...grade].sort((a, b) => b - a);
const rankByGrade = new Map<number, number>();
for (let i = 0; i < sorted.length; i++) {
  if (!rankByGrade.has(sorted[i])) rankByGrade.set(sorted[i], i + 1);
}
return grade.map((g) => rankByGrade.get(g)!);
```

참고: src/problems/sort/wf-3.ts
