import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {
  officialIsBST,
  recursiveInorderIsBST,
  recursiveMinMaxIsBST
} from '@/data-structure/tree/binary/search/is-bst';
import {compareFunctionsWithRandomInputs, updateRandomNodeData} from '@/utils/extend/test/jest';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {iterativeInsertBST} from '@/data-structure/tree/binary/search/insertion';

const algorithms = [
  {name: 'Min Max', fn: recursiveMinMaxIsBST},
  {name: 'Inorder', fn: recursiveInorderIsBST},
];

// yarn test src/data-structure/tree/binary/search/is-bst.test.ts
describe.each(algorithms)('Check the tree is BST > $name', ({fn}) => {
  it('should return false for an invalid BST (right subtree violation)', () => {
    const root = new BinaryTreeNode(10);
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(20);
    root.right.left = new BinaryTreeNode(9);
    root.right.right = new BinaryTreeNode(25);

    expect(fn(root)).toBe(false);
  });

  it('should return false for an invalid BST (left subtree violation)', () => {
    const root = new BinaryTreeNode(8);
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(12);
    root.left.right = new BinaryTreeNode(9);

    expect(fn(root)).toBe(false);
  });

  it('should return true for a valid BST', () => {
    const root = new BinaryTreeNode(10);
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(20);
    root.left.right = new BinaryTreeNode(9);
    root.right.right = new BinaryTreeNode(25);

    expect(fn(root)).toBe(true);
  });

  it('should produce the correct output for random inputs', () => {
    compareFunctionsWithRandomInputs({
      targetFunction: fn,
      answerFunction: officialIsBST,
      generateInput: () => {
        const [first, ...rest] = randomNumericArray(50);
        const root = new BinaryTreeNode(first);
        for (const data of rest) {
          iterativeInsertBST(root, data);
        }

        updateRandomNodeData(root, 999);
        return [root] as const;
      }
    });
  });
});
