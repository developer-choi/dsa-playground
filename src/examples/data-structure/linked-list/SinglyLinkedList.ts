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

  private getTail(): Node | undefined {
    if (!this.head) {
      return undefined;
    }

    let pointer: Node = this.head;

    while (true) {
      if (pointer.next) {
        pointer = pointer.next;
      } else {
        break;
      }
    }

    return pointer;
  }
}

const list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
console.log(list.get(0));
console.log(list.get(1));
console.log(list.get(2));
console.log(list.get(3));
