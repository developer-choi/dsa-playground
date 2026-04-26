# Math

## 소수 (Prime Number)

### 특징
- **2를 제외한 모든 짝수는 소수가 아니다.** → 2 따로 처리하고 3부터 홀수만 검사 가능 (`i += 2`)
- **합성수 n에는 √n 이하의 소인수가 반드시 존재한다.**
  - 증명: n이 합성수면 `n = a × b` (1 < a ≤ b < n). 만약 a > √n이면 `b ≥ a > √n`이라 `a × b > n` 모순. 따라서 a ≤ √n.
  - 활용: 소수 판정 시 √n까지만 검사. 부동소수점 오차 피하려면 `i * i <= n` 사용.
- **모든 합성수는 소수들의 곱으로 유일하게 표현된다 (소인수분해의 유일성).** → 에라토스테네스의 체에서 "소수만 검사해도 충분"한 근거.

### 단일 판정 (O(√n))
```ts
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
```

### 에라토스테네스의 체 (O(n log log n))
범위 [2, N]의 모든 소수를 한 번에 구할 때 사용.

```ts
const sieve = new Array(n + 1).fill(true);
sieve[0] = sieve[1] = false;
for (let i = 2; i * i <= n; i++) {
  if (!sieve[i]) continue;
  for (let j = i * i; j <= n; j += i) sieve[j] = false;
}
```

포인트:
- `j = i * i`부터 시작 (i*2, i*3, ..., i*(i-1)은 더 작은 소수가 이미 처리됨)
- 바깥 루프 `i * i <= n`까지면 충분 (위 특징 2번 근거)

## 사례

### [boj-1929 소수 구하기](https://www.acmicpc.net/problem/1929)
- **도구**: 에라토스테네스의 체
- **문제 신호**: M 이상 N 이하의 모든 소수 출력 (1 ≤ M ≤ N ≤ 1,000,000)
- **핵심 활용**: 단일 `isPrime()` N번 호출은 O(N√N), N=10⁶에서 ~10⁹ 연산이라 빡셈. 체로 전처리하면 O(N log log N), 그 후 [M, N] 구간만 출력.
- **풀이**: TODO
