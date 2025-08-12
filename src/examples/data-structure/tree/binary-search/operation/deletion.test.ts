import {officialDeleteBST, recursiveDeleteBST} from '@/examples/data-structure/tree/binary-search/operation/deletion';
import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {summarizeBinaryTree} from '@/utils/extend/test/jest';

const algorithms = [
  {name: 'Official', fn: officialDeleteBST},
  {name: 'Mine', fn: recursiveDeleteBST},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/deletion.test.ts
describe.each(algorithms)('Insertion BST > $name', ({fn}) => {
  const root = new BinaryTreeNode(50);

  beforeEach(() => {
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
  });

  describe('root 노드 기준 오른쪽 노드 삭제하기', () => {
    it('삭제를 성공하면 루트 노드를 반황해야한다.', () => {
      expect(fn(root, 86)?.data).toBe(50);
    });

    it('삭제할 노드가 리프노드여도 삭제가 잘 되야함', () => {
      fn(root, 86);
      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 50, direction: undefined, parent: undefined},
        {level: 1, data: 30, direction: 'left', parent: 50},
        {level: 1, data: 70, direction: 'right', parent: 50},
        {level: 2, data: 20, direction: 'left', parent: 30},
        {level: 2, data: 40, direction: 'right', parent: 30},
        {level: 2, data: 60, direction: 'left', parent: 70},
        {level: 2, data: 80, direction: 'right', parent: 70},
        {level: 3, data: 59, direction: 'left', parent: 60},
        {level: 3, data: 61, direction: 'right', parent: 60},
        {level: 3, data: 75, direction: 'left', parent: 80},
        {level: 3, data: 85, direction: 'right', parent: 80},
        {level: 4, data: 73, direction: 'left', parent: 75},
        {level: 4, data: 83, direction: 'left', parent: 85},
        {level: 5, data: 74, direction: 'right', parent: 73},
      ]);
    });

    it('삭제할 노드가 자식은 있는데 손자가 없는 경우에도 잘 삭제되야함.', () => {
      fn(root, 85);
      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 50, direction: undefined, parent: undefined},
        {level: 1, data: 30, direction: 'left', parent: 50},
        {level: 1, data: 70, direction: 'right', parent: 50},
        {level: 2, data: 20, direction: 'left', parent: 30},
        {level: 2, data: 40, direction: 'right', parent: 30},
        {level: 2, data: 60, direction: 'left', parent: 70},
        {level: 2, data: 80, direction: 'right', parent: 70},
        {level: 3, data: 59, direction: 'left', parent: 60},
        {level: 3, data: 61, direction: 'right', parent: 60},
        {level: 3, data: 75, direction: 'left', parent: 80},
        {level: 3, data: 86, direction: 'right', parent: 80},
        {level: 4, data: 73, direction: 'left', parent: 75},
        {level: 4, data: 83, direction: 'left', parent: 86},
        {level: 5, data: 74, direction: 'right', parent: 73},
      ]);
    });

    it('삭제할 노드가 손자이상이 있는 경우에도 잘 삭제되야함.', () => {
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

    it('삭제할 노드가 손자도 있고, 대체할 노드에도 자식이 있는 경우에도 잘 삭제되야함.', () => {
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
  });

  // TODO 86이 없다고 가정하고 85 삭제하면 어떻게해?
  // TODO 또 내가 못찾은 케이스 있을 수 있으니 랜덤으로 삽입해서 랜덤으로 삭제해보자.
  // TODO 처음부터 끝까지 다 삭제하자.
  describe('root 노드 기준 왼쪽 노드 삭제하기', () => {
    it('왼쪽 끝 리프노드 삭제해도 잘 삭제되야한다.', () => {
      fn(root, 20);
      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 50, direction: undefined, parent: undefined},
        {level: 1, data: 30, direction: 'left', parent: 50},
        {level: 1, data: 70, direction: 'right', parent: 50},
        {level: 2, data: 40, direction: 'right', parent: 30},
        {level: 2, data: 60, direction: 'left', parent: 70},
        {level: 2, data: 80, direction: 'right', parent: 70},
        {level: 3, data: 59, direction: 'left', parent: 60},
        {level: 3, data: 61, direction: 'right', parent: 60},
        {level: 3, data: 75, direction: 'left', parent: 80},
        {level: 3, data: 85, direction: 'right', parent: 80},
        {level: 4, data: 73, direction: 'left', parent: 75},
        {level: 4, data: 83, direction: 'left', parent: 85},
        {level: 4, data: 86, direction: 'right', parent: 85},
        {level: 5, data: 74, direction: 'right', parent: 73},
      ]);
    });

    it('왼쪽 끝에서 2 번쨰 리프노드를 삭제해도 잘 삭제되야한다.', () => {
      fn(root, 40);
      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 50, direction: undefined, parent: undefined},
        {level: 1, data: 30, direction: 'left', parent: 50},
        {level: 1, data: 70, direction: 'right', parent: 50},
        {level: 2, data: 20, direction: 'left', parent: 30},
        {level: 2, data: 60, direction: 'left', parent: 70},
        {level: 2, data: 80, direction: 'right', parent: 70},
        {level: 3, data: 59, direction: 'left', parent: 60},
        {level: 3, data: 61, direction: 'right', parent: 60},
        {level: 3, data: 75, direction: 'left', parent: 80},
        {level: 3, data: 85, direction: 'right', parent: 80},
        {level: 4, data: 73, direction: 'left', parent: 75},
        {level: 4, data: 83, direction: 'left', parent: 85},
        {level: 4, data: 86, direction: 'right', parent: 85},
        {level: 5, data: 74, direction: 'right', parent: 73},
      ]);
    });

    it('왼쪽에 자식이 있는 노드를 삭제할 경우 리프노드로 잘 대체되야한다.', () => {
      fn(root, 30);
      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 50, direction: undefined, parent: undefined},
        {level: 1, data: 40, direction: 'left', parent: 50},
        {level: 1, data: 70, direction: 'right', parent: 50},
        {level: 2, data: 20, direction: 'left', parent: 40},
        {level: 2, data: 60, direction: 'left', parent: 70},
        {level: 2, data: 80, direction: 'right', parent: 70},
        {level: 3, data: 59, direction: 'left', parent: 60},
        {level: 3, data: 61, direction: 'right', parent: 60},
        {level: 3, data: 75, direction: 'left', parent: 80},
        {level: 3, data: 85, direction: 'right', parent: 80},
        {level: 4, data: 73, direction: 'left', parent: 75},
        {level: 4, data: 83, direction: 'left', parent: 85},
        {level: 4, data: 86, direction: 'right', parent: 85},
        {level: 5, data: 74, direction: 'right', parent: 73},
      ]);
    });
  });
});
