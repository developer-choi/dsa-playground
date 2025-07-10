import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

/**
 * URL: https://www.geeksforgeeks.org/dsa/next-greater-element/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0
 */
export default function findNearestSmallerNumberOnRightSide(input: number[]): number[] {
  // 이렇게 해서 index에 직접 집어넣는게 unshift() 하는것보다 이득임.
  const result: number[] = new Array(input.length).fill(-1);
  const candidates = new StackUsingLinkedList<number>();

  for (let i = input.length - 1; i >= 0; i--) {
    const target = input[i];

    while (candidates.length) {
      const top = candidates.peek() as number;

      if (target < top) {
        result[i] = top;
        candidates.push(target);
        break;
      } else {
        /** Point 2. pop() 한 값이, 조건에 안맞으면 걍 버려도 됨.
         * 1. target 보다 좌측에 있는 놈들의 가장 가깝게 큰놈이 "최소 target임"
         * 2. 후보에서 pop()한 값이 target 보다 작다면, 후보조차 될 수 없음. target이 되면 됐지.
         */
        candidates.pop();
      }
    }

    /** Point 1. 배열의 좌측을 다 탐색하는게 아니라, 후보만 추려서 뒤질거임.
     * 그래서 비교를 훨씬 덜 해도 됨.
     * 그대신 후보를 아주 까다로운 조건으로 따져서 넣는거임.
     */
    if (!candidates.length) {
      // result[i] = -1; 이거 안해도 fill(-1)로 해서 괜찮음
      candidates.push(target);
    }
  }

  return result;
}
