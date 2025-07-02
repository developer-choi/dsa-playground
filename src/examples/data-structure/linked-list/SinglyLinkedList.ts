class Node {
  data: number;
  next: Node | undefined;

  constructor(data: number) {
    this.data = data;
    this.next = undefined;
  }
}

/**
 * URL: https://www.geeksforgeeks.org/singly-linked-list-tutorial/
 * Doc: https://docs.google.com/document/d/1RxLj_q7xhg6wS1HpJrTftnBI7jshw5Mf24vpKDi2EUQ/edit?tab=t.0
 */
export default class SinglyLinkedList {
  private head: Node | undefined;

  constructor() {
    this.head = undefined;
  }

  push(data: number) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    const tail = this.getTail() as Node;
    tail.next = new Node(data);
  }

  /**
   * https://www.geeksforgeeks.org/dsa/traversal-of-singly-linked-list/
   * Time Complexity: O(n), where n is the number of nodes in the linked list.
   */
  get(index: number): number | undefined {
    let i = 0;
    let pointer = this.head;

    while (i < index && pointer) {
      i++;
      pointer = pointer.next;
    }

    if (i !== index || pointer === undefined) {
      return undefined;

    } else {
      return pointer.data;
    }
  }

  /**
   * [Head]
   * URL: https://www.geeksforgeeks.org/insert-a-node-at-front-beginning-of-a-linked-list/
   * Time Complexity: O(1), We have a pointer to the head and we can directly attach a node and update the head pointer
   *
   * [between]
   * URL: https://www.geeksforgeeks.org/dsa/insert-a-node-at-a-specific-position-in-a-linked-list/
   * Time Complexity: O(n), where n is the number of nodes in the linked list.
   *
   * [Tail]
   * URL: https://www.geeksforgeeks.org/insert-node-at-the-end-of-a-linked-list/
   * Time Complexity: O(N) where N is the length of the linked list
   */
  insertAt(index: number, data: number) {
    let currentIndex = 0;

    this.traverse({
      onLoop: (meta) => {
        if (currentIndex === index) {
          const newNode = new Node(data);

          switch (meta.type) {
            case 'head': {
              this.head = newNode;
              this.head.next = meta.node;
              break;
            }
            case 'between': {
              meta.beforeNode.next = newNode;
              newNode.next = meta.node;
              break;
            }

            case 'tail':
              meta.node.next = newNode;
              break;
          }
          return true;
        } else {
          currentIndex++;
          return false;
        }
      }
    });
  }

  /**
   * https://www.geeksforgeeks.org/dsa/search-an-element-in-a-linked-list-iterative-and-recursive/
   * Time Complexity: O(n), where n is the number of nodes in the linked list.
   */
  findIndex(data: number): number {
    let index = -1;

    this.traverse({
      onLoop: ({node}) => {
        index++;
        return node.data === data;
      },
      onLoopEnd: () => {
        index = -1;
      }
    });

    return index;
  }

  /**
   * https://www.geeksforgeeks.org/dsa/find-length-of-a-linked-list-iterative-and-recursive/
   * Time complexity: O(n), Where n is the size of the linked list
   */
  length(): number {
    let length = 0;

    this.traverse({
      onLoop: ({node}) => {
        length++;
        return !node.next;
      },
    });

    return length;
  }

  toString(): string {
    const array: number[] = [];

    this.traverse({
      onLoop: ({node}) => {
        array.push(node.data);
        return false;
      }
    });

    return array.join(',');
  }

  private getTail(): Node | undefined {
    let pointer: Node | undefined;

    this.traverse({
      onLoopEnd: tail => {
        pointer = tail;
      }
    });

    return pointer;
  }

  private traverse({onLoop, onLoopEnd}: TraverseParameter) {
    let pointer: Node | undefined = this.head;
    let beforeNode: Node | undefined = undefined;

    while (pointer) {
      const type: NodeType = pointer === this.head ? 'head' : pointer.next ? 'between' : 'tail';
      const needToReturn = onLoop?.({node: pointer, beforeNode: beforeNode as any, type});

      if (needToReturn) {
        return;
      }

      if (pointer.next) {
        beforeNode = pointer;
        pointer = pointer.next;
      } else {
        break;
      }
    }

    onLoopEnd?.(pointer);
  }
}

type TraversingMeta =  {
  node: Node;
  beforeNode: Node | undefined;
  type: Extract<NodeType, 'head'>;
} | {
  node: Node;
  beforeNode: Node;
  type: Exclude<NodeType, 'head'>;
}

interface TraverseParameter {
  onLoop?: (meta: TraversingMeta) => boolean; // head부터 tail까지 1번씩 실행됨.
  onLoopEnd?: (tail: Node | undefined) => void; // head조차 없으면 undefined일 수 있음.
}

type NodeType = 'head' | 'between' | 'tail';

const list = new SinglyLinkedList();
list.push(1);
list.push(3);
list.push(4);
list.insertAt(0, 0);
list.insertAt(2, 2);
list.insertAt(4, 5);
