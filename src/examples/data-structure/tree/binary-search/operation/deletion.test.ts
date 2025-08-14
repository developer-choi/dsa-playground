import {officialDeleteBST, recursiveDeleteBST} from '@/examples/data-structure/tree/binary-search/operation/deletion';
import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {compareFunctionsWithRandomInputs, summarizeBinaryTree} from '@/utils/extend/test/jest';
import {randomInArray} from '@/utils/extend/test/random';
import {iterativeInsertBST} from '@/examples/data-structure/tree/binary-search/operation/insertion';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';

const algorithms = [
  {name: 'Official', fn: officialDeleteBST},
  {name: 'Mine', fn: recursiveDeleteBST},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/deletion.test.ts
describe.each(algorithms)('공식문서에서 제시한 Deletion BST Cases > $name', ({fn}) => {
  it('Case 1. 삭제할 노드가 리프노드여도 삭제가 잘 되야함', () => {
    const root = new BinaryTreeNode(50);
    root.left = new BinaryTreeNode(40);
    root.right = new BinaryTreeNode(60);
    fn(root, 60);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 40, direction: 'left', parent: 50},
    ]);
  });

  it('Case 2-1. 삭제할 노드의 자식이 1개 이면서, 대체할 노드에도 자식이 있는 경우 대체할 노드의 자식의 연결방향이 잘 유지되야한다.', () => {
    const root = new BinaryTreeNode(50);
    root.right = new BinaryTreeNode(60);
    root.right.right = new BinaryTreeNode(70);
    fn(root, 60);
    expect(summarizeBinaryTree(root)).toEqual([
      {level: 0, data: 50, direction: undefined, parent: undefined},
      {level: 1, data: 70, direction: 'right', parent: 50},
    ]);
  });

  it('Case 2-2. 삭제할 노드의 자식이 1개 이면서, 대체할 노드에도 자식이 있는 경우 대체할 노드의 자식의 연결방향이 잘 유지되야한다.', () => {
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

  it('Case 3-1. 삭제할 노드의 자식이 2개 이면서, 대체할 노드에 자식이 없는 경우 삭제가 잘 되야한다.', () => {
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

  it('Case 3-2. 삭제할 노드의 자식이 2개 이면서, 대체할 노드에 자식이 있는 경우 삭제가 잘 되야한다.', () => {
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

  it('기타 > 한개 남은 노드를 삭제해도 잘 삭제되야한다.', () => {
    let root: BinaryTreeNode<number> | undefined = new BinaryTreeNode(50);
    root = fn(root, 50);
    expect(root).toBe(undefined);
    expect(summarizeBinaryTree(root)).toEqual([]);
  });
});

describe('recursiveDeleteBST()', () => {
  it('랜덤하게 삭제해도 동일한 결과가 나와야 한다.', () => {
    compareFunctionsWithRandomInputs({
      targetFunction: recursiveDeleteBST,
      answerFunction: officialDeleteBST,
      generateInput: () => {
        const randomArray = randomNumericArray(20);
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

function arrayToBST([first, ...rest]: number[]) {
  const root = new BinaryTreeNode(first);

  for (const data of rest) {
    iterativeInsertBST(root, data);
  }

  return root;
}
