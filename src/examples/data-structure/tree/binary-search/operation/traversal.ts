import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {
  TraversalContext, InternalIterationItem,
} from '@/examples/data-structure/tree/complete-binary/operation/traversal';
import {determineBstDirection} from '@/examples/data-structure/tree/binary-search';

export function* traversalBST(root: BinaryTreeNode<number> | undefined, target: number): Generator<TraversalContext<number>> {
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
