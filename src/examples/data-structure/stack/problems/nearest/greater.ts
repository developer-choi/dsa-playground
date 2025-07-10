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
        candidates.pop();
      }
    }

    if (!candidates.length) {
      // result[i] = -1; 이거 안해도 fill(-1)로 해서 괜찮음
      candidates.push(target);
    }
  }

  return result;
}
