import {BinaryTreeNode} from '@/examples/data-structure/tree/binary/index';
import {areTreesIdenticalWithBFS, areTreesIdenticalWithDFS} from '@/examples/data-structure/tree/binary/identical';

const algorithms = [
  {name: 'DFS', fn: areTreesIdenticalWithDFS},
  {name: 'BFS', fn: areTreesIdenticalWithBFS},
];

// yarn test src/examples/data-structure/tree/binary/identical.test.ts
describe.each(algorithms)('Depth First Traversal > $name', ({fn}) => {
  let root1: BinaryTreeNode<number>;
  let root2: BinaryTreeNode<number>;

  beforeEach(() => {
    root1 = new BinaryTreeNode(1);
    root1.left = new BinaryTreeNode(2);
    root1.right = new BinaryTreeNode(3);
    root1.left.left = new BinaryTreeNode(4);
    root1.left.right = new BinaryTreeNode(5);
    root1.right.right = new BinaryTreeNode(6);

    root2 = new BinaryTreeNode(1);
    root2.left = new BinaryTreeNode(2);
    root2.right = new BinaryTreeNode(3);
    root2.left.left = new BinaryTreeNode(4);
    root2.left.right = new BinaryTreeNode(5);
    root2.right.right = new BinaryTreeNode(6);
  });

  it('should return true for identical trees', () => {
    expect(fn(root1, root2)).toBe(true);
  });

  it('should return false if root data differs', () => {
    root1.data = root2.data + 1;
    expect(fn(root1, root2)).toBe(false);
  });

  it('should return false if an intermediate node\'s data differs', () => {
    const target1 = root1.left as BinaryTreeNode<number>;
    const target2 = root2.left as BinaryTreeNode<number>;
    target1.data = target2.data + 1;
    expect(fn(root1, root2)).toBe(false);
  });

  it('should return false if an end node\'s data differs', () => {
    const target1 = root1.right?.right as BinaryTreeNode<number>;
    const target2 = root2.right?.right as BinaryTreeNode<number>;
    target1.data = target2.data + 1;
    expect(fn(root1, root2)).toBe(false);
  });

  it('should return false if only the right subtrees differ', () => {
    (root1.right as BinaryTreeNode<number>).left = new BinaryTreeNode(99);
    expect(fn(root1, root2)).toBe(false);
  });
});
