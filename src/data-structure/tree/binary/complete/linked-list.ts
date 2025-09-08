import {BinaryTreeNode} from '../index';
import {InternalIterationItem, traverseAllNodes} from '@/data-structure/tree/binary/traversal';
import {CompleteBinaryTree} from '@/data-structure/tree/binary/complete/index';

// Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
export class LinkedListBinaryTree<D> extends CompleteBinaryTree<D> {
  private root: BinaryTreeNode<D> | undefined;

  /**
   * URL: https://www.geeksforgeeks.org/dsa/insertion-in-a-binary-tree-in-level-order/
   *
   * Time Complexity: O(n), 최악의 경우 제일 우측 제일 하단 노드에 추가할 때 까지 순회를 해야하니까.
   * Auxiliary Space: O(n), 사유는 아래 traversal 주석 참고.
   */
  protected _add(data: D) {
    if (!this.root) {
      this.root = new BinaryTreeNode<D>(data);
      return;
    }

    for (const {node} of traverseAllNodes(this.root, {traversal: 'level-order'})) {
      if (!node.left) {
        node.left = new BinaryTreeNode<D>(data);
        return;
      } else if (!node.right) {
        node.right = new BinaryTreeNode<D>(data);
        return;
      }
    }
  }

  // URL: https://www.geeksforgeeks.org/dsa/deletion-binary-tree/
  protected _delete(data: D): D | undefined {
    let lastIndex = this.length - 1;
    let deletedNode: BinaryTreeNode<D> | undefined;
    let lastIterationItem: InternalIterationItem<D> | undefined;

    for (const item of traverseAllNodes(this.root, {traversal: 'level-order'})) {
      // 최초로 데이터가 똑같은 경우에만 할당
      if (item.node.data === data && !deletedNode) {
        deletedNode = item.node;
      }

      if (item.index === lastIndex) {
        lastIterationItem = item;
      }
    }

    const result = deletedNode?.data;

    if (deletedNode && lastIterationItem) {
      deletedNode.data = lastIterationItem.node.data;

      if (lastIterationItem.lastParent) {
        lastIterationItem.lastParent.node[lastIterationItem.lastParent.direction] = undefined;

      } else {
        this.root = undefined;
      }
    }

    return result;
  }

  public* [Symbol.iterator](): Generator<{data: D, level: number, index: number}, void, undefined> {
    for (const {node, level, index} of traverseAllNodes(this.root, {traversal: 'level-order'})) {
      yield {data: node.data, level, index};
    }
  }
}
