import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {determineBstDirection, getSuccessor} from '@/examples/data-structure/tree/binary-search';

export function inorderBST(root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  if (root === undefined) {
    return undefined;
  }

  const history: number[] = [];

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (!node) {
      return;
    }

    if (node.data !== target) {
      history.unshift(node.data);
      const direction = determineBstDirection(node, target);
      return recursive(node[direction]);
    }

    // Case 1. node.right 가 있는 경우
    if (node.right !== undefined) {
      return getSuccessor(node).data;
      // Case 2. node.right가 없는 경우
    } else {
      return history.find(value => value > node.data);
    }
  }

  return recursive(root);
}
