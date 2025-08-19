import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';

/**
 * URL: https://www.geeksforgeeks.org/dsa/a-program-to-check-if-a-binary-tree-is-bst-or-not/#approach-1-using-specified-range-of-min-and-max-values-on-time-and-oh-space
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 *
 * Time Complexity: O(n), 다 체크 해야하니까.
 * Auxiliary Space: O(h), 재귀스택은 높이만큼만 생기니까.
 */
export function recursiveMinMaxIsBST(root: BinaryTreeNode<number>): boolean {
  function recursive(node: BinaryTreeNode<number> | undefined, min: number, max: number): boolean {
    if (node === undefined) {
      return true;
    }

    if (node.data <= min || node.data >= max) {
      return false;
    }

    return recursive(node.left, min, node.data) && recursive(node.right, node.data, max);
  }

  return recursive(root, -Infinity, Infinity);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/a-program-to-check-if-a-binary-tree-is-bst-or-not/#optimal-approach-using-inorder-traversal-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 *
 * Time Complexity: 위와 같음
 * Auxiliary Space: 위와 같음
 */
export function recursiveInorderIsBST(root: BinaryTreeNode<number>): boolean {
  let previous = -Infinity;

  function recursive(node: BinaryTreeNode<number> | undefined): boolean {
    if (node === undefined) {
      return true;
    }

    let isTrue = true;

    if (node.left) {
      isTrue = recursive(node.left);
    }

    if (!isTrue) {
      return false;
    }

    isTrue = node.data > previous;
    previous = node.data;

    if (!isTrue) {
      return false;
    }

    return recursive(node.right);
  }

  return recursive(root);
}

// https://www.geeksforgeeks.org/dsa/a-program-to-check-if-a-binary-tree-is-bst-or-not/#expected-approach-using-morris-traversal-on-time-and-o1-space
export function officialIsBST(root: BinaryTreeNode<number>) {
  let curr: BinaryTreeNode<number> | undefined = root;
  let prevValue = -Infinity;

  while (curr !== undefined) {
    if (curr.left === undefined) {

      // Process curr node
      if (curr.data <= prevValue) {

        // Not in ascending order
        return false;
      }
      prevValue = curr.data;
      curr = curr.right;
    } else {

      // Find the inorder predecessor of curr
      let pre = curr.left;
      while (pre.right !== undefined && pre.right !== curr) {
        pre = pre.right;
      }

      if (pre.right === undefined) {

        // Create a temporary thread to the curr node
        pre.right = curr;
        curr = curr.left;
      } else {

        // Remove the temporary thread
        pre.right = undefined;

        // Process the curr node
        if (curr.data <= prevValue) {

          // Not in ascending order
          return false;
        }
        prevValue = curr.data;
        curr = curr.right;
      }
    }
  }

  return true;
}


// TODO [Morris Traversal] https://www.geeksforgeeks.org/dsa/a-program-to-check-if-a-binary-tree-is-bst-or-not/
