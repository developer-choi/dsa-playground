import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {comparePathFindLCA, findPath} from '@/data-structure/tree/binary/lca';
import {range} from '@forworkchoe/core/utils';

// yarn test src/data-structure/tree/binary/lca.test.ts
describe('findPath()', () => {
  describe('General cases', () => {
    it('should find the correct path for every node in the tree.', () => {
      const [node1, node2, node3, node4, node5, node6, node7] = range(1, 7).map(value => new BinaryTreeNode(value));

      const root = node4;
      root.left = node2;
      root.left.left = node1;
      root.left.right = node3;
      root.right = node6;
      root.right.left = node5;
      root.right.right = node7;

      expect(findPath(root, 1)).toEqual(new Set([node4, node2, node1]));
      expect(findPath(root, 2)).toEqual(new Set([node4, node2]));
      expect(findPath(root, 3)).toEqual(new Set([node4, node2, node3]));
      expect(findPath(root, 4)).toEqual(new Set([node4]));
      expect(findPath(root, 5)).toEqual(new Set([node4, node6, node5]));
      expect(findPath(root, 6)).toEqual(new Set([node4, node6]));
      expect(findPath(root, 7)).toEqual(new Set([node4, node6, node7]));
    });
  });

  describe('Boundary cases', () => {
    it('should return empty array when empty tree is passed', () => {
      expect(findPath(undefined, 1)).toEqual(new Set());
    });

    it('should return an empty array when the target cannot be found.', () => {
      expect(findPath(new BinaryTreeNode(1), 9)).toEqual(new Set());
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
