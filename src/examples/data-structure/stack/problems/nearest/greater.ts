import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

/**
 * URL: https://www.geeksforgeeks.org/dsa/next-greater-element/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0
 */
export default function findNearestSmallerNumberOnRightSide(input: number[]): number[] {
  const result: number[] = [];
  const candidates = new StackUsingLinkedList<number>();

  for (let i = input.length - 1; i >= 0; i--) {
    const target = input[i];

    while (candidates.length) {
      const top = candidates.peek() as number;

      if (target < top) {
        result.unshift(top);
        candidates.push(target);
        break;
      } else {
        candidates.pop();
      }
    }

    if (!candidates.length) {
      result.unshift(-1);
      candidates.push(target);
    }
  }

  return result;
}
