export function sieve(n: number): number[] {
  const composites: boolean[] = new Array(n + 1).fill(false);
  const primes: number[] = [];

  for (let i = 2; i <= n; i++) {
    if (!composites[i]) {
      primes.push(i);

      for (let j = i * 2 ; j <= n; j += i) {
        composites[j] = true;
      }
    }
  }

  return primes;
}
