import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {recursiveInsertBST} from '@/examples/data-structure/tree/binary/search/insertion';

/**
 * URL: https://www.geeksforgeeks.org/dsa/construct-bst-from-given-preorder-traversa/#naive-one-by-one-insert
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(n * h), 1회 넣을 때 = O(h) 그 갯수 = O(n)
 * Auxiliary Space: O(1)
 *
 * 이 방식을 Preorder 방식이라고 함.
 * @description 만약, 정렬된 BST를 만들고 싶다면, array-to-balanced-tree.ts 참고.
 */
export function recursiveArrayToBST([first, ...rest]: number[]): BinaryTreeNode<number> | undefined {
  if (first === undefined) {
    return undefined;
  }

  const root = new BinaryTreeNode(first);

  for (const data of rest) {
    recursiveInsertBST(root, data);
  }

  return root;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/construct-bst-from-given-preorder-traversa/#better-find-the-first-greater-than-root
 * 문제의 설명: 0번째 요소보다 처음으로 큰 요소를 찾아서, 0번째 ~ 처음으로 큰 요소 사이는 좌측노드로 오는걸로 친다.
 *
 * 이 풀이는, 배열이 "전위 순회 결과" 일 때에만 잘 동작하는 치명적인 문제가 있음.
 * [10, 5, 1, 7, 40, 50] 처럼, 10 보다 처음으로 큰 요소인 40 뒤로 10보다 작은 요소가 없어야함.
 * [10, 5, 1, 7, 40, 50, 2, 3, 4] 같은 인풋이 들어가면, BST를 만들 수 없음.
 * (공식문서 코드 가져와서 이 인풋 넣고 실제로 코드 돌려봤음)
 *
 * https://www.geeksforgeeks.org/dsa/construct-bst-from-given-preorder-traversa/#naive-one-by-one-insert
 * 이것도 같은 아웃풋을 내는 가장 기본적인 알고리즘인데,
 * 여기서는 [10, 5, 1, 7, 40, 50, 2, 3, 4] 같은 인풋이 들어와도 아웃풋 잘만 만듬.
 */

/**
 * https://www.geeksforgeeks.org/dsa/construct-bst-from-given-preorder-traversa/#efficient-pass-range-in-recursion
 * 이 코드도 위와 동일함.
 * 정답지 코드 가져와서 [10, 5, 1, 7, 40, 50, 2, 3, 4] 인풋넣고 돌려보면 아웃풋이 이상하게 나옴. 2, 3, 4가 아예 노드에서 빠져버림.
 *
 * 이 풀이, 위 풀이는 배열이 특별한 조건을 만족할 때에만 유효한 풀이이기 때문에 추후에 배우기로 했음.
 */

/**
 * https://www.geeksforgeeks.org/dsa/construct-bst-from-given-preorder-traversa/#naive-one-by-one-insert
 * 여기 코드이긴 한데,
 * https://www.geeksforgeeks.org/dsa/insertion-in-binary-search-tree/
 * 여기랑 사실상 같음.
 */
export function officialArrayToBST(array: number[]) {
  let root: BinaryTreeNode<number> | undefined = undefined;
  for (let data of array) {
    root = insertBST(root, data);
  }
  return root;
}

function insertBST(root: BinaryTreeNode<number> | undefined, data: number) {
  if (root === undefined) {
    return new BinaryTreeNode(data);
  }

  if (root.data > data) {
    root.left = insertBST(root.left, data);
  } else if (root.data < data) {
    root.right = insertBST(root.right, data);
  }
  return root;
}
