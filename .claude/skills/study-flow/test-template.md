```typescript
import { {기법명} } from './{출처}-{번호}';

// yarn test src/problems/{카테고리}/{출처}-{번호}.test.ts
const solutions = [
  {name: '{기법명}', fn: {기법명}},
];

describe.each(solutions)('{문제 제목} > $name', ({fn}) => {
  describe('Success', () => {
    // TODO
  });

  describe('Boundary', () => {
    // TODO
  });

  describe('Edge', () => {
    // TODO
  });
});
```
