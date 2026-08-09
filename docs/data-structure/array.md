# Array

## TODO

- [심화질문](https://www.notion.so/d3ceaae500eb4164ae46b87c18aea257)

## 배열 2개 동시에 순회하기

```ts
for (let i = 0; i < pathA.length && i < pathB.length; i++) {
  if (pathA[i] !== pathB[i]) {
    return pathA[i - 1];
  }
}
```
