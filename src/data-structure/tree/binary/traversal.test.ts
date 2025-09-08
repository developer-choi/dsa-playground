import {TraversalContext, traverseAllNodes} from '@/data-structure/tree/binary/traversal';
import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {compareFunctionsWithRandomInputs, summarizeBinaryTree, SummaryBinaryTree} from '@/utils/jest';
import {getRangeBinaryTree} from '@/data-structure/tree/binary/application';
import {traverseBstInRange} from '@/data-structure/tree/binary/search/traversal';
import {recursiveArrayToBST} from '@/data-structure/tree/binary/search/array-to-bst';
import {randomNumber, randomNumericArray} from '@forworkchoe/core/utils';

const root = new BinaryTreeNode(12);
root.left = new BinaryTreeNode(7);
root.right = new BinaryTreeNode(14);
root.left.left = new BinaryTreeNode(5);
root.left.right = new BinaryTreeNode(8);
root.right.left = new BinaryTreeNode(13);
root.right.right = new BinaryTreeNode(27);
root.left.left.left = new BinaryTreeNode(3);
root.left.right.right = new BinaryTreeNode(11);
root.right.right.left = new BinaryTreeNode(17);
root.left.left.left.left = new BinaryTreeNode(2);
root.right.right.left.right = new BinaryTreeNode(23);

const NODE_2: SummaryBinaryTree<number> = {level: 4, data: 2, direction: 'left', parent: 3};
const NODE_3: SummaryBinaryTree<number> = {level: 3, data: 3, direction: 'left', parent: 5};
const NODE_5: SummaryBinaryTree<number> = {level: 2, data: 5, direction: 'left', parent: 7};
const NODE_7: SummaryBinaryTree<number> = {level: 1, data: 7, direction: 'left', parent: 12};
const NODE_8: SummaryBinaryTree<number> = {level: 2, data: 8, direction: 'right', parent: 7};
const NODE_11: SummaryBinaryTree<number> = {level: 3, data: 11, direction: 'right', parent: 8};
const NODE_12: SummaryBinaryTree<number> = {level: 0, data: 12, direction: undefined, parent: undefined};
const NODE_13: SummaryBinaryTree<number> = {level: 2, data: 13, direction: 'left', parent: 14};
const NODE_14: SummaryBinaryTree<number> = {level: 1, data: 14, direction: 'right', parent: 12};
const NODE_17: SummaryBinaryTree<number> = {level: 3, data: 17, direction: 'left', parent: 27};
const NODE_23: SummaryBinaryTree<number> = {level: 4, data: 23, direction: 'right', parent: 17};
const NODE_27: SummaryBinaryTree<number> = {level: 2, data: 27, direction: 'right', parent: 14};

const INORDER_EXPECTED = [NODE_2, NODE_3, NODE_5, NODE_7, NODE_8, NODE_11, NODE_12, NODE_13, NODE_14, NODE_17, NODE_23, NODE_27];

// yarn test src/data-structure/tree/binary/traversal.test.ts
describe('traverse Binary Tree', () => {
  const TRAVERSAL_CASES = [
    {
      mode: 'inorder' as const,
      expected: INORDER_EXPECTED,
    },
    {
      mode: 'reverse-inorder' as const,
      expected: INORDER_EXPECTED.toReversed(),
    },
    {
      mode: 'preorder' as const,
      expected: [NODE_12, NODE_7, NODE_5, NODE_3, NODE_2, NODE_8, NODE_11, NODE_14, NODE_13, NODE_27, NODE_17, NODE_23],
    },
    {
      mode: 'postorder' as const,
      expected: [NODE_2, NODE_3, NODE_5, NODE_11, NODE_8, NODE_7, NODE_13, NODE_23, NODE_17, NODE_27, NODE_14, NODE_12],
    },
    {
      mode: 'level-order' as const,
      expected: [NODE_12, NODE_7, NODE_14, NODE_5, NODE_8, NODE_13, NODE_27, NODE_3, NODE_11, NODE_17, NODE_2, NODE_23],
    },
    {
      mode: 'spiral-order' as const,
      expected: [NODE_12, NODE_7, NODE_14, NODE_27, NODE_13, NODE_8, NODE_5, NODE_3, NODE_11, NODE_17, NODE_23, NODE_2],
    },
  ];

  const handler = ({level, node, lastParent}: TraversalContext<number>) => ({
    level,
    data: node.data,
    direction: lastParent?.direction,
    parent: lastParent?.node.data,
  });

  it.each(TRAVERSAL_CASES)('should return nodes in $mode order', ({mode, expected}) => {
    expect([...traverseAllNodes(root, {traversal: mode})].map(handler)).toEqual(expected);
  });

  describe('Parent and LastParent Integrity', () => {
    it.each(TRAVERSAL_CASES)('should provide correct parent info during $mode traversal', ({mode}) => {
      const contexts = [...traverseAllNodes(root, {traversal: mode})];
      const rootContext = contexts.find(context => context.node.data === 12);
      expect(rootContext).toBeDefined();
      expect(rootContext?.lastParent).toBeUndefined();

      const midNodeContext = contexts.find(context => context.node.data === 14);
      expect(midNodeContext).toBeDefined();

      expect(midNodeContext?.lastParent?.node.data).toBe(12);
      expect(midNodeContext?.lastParent?.direction).toBe('right');

      const leafNodeContext = contexts.find(context => context.node.data === 23);
      expect(leafNodeContext).toBeDefined();

      expect(leafNodeContext?.lastParent?.node.data).toBe(17);
      expect(leafNodeContext?.lastParent?.direction).toBe('right');
    });
  });
});

describe('traverse Binary Search Tree', () => {
  const algorithms = [
    {name: 'BST', fn: getRangeBST},
    {name: 'Binary Tree', fn: getRangeBinaryTree},
  ];

  describe.each(algorithms)('Range Traversal Algorithms > $name', ({fn}) => {
    describe('General cases', () => {
      it('should return nodes within the specified range', () => {
        expect(fn(root, {min: 8, max: 14})).toEqual([8, 11, 12, 13, 14]);
      });

      it('should return only the minimum value when range is a single point', () => {
        expect(fn(root, {min: 17, max: 17})).toEqual([17]);
      });

      it('should handle ranges that include the root node', () => {
        expect(fn(root, {min: 5, max: 13})).toEqual([5, 7, 8, 11, 12, 13]);
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

  describe('Parent Integrity in BST Traversal', () => {
    it('should provide correct parent info during BST traversal', () => {
      const contexts = [...traverseBstInRange(root)];

      const rootContext = contexts.find(context => context.node.data === 12);
      expect(rootContext).toBeDefined();
      expect(rootContext?.lastParent).toBeUndefined();

      const midNodeContext = contexts.find(context => context.node.data === 14);
      expect(midNodeContext).toBeDefined();
      expect(midNodeContext?.lastParent?.node.data).toBe(12);
      expect(midNodeContext?.lastParent?.direction).toBe('right');

      const leafNodeContext = contexts.find(context => context.node.data === 23);
      expect(leafNodeContext).toBeDefined();
      expect(leafNodeContext?.lastParent?.node.data).toBe(17);
      expect(leafNodeContext?.lastParent?.direction).toBe('right');
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
