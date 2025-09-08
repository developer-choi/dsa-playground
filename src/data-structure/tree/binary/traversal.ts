import {BinaryTreeDirection, BinaryTreeNode, invertDirection} from '@/data-structure/tree/binary/index';

export type TraversalTreeType = DepthFirstTraversalType | BreadthFirstTraversalType;
export type BreadthFirstTraversalType = 'level-order' | 'spiral-order';
export type DepthFirstTraversalType = 'inorder' | 'reverse-inorder' | 'preorder' | 'postorder';

// 어떤 방법으로 순회를 하더라도 공통적으로 주입할 수 있는 데이터
export interface TraversalContext<D, A = undefined> extends InternalTraversalContext<D, A> {
  index: number;
}

export type InternalIterationItem<D, A = undefined> = Pick<TraversalContext<D, A>, 'node' | 'lastParent'>;

// 노드를 순회하는 방법에 따라 크게 달라지는 공통 핵심 데이터
interface InternalTraversalContext<D, A = undefined> {
  lastParent: undefined | {
    node: BinaryTreeNode<D>;
    direction: BinaryTreeDirection;
    accumulatedValue: A | undefined; // root면 없음.
  };
  node: BinaryTreeNode<D>;
  level: number;
}

export interface TraverseOptions<D, A, R = TraversalContext<D, A>> {
  traversal: TraversalTreeType;
  enricher?: (context: TraversalContext<D, A>) => R;
  accumulator?: (context: InternalTraversalContext<D, A>) => A;
}

type InternalTraverseOptions<D, A> = Omit<TraverseOptions<D, A>, 'enricher'>;

export function* traverseAllNodes<D, A = undefined, R = TraversalContext<D, A>>(node: BinaryTreeNode<D> | undefined, options: TraverseOptions<D, A, R>): Generator<R, void, undefined> {
  const {traversal, enricher} = options;
  const traverse = isBFS(traversal) ? traverseBreadthFirst(node, options) : traverseDepthFirst(node, options);
  const callback = enricher ?? ((context: TraversalContext<D, A>) => context as R);

  let index = 0;

  for (const context of traverse) {
    yield callback({
      ...context,
      index,
    });

    index++;
  }
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
function* traverseDepthFirst<D, A>(node: BinaryTreeNode<D> | undefined, options: InternalTraverseOptions<D, A>): Generator<InternalTraversalContext<D, A>, void, undefined> {
  const {traversal, accumulator} = options;
  const isReversed = traversal.startsWith('reverse-');
  const firstDirection: BinaryTreeDirection = isReversed ? 'right' : 'left';
  const secondDirection: BinaryTreeDirection = isReversed ? 'left' : 'right';

  function* recursive(node: BinaryTreeNode<D> | undefined, meta: Omit<InternalTraversalContext<D, A>, 'node'>): Generator<InternalTraversalContext<D, A>, void, undefined> {
    if (!node) {
      return node;
    }

    const context: InternalTraversalContext<D, A> = {node, level: meta.level, lastParent: meta.lastParent};
    const accumulatedValue = accumulator?.(context);

    if (traversal === 'preorder') {
      yield context;
    }

    yield* recursive(node[firstDirection], {
      level: meta.level + 1,
      lastParent: {node, direction: firstDirection, accumulatedValue},
    });

    if (traversal.endsWith('inorder')) {
      yield context;
    }

    yield* recursive(node[secondDirection], {
      level: meta.level + 1,
      lastParent: {node, direction: secondDirection, accumulatedValue},
    });

    if (traversal === 'postorder') {
      yield context;
    }
  }

  yield* recursive(node, {
    level: 0,
    lastParent: undefined,
  });
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-queue-iterarive-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> 모든 노드 1번씩 순회하는데 전부 1번씩만 순회했음.
 * Auxiliary Space: O(n/2) ==> O(n), 가장 메모리를 많이 쓸 때는 Complete Binary Tree에서 가장 마지막 레벨 순회할 때, 이 때 노드갯수는 전체갯수의 약 1/2 임.
 */
function* traverseBreadthFirst<D, A>(root: BinaryTreeNode<D> | undefined, options: InternalTraverseOptions<D, A>): Generator<InternalTraversalContext<D, A>, void, undefined> {
  if (!root) {
    return;
  }

  const {traversal, accumulator} = options;

  // 탐색해야하는 노드들
  let nextSearchQueue: InternalIterationItem<D, A>[] = [{node: root, lastParent: undefined}];
  let iteratingDirection: BinaryTreeDirection = traversal === 'level-order' ? 'right' : 'left';
  let level = 0;

  while (nextSearchQueue.length > 0) {
    const iterating = [...nextSearchQueue];
    nextSearchQueue = [];

    let i = iteratingDirection === 'right' ? 0 : iterating.length - 1;

    while (iteratingDirection === 'right' ? i < iterating.length : i >= 0) {
      const {node, lastParent} = iterating[i];
      const context: InternalTraversalContext<D, A> = {node, level, lastParent};

      yield context;

      const childDirections: BinaryTreeDirection[] = iteratingDirection === 'right' ? ['left', 'right'] : ['right', 'left'];

      // 다음 라벨에 또 순회해야하니 다음 레벨 노드들 저장
      childDirections.forEach(direction => {
        if (!node[direction]) {
          return;
        }

        const item: InternalIterationItem<D, A> = {
          node: node[direction],
          lastParent: {
            node,
            direction,
            accumulatedValue: accumulator?.(context),
          },
        };

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
