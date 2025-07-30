import {BinaryTreeNode} from '@/examples/data-structure/tree';

/**
 * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-stack-recursive-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function recursiveBreadthFirstTraversalTree<D>(root: BinaryTreeNode<D>): D[][] {
  let result: D[][] = [];

  function recursive(node: BinaryTreeNode<D>, level: number) {
    if (!result[level]) {
      result[level] = [node.data];

    } else {
      result[level].push(node.data);
    }

    if (node.left) {
      recursive(node.left, level + 1);
    }

    if (node.right) {
      recursive(node.right, level + 1);
    }
  }

  recursive(root, 0);

  return result;
}


/**
 * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-queue-iterarive-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function iterativeBreadthFirstTraversalTree<D>(root: BinaryTreeNode<D>): D[][] {
  // 탐색해야하는 노드들
  let toSearchQueue: BinaryTreeNode<D>[] = [root];
  let level = 0;
  const result: D[][] = [];

  while (toSearchQueue.length > 0) {
    result.push([]);
    let nextSearchQueue: BinaryTreeNode<D>[] = [];

    for (let i = 0; i < toSearchQueue.length; i++) {
      const node = toSearchQueue[i];

      // 탐색 됐으니 반환할 배열에 추가하고
      result[level].push(node.data);

      // 다음 라벨에 또 순회해야하니 다음 레벨 노드들 저장
      if (node.left) {
        nextSearchQueue.push(node.left);
      }

      if (node.right) {
        nextSearchQueue.push(node.right);
      }
    }
    toSearchQueue = nextSearchQueue;
    level++;
  }

  return result;
}
