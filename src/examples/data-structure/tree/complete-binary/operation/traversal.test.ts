import {traverseTree} from '@/examples/data-structure/tree/complete-binary/operation/traversal';
import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {SummaryBinaryTree} from '@/utils/extend/test/jest';

const root = new BinaryTreeNode(5);
root.left = new BinaryTreeNode(12);
root.right = new BinaryTreeNode(13);
root.left.left = new BinaryTreeNode(7);
root.left.right = new BinaryTreeNode(14);
root.right.right = new BinaryTreeNode(2);
root.left.left.left = new BinaryTreeNode(17);
root.left.left.right = new BinaryTreeNode(23);
root.left.right.left = new BinaryTreeNode(27);
root.left.right.right = new BinaryTreeNode(3);
root.right.right.left = new BinaryTreeNode(8);
root.right.right.right = new BinaryTreeNode(11);

const NODE_17: SummaryBinaryTree<number> = {level: 3, data: 17, direction: 'left', parent: 7};
const NODE_7: SummaryBinaryTree<number> = {level: 2, data: 7, direction: 'left', parent: 12};
const NODE_23: SummaryBinaryTree<number> = {level: 3, data: 23, direction: 'right', parent: 7};
const NODE_12: SummaryBinaryTree<number> = {level: 1, data: 12, direction: 'left', parent: 5};
const NODE_27: SummaryBinaryTree<number> = {level: 3, data: 27, direction: 'left', parent: 14};
const NODE_14: SummaryBinaryTree<number> = {level: 2, data: 14, direction: 'right', parent: 12};
const NODE_3: SummaryBinaryTree<number> = {level: 3, data: 3, direction: 'right', parent: 14};
const NODE_5: SummaryBinaryTree<number> = {level: 0, data: 5, direction: undefined, parent: undefined};
const NODE_13: SummaryBinaryTree<number> = {level: 1, data: 13, direction: 'right', parent: 5};
const NODE_8: SummaryBinaryTree<number> = {level: 3, data: 8, direction: 'left', parent: 2};
const NODE_2: SummaryBinaryTree<number> = {level: 2, data: 2, direction: 'right', parent: 13};
const NODE_11: SummaryBinaryTree<number> = {level: 3, data: 11, direction: 'right', parent: 2};

// yarn test src/examples/data-structure/tree/complete-binary/operation/traversal.test.ts
describe('traversalTree', () => {
  const traversalCases = [
    {
      mode: 'inorder' as const,
      expected: [NODE_17, NODE_7, NODE_23, NODE_12, NODE_27, NODE_14, NODE_3, NODE_5, NODE_13, NODE_8, NODE_2, NODE_11]
    },
    {
      mode: 'preorder' as const,
      expected: [NODE_5, NODE_12, NODE_7, NODE_17, NODE_23, NODE_14, NODE_27, NODE_3, NODE_13, NODE_2, NODE_8, NODE_11],
    },
    {
      mode: 'postorder' as const,
      expected: [NODE_17, NODE_23, NODE_7, NODE_27, NODE_3, NODE_14, NODE_12, NODE_8, NODE_11, NODE_2, NODE_13, NODE_5],
    },
    {
      mode: 'breadth-first' as const,
      expected: [NODE_5, NODE_12, NODE_13, NODE_7, NODE_14, NODE_2, NODE_17, NODE_23, NODE_27, NODE_3, NODE_8, NODE_11],
    },
  ];

  it.each(traversalCases)('should return nodes in $mode order', ({mode, expected}) => {
    const result = [...traverseTree(root, mode)].map(
      ({level, node, parent}) => ({
        level,
        data: node.data,
        direction: parent?.direction,
        parent: parent?.node.data,
      }),
    );

    expect(result).toEqual(expected);
  });
});
