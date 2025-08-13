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

  // 노드를 반환해야하는 이유는, 삭제할 노드의 부모노드에서 연결을 끊어버릴 방법이 없음.
  function recursive(node: BinaryTreeNode<number> | undefined): BinaryTreeNode<number> | undefined {
    if (!node) {
      return undefined;
    }

    if (node.data !== target) {
      const direction: BinaryTreeDirection = node.data > target ? 'left' : 'right';
      node[direction] = recursive(node[direction]);
      return node; // 리턴을 안하면 가장 마지막 재귀함수 부터 전부 다 undefined가 반환되서 노드 다없어져버림.
    }

    // Case 1. Node is leaf
    if (!node.left && !node.right) {
      return undefined;
    }

    // Case 3. Node have two nodes
    if (node.left && node.right) {
      const successor = getSuccessor(node) as BinaryTreeNode<number>; // 항상 우측노드가 있으니까 assertion
      node.data = successor.data;
      return node;
    }

    // Case 2. Node have a node
    return node.left ?? node.right;
  }

  return recursive(root);
}

/**
 * 1. 대체할 노드 (Successor) 반환
 * 2. 대체할 노드의 자식은 대체할 노드의 부모로 바로 이어주는 예외처리 함.
 * 3. 우측자식이 없으면 undefined 반환함.
 */
function getSuccessor(node: BinaryTreeNode<number>): BinaryTreeNode<number> | undefined {
  if (!node.right) {
    return undefined;
  }

  let current = node.right;
  let previous = node;

  while (true) {
    if (!current.left) {
      break;
    }

    previous = current;
    current = current.left;
  }

  /**
   * 삭제 할 노드 (current)의 직전 노드와, current의 자식노드를 이어줘야 하는 상황인데,
   * if 조건에 걸렸다는것은 current.left가 없다는 뜻이 되므로 current.right 자식으로 이어줌.
   * else 조건도 왼쪽 끝까지 갔다는 뜻이 되기 때문에 결국 current.left가 없다는 뜻이 되므로 (이하 생략)
   */
  if (previous === node) {
    previous.right = current.right;
  } else {
    previous.left = current.right;
  }

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
