import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';

export type BSTDirection = 'left' | 'right';

export function determineBstDirection(node: BinaryTreeNode<number>, data: number): BSTDirection {
  return node.data > data ? 'left' : 'right';
}
