import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {getHeightDiameter, getHeightOfNode} from '@/data-structure/tree/binary/max-diameter';

// yarn test src/data-structure/tree/binary/max-diameter.test.ts
describe('getHeightOfNode()', () => {
  it('높이를 구할 수 있어야 한다.', () => {
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(3);
    root.left.right = new BinaryTreeNode(4);
    root.right.left = new BinaryTreeNode(5);
    root.right.left.right = new BinaryTreeNode(6);

    expect(getHeightOfNode(root)).toBe(3);
    expect(getHeightOfNode(root.left)).toBe(1);
    expect(getHeightOfNode(root.right)).toBe(2);
  });
});

describe('getHeightDiameter()', () => {
  it('예제는 만족해야한다.', () => {
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(3);
    expect(getHeightDiameter(root)).toBe(2);
  });
  it('예제는 만족해야한다.', () => {
    const root = new BinaryTreeNode(5);
    root.left = new BinaryTreeNode(8);
    root.right = new BinaryTreeNode(6);
    root.left.left = new BinaryTreeNode(3);
    root.left.right = new BinaryTreeNode(7);
    root.right.left = new BinaryTreeNode(9);
    expect(getHeightDiameter(root)).toBe(4);
  });
});
