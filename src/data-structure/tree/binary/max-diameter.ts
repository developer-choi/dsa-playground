import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {traverseAllNodes} from '@/data-structure/tree/binary/traversal';

export function getHeightDiameter<D>(root: BinaryTreeNode<D> | undefined) {
  let maxHeight = 0;

  for (const {node} of traverseAllNodes(root, 'inorder')) {
    const leftHeight = getHeightOfNode(node?.left);
    const rightHeight = getHeightOfNode(node?.left);
    console.log(node.data, leftHeight, rightHeight);
    const sum = leftHeight + rightHeight;

    if (maxHeight < sum) {
      maxHeight = sum;
    }
  }

  return maxHeight;
}

export function getHeightOfNode(node: BinaryTreeNode<any> | undefined): number {
  function recursive(node: BinaryTreeNode<any> | undefined): number {
    if (node === undefined) {
      return 0;
    }

    const leftHeight = recursive(node.left) + 1;
    const rightHeight = recursive(node.right) + 1;
    return Math.max(leftHeight, rightHeight);
  }

  return recursive(node) - 1;
}
