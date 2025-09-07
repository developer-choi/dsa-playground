import {BinaryTreeDirection, BinaryTreeNode, invertDirection} from '@/data-structure/tree/binary/index';

export type TraversalTreeType = DepthFirstTraversalType | BreadthFirstTraversalType;
export type BreadthFirstTraversalType = 'level-order' | 'spiral-order';
export type DepthFirstTraversalType = 'inorder' | 'preorder' | 'postorder';

export interface ParentBinaryTreeNode<D> {
  node: BinaryTreeNode<D>;
  direction: BinaryTreeDirection;
}

export interface TraversalContext<D> {
  lastParent: undefined | ParentBinaryTreeNode<D>;
  parents: ParentBinaryTreeNode<D>[];
  node: BinaryTreeNode<D>;
  level: number,
  index: number
}

export type InternalIterationItem<D> = Pick<TraversalContext<D>, 'node' | 'parents' | 'lastParent'>;

/**
 * @description Binary Tree의 모든 노드를 순회합니다.
 * @param node 순회할 노드들의 루트노드
 * @param traversal 순회 방법 (DFS, BFS)
 */
export function* traverseAllNodes<D>(node: BinaryTreeNode<D> | undefined, traversal: TraversalTreeType): Generator<TraversalContext<D>, void, undefined> {
  if (isBFS(traversal)) {
    yield* traverseBreadthFirst(node, traversal);
  } else {
    yield* traverseDepthFirst(node, traversal);
  }
}

export function* reverseInorderTraverseAllNodes<D>(node: BinaryTreeNode<D> | undefined): Generator<TraversalContext<D>, void, undefined> {
  let index = 0;

  function* recursive(node: BinaryTreeNode<D> | undefined, level: number, parents: InternalIterationItem<D>['parents']): Generator<TraversalContext<D>, void, undefined> {
    if (!node) {
      return node;
    }

    yield* recursive(node.right, level + 1, parents.concat({node, direction: 'right'}));

    yield {node, level, index, parents, lastParent: parents[parents.length - 1]};
    index++;

    yield* recursive(node.left, level + 1, parents.concat({node, direction: 'left'}));
  }

  yield* recursive(node, 0, []);
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
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
function* traverseDepthFirst<D>(node: BinaryTreeNode<D> | undefined, traversal: DepthFirstTraversalType): Generator<TraversalContext<D>, void, undefined> {
  let index = 0;

  function* recursive(node: BinaryTreeNode<D> | undefined, level: number, parents: InternalIterationItem<D>['parents']): Generator<TraversalContext<D>, void, undefined> {
    if (!node) {
      return node;
    }

    const context: TraversalContext<D> = {node, level, index, parents, lastParent: parents[parents.length - 1]};

    if (traversal === 'preorder') {
      yield context;
      index++;
    }

    yield* recursive(node.left, level + 1, parents.concat({node, direction: 'left'}));

    if (traversal === 'inorder') {
      yield context;
      index++;
    }

    yield* recursive(node.right, level + 1, parents.concat({node, direction: 'right'}));

    if (traversal === 'postorder') {
      yield context;
      index++;
    }
  }

  yield* recursive(node, 0, []);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-queue-iterarive-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> 모든 노드 1번씩 순회하는데 전부 1번씩만 순회했음.
 * Auxiliary Space: O(n/2) ==> O(n), 가장 메모리를 많이 쓸 때는 Complete Binary Tree에서 가장 마지막 레벨 순회할 때, 이 때 노드갯수는 전체갯수의 약 1/2 임.
 */
function* traverseBreadthFirst<D>(root: BinaryTreeNode<D> | undefined, traversal: BreadthFirstTraversalType): Generator<TraversalContext<D>, void, undefined> {
  if (!root) {
    return;
  }

  // 탐색해야하는 노드들
  let nextSearchQueue: InternalIterationItem<D>[] = [{node: root, parents: [], lastParent: undefined}];
  let iteratingDirection: BinaryTreeDirection = traversal === 'level-order' ? 'right' : 'left';
  let level = 0;
  let index = 0;

  while (nextSearchQueue.length > 0) {
    const iterating = [...nextSearchQueue];
    nextSearchQueue = [];

    let i = iteratingDirection === 'right' ? 0 : iterating.length - 1;

    while (iteratingDirection === 'right' ? i < iterating.length : i >= 0) {
      const {node, parents, lastParent} = iterating[i];

      yield {node, parents, lastParent, level, index};
      index++;

      const childDirections: BinaryTreeDirection[] = iteratingDirection === 'right' ? ['left', 'right'] : ['right', 'left'];

      // 다음 라벨에 또 순회해야하니 다음 레벨 노드들 저장
      childDirections.forEach(direction => {
        if (!node[direction]) {
          return;
        }

        const lastParent: ParentBinaryTreeNode<D> = {node, direction};
        const item: InternalIterationItem<D> = {node: node[direction], parents: parents.concat({node, direction}), lastParent};

        if (iteratingDirection === 'right') {
          nextSearchQueue.push(item);
        } else {
          nextSearchQueue.unshift(item);
        }
      });

      if (iteratingDirection === 'right') {
        i++;
      } else {
        i--;
      }
    }

    level++;

    if (traversal === 'spiral-order') {
      iteratingDirection = invertDirection(iteratingDirection);
    }
  }
}

function isBFS(traversal: TraversalTreeType): traversal is BreadthFirstTraversalType {
  return traversal === 'level-order' || traversal === 'spiral-order';
}
