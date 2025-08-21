import {BinaryTreeNode} from '@/examples/data-structure/tree/binary/index';
import {BinaryTreeDirection} from '@/examples/data-structure/tree/binary/index';

export type TraversalTreeType = DepthFirstTraversalType | 'breadth-first';

export function* traverseTree<D>(node: BinaryTreeNode<D> | undefined, traversal: TraversalTreeType): Generator<TraversalContext<D>, void, undefined> {
  if (traversal === 'breadth-first') {
    yield* breadthFirstTraversal(node);
  } else {
    yield* depthFirstTraversal(node, traversal);
  }
}

export type DepthFirstTraversalType = 'inorder' | 'preorder' | 'postorder';

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/preorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/postorder-traversal-of-binary-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> n개 노드 순회하는데 O(n)이 걸림.
 * Auxiliary Space: O(h) ==> 재귀라서 레벨 h 만큼의 스택이 생기기 때문. 최악은 O(n). skewed tree
 *
 * @description inorder라고 해서 진짜 inorder 순으로 노드를 방문하는건 아님. 처음에 root에서 제일 작은노드로 찾아가는 과정은 당연히 있음;
 */
export function* depthFirstTraversal<D>(node: BinaryTreeNode<D> | undefined, traversal: DepthFirstTraversalType): Generator<TraversalContext<D>, void, undefined> {
  let index = 0;

  function* recursive(node: BinaryTreeNode<D> | undefined, level: number, parent: InternalIterationItem<D>['parent']): Generator<TraversalContext<D>, void, undefined> {
    if (!node) {
      return node;
    }

    if (traversal === 'preorder') {
      yield {node, level, index, parent};
      index++;
    }

    yield* recursive(node.left, level + 1, {node, direction: 'left'});

    if (traversal === 'inorder') {
      yield {node, level, index, parent};
      index++;
    }

    yield* recursive(node.right, level + 1, {node, direction: 'right'});

    if (traversal === 'postorder') {
      yield {node, level, index, parent};
      index++;
    }
  }

  yield* recursive(node, 0, undefined);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-queue-iterarive-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> 모든 노드 1번씩 순회하는데 전부 1번씩만 순회했음.
 * Auxiliary Space: O(n/2) ==> O(n), 가장 메모리를 많이 쓸 때는 Complete Binary Tree에서 가장 마지막 레벨 순회할 때, 이 때 노드갯수는 전체갯수의 약 1/2 임.
 */
export function* breadthFirstTraversal<D>(root: BinaryTreeNode<D> | undefined): Generator<TraversalContext<D>, void, undefined> {
  if (!root) {
    return;
  }

  // 탐색해야하는 노드들
  const nextSearchQueue: InternalIterationItem<D>[] = [{node: root, parent: undefined}];
  let level = 0;
  let index = 0;

  while (nextSearchQueue.length > 0) {
    const iterativeCount = nextSearchQueue.length;

    for (let i = 0; i < iterativeCount; i++) {
      const {node, parent} = nextSearchQueue.shift() as InternalIterationItem<D>;

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

export interface TraversalContext<D> {
  parent: undefined | {
    node: BinaryTreeNode<D>;
    direction: BinaryTreeDirection;
  };
  node: BinaryTreeNode<D>;
  level: number,
  index: number
}

export interface InternalIterationItem<D> {
  parent: undefined | {
    node: BinaryTreeNode<D>;
    direction: BinaryTreeDirection;
  };
  node: BinaryTreeNode<D>;
}
