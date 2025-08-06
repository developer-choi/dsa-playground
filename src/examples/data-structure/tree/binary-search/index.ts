import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {BinaryTreeDirection} from '@/examples/data-structure/tree';

export function determineBstDirection(node: BinaryTreeNode<number>, data: number): BinaryTreeDirection {
  return node.data > data ? 'left' : 'right';
}
