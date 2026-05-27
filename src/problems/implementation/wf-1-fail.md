# WF-1 아파트 관리비 — 면접 방어 답변

> 톤: "그 당시엔 못 봤는데 돌이켜보니 이런 문제가 있어서 이렇게 개선했다."

---

## 개선 1. 함수 이름과 인자명이 호출부 컨텍스트 없이 의미가 안 잡힘

### 개선

```typescript
function getKthDayWeekday(newYearWeekday: Day, daysBeforeMonth: number, k: number): Day {
  return (newYearWeekday + daysBeforeMonth + k - 1) % 7 as Day;
}
```

---

## 면접관 예상 질문 + 방어 답변

### Q3. 시간복잡도와 공간복잡도는요?

둘 다 **O(1)** (정확히는 O(12) 상수 시간). 누적 배열 만드는 루프와 결과 만드는 map 모두 12회 고정.

### Q5. 누적 배열 안 만들고 매달 1일 요일만 갱신하는 방법도 있을 것 같은데요?

가능합니다. 공간을 O(1)로 더 줄일 수 있습니다.

```typescript
let weekday = day;
const result: number[] = [];
for (let m = 0; m < 12; m++) {
  const kth = (weekday + k - 1) % 7;
  result.push(kth >= 5 ? 1 : 0);
  weekday = (weekday + DATE_COUNT_OF_MONTH[m]) % 7;
}
```

다만 "각 달 시작 전 누적일"이라는 자료구조가 도메인 의미와 더 직접 대응돼서, 가독성을 우선해 누적 배열 방식을 택했습니다. n=12로 고정이라 공간 차이는 실질적 영향이 없습니다.

### Q6. 만약 윤년을 고려해야 한다면 어떻게 바꾸나요?

`DATE_COUNT_OF_MONTH`를 연도에 따라 동적으로 만들면 됩니다. 2월 길이를 윤년 판정 함수로 결정:

```typescript
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
```