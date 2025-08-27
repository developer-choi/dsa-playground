import {BinaryTreeDirection, BinaryTreeNode} from '@/data-structure/tree/binary';
import {InternalIterationItem, TraversalContext,} from '@/data-structure/tree/binary/traversal';
import {determineBstDirection} from '@/data-structure/tree/binary/search/index';
import {removeDuplicatedItems} from '@forworkchoe/core/utils';
import {recursiveInorderIsBST} from '@/data-structure/tree/binary/search/is-bst';

/**
 * @description BST의 속성을 이용해 특정 값(들)이 위치한 경로를 따라 순회하는 제너레이터 함수입니다.
 * LCA(최소 공통 조상)를 찾는 데 활용될 수 있습니다.
 * @param root BST의 루트 노드.
 * @param target 찾아갈 값. 배열로 여러 값을 전달할 경우, 값들의 경로가 갈라지는 지점(LCA)까지만 순회합니다.
 */
export function* traverseBST(root: BinaryTreeNode<number> | undefined, target: number | number[]): Generator<TraversalContext<number>> {
  if (!recursiveInorderIsBST(root)) {
    console.warn('BST이어야만 순회할 수 있습니다.');
    return;
  }

  const targets = target instanceof Array ? target : [target];

  let nextSearchNode: BinaryTreeNode<number> = root;
  let parent: InternalIterationItem<number>['parent'] = undefined;
  let level: number = 0;
  let index = 0;

  while (true) {
    yield {node: nextSearchNode, level, parent, index};
    index++;

    if (targets.includes(nextSearchNode.data)) {
      break;
    }

    const directions: BinaryTreeDirection[] = targets.map(target => determineBstDirection(nextSearchNode, target));

    if (removeDuplicatedItems(directions).length > 1) {
      break;
    }

    const direction = directions[0];

    if (!nextSearchNode[direction]) {
      break;

    } else {
      level++;
      parent = {
        node: nextSearchNode,
        direction
      };
      nextSearchNode = nextSearchNode[direction];
    }
  }
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/print-bst-keys-in-given-range-o1-space/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 */
export function* traverseBstInRange(root: BinaryTreeNode<number> | undefined, range?: {max?: number, min?: number}): Generator<TraversalContext<number>> {
  const max = range?.max ?? Infinity;
  const min = range?.min ?? -Infinity;
  let index = 0;

  function* recursive(node: BinaryTreeNode<number> | undefined, level: number, parent: InternalIterationItem<number>['parent']): Generator<TraversalContext<number>> {
    if (!node) {
      return;
    }

    if (min < node.data) {
      yield* recursive(node.left, level + 1, {node, direction: 'left'});
    }

    if (min <= node.data && node.data <= max) {
      yield {node, index, level, parent};
      index++;
    }

    if (node.data < max) {
      yield* recursive(node.right, level + 1, {node, direction: 'right'});
    }
  }

  yield* recursive(root, 0, undefined);
}
