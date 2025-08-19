import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {
  iterativeInorderSuccessorBST,
  recursiveInorderSuccessorBST,
} from './inorder-successor';
import {
  iterativeInorderPredecessorBST,
  recursiveInorderPredecessorBST,
} from './inorder-predecessor';

const successorAlgorithms = [
  {name: 'Recursive', fn: recursiveInorderSuccessorBST},
  {name: 'Iterative', fn: iterativeInorderSuccessorBST},
];

const predecessorAlgorithms = [
  {name: 'Recursive', fn: recursiveInorderPredecessorBST},
  {name: 'Iterative', fn: iterativeInorderPredecessorBST},
];

const mainRoot = new BinaryTreeNode(20);
mainRoot.left = new BinaryTreeNode(8);
mainRoot.right = new BinaryTreeNode(22);
mainRoot.left.left = new BinaryTreeNode(4);
mainRoot.left.right = new BinaryTreeNode(12);
mainRoot.left.right.left = new BinaryTreeNode(10);
mainRoot.left.right.right = new BinaryTreeNode(14);

const singleNode = new BinaryTreeNode(100);
const emptyTree = undefined;

// Successor, Predecessor는 서로 테스트케이스가 동일해서 통합
const allTestCases = [
  // General Cases
  {description: 'a non-root node with two children', tree: mainRoot, input: 8, expected: {successor: 10, predecessor: 4}},
  {description: 'a leaf node that is a left child', tree: mainRoot, input: 10, expected: {successor: 12, predecessor: 8}},
  {description: 'a leaf node that is a right child', tree: mainRoot, input: 14, expected: {successor: 20, predecessor: 12}},
  // Boundary Cases
  {description: 'the root node', tree: mainRoot, input: 20, expected: {successor: 22, predecessor: 14}},
  {description: 'the largest node in the tree', tree: mainRoot, input: 22, expected: {successor: undefined, predecessor: 20}},
  {description: 'a single node tree', tree: singleNode, input: 100, expected: {successor: undefined, predecessor: undefined}},
  {description: 'the smallest node in the tree', tree: mainRoot, input: 4, expected: {successor: 8, predecessor: undefined}},
  // Edge Cases
  {description: 'an empty tree', tree: emptyTree, input: 10, expected: {successor: undefined, predecessor: undefined}},
  {description: 'a non-existent target', tree: mainRoot, input: 99, expected: {successor: undefined, predecessor: undefined}},
  {description: 'a non-existent target', tree: mainRoot, input: -99, expected: {successor: undefined, predecessor: undefined}},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/inorder-successor.test.ts
describe.each(successorAlgorithms)('In-order Successor in BST > $name', ({fn}) => {
  test.each(allTestCases)('$description', ({tree, input, expected}) => {
    expect(fn(tree, input)).toBe(expected.successor);
  });
});

describe.each(predecessorAlgorithms)('In-order Predecessor in BST > $name', ({fn}) => {
  test.each(allTestCases)('$description', ({tree, input, expected}) => {
    expect(fn(tree, input)).toBe(expected.predecessor);
  });
});
