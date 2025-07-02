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
console.log(list);
