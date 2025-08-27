import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {CeilOrFloorMode, iterativeCeilOrFloorBST, recursiveCeilOrFloorBST} from './ceil-floor';

const modes: CeilOrFloorMode[] = ['ceil', 'floor'];

const algorithms = [
  {name: 'Recursive', fn: recursiveCeilOrFloorBST},
  {name: 'Iterative', fn: iterativeCeilOrFloorBST},
];

const generalRoot = new BinaryTreeNode(50);
generalRoot.left = new BinaryTreeNode(30);
generalRoot.right = new BinaryTreeNode(70);
generalRoot.left.left = new BinaryTreeNode(20);
generalRoot.left.right = new BinaryTreeNode(40);
generalRoot.right.left = new BinaryTreeNode(60);
generalRoot.right.right = new BinaryTreeNode(80);

const singleRoot = new BinaryTreeNode(50);
const emptyRoot = undefined;

// Ceil / Floor는 테스트케이스가 서로 똑같아서 통합
const allTestCases = [
  // General Cases
  {description: 'value between two nodes', tree: generalRoot, input: 58, expected: {floor: 50, ceil: 60}},
  {description: 'an exact match on a node', tree: generalRoot, input: 60, expected: {floor: 60, ceil: 60}},
  {description: 'a value smaller than the root', tree: generalRoot, input: 45, expected: {floor: 40, ceil: 50}},
  {description: 'a value just above the root', tree: generalRoot, input: 52, expected: {floor: 50, ceil: 60}},
  // Boundary Cases
  {description: 'a target smaller than the smallest node', tree: generalRoot, input: 10, expected: {floor: undefined, ceil: 20}},
  {description: 'a target larger than the largest node', tree: generalRoot, input: 100, expected: {floor: 80, ceil: undefined}},
  {description: 'the smallest node itself', tree: generalRoot, input: 20, expected: {floor: 20, ceil: 20}},
  {description: 'the largest node itself', tree: generalRoot, input: 80, expected: {floor: 80, ceil: 80}},
  // Edge Cases
  {description: 'an empty tree', tree: emptyRoot, input: 40, expected: {floor: undefined, ceil: undefined}},
  {description: 'a single node tree (exact match)', tree: singleRoot, input: 50, expected: {floor: 50, ceil: 50}},
  {description: 'a single node tree (target is larger)', tree: singleRoot, input: 100, expected: {floor: 50, ceil: undefined}},
  {description: 'a single node tree (target is smaller)', tree: singleRoot, input: 10, expected: {floor: undefined, ceil: 50}},
];

// yarn test src/data-structure/tree/binary/search/ceil-floor.test.ts
describe.each(modes)('%s Operation in BST', (mode) => {
  describe.each(algorithms)('> $name implementation', ({fn}) => {
    it.each(allTestCases)('$description', ({tree, input, expected}) => {
      expect(fn(mode, tree, input)).toBe(expected[mode]);
    });
  });
});
