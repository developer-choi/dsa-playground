import {
  iterativeArrayToBalancedTree,
  recursiveArrayToBalancedTree
} from '@/examples/data-structure/tree/binary/array-to-tree';
import {summarizeBinaryTree} from '@/utils/extend/test/jest';
import {recursiveInorderIsBST} from '@/examples/data-structure/tree/binary/search/is-bst';
import {BinaryTreeNode} from '@/examples/data-structure/tree/binary/index';

const algorithms = [
  {name: 'Recursive', fn: recursiveArrayToBalancedTree},
  {name: 'Iterative', fn: iterativeArrayToBalancedTree},
];

// yarn test src/examples/data-structure/tree/binary/array-to-tree.test.ts
describe.each(algorithms)('Array to Balanced Tree > $name', ({fn}) => {
  describe('General cases', () => {
    it('홀수개의 정렬된 값을 전달하면 BST가 되야한다.', () => {
      const root = fn([1, 2, 3, 4, 5, 6, 7]) as BinaryTreeNode<number>;
      expect(recursiveInorderIsBST(root)).toBe(true);
      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 4, parent: undefined, direction: undefined},
        {level: 1, data: 2, parent: 4, direction: 'left'},
        {level: 1, data: 6, parent: 4, direction: 'right'},
        {level: 2, data: 1, parent: 2, direction: 'left'},
        {level: 2, data: 3, parent: 2, direction: 'right'},
        {level: 2, data: 5, parent: 6, direction: 'left'},
        {level: 2, data: 7, parent: 6, direction: 'right'},
      ]);
    });

    it('짝수개의 정렬된 값을 전달하면 BST가 되야한다.', () => {
      const root = fn([1, 2, 3, 4, 5, 6]) as BinaryTreeNode<number>;
      expect(recursiveInorderIsBST(root)).toBe(true);
      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 3, direction: undefined, parent: undefined},
        {level: 1, data: 1, direction: 'left', parent: 3},
        {level: 1, data: 5, direction: 'right', parent: 3},
        {level: 2, data: 2, direction: 'right', parent: 1},
        {level: 2, data: 4, direction: 'left', parent: 5},
        {level: 2, data: 6, direction: 'right', parent: 5}
      ]);
    });
  });

  describe('Boundary cases', () => {
    it('should return undefined for an empty array', () => {
      expect(fn([])).toBe(undefined);
    });

    it('should create a single node tree for a single-element array', () => {
      expect(fn([])).toBe(undefined);
    });
  });
});
