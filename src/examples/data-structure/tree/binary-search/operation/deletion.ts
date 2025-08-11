import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';

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

    // Point 1. 삭제할 노드를 찾으면 undefined를 반환해서
    if (node.data === target) {
      return undefined;
    }

    const direction = node.data > target ? 'left' : 'right';

    // Point 2. 여기서 삭제할 노드의 부모 노드에서는 자식노드가 삭제되도록 한다.
    node[direction] = recursive(node[direction]);

    // Point 3. 삭제할 노드의 부모노드가 아닌 경우 기존 노드가 유지되야하낟.
    return node;
  }

  recursive(root);

  return root;
}

/*************************************************************************************************************
 * Official > https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/
 *************************************************************************************************************/

// Note that it is not a generic inorder successor
// function. It mainly works when the right child
// is not empty, which is  the case we need in BST
// delete.
function getSuccessor(curr: BinaryTreeNode<number>) {
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
    let succ = getSuccessor(root);
    root.data = succ.data;
    root.right = officialDeleteBST(root.right, succ.data);
  }
  return root;
}
