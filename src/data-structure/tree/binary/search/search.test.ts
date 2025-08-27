import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {summarizeBinaryTree} from '@/utils/extend/test/jest';
import {iterativeSearchBST, recursiveSearchBST} from '@/data-structure/tree/binary/search/search';
import {iterativeInsertBST} from '@/data-structure/tree/binary/search/insertion';

const algorithms = [
  {name: 'Recursive', fn: recursiveSearchBST},
  {name: 'Iterative', fn: iterativeSearchBST},
];

// yarn test src/data-structure/tree/binary/search/search.test.ts
describe.each(algorithms)('Search BST > $name', ({fn}) => {
  it('should return true for existing values and false for non-existing values', () => {
    let root = new BinaryTreeNode(50);
    root.left = new BinaryTreeNode(30);
    root.right = new BinaryTreeNode(70);
    root.left.left = new BinaryTreeNode(20);
    root.left.right = new BinaryTreeNode(40);
    root.right.left = new BinaryTreeNode(60);
    root.right.right = new BinaryTreeNode(80);

    expect(fn(root, 19)).toBe(false);

    for (const {data} of summarizeBinaryTree(root)) {
      expect(fn(root, data)).toBe(true);
    }
  });

  it('should return false when searching in an empty tree', () => {
    expect(fn(undefined, 19)).toBe(false);
  });

  it('should work correctly with a right-skewed tree', () => {
    const root = new BinaryTreeNode(10);
    iterativeInsertBST(root, 20);
    iterativeInsertBST(root, 30);
    iterativeInsertBST(root, 40);

    expect(fn(root, 19)).toBe(false);
    expect(fn(root, 40)).toBe(true);
  });
});
