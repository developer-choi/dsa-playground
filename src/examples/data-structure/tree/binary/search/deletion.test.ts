import {officialDeleteBST, recursiveDeleteBST} from '@/examples/data-structure/tree/binary/search/deletion';
import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {arrayToBST, compareFunctionsWithRandomInputs, summarizeBinaryTree} from '@/utils/extend/test/jest';
import {randomInArray} from '@/utils/extend/test/random';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';

const algorithms = [
  {name: 'Official', fn: officialDeleteBST},
  {name: 'Mine', fn: recursiveDeleteBST},
];

// yarn test src/examples/data-structure/tree/binary/search/deletion.test.ts
describe.each(algorithms)('BST Deletion Cases from Official Docs > $name', ({fn}) => {
  it('should correctly delete the root node with two children (Gemini\'s test case)', () => {
    const root = new BinaryTreeNode(20);
    root.left = new BinaryTreeNode(10);
    root.right = new BinaryTreeNode(30);
    fn(root, 20);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 30, direction: undefined, parent: undefined},
      {level: 1, data: 10, direction: 'left', parent: 30},
    ]);
  });

  it('Case 1: should correctly delete a leaf node', () => {
    const root = new BinaryTreeNode(50);
    root.left = new BinaryTreeNode(40);
    root.right = new BinaryTreeNode(60);
    fn(root, 60);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 40, direction: 'left', parent: 50},
    ]);
  });

  it('Case 2-1: should correctly delete a node with one child', () => {
    const root = new BinaryTreeNode(50);
    root.right = new BinaryTreeNode(60);
    root.right.right = new BinaryTreeNode(70);
    fn(root, 60);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 70, direction: 'right', parent: 50},
    ]);
  });

  it('Case 2-2: should correctly delete a node with one child, preserving the child\'s subtree', () => {
    const root = new BinaryTreeNode(50);
    root.right = new BinaryTreeNode(60);
    root.right.right = new BinaryTreeNode(70);
    root.right.right.left = new BinaryTreeNode(65);
    root.right.right.right = new BinaryTreeNode(75);
    fn(root, 60);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 70, direction: 'right', parent: 50},
      {level: 2, data: 65, direction: 'left', parent: 70},
      {level: 2, data: 75, direction: 'right', parent: 70},
    ]);
  });

  it('Case 3-1: should handle a node with two children (successor is a leaf)', () => {
    const root = createDeepBST();

    fn(root, 80);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 30, direction: 'left', parent: 50},
      {level: 1, data: 70, direction: 'right', parent: 50},
      {level: 2, data: 20, direction: 'left', parent: 30},
      {level: 2, data: 40, direction: 'right', parent: 30},
      {level: 2, data: 60, direction: 'left', parent: 70},
      {level: 2, data: 83, direction: 'right', parent: 70},
      {level: 3, data: 59, direction: 'left', parent: 60},
      {level: 3, data: 61, direction: 'right', parent: 60},
      {level: 3, data: 75, direction: 'left', parent: 83},
      {level: 3, data: 85, direction: 'right', parent: 83},
      {level: 4, data: 73, direction: 'left', parent: 75},
      {level: 4, data: 86, direction: 'right', parent: 85},
      {level: 5, data: 74, direction: 'right', parent: 73},
    ]);
  });

  it('Case 3-2: should handle a node with two children (successor has a right child)', () => {
    const root = createDeepBST();

    fn(root, 70);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 30, direction: 'left', parent: 50},
      {level: 1, data: 73, direction: 'right', parent: 50},
      {level: 2, data: 20, direction: 'left', parent: 30},
      {level: 2, data: 40, direction: 'right', parent: 30},
      {level: 2, data: 60, direction: 'left', parent: 73},
      {level: 2, data: 80, direction: 'right', parent: 73},
      {level: 3, data: 59, direction: 'left', parent: 60},
      {level: 3, data: 61, direction: 'right', parent: 60},
      {level: 3, data: 75, direction: 'left', parent: 80},
      {level: 3, data: 85, direction: 'right', parent: 80},
      {level: 4, data: 74, direction: 'left', parent: 75},
      {level: 4, data: 83, direction: 'left', parent: 85},
      {level: 4, data: 86, direction: 'right', parent: 85},
    ]);
  });

  it('Edge Case: should return undefined when deleting the last node', () => {
    let root: BinaryTreeNode<number> | undefined = new BinaryTreeNode(50);
    root = fn(root, 50);
    expect(root).toBe(undefined);
    expect(summarizeBinaryTree(root)).toEqual([]);
  });
});

describe('recursiveDeleteBST()', () => {
  it('should produce the same result as the official function for random trees', () => {
    compareFunctionsWithRandomInputs({
      targetFunction: recursiveDeleteBST,
      answerFunction: officialDeleteBST,
      generateInput: () => {
        const randomArray = randomNumericArray(40);
        return [arrayToBST(randomArray), randomInArray(randomArray)[0]] as const;
      },
      handleError: ({input: [root, target], output, expected}) => {
        console.error({
          deleteTarget: target,
          root: summarizeBinaryTree(root),
          output: summarizeBinaryTree(output),
          expected: summarizeBinaryTree(expected)
        });
      }
    });
  });

  it('should not change the tree when the target value to delete is not found', () => {
    const original = createDeepBST();
    const result = createDeepBST();
    recursiveDeleteBST(result, 99999);
    expect(original).toEqual(result);
  });
});

function createDeepBST() {
  const root = new BinaryTreeNode(50);

  // level 1
  root.left = new BinaryTreeNode(30);
  root.right = new BinaryTreeNode(70);

  // level2
  root.left.left = new BinaryTreeNode(20);
  root.left.right = new BinaryTreeNode(40);
  root.right.left = new BinaryTreeNode(60);
  root.right.right = new BinaryTreeNode(80);

  // level 3
  root.right.left.left = new BinaryTreeNode(59);
  root.right.left.right = new BinaryTreeNode(61);
  root.right.right.left = new BinaryTreeNode(75);
  root.right.right.right = new BinaryTreeNode(85);

  // level4
  root.right.right.left.left = new BinaryTreeNode(73);
  root.right.right.right.left = new BinaryTreeNode(83);
  root.right.right.right.right = new BinaryTreeNode(86);

  // level5
  root.right.right.left.left.right = new BinaryTreeNode(74);

  return root;
}
