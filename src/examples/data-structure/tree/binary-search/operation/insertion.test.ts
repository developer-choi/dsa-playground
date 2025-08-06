import {iterativeInsertBST, recursiveInsertBST} from '@/examples/data-structure/tree/binary-search/operation/insertion';
import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {breadthFirstTraversal} from '@/examples/data-structure/tree/complete-binary/operation/traversal';

const algorithms = [
  {name: 'Recursive', fn: recursiveInsertBST},
  {name: 'Iterative', fn: iterativeInsertBST},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/insertion.test.ts
describe.each(algorithms)('Insertion BST > $name', ({fn}) => {
  it('예제는 만족해야한다.', () => {
    const root = new BinaryTreeNode<number>(50);
    fn(root, 30);
    fn(root, 20);
    fn(root, 40);
    fn(root, 70);
    fn(root, 60);
    fn(root, 80);

    const result = [...breadthFirstTraversal(root)].map(({node, level}) => ({
      level,
      data: node.data,
    }));

    expect(result).toEqual([
      {level: 0, data: 50},
      {level: 1, data: 30},
      {level: 1, data: 70},
      {level: 2, data: 20},
      {level: 2, data: 40},
      {level: 2, data: 60},
      {level: 2, data: 80},
    ]);
  });

  it('없는 root 노드에 추가하려고 하면 루트노드로 추가되야한다.', () => {
    const root = fn(undefined, 30);

    const result = [...breadthFirstTraversal(root)].map(({node, level}) => ({
      level,
      data: node.data,
    }));

    expect(result).toEqual([
      {level: 0, data: 30},
    ]);
  });
});
