```typescript
import { {기법명} } from './{출처}-{번호}';

const solutions = [
  {name: '{기법명}', fn: {기법명}},
];

describe.each(solutions)('{문제 제목} > $name', ({fn}) => {
  describe('General cases', () => {
    // 문제의 예제를 it.todo 로 채운다. 예제가 없으면 비워두기
  });

  describe('Boundary cases', () => {
    // 비워둔다
  });

  describe('Edge cases', () => {
    // 비워둔다
  });
});
```
