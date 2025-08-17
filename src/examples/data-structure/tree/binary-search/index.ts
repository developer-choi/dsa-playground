import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {BinaryTreeDirection} from '@/examples/data-structure/tree';
import {recursiveDeleteBST} from '@/examples/data-structure/tree/binary-search/operation/deletion';
import {iterativeInsertBST} from '@/examples/data-structure/tree/binary-search/operation/insertion';
import {iterativeSearchBST} from '@/examples/data-structure/tree/binary-search/operation/search';

export function determineBstDirection(node: BinaryTreeNode<number>, data: number): BinaryTreeDirection {
  return node.data > data ? 'left' : 'right';
}

export class BinarySearchTree {
  private root: BinaryTreeNode<number> | undefined;

  delete(target: number) {
    this.root = recursiveDeleteBST(this.root, target);
  }

  insert(target: number) {
    this.root = iterativeInsertBST(this.root, target);
  }

  has(target: number): boolean {
    return iterativeSearchBST(this.root, target);
  }

  getMinimum(): number | undefined {
    return this.getBoundary('left');
  }

  getMaximum(): number | undefined {
    return this.getBoundary('right');
  }

  /**
   * https://www.geeksforgeeks.org/dsa/find-the-minimum-element-in-a-binary-search-tree/#expected-approach-iterative-approach-on-time-and-o1-space
   * https://www.geeksforgeeks.org/dsa/find-the-node-with-maximum-value-in-a-binary-search-tree/#expected-approach-iterative-approach-on-time-and-o1-space
   * Time Complexity: O(h)
   * Auxiliary Space: O(1)
   */
  private getBoundary(direction: BinaryTreeDirection): number | undefined {
    if (!this.root) {
      return undefined;
    }

    let current: BinaryTreeNode<number> | undefined = this.root;

    while (current[direction]) {
      current = current[direction];
    }

    return current.data;
  }
}
