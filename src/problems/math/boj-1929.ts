export function sieve(n: number): number[] {
  const result: number[] = [];

  for (let i = 1; i <= n; i++) {
    if (isSoSoo(i)) {
      result.push(i);
    }
  }

  return result;
}

function isSoSoo(value: number): boolean {
  if (value === 2) {
    return true;
  }

  if (value === 1 || value % 2 === 0) {
    return false;
  }

  for (let i = 3; i < value; i++) {
    if (value % i === 0) {
      return false;
    }
  }

  return true;
}
