import StackUsingLinkedList from '@/data-structure/stack/StackUsingLinkedList';
import {SortParam, SortResult} from '@/algorithm/sort';

/**
 * URL: https://www.geeksforgeeks.org/dsa/sort-stack-using-temporary-stack/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0
 */
export default function sortUsingStack({value, order}: SortParam): SortResult {
  const input: StackUsingLinkedList<number> = new StackUsingLinkedList();
  value.forEach(data => {
    input.push(data);
  });
  /*************************************************************************************************************
   * 위 코드블록은, 일부러 테스트 케이스를 정렬알고리즘과 똑같이 맞추려고 잠시 타입변환을 했을 뿐입니다.
   *************************************************************************************************************/

  const tempStack = new StackUsingLinkedList<number>();

  while (input.length > 0) {
    const compare = input.pop();

    while(tempStack.length > 0) {
      const last = tempStack.peek() as number;
      const isTrue = order === 'asc' ? last <= compare : last >= compare;

      if (isTrue) {
        tempStack.push(compare);
        break;
      } else {
        // stack을 다시 처음부터 쌓기 위해 compare 과 비교해서 잘못된것들을 다시 다 input에 넣기 위함
        tempStack.pop();
        input.push(last);
      }
    }

    if (tempStack.length === 0) {
      tempStack.push(compare);
    }
  }

  /*************************************************************************************************************
   * 아래 코드블록은, 일부러 테스트 케이스를 정렬알고리즘과 똑같이 맞추려고 잠시 타입변환을 했을 뿐입니다.
   *************************************************************************************************************/
  return {
    output: tempStack.toArray()
  };
}
