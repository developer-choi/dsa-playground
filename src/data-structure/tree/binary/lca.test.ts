import {iterativeArrayToBalancedTree} from '@/data-structure/tree/binary/array-to-balanced-tree';
import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {comparePathFindLCA, findPath} from '@/data-structure/tree/binary/lca';

// yarn test src/data-structure/tree/binary/lca.test.ts
describe('findPath()', () => {
  describe('General cases', () => {
    it('should find the correct path for every node in the tree.', () => {
      const root = iterativeArrayToBalancedTree([1, 2, 3, 4, 5, 6, 7]) as BinaryTreeNode<number>;
      expect(findPath(root, 1)).toEqual([4, 2, 1]);
      expect(findPath(root, 2)).toEqual([4, 2]);
      expect(findPath(root, 3)).toEqual([4, 2, 3]);
      expect(findPath(root, 4)).toEqual([4]);
      expect(findPath(root, 5)).toEqual([4, 6, 5]);
      expect(findPath(root, 6)).toEqual([4, 6]);
      expect(findPath(root, 7)).toEqual([4, 6, 7]);
    });
  });

  describe('Boundary cases', () => {
    it('should return empty array when empty tree is passed', () => {
      expect(findPath(undefined, 1)).toEqual([]);
    });

    it('should return an empty array when the target cannot be found.', () => {
      expect(findPath(new BinaryTreeNode(1), 9)).toEqual([]);
    });
  });
});

const algorithms = [
  {name: 'Compare path', fn: comparePathFindLCA},
];

describe.each(algorithms)('LCA Algorithm > $name', ({fn}) => {
  const root = new BinaryTreeNode(1);
  root.left = new BinaryTreeNode(2);
  root.right = new BinaryTreeNode(3);

  root.left.left = new BinaryTreeNode(4);
  root.left.right = new BinaryTreeNode(5);
  root.right.left = new BinaryTreeNode(6);
  root.right.right = new BinaryTreeNode(7);

  it('should return the correct LCA for given node pairs', () => {
    expect(fn(root, 4, 5)).toBe(2);
    expect(fn(root, 5, 6)).toBe(1);
  });

  it('should return undefined if one of the nodes does not exist in the tree', () => {
    expect(fn(root, 5, 999)).toBe(undefined);
  });
});
