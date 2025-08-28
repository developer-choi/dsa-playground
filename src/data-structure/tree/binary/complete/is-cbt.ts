import {BinaryTreeDirection, BinaryTreeNode} from '@/data-structure/tree/binary';
import {traverseAllNodes} from '@/data-structure/tree/binary/traversal';

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-a-given-binary-tree-is-complete-tree-or-not
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 * @return 트리가 Complete Binary Tree인지 여부. (문제 정답과 동일하게 트리가 없어도 true로 간주)
 *
 * 문제에서 제시하는 2가지 정답과 접근방식이 다른 나만의 풀이법은, 직전노드의 방향을 확인했음.
 * 루트노드를 제외한 모든 노드의 방향은, left > right > left > right 순으로 나와야함.
 * 1. root.left 노드는 없는데 root.right 노드가 있다거나,
 * 2. root.left.left 노드가 있고 그 다음 노드가 root.right.left 노드라면 Complete Binary Tree가 아닌것. (root.left.right 노드가 없으니까.)
 *
 * 문제에서 제시하는 접근방법은, 존재하지않는 노드가 어디에있는지가 포인트였음.
 */
export function isCompleteBinaryTree<D>(root: BinaryTreeNode<D> | undefined): boolean {
  if (root === undefined) {
    return true;
  }

  let directionOfPreviousNode: BinaryTreeDirection | undefined = undefined;

  for (const {parent} of traverseAllNodes(root, 'level-order')) {
    if (!parent) {
      continue;
    }

    if (directionOfPreviousNode === undefined && parent.direction === 'right') {
      return false;
    }

    if (directionOfPreviousNode === parent.direction) {
      return false;
    }

    directionOfPreviousNode = parent.direction;
  }

  return true;
}
