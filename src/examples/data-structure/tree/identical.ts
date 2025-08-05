import {BinaryTreeNode} from '@/examples/data-structure/tree/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/write-c-code-to-determine-if-two-trees-are-identical/
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 */
export function areTreesIdenticalWithDFS<D>(root1: BinaryTreeNode<D>, root2: BinaryTreeNode<D>): boolean {
  function recursive(node1: BinaryTreeNode<D>, node2: BinaryTreeNode<D>): boolean {
    if (!areNodesIdentical(node1, node2)) {
      return false;
    }

    let identical: boolean | undefined;

    if (node1.left) {
      identical = recursive(node1.left, node2.left as BinaryTreeNode<D>);
    }

    if (identical === false) {
      return false;
    }

    if (node1.right) {
      identical = recursive(node1.right, node2.right as BinaryTreeNode<D>);
    }

    if (identical === false) {
      return false;
    }

    return true;
  }

  return recursive(root1, root2);
}

export function areTreesIdenticalWithBFS<D>(root1: BinaryTreeNode<D>, root2: BinaryTreeNode<D>): boolean {
  if (root1.data !== root2.data) {
    return false;
  }

  let nextSearchQueue1: BinaryTreeNode<D>[] = [root1];
  let nextSearchQueue2: BinaryTreeNode<D>[] = [root2];

  while (nextSearchQueue1.length) {
    let iterativeCount = nextSearchQueue1.length;

    for (let i = 0; i < iterativeCount; i++) {
      const node1 = nextSearchQueue1.shift() as BinaryTreeNode<D>;
      const node2 = nextSearchQueue2.shift() as BinaryTreeNode<D>;

      if (!areNodesIdentical(node1, node2)) {
        return false;
      }

      if (node1.left) {
        nextSearchQueue1.push(node1.left);
        nextSearchQueue2.push(node2.left as BinaryTreeNode<D>);
      }

      if (node1.right) {
        nextSearchQueue1.push(node1.right);
        nextSearchQueue2.push(node2.right as BinaryTreeNode<D>);
      }
    }
  }

  return true;
}

/**
 * 데이터는 같아야하고,
 * left / right는 없을거면 다같이없고, 있을거면 다같이 있어야함.
 */
function areNodesIdentical<D>(node1: BinaryTreeNode<D>, node2: BinaryTreeNode<D>) {
  return node2.data === node1.data && !!node2.left == !!node1.left && !!node2.right === !!node1.right;
}
