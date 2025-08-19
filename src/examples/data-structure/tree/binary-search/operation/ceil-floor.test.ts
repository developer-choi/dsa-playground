import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {iterativeFloorBST, recursiveFloorBST} from './floor';
import {iterativeCeilBST, recursiveCeilBST} from './ceil';

const floorAlgorithms = [
  {name: 'Recursive', fn: recursiveFloorBST},
  {name: 'Iterative', fn: iterativeFloorBST},
];

const ceilAlgorithms = [
  {name: 'Recursive', fn: recursiveCeilBST},
  {name: 'Iterative', fn: iterativeCeilBST},
];

const mainRoot = new BinaryTreeNode(50);
mainRoot.left = new BinaryTreeNode(30);
mainRoot.right = new BinaryTreeNode(70);
mainRoot.left.left = new BinaryTreeNode(20);
mainRoot.left.right = new BinaryTreeNode(40);
mainRoot.right.left = new BinaryTreeNode(60);
mainRoot.right.right = new BinaryTreeNode(80);

const singleNode = new BinaryTreeNode(50);
const emptyTree = undefined;

// Ceil / Floor는 테스트케이스가 서로 똑같아서 통합
const allTestCases = [
  // General Cases
  {description: 'value between two nodes', tree: mainRoot, input: 58, expected: {floor: 50, ceil: 60}},
  {description: 'an exact match on a node', tree: mainRoot, input: 60, expected: {floor: 60, ceil: 60}},
  {description: 'a value smaller than the root', tree: mainRoot, input: 45, expected: {floor: 40, ceil: 50}},
  {description: 'a value just above the root', tree: mainRoot, input: 52, expected: {floor: 50, ceil: 60}},
  // Boundary Cases
  {description: 'a target smaller than the smallest node', tree: mainRoot, input: 10, expected: {floor: -1, ceil: 20}},
  {description: 'a target larger than the largest node', tree: mainRoot, input: 100, expected: {floor: 80, ceil: -1}},
  {description: 'the smallest node itself', tree: mainRoot, input: 20, expected: {floor: 20, ceil: 20}},
  {description: 'the largest node itself', tree: mainRoot, input: 80, expected: {floor: 80, ceil: 80}},
  // Edge Cases
  {description: 'an empty tree', tree: emptyTree, input: 40, expected: {floor: -1, ceil: -1}},
  {description: 'a single node tree (exact match)', tree: singleNode, input: 50, expected: {floor: 50, ceil: 50}},
  {description: 'a single node tree (target is larger)', tree: singleNode, input: 100, expected: {floor: 50, ceil: -1}},
  {description: 'a single node tree (target is smaller)', tree: singleNode, input: 10, expected: {floor: -1, ceil: 50}},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/ceil-floor.test.ts
describe.each(floorAlgorithms)('Floor Operation in BST > $name', ({fn}) => {
  test.each(allTestCases)('$description', ({tree, input, expected}) => {
    expect(fn(tree, input)).toBe(expected.floor);
  });
});

describe.each(ceilAlgorithms)('Ceil Operation in BST > $name', ({fn}) => {
  test.each(allTestCases)('$description', ({tree, input, expected}) => {
    expect(fn(tree, input)).toBe(expected.ceil);
  });
});
