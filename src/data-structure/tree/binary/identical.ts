import {BinaryTreeNode} from '@/data-structure/tree/binary/index';

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
    return recursive(node1?.left, node2?.left) && recursive(node1?.right, node2?.right)
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
 * @description 노드 2개가 서로 동일한지 확인
 * 1. node.data 동일
 * 2. node.left의 유무 동일 (유무만 체크하며, 동일한 노드 (reference)를 가리키는지 까지는 체크하지않음)
 * 3. node.right의 유무 동일 (이하 동일)
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
