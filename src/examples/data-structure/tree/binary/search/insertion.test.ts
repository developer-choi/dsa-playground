import {iterativeInsertBST, recursiveInsertBST} from '@/examples/data-structure/tree/binary/search/insertion';
import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {summarizeBinaryTree} from '@/utils/extend/test/jest';

const algorithms = [
  {name: 'Recursive', fn: recursiveInsertBST},
  {name: 'Iterative', fn: iterativeInsertBST},
];

// yarn test src/examples/data-structure/tree/binary/search/insertion.test.ts
describe.each(algorithms)('Insertion BST > $name', ({fn}) => {
  it('should insert multiple nodes to form a balanced tree', () => {
    const root = new BinaryTreeNode(50);
    fn(root, 30);
    fn(root, 20);
    fn(root, 40);
    fn(root, 70);
    fn(root, 60);
    fn(root, 80);

    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 30, direction: 'left', parent: 50},
      {level: 1, data: 70, direction: 'right', parent: 50},
      {level: 2, data: 20, direction: 'left', parent: 30},
      {level: 2, data: 40, direction: 'right', parent: 30},
      {level: 2, data: 60, direction: 'left', parent: 70},
      {level: 2, data: 80, direction: 'right', parent: 70},
    ]);
  });

  it('should create a new root node when inserting into an empty tree', () => {
    const root = fn(undefined, 30);

    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 30, direction: undefined, parent: undefined},
    ]);
  });

  it('should correctly form a right-skewed tree', () => {
    const root = new BinaryTreeNode(10);
    fn(root, 20);
    fn(root, 30);
    fn(root, 40);

    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 10, direction: undefined, parent: undefined},
      {level: 1, data: 20, direction: 'right', parent: 10},
      {level: 2, data: 30, direction: 'right', parent: 20},
      {level: 3, data: 40, direction: 'right', parent: 30},
    ]);
  });
});
