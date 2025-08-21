import {BinaryTreeDirection, BinaryTreeNode} from '@/examples/data-structure/tree/binary';

/**
 * @description node의 데이터와 target을 비교해서 왼쪽 / 오른쪽 노드중 어디로 탐색해야하는지 방향값을 반환합니다.
 * @throws {TypeError} node의 데이터와 target의 값이 서로 동일한 경우 발생
 */
export function determineBstDirection(node: BinaryTreeNode<number>, target: number): BinaryTreeDirection {
  if (node.data === target) {
    throw new TypeError('node의 data와 target이 서로 동일합니다.');
  }

  return node.data > target ? 'left' : 'right';
}
