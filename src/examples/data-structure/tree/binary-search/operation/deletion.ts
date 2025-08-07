import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {summarizeBinaryTree} from '@/utils/extend/test/jest';
import {recursiveMinMaxIsBST} from '@/examples/data-structure/tree/binary-search/operation/is-bst';

// https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/

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
function officialDeleteNode(root: BinaryTreeNode<number> | undefined, x: number) {
  // Base case
  if (root === undefined) {
    return root;
  }

  // If key to be searched is in a subtree
  if (root.data > x) {
    root.left = officialDeleteNode(root.left, x);
  } else if (root.data < x) {
    root.right = officialDeleteNode(root.right, x);
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
    root.right = officialDeleteNode(root.right, succ.data);
  }
  return root;
}

// Driver code
let root = new BinaryTreeNode(50);
root.left = new BinaryTreeNode(30);
root.right = new BinaryTreeNode(70);
//
root.left.left = new BinaryTreeNode(20);
root.left.right = new BinaryTreeNode(40);
//
root.right.left = new BinaryTreeNode(60);
root.right.right = new BinaryTreeNode(80);

root.right.right.left = new BinaryTreeNode(75);
root.right.right.right = new BinaryTreeNode(85);

officialDeleteNode(root, 70);
console.log(recursiveMinMaxIsBST(root), summarizeBinaryTree(root));
