export type BinaryTreeDirection = 'left' | 'right';

export class BinaryTreeNode<D> {
  left: BinaryTreeNode<D> | undefined;
  right: BinaryTreeNode<D> | undefined;
  data: D;

  constructor(data: D) {
    this.data = data;
  }
}

/**
 * @return 노드의 direction 방향의 끝에 있는 노드를 반환
 */
export function findLastNodeInDirection(node: BinaryTreeNode<number>, direction: BinaryTreeDirection): BinaryTreeNode<number> {
  let current = node;

  while (true) {
    if (!current[direction]) {
      return current;
    }

    current = current[direction];
  }
}

export function invertDirection(direction: BinaryTreeDirection): BinaryTreeDirection {
  switch (direction) {
    case 'left':
      return 'right';

    case 'right':
      return 'left';
  }
}
