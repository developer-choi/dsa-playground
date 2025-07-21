import {intersection} from '@/examples/data-structure/set/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/intersection-of-two-arrays/#naive-approach-on3-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O(a*b*c)가 맞음. 3중루프. 여기서 c는 result의 길이.
 */
export function bruteForceTripleLoopIntersection(a: number[], b: number[]): number[] {
  let larger = a;
  let shorter = b;

  if (a.length < b.length) {
    [larger, shorter] = [shorter, larger];
  }

  const result: number[] = [];

  // Point 1. 짧은걸 기준으로 돌림. 서로 길이 비교해서 긴쪽은 어차피 서로 대조할 필요 없으니까.
  for (let i = 0; i < shorter.length; i++) {
    const target = shorter[i];

    if (larger.includes(target) && !result.includes(target)) {
      result.push(target);
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/intersection-of-two-arrays/#better-approach-on2-time-and-on-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O(a*b) 가 맞음. 2중루프. 직전 brute-force-triple-loop에서 개선된건 result.has() 부분이 O(1)로 바뀌어서 3중루프에서 2중루프 됨.
 */
export function bruteForceSetIntersection(a: number[], b: number[]): number[] {
  let larger = a;
  let shorter = b;

  if (a.length < b.length) {
    [larger, shorter] = [shorter, larger];
  }

  const result = new Set<number>();

  // Point 1. 짧은걸 기준으로 돌림. 서로 길이 비교해서 긴쪽은 어차피 서로 대조할 필요 없으니까.
  for (let i = 0; i < shorter.length; i++) {
    const target = shorter[i];

    if (larger.includes(target) && !result.has(target)) {
      result.add(target);
    }
  }

  return [...result];
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/intersection-of-two-arrays/#expected-approach-1-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O(n) 가 맞음. 1중루프. 직전 brute-force-set 에서 개선된건 larger에 교집합값이 있는지 순회하는게 O(1)로 줄어듬.
 */
export function twoSetsIntersection(a: number[], b: number[]): number[] {
  // Nodejs v22 부터는 이 코드 사용
  // return (new Set(a)).intersection(new Set(b));

  return [...intersection(new Set(a), new Set(b))];
}
