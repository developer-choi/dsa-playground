import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-the-nearest-smaller-numbers-on-left-side-in-an-array/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0
 */
export default function findNearestSmallerNumberOnLeftSide(input: number[]): number[] {
  // TODO 오름차순 되겠는데?
  let candidates = new StackUsingLinkedList<number>();
  const result: number[] = [];

  // [1, 5, 0, 3, 5, 2]

  for (let i = 0; i < input.length; i++) {
    const target = input[i];

    if (candidates.length === 0) {
      result.push(-1);
    }

    // candidates에 후보를 추가할지 따짐
    const next = input[i + 1];

    if ((i + 1) >= input.length) {
      continue;
    }

    if (target < next) {
      candidates.push(target);
    }
  }

  return result;
}