import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {traverseBstInRange} from '@/examples/data-structure/tree/binary/search/traversal';
import {getRangeBinaryTree} from '@/examples/data-structure/tree/binary/application';
import {arrayToBST, compareFunctionsWithRandomInputs, summarizeBinaryTree} from '@/utils/extend/test/jest';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {randomNumber} from '@/utils/extend/test/random';

const algorithms = [
  {name: 'BST', fn: getRangeBST},
  {name: 'Binary Tree', fn: getRangeBinaryTree},
];

// yarn test src/examples/data-structure/tree/binary/search/traversal.test.ts
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
        return [arrayToBST(randomArray), {min, max}] as const;
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
