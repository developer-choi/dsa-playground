import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {BinaryTreeDirection} from '@/examples/data-structure/tree';
import {determineBstDirection, getSuccessor} from '@/examples/data-structure/tree/binary-search';

/**
 * URL: https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1HSv9Uc35vDZQ08D4xQoZ8rH_u5Cek-MjqvFRlGO0rds/edit?tab=t.0
 */
export function recursiveDeleteBST(node: BinaryTreeNode<number> | undefined, target: number): BinaryTreeNode<number> | undefined {
  if (!node) {
    return node;
  }

  if (node.data !== target) {
    const direction: BinaryTreeDirection = determineBstDirection(node, target);
    node[direction] = recursiveDeleteBST(node[direction], target);
    return node; // 리턴을 안하면 가장 마지막 재귀함수 부터 전부 다 undefined가 반환되서 노드 다없어져버림.
  }

  // Case 1. Node is leaf
  if (!node.left && !node.right) {
    return undefined;
  }

  // Case 3. Node have two nodes
  if (node.left && node.right) {
    /**
     * Successor만 필요함.
     *
     * 처음에는 Successor의 부모노드도 필요했었음. 그 부모노드 - Successor - 손자노드가 있다면,
     * 중간에 Successor를 없애고 부모노드 - 손자노드를 바로 이어줘야했으니까.
     * 하지만 이젠 그럴필요가 없어졌음. 어차피 Successor는 항상 노드기준 우측이기 때문에,
     */
    const successor = getSuccessor(node);
    node.data = successor.data;
    node.right = recursiveDeleteBST(node.right, successor.data);
    return node;
  }

  // Case 2. Node have a node
  return node.left ?? node.right;
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
