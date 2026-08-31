# String

## 숫자를 문자열로 변환할 때 leading zero 소실

숫자 ⇒ 문자열로 만들 때 주의해야하는건, 001 ⇒ 1 이라는 것.

참고: `git log --grep="앞에 0이 1개이상"`

## 문자열 → 숫자 변환 시 leading zero 소실

문자열 ⇒ 숫자로 변환할 때도 마찬가지: `"0001"` → `1`, `"000"` → `0`.

## `Number()`로 숫자 여부 체크할 때 예외 주의

`Number(x)`가 NaN인지로 숫자 여부를 판별하는 건 예외가 많다.

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

같은 코드를 배열 쪽에서 본 이야기는 [array.md](../data-structure/array.md)의 「spread 심화」에 있다. 그쪽은 `...` 복사 자체가 숨은 루프라는 각도다.

### 루프 안에서 의심해야 할 것

`+=`, 템플릿 리터럴 누적, `arr.push(str.slice(...))`, `result.replace(...)` 반복.
