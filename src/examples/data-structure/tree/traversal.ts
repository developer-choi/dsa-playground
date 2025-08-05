import {BinaryTreeNode} from '@/examples/data-structure/tree/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/preorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/find-the-maximum-depth-or-height-of-a-tree/
 * URL: https://www.geeksforgeeks.org/dsa/postorder-traversal-of-binary-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> n개 노드 순회하는데 O(n)이 걸림.
 * Auxiliary Space: O(h) ==> 재귀라서 레벨 h 만큼의 스택이 생기기 때문. 최악은 O(n). skewed tree
 */
export function depthFirstTraversal<D>(root: BinaryTreeNode<D> | undefined, traversal: 'inorder' | 'preorder' | 'postorder') {
  if (!root) {
    return {
      array: [],
      maxHeight: -1
    };
  }

  const array: D[] = [];

  // traversal 로직 하나로 이만큼의 추가정보를 알아낼 수 있다는 뜻
  let maxHeight = 0;
  // let length, 순회하면서 하나씩 더하면 전체 노드의 갯수 알아낼 수 있고, > https://www.geeksforgeeks.org/dsa/write-a-c-program-to-calculate-size-of-a-tree/
  // n보다 크거나 작거나 같은 탐색도 순회하면서 할 수 있고 > https://www.geeksforgeeks.org/dsa/find-maximum-or-minimum-in-binary-tree/
  // let sum = 0; 노드 총합 다 더하는것도 당연히 가능하고 > https://www.geeksforgeeks.org/dsa/check-if-a-given-binary-tree-is-sumtree/

  function inorder(current: BinaryTreeNode<D>, height: number) {
    maxHeight = Math.max(height, maxHeight);

    if (current.left) {
      inorder(current.left, height + 1);
    }

    array.push(current.data);

    if (current.right) {
      inorder(current.right, height + 1);
    }
  }

  function preorder(current: BinaryTreeNode<D>, height: number) {
    maxHeight = Math.max(height, maxHeight);
    array.push(current.data);

    if (current.left) {
      preorder(current.left, height + 1);
    }

    if (current.right) {
      preorder(current.right, height + 1);
    }
  }

  function postorder(current: BinaryTreeNode<D>, height: number) {
    maxHeight = Math.max(height, maxHeight);
    if (current.left) {
      postorder(current.left, height + 1);
    }

    if (current.right) {
      postorder(current.right, height + 1);
    }

    array.push(current.data);
  }

  const map = {
    inorder,
    preorder,
    postorder
  };

  map[traversal](root, 0);

  return {
    array,
    maxHeight
  };
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-queue-iterarive-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> 모든 노드 1번씩 순회하는데 전부 1번씩만 순회했음.
 * Auxiliary Space: O(n/2) ==> O(n), 가장 메모리를 많이 쓸 때는 Complete Binary Tree에서 가장 마지막 레벨 순회할 때, 이 때 노드갯수는 전체갯수의 약 1/2 임.
 */
export function* breadthFirstTraversal<D>(root: BinaryTreeNode<D> | undefined): Generator<{
  node: BinaryTreeNode<D>,
  parent: InternalInterationItem<D>['parent'],
  level: number,
  index: number
}, void, undefined> {
  if (!root) {
    return;
  }

  // 탐색해야하는 노드들
  const nextSearchQueue: InternalInterationItem<D>[] = [{node: root, parent: undefined}];
  let level = 0;
  let index = 0;

  while (nextSearchQueue.length > 0) {
    const iterativeCount = nextSearchQueue.length;

    for (let i = 0; i < iterativeCount; i++) {
      const {node, parent} = nextSearchQueue.shift() as InternalInterationItem<D>;

      yield {node, parent, level, index};
      index++;

      // 다음 라벨에 또 순회해야하니 다음 레벨 노드들 저장
      if (node.left) {
        nextSearchQueue.push({node: node.left, parent: {node, direction: 'left'}});
      }

      if (node.right) {
        nextSearchQueue.push({node: node.right, parent: {node, direction: 'right'}});
      }
    }
    level++;
  }
}

export interface InternalInterationItem<D> {
  node: BinaryTreeNode<D>,
  parent: undefined | {
    node: BinaryTreeNode<D>;
    direction: 'left' | 'right';
  };
}
