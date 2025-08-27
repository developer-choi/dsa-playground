import {
  reverseInorderTraverseAllNodes,
  TraversalContext,
  traverseAllNodes
} from '@/data-structure/tree/binary/traversal';
import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {compareFunctionsWithRandomInputs, summarizeBinaryTree, SummaryBinaryTree} from '@/utils/extend/test/jest';
import {getRangeBinaryTree} from '@/data-structure/tree/binary/application';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {randomNumber} from '@/utils/extend/test/random';
import {traverseBstInRange} from '@/data-structure/tree/binary/search/traversal';
import {recursiveArrayToBST} from '@/data-structure/tree/binary/search/array-to-bst';

// yarn test src/data-structure/tree/binary/traversal.test.ts
describe('traversalTree', () => {
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

  const INORDER_EXPECTED = [NODE_17, NODE_7, NODE_23, NODE_12, NODE_27, NODE_14, NODE_3, NODE_5, NODE_13, NODE_8, NODE_2, NODE_11];

  const TRAVERSAL_CASES = [
    {
      mode: 'inorder' as const,
      expected: INORDER_EXPECTED
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

  const handler = ({level, node, parent}: TraversalContext<number>) => ({
    level,
    data: node.data,
    direction: parent?.direction,
    parent: parent?.node.data,
  });

  it.each(TRAVERSAL_CASES)('should return nodes in $mode order', ({mode, expected}) => {
    expect([...traverseAllNodes(root, mode)].map(handler)).toEqual(expected);
  });

  it('should perform reverse inorder traversal correctly', () => {
    expect([...reverseInorderTraverseAllNodes(root)].map(handler)).toEqual(INORDER_EXPECTED.toReversed());
  });
});

describe('traverse Binary Search Tree', () => {
  const algorithms = [
    {name: 'BST', fn: getRangeBST},
    {name: 'Binary Tree', fn: getRangeBinaryTree},
  ];

  describe.each(algorithms)('Range Traversal Algorithms > $name', ({fn}) => {
    const root = new BinaryTreeNode(22);
    root.left = new BinaryTreeNode(12);
    root.right = new BinaryTreeNode(30);
    root.left.left = new BinaryTreeNode(8);
    root.left.right = new BinaryTreeNode(20);

    describe('General cases', () => {
      it('should return nodes within the specified range', () => {
        expect(fn(root, {min: 10, max: 22})).toEqual([12, 20, 22]);
      });
    });

    describe('Edge cases', () => {
      it('should return an empty array if the range is above all node values', () => {
        expect(fn(root, {min: 9999, max: Infinity})).toEqual([]);
      });

      it('should return an empty array if the range is below all node values', () => {
        expect(fn(root, {min: -Infinity, max: 0})).toEqual([]);
      });

      it('should return an empty array if max is less than min', () => {
        expect(fn(root, {min: 1, max: -1})).toEqual([]);
      });

      it('should return an empty array for an empty tree', () => {
        expect(fn(undefined, {min: -Infinity, max: Infinity})).toEqual([]);
      });
    });
  });

  describe('traverseBstInRange()', () => {
    it('should pass randomized tests', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: getRangeBST,
        answerFunction: getRangeBinaryTree,
        generateInput: () => {
          const randomArray = randomNumericArray(40);
          const min = randomNumber(Math.min(...randomArray), 20);
          const max = randomNumber(21, Math.max(...randomArray));
          return [recursiveArrayToBST(randomArray), {min, max}] as const;
        },
        handleError: ({input: [root, target], output, expected}) => {
          console.error({
            deleteTarget: target,
            root: summarizeBinaryTree(root),
            output: output,
            expected: expected
          });
        }
      });
    });
  });

  function getRangeBST(root: BinaryTreeNode<number> | undefined, range?: {max?: number, min?: number}): number[] {
    const result: number[] = [];

    for (const {node: {data}} of traverseBstInRange(root, range)) {
      result.push(data);
    }

    return result;
  }
});
