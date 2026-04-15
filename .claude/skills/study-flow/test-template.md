```typescript
import { {기법명} } from './{출처}-{번호}';

// yarn test src/problems/{카테고리}/{출처}-{번호}.test.ts
const solutions = [
  {name: '{기법명}', fn: {기법명}},
];

describe.each(solutions)('{문제 제목} > $name', ({fn}) => {
  describe('General cases', () => {
    // 문제에서 제시한 예시를 코드로 작성. 없으면 비워두기
  });

  describe('Boundary cases', () => {
    // 문제에서 제시한 예시를 코드로 작성. 없으면 비워두기
  });

  describe('Edge cases', () => {
    // 문제에서 제시한 예시를 코드로 작성. 없으면 비워두기
  });
});
```
