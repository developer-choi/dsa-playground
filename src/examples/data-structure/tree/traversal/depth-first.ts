import {BinaryTreeNode} from '@/examples/data-structure/tree';

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/preorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/find-the-maximum-depth-or-height-of-a-tree/
 * URL: https://www.geeksforgeeks.org/dsa/postorder-traversal-of-binary-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> n개 노드 순회하는데 O(n)이 걸림.
 * Auxiliary Space: O(h) ==> 재귀라서 레벨 h 만큼의 스택이 생기기 때문. 최악은 O(n). skewed tree
 */
export function recursiveDepthFirstTraversalTree<D>(node: BinaryTreeNode<D>, traversal: 'inorder' | 'preorder' | 'postorder') {
  const array: D[] = [];
  let maxHeight = 0;

  function inorder(current: BinaryTreeNode<D>, height: number) {
    maxHeight = Math.max(height, maxHeight);

    if (current.left) {
      inorder(current.left, height + 1);
    }

    array.push(current.data);

    if (current.right) {
      inorder(current.right, height + 1);
    }
  }

  function preorder(current: BinaryTreeNode<D>, height: number) {
    maxHeight = Math.max(height, maxHeight);
    array.push(current.data);

    if (current.left) {
      preorder(current.left, height + 1);
    }

    if (current.right) {
      preorder(current.right, height + 1);
    }
  }

  function postorder(current: BinaryTreeNode<D>, height: number) {
    maxHeight = Math.max(height, maxHeight);
    if (current.left) {
      postorder(current.left, height + 1);
    }

    if (current.right) {
      postorder(current.right, height + 1);
    }

    array.push(current.data);
  }

  const map = {
    inorder,
    preorder,
    postorder
  };

  map[traversal](node, 0);

  return {
    array,
    maxHeight
  };
}
