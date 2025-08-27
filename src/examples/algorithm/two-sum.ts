import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {traverseAllNodes} from '@/examples/data-structure/tree/binary/traversal';

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-pair-with-given-sum-exists-in-array/
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 * @param array "정렬되지 않은" 배열
 * @PARAM target 체크할 2개를 더한 값
 * Time Complexity: O(n^2)
 */
export function bruteForceTwoSum(array: number[], target: number): boolean {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i === j) {
        continue;
      }

      if (array[i] + array[j] === target) {
        return true;
      }
    }
  }

  return false;
}

/*************************************************************************************************************
 * Two pointers 풀이법
 *************************************************************************************************************/

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-pair-with-given-sum-exists-in-array/#better-approach2-sorting-and-twopointer-technique-onlogn-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 * @param array "정렬되지 않은" 배열
 * @param target 체크할 2개를 더한 값
 * Time Complexity: O(nlogn) > 정렬하는데 nlogn, 순회하는데 n (양쪽 포인터가 중앙에서 만나는데, 총 순회 합은 n을 넘어갈 수 없음)
 */
export function twoPointersArrayTwoSum(array: number[], target: number): boolean {
  const sorted = array.toSorted((a, b) => a - b);
  return internalTwoPointer(sorted, target, value => value);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-pair-given-sum-bst/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * @param root BST가 주어짐
 * @param target 체크할 2개를 더한 값
 */
export function twoPointersBSTTwoSum(root: BinaryTreeNode<number> | undefined, target: number): boolean {
  /**
   * 이렇게 하면 노드를 한번 전체 순회 한 다음 다시 처음 요소부터 순회하며 로직이 실행된다는 단점이 있음.
   * 하지만 애초에 GFG 문제부터가 array로 변환 다음에 푸는거였음.
   */
  return internalTwoPointer([...traverseAllNodes(root, 'inorder')], target, item => item.node.data);
}

/*************************************************************************************************************
 * Set 풀이법
 *************************************************************************************************************/

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-pair-with-given-sum-exists-in-array/#expected-approach-using-hash-set-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 * @param array 정렬되지 않은 배열
 * @param target 체크할 2개를 더한 값
 * Time Complexity: O(n)
 */
export function setArrayTwoSum(array: number[], target: number): boolean {
  return internalSet(array, target, item => item);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-pair-given-sum-bst/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * @param root BST가 주어짐
 * @param target 체크할 2개를 더한 값
 */
export function setBSTTwoSum(root: BinaryTreeNode<number> | undefined, target: number): boolean {
  return internalSet(traverseAllNodes(root, 'inorder'), target, item => item.node.data);
}

/*************************************************************************************************************
 * 공통 함수
 *************************************************************************************************************/
/**
 * @param array 임의의 "정렬된" 배열
 * @param target 배열의 2개 요소를 더해서 이 값이 되는지를 체크할 값
 * @param getValue 배열 요소에서 숫자값을 추출할 콜백함수
 */
function internalTwoPointer<T>(array: T[], target: number, getValue: (data: T) => number): boolean {
  if (array.length < 2) {
    return false;
  }

  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex < rightIndex) {
    const leftValue = getValue(array[leftIndex]);
    const rightValue = getValue(array[rightIndex]);
    const result = leftValue + rightValue;

    if (result === target) {
      return true;
    }

    if (result < target) {
      leftIndex++;
    } else {
      rightIndex--;
    }
  }

  return false;
}

function internalSet<T>(collection: Iterable<T>, target: number, dataToNumber: (item: T) => number) {
  const set = new Set<number>();

  for (const item of collection) {
    const data = dataToNumber(item);

    if (set.has(data)) {
      return true;
    } else {
      set.add(target - data);
    }
  }

  return false;
}
