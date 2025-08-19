import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {
  iterativeGetSuccessorOrPredecessorBST,
  recursiveGetSuccessorOrPredecessorBST, SuccessorOrPredecessorMode,
} from './successor-predecessor';

const modes: SuccessorOrPredecessorMode[] = ['successor', 'predecessor'];

const algorithms = [
  {name: 'Recursive', fn: recursiveGetSuccessorOrPredecessorBST},
  {name: 'Iterative', fn: iterativeGetSuccessorOrPredecessorBST},
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
  {description: 'for a non-root node with two children', tree: mainRoot, input: 8, expected: {successor: 10, predecessor: 4}},
  {description: 'for a leaf node that is a left child', tree: mainRoot, input: 10, expected: {successor: 12, predecessor: 8}},
  {description: 'for a leaf node that is a right child', tree: mainRoot, input: 14, expected: {successor: 20, predecessor: 12}},
  // Boundary Cases
  {description: 'for the root node', tree: mainRoot, input: 20, expected: {successor: 22, predecessor: 14}},
  {description: 'for the largest node in the tree', tree: mainRoot, input: 22, expected: {successor: undefined, predecessor: 20}},
  {description: 'for a tree with only one node', tree: singleNode, input: 100, expected: {successor: undefined, predecessor: undefined}},
  {description: 'for the smallest node in the tree', tree: mainRoot, input: 4, expected: {successor: 8, predecessor: undefined}},
  // Edge Cases
  {description: 'for an empty tree', tree: emptyTree, input: 10, expected: {successor: undefined, predecessor: undefined}},
  {description: 'for a non-existent target (larger than all nodes)', tree: mainRoot, input: 99, expected: {successor: undefined, predecessor: undefined}},
  {description: 'for a non-existent target (smaller than all nodes)', tree: mainRoot, input: -99, expected: {successor: undefined, predecessor: undefined}},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/successor-predecessor.test.ts
describe.each(modes)('In-order %s in BST', (mode) => {
  describe.each(algorithms)('> $name implementation', ({ fn }) => {
    test.each(allTestCases)('$description', ({ tree, input, expected }) => {
      expect(fn(mode, tree, input)).toBe(expected[mode]);
    });
  });
});
