import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

/**
 * URL: https://www.geeksforgeeks.org/dsa/the-stock-span-problem/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0
 */
export function stockSpanUsingLoop(input: number[]): number[] {
  const answer: number[] = [];

  for (let i = 0; i < input.length; i++) {
    let count = 1;
    const current = input[i];

    for (let j = i - 1; j >= 0; j--) {
      const value = input[j];

      if (value <= current) {
        count++;
      } else {
        break;
      }
    }
    answer.push(count);
  }

  return answer;
}

export function stockSpanUsingStack(input: number[]): number[] {
  // Point 3. candidate는 index만 저장한다. 연속적인 값의 갯수를 세지않고, 좌측으로 가장 가깝게 더 큰 값을 찾아서 index 서로 빼면 그 사이 갯수 나오니까.
  const candidates = new StackUsingLinkedList<number>();
  const result: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const target = input[i];

    while (candidates.length) {
      const topIndex = candidates.peek() as number;
      const topValue = input[topIndex];

      if (topValue > target) {
        result.push(i - topIndex);

        candidates.push(i);
        break;
      } else {
        /** Point 2. pop() 한 값이, 조건에 안맞으면 걍 버려도 됨.
         * 1. target 보다 좌측에 있는 놈들의 가장 가깝게 큰놈이 "최소 target임"
         * 2. 후보에서 pop()한 값이 target 보다 작다면, 후보조차 될 수 없음. target이 되면 됐지.
         */
        candidates.pop();
      }
    }

    if (!candidates.length) {
      /** Point 1. 배열의 좌측을 다 탐색하는게 아니라, 후보만 추려서 뒤질거임.
       * 그래서 비교를 훨씬 덜 해도 됨.
       * 그대신 후보를 아주 까다로운 조건으로 따져서 넣는거임.
       */
      candidates.push(i);
      // Point 4. target 보다 큰 수가 왼쪽에 하나도없다는 뜻이기 때문에, target의 index가 곧 연속 증가 갯수를 뜻함.
      result.push(i + 1);
    }
  }

  return result;
}
