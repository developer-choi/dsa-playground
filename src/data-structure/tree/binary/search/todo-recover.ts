import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {traverseAllNodes} from '@/data-structure/tree/binary/traversal';

/**
 * URL: https://www.geeksforgeeks.org/dsa/fix-two-swapped-nodes-of-bst/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * TODO: https://gemini.google.com/app/2286e9c0118f2b19
 * @param root BST 조건을 만족하지않는 Node의 갯수가 딱 2개인 Tree
 * Time Complexity: O(n)
 *
 * 순회하면서 순서를 어긴 노드를 발견했을 때,
 * 1. 발견 된 노드가 잘못된 노드다
 * 2. 그 노드의 이전노드가 잘못된 노드이다
 * 둘중 어느게 맞는지 판단할 기준을 이해하지못하겠음.
 * GPT 답변을 들어봐도... 이해를 못하겠음.
 * 그렇다고 GFG에 설명이 있는것도 아니고...
 */
export function recoverBST(root: BinaryTreeNode<number> | undefined): BinaryTreeNode<number> | undefined {
  if (root === undefined) {
    return undefined;
  }

  let previousNode: BinaryTreeNode<number> | undefined = undefined;
  let invalidNodes = new Set<BinaryTreeNode<number>>();

  for (const {node} of traverseAllNodes(root, {traversal: 'inorder'})) {
    if (previousNode && previousNode.data > node.data) {
      // TODO 여기서 이전노드가 문제일까 현재노드가 문제일까? 무슨기준으로 판단할까?
      // invalidNodes.add(node);
      invalidNodes.add(previousNode);
    }

    previousNode = node;
  }

  if (invalidNodes.size !== 2) {
    throw new TypeError(`문제 요구조건을 만족하지않는 Tree가 매개변수로 전달되었습니다. BST를 만족하지않는 Node의 갯수 = ${invalidNodes.size}`);
  }

  const [a, b] = invalidNodes;
  [a.data, b.data] = [b.data, a.data];
  return root;
}

// 예제1
// const root = new BinaryTreeNode(10);
// root.left = new BinaryTreeNode(5);
// root.right = new BinaryTreeNode(8);
// root.left.left = new BinaryTreeNode(2);
// root.left.right = new BinaryTreeNode(20);

// 예제2
// const root = new BinaryTreeNode(5);
// root.left = new BinaryTreeNode(10);
// root.right = new BinaryTreeNode(20);
// root.left.left = new BinaryTreeNode(2);
// root.left.right = new BinaryTreeNode(8);
