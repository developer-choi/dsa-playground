import {BinaryTreeNode} from '@/examples/data-structure/tree';

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/preorder-traversal-of-binary-tree/
 * URL: https://www.geeksforgeeks.org/dsa/postorder-traversal-of-binary-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 *
 * Time Complexity: O(n) ==> n개 노드 순회하는데 O(n)이 걸림.
 * Auxiliary Space: O(h) ==> 재귀라서 레벨 h 만큼의 스택이 생기기 때문. 최악은 O(n). skewed tree
 */
export function recursiveDepthFirstTraversalTree<D>(node: BinaryTreeNode<D>, traversal: 'inorder' | 'preorder' | 'postorder'): D[] {
  const result: D[] = [];

  function inorder(current: BinaryTreeNode<D>) {
    if (current.left) {
      inorder(current.left);
    }

    result.push(current.data);

    if (current.right) {
      inorder(current.right);
    }
  }

  function preorder(current: BinaryTreeNode<D>) {
    result.push(current.data);

    if (current.left) {
      preorder(current.left);
    }

    if (current.right) {
      preorder(current.right);
    }
  }

  function postorder(current: BinaryTreeNode<D>) {
    if (current.left) {
      postorder(current.left);
    }

    if (current.right) {
      postorder(current.right);
    }

    result.push(current.data);
  }

  const map = {
    inorder,
    preorder,
    postorder
  };

  map[traversal](node);

  return result;
}
