import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-the-nearest-smaller-numbers-on-left-side-in-an-array/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0
 */
export default function findNearestSmallerNumberOnLeftSide(input: number[]): number[] {
  let candidates = new StackUsingLinkedList<number>();
  const result: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const target = input[i];

    /** Point 2. pop() 한 값이, 조건에 안맞으면 걍 버려도 됨. (else 문 따로 없음)
     * 1. target 보다 우측에 있는 놈들의 가장 가깝게 작은놈이 "최소 target임"
     * 2. pop() 했는데 target 보다 크다면, 후보조차 될 수 없음. target이 되면 됐지.
     */
    while (candidates.length && (candidates.peek() as number) >= target) {
      candidates.pop();
    }

    if (candidates.length > 0) {
      const top = candidates.peek() as number;
      result.push(top);
    } else {
      result.push(-1);
    }

    /** Point 1. 배열의 좌측을 다 탐색하는게 아니라, 후보만 추려서 뒤질거임.
     * 그래서 비교를 훨씬 덜 해도 됨.
     * 그대신 후보를 아주 까다로운 조건으로 따져서 넣는거임.
     */
    candidates.push(target);
  }

  return result;
}
