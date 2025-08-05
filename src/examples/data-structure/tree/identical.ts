import {BinaryTreeNode} from '@/examples/data-structure/tree/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/write-c-code-to-determine-if-two-trees-are-identical/
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 */
export function areTreesIdenticalWithDFS<D>(root1: BinaryTreeNode<D> | undefined, root2: BinaryTreeNode<D> | undefined): boolean {
  function recursive(node1: BinaryTreeNode<D> | undefined, node2: BinaryTreeNode<D> | undefined): boolean {
    if (node1 === undefined && node2 === undefined) {
      return true;
    }

    if (!areNodesIdentical(node1, node2)) {
      return false;
    }

    // Point 여기서 === 연산자 쓰면 안되고, && 써야함. 둘 다 true여야하기 때문.
    return recursive(node1?.left, node2?.left) && recursive(node1?.left, node2?.left)
  }

  return recursive(root1, root2);
}

export function areTreesIdenticalWithBFS<D>(root1: BinaryTreeNode<D> | undefined, root2: BinaryTreeNode<D> | undefined): boolean {
  if (!areNodesIdentical(root1, root2)) {
    return false;
  }

  let nextSearchQueue1: BinaryTreeNode<D>[] = [root1 as BinaryTreeNode<D>];
  let nextSearchQueue2: BinaryTreeNode<D>[] = [root2 as BinaryTreeNode<D>];

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
function areNodesIdentical<D>(node1: BinaryTreeNode<D> | undefined, node2: BinaryTreeNode<D> | undefined) {
  if (node1 === undefined && node2 === undefined) {
    return true;
  }

  if (node1 !== undefined && node2 !== undefined) {
    return node2.data === node1.data && !!node2.left == !!node1.left && !!node2.right === !!node1.right;
  }

  return false;
}
