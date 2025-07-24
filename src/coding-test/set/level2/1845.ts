/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42576
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 */
export function solution1845(nums: number[]): number {
  const set = new Set(nums);
  const half = nums.length / 2; // 문제 제한조건 상 항상 정수

  if (set.size > half) {
    return half;
  } else {
    return set.size;
  }
}
