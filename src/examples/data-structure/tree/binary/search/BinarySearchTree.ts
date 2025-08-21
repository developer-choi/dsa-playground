import {recursiveDeleteBST} from '@/examples/data-structure/tree/binary/search/deletion';
import {iterativeInsertBST} from '@/examples/data-structure/tree/binary/search/insertion';
import {iterativeSearchBST} from '@/examples/data-structure/tree/binary/search/search';
import {iterativeCeilOrFloorBST} from '@/examples/data-structure/tree/binary/search/ceil-floor';
import {BinaryTreeDirection, BinaryTreeNode} from '@/examples/data-structure/tree/binary';

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

  floor(target: number) {
    return iterativeCeilOrFloorBST('floor', this.root, target);
  }

  ceil(target: number) {
    return iterativeCeilOrFloorBST('ceil', this.root, target);
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
