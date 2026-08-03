export function sieve(n: number): number[] {
  const composites: boolean[] = new Array(n + 1).fill(false);
  const primes: number[] = [];

  for (let i = 2; i <= n; i++) {
    if (!composites[i]) {
      primes.push(i);

      if (i * i <= n) {
        for (let j = i * i ; j <= n; j += i) {
          composites[j] = true;
        }
      }
    }
  }

  return primes;
}
