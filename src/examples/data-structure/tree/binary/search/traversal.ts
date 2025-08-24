import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {InternalIterationItem, TraversalContext,} from '@/examples/data-structure/tree/binary/traversal';
import {determineBstDirection} from '@/examples/data-structure/tree/binary/search/index';

export function* traverseBST(root: BinaryTreeNode<number> | undefined, target: number): Generator<TraversalContext<number>> {
  if (!root) {
    return;
  }

  let nextSearchNode: BinaryTreeNode<number> = root;
  let parent: InternalIterationItem<number>['parent'] = undefined;
  let level: number = 0;
  let index = 0;

  while (true) {
    yield {node: nextSearchNode, level, parent, index};
    index++;

    if (nextSearchNode.data === target) {
      break;
    }

    const direction: 'left' | 'right' = determineBstDirection(nextSearchNode, target);

    if (!nextSearchNode[direction]) {
      break;

    } else {
      level++;
      parent = {
        node: nextSearchNode,
        direction
      };
      nextSearchNode = nextSearchNode[direction];
    }
  }
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/print-bst-keys-in-given-range-o1-space/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 */
export function* traverseBstInRange(root: BinaryTreeNode<number> | undefined, range?: {max?: number, min?: number}): Generator<TraversalContext<number>> {
  const max = range?.max ?? Infinity;
  const min = range?.min ?? -Infinity;
  let index = 0;

  function* recursive(node: BinaryTreeNode<number> | undefined, level: number, parent: InternalIterationItem<number>['parent']): Generator<TraversalContext<number>> {
    if (!node) {
      return;
    }

    if (min < node.data) {
      yield* recursive(node.left, level + 1, {node, direction: 'left'});
    }

    if (min <= node.data && node.data <= max) {
      yield {node, index, level, parent};
      index++;
    }

    if (node.data < max) {
      yield* recursive(node.right, level + 1, {node, direction: 'right'});
    }
  }

  yield* recursive(root, 0, undefined);
}
