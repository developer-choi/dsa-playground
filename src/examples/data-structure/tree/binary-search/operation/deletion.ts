import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {BinaryTreeDirection} from '@/examples/data-structure/tree';

/**
 * URL: https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1HSv9Uc35vDZQ08D4xQoZ8rH_u5Cek-MjqvFRlGO0rds/edit?tab=t.0
 */
export function recursiveDeleteBST(root: BinaryTreeNode<number> | undefined, target: number): BinaryTreeNode<number> | undefined {
  if (!root) {
    return root;
  }

  function recursive(node: BinaryTreeNode<number> | undefined): BinaryTreeNode<number> | undefined {
    if (!node) {
      return undefined;
    }

    if (node.data !== target) {
      const direction = node.data > target ? 'left' : 'right';
      node[direction] = recursive(node[direction]);
      return node;
    }

    const successor = getSuccessor(node);
    
    // 삭제할 노드가 자식이 없는 경우 (Leaf)
    if (!successor) {
      return undefined;
      
    } else {
      node.data = successor.data;
      return node;
    }
  }

  recursive(root);

  return root;
}

/**
 * @return 제공된 노드보다 큰 노드들 중 가장 작은 노드를 반환합니다. or 자식이 없으면 undefined 입니다.
 * @description
 * 1. successor의 부모노드에서 연결을 해제합니다. => 이걸 여기서 안하면 할 수 있는 곳이 없어서.
 * 2. 반환되는 successor의 left에는 노드가 없음을 보장합니다.
 */
function getSuccessor(node: BinaryTreeNode<number>): BinaryTreeNode<number> | undefined {
  if (!node.right) {
    return undefined;
  }

  let current = node.right;
  let previousNode = node;
  let previousDirection: BinaryTreeDirection = 'right';

  while (true) {
    if (current.left) {
      previousDirection = 'left';
      previousNode = current;
      current = current.left;
    } else {
      break;
    }
  }

  /**
   * Case 1 대체할 노드에 자식이 없는 경우
   * Case 2. 대체할 노드에 오른쪽 자식이 있는 경우
   */
  previousNode[previousDirection] = current.right;
  return current;
}

/*************************************************************************************************************
 * Official > https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/
 *************************************************************************************************************/

// Note that it is not a generic inorder successor
// function. It mainly works when the right child
// is not empty, which is  the case we need in BST
// delete.
function officialGetSuccessor(curr: BinaryTreeNode<number>) {
  // 애초에 자식이 있는 경우에만 이 함수 호출됨.
  let node = curr.right as BinaryTreeNode<number>;
  while (node !== undefined && node.left !== undefined) {
    node = node.left;
  }
  return node;
}

// This function deletes a given key x from the
// given BST and returns the modified root of the
// BST (if it is modified).
export function officialDeleteBST(root: BinaryTreeNode<number> | undefined, x: number): BinaryTreeNode<number> | undefined {
  // Base case
  if (root === undefined) {
    return root;
  }

  // If key to be searched is in a subtree
  if (root.data > x) {
    root.left = officialDeleteBST(root.left, x);
  } else if (root.data < x) {
    root.right = officialDeleteBST(root.right, x);
  } else {
    // If root matches with the given key

    // Cases when root has 0 children or
    // only right child
    if (root.left === undefined)
      return root.right;

    // When root has only left child
    if (root.right === undefined)
      return root.left;

    // When both children are present
    let succ = officialGetSuccessor(root);
    root.data = succ.data;
    root.right = officialDeleteBST(root.right, succ.data);
  }
  return root;
}
