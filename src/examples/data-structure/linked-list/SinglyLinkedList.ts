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

  // Time Complexity: O(n), where n is the number of nodes in the linked list.
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

    for (const node of this) {
      if (i === index) {
        return node.data;
      }
      i++;
    }

    return undefined;
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
    let beforeNode: Node | undefined = undefined;

    for (const node of this) {
      if (currentIndex === index) {
        let type: NodeType;

        if (node === this.head) {
          type = 'head';
        } else if (node.next) {
          type = 'between';
        } else {
          type = 'tail';
        }

        const newNode = new Node(data);

        switch (type) {
          case 'head': {
            this.head = newNode;
            this.head.next = node;
            break;
          }

          case 'between': {
            (beforeNode as Node).next = newNode;
            newNode.next = node;
            break;
          }

          case 'tail':
            node.next = newNode;
            break;
        }
      }

      currentIndex++;
      beforeNode = node;
    }
  }

  /**
   * https://www.geeksforgeeks.org/dsa/search-an-element-in-a-linked-list-iterative-and-recursive/
   * Time Complexity: O(n), where n is the number of nodes in the linked list.
   */
  findIndex(data: number): number {
    let index = 0;

    for (const node of this) {
      if (node.data === data) {
        return index;
      }
      index++;
    }

    return -1;
  }

  /**
   * https://www.geeksforgeeks.org/dsa/find-length-of-a-linked-list-iterative-and-recursive/
   * Time complexity: O(n), Where n is the size of the linked list
   */
  length(): number {
    let length = 0;

    for (const {} of this) {
      length++;
    }

    return length;
  }

  toString(): string {
    const array: number[] = [];

    for (const node of this) {
      array.push(node.data);
    }

    return array.join(',');
  }

  private getTail(): Node | undefined {
    let pointer: Node | undefined;

    for (const node of this) {
      pointer = node;
    }

    return pointer;
  }

  public* [Symbol.iterator]() {
    let pointer = this.head;
    while (pointer) {
      yield pointer;
      pointer = pointer.next;
    }
  }
}

type NodeType = 'head' | 'between' | 'tail';

const list = new SinglyLinkedList();
list.push(1);
list.push(3);
list.push(4);
list.insertAt(0, 0);
list.insertAt(2, 2);
list.insertAt(4, 5);
