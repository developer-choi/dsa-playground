import {union} from '@/examples/data-structure/set/index';

export function bruteForceUnion(a: number[], b: number[]): number[] {
  const result: number[] = [];

  for (const data of a) {
    if (!result.includes(data)) {
      result.push(data);
    }
  }

  for (const data of b) {
    if (!result.includes(data)) {
      result.push(data);
    }
  }

  return result;
}

export function unionSet(a: number[], b: number[]): number[] {
  // Nodejs v22 부터는 이 코드 사용
  // return [...(new Set(a).union(new Set(b))];
  return [...union(new Set(a), new Set(b))];
}
