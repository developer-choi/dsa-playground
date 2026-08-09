[//]: # (TODO 일단 어디 특정한곳에 속하지를 않아서 여기에 몰아뒀는데, 특정 주제로 보낼 수 있음 좋아.)

# Algorithm Tips

## 시간 복잡도 & 공간 복잡도 줄이기

### 최대값을 구할 때 굳이 중간배열을 안만들어도 됨

순회하면서 나온 값을 배열에 다 모았다가 마지막에 `Math.max`·`reduce`·`sort`로 **하나만 뽑아 쓰는** 모양이면, 순회 도중 변수 하나를 갱신하는게 더 좋다.

```ts
// ❌ 리프마다 길이를 모아놨다가 마지막에 하나만 씀
const lengths: number[] = [];
lengths.push(pathLength);
return Math.max(...lengths);

// ✅ 순회하며 틈틈히 갱신, 배열 자체가 없어짐
maxLength = Math.max(maxLength, pathLength);
return maxLength;
```

### 순회 목표 — 1회·절반·제자리

1. 선형순환을 1번만 하는 것 (2회 이상 순회하지 않도록)
2. 절반만 순회하면 더 좋음
3. 기왕이면 Auxiliary Space 쓰지 않기

### 순회 1회로 max + 후보 동시 수집

"max 구하기 → 같은 값 필터링" 두 번 순회를 한 번으로 합치는 패턴. 새 max 발견 시 **후보 배열을 새 배열로 리셋**, 동률이면 push. 핵심은 "새 최대 등장 = 기존 후보 무효화" 라는 발상.

```ts
let maxCount = -Infinity;
let candidates: string[] = [];
for (const item of items) {
  if (item.value > maxCount) {
    maxCount = item.value;
    candidates = [item.id];   // 새 max → 후보 리셋
  } else if (item.value === maxCount) {
    candidates.push(item.id); // 동률 → 후보 추가
  }
}
```

## Math.max() / Math.min() 함정

### 빈 배열은 -Infinity

`Math.max()`에 빈 배열이 들어가면 `-Infinity`가 나온다.

### spread로 인자 펼치기 한계 — 큰 배열은 RangeError

`Math.max(...arr)`처럼 spread로 인자를 펼치면 배열 길이가 클 때 `RangeError: Maximum call stack size exceeded`가 날 수 있다.

- spread는 원소를 각각 함수 인자로 펼치는데, JS 엔진의 인자 개수 한계(V8 6.5만~수십만, JSC 약 6.5만)에 걸린다.
- 시간복잡도는 동일하지만 인터페이스 레벨 제약.
- 큰 배열은 `arr.reduce((a, b) => Math.max(a, b), -Infinity)`로 대체.
- 같은 함정: `Math.min(...arr)`, `arr.push(...big)`, `fn.apply(null, big)`.

> 멘탈 모델: **"배열을 인자로 펼치는 모든 연산은 N이 크면 위험"**.

## 문자열은 immutable — "새 문자열 만드는 모든 연산"이 루프

JS에서 문자열은 변경 불가. `s += x`, `s.concat(t)`, `` `${a}${b}` ``, `arr.join('/')` 등 **새 문자열을 산출하는 연산은 결과 글자 수 L만큼 도는 루프**가 내부에서 돈다. 즉 길이 L 새 문자열 만들기 = O(L) 시간. 반복문 안에 누적하면 O(N²) 폭발.

### 고전 함정 — 루프 안 문자열 누적

```ts
// ❌ 매 += 마다 result 길이만큼 복사 → 1+2+...+N = O(N²)
let result = '';
for (const w of words) result += w;
```

```ts
// ✅ push는 O(1), 마지막 join 한 번만 O(N)
const parts = [];
for (const w of words) parts.push(w);
return parts.join('');
```

### 연산별 시간복잡도

| 연산 | 시간 | 메모 |
|---|---|---|
| `str.length` | O(1) | 저장된 값 읽기 |
| `str[i]`, `str.charAt(i)` | O(1) | 인덱스 접근 |
| `str.charCodeAt(i)` | O(1) | |
| `s1 === s2` | **O(min(L1,L2))** | 글자별 비교 (최악) |
| `str + x`, `str.concat(x)` | **O(L)** | 새 문자열 생성 |
| `arr.join(sep)` | **O(L)** L=총 글자 수 | 글자 단위 복사 |
| `str.slice(a,b)` | **O(b-a)** | 부분 복사 |
| `str.split(sep)` | **O(L)** | 글자 순회 + 새 배열 |
| `str.replace(...)` | **O(L)** | 새 문자열 |
| `str.repeat(N)` | **O(N×L)** | N번 복사 |
| `str.indexOf(sub)` | **O(L×M)** 최악 | 엔진 최적화 있지만 보장 X |
| `[...str]`, `Array.from(str)` | **O(L)** | 글자 단위 새 배열 |

### 핵심 격언

**"길이만 필요하면 길이만 들고 다녀라. 문자열을 만들지 마라."** 결과 문자열을 안 만들면 join 단계의 O(L) 루프가 통째로 사라짐. 트리/그래프에서 누적값으로 숫자만 들고 다니는 패턴이 이거.

```ts
// ❌ 경로를 실제로 조립하고 나서 길이만 씀 — 리프 K개 × 경로 길이 L
nodes.map(node => dirname[node - 1]).join('/').length

// ✅ 내려가면서 길이만 더함 — 조상이 만든 값을 그대로 물려받으니 O(1)
currentLength + '/'.length + dirname[child - 1].length
```

❌ 쪽이 비싼 이유가 하나 더 있다. 리프마다 루트부터 다시 조립하므로 **형제들이 공유하는 앞부분을
K번 되풀이해 만든다.** ✅ 쪽은 부모가 계산해둔 값을 물려받아 그 일이 아예 없다.

### 루프 안에서 의심해야 할 것

`+=`, 템플릿 리터럴 누적, `arr.push(str.slice(...))`, `result.replace(...)` 반복.

## JS 배열/객체 연산 3카테고리 — "새 컬렉션을 만드나?" 자문 습관

**"이 한 줄이 새 컬렉션을 만드나? 기존 걸 바꾸나? 그냥 읽고 지나가나?"**

### 그룹 1 — 순회만 (안전)

`for`, `for...of`, `forEach`, `map`, `filter`, `reduce`, `some`, `every`, `find`, `findIndex`, `indexOf`, `includes`. 단독 O(N), 반복문 안에서도 합리적 사용은 OK.

### 그룹 2 — 제자리 변경 (대부분 안전)

`push` O(1), `pop` O(1), `arr[i]=x` O(1), `sort` O(N log N), `reverse` O(N), `splice` O(N). 누적은 무조건 `push`.

### 그룹 3 — 새 컬렉션 생성 (반복문 안에서 폭탄) ★

| 연산 | 단독 | 반복문 안 |
|---|---|---|
| `[x, ...arr]`, `[...arr, x]` | O(N) | **O(N²)** |
| `arr.slice()` | O(N) | **O(N²)** |
| `arr.concat(other)` | O(N) | **O(N²)** |
| `Array.from(arr)` | O(N) | **O(N²)** |
| `arr.flat()` | O(N) | **O(N²)** |
| `{...obj}`, `Object.assign({}, obj)` | O(K) | **O(N×K)** |
| `arr.shift()`, `arr.unshift(x)` | **O(N)** (앞쪽 조작은 전부 밂) | **O(N²)** |
| `new Set(arr)`, `new Map(entries)` | O(N) | **O(N²)** |

- 공통 패턴: **"복사" 또는 "앞쪽 조작"**이 들어간 모든 연산.
- BFS 큐 함정: `arr.shift()` 쓰지 말 것 → `let head = 0; queue[head++]` 인덱스 방식.
- React에서 spread가 멀쩡한 이유: 이벤트당 1회 호출(경계에서 한 번)이라 단독 O(N)으로 끝남. 코테 함정은 **핫 루프 안에 박힌 경우**.
- push vs concat 참고: https://github.com/developer-choi/dsa-playground/commit/3ba114024da742aef2d284098663e3d7e5d9c535

### spread 심화 — `[x, ...arr]`은 안 보이는 for 루프

`...arr`은 참조 복사가 아니라 arr의 모든 원소를 새 배열에 하나씩 복사하는 연산(`for (const e of arr) newArr.push(e)`의 단축 표기). 반복문 안에서 누적 배열에 쓰면 노드 N개 × 평균 깊이 D = **O(N×D)**, 사슬 트리 최악 O(N²).

```ts
// ❌ 트리 DFS 중 조상 체인 들고 다니기 → 깊이 D만큼 복사
parents[child] = [node, ...parents[node]];
```

```ts
// ✅ 누적값을 숫자 하나로 압축 → O(1)
stack.push([child, len + 1 + dirname[child - 1].length]);
```

멘탈 모델: **"`...`는 안 보이는 for 루프"** + **"방문 시 들고 다닐 정보를 최소 단위(숫자)로 압축하라."** 조상 명단 대신 누적 길이만 들고 가면 O(D) → O(1).

