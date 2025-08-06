import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {InternalIterationItem} from '@/examples/data-structure/tree/complete-binary/operation/traversal';

/** TODO
 * 앞으로 bst를 순회하면서 삽입 삭제 찾기 등등 정말많은 연산을 할거고,
 * 그럼 순회하는중복코드 엄청 생길텐데,
 * 그걸 통합은 하고싶은데,
 * 어떻게 통합해야 공통적으로 사용할 수 있을지 아직 모르겠음!
 */
export function* bstTraversal(root: BinaryTreeNode<number>, target: number): Generator<{
  node: BinaryTreeNode<number>,
  parent: InternalIterationItem<number>['parent'],
  level: number
}> {
  let nextSearchNode: BinaryTreeNode<number> = root;
  let parent: InternalIterationItem<number>['parent'] = undefined;
  let level: number = 0;

  while (true) {
    yield {node: nextSearchNode, level, parent};

    const direction: 'left' | 'right' = nextSearchNode.data > target ? 'left' : 'right';

    level++;
    parent = {
      node: nextSearchNode,
      direction
    };

    if (!nextSearchNode[direction]) {
      break;
    } else {
      nextSearchNode = nextSearchNode[direction];
    }
  }
}
