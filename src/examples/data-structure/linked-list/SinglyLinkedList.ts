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
   * https://www.geeksforgeeks.org/dsa/search-an-element-in-a-linked-list-iterative-and-recursive/
   * Time Complexity: O(n), where n is the number of nodes in the linked list.
   */
  findIndex(data: number): number {
    // TODO 이거 체크하는 코드도 밑에 반복문으로 대체할 수 있을지도?
    if (!this.head) {
      return -1;
    }

    // TODO 순회하는 코드만 따로 분리가 가능할것같음
    let index = 0;
    let pointer: Node = this.head;

    while (true) {
      if (data === pointer.data) {
        return index;
      }

      if (pointer.next) {
        pointer = pointer.next;
        index++;
      } else {
        break;
      }
    }

    return -1;
  }

  /**
   * https://www.geeksforgeeks.org/dsa/find-length-of-a-linked-list-iterative-and-recursive/
   * Time complexity: O(n), Where n is the size of the linked list
   */
  length(): number {
    // TODO 순회하는 코드만 따로 분리가 가능할것같음
    let length = 0;
    let pointer: Node | undefined = this.head;

    if (pointer) {
      length++;
    }

    while (true) {
      if (pointer?.next) {
        pointer = pointer.next;
        length++;
      } else {
        break;
      }
    }

    return length;
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
console.log(list.length());
list.push(1);
console.log(list.length());
list.push(2);
console.log(list.length());
list.push(3);
console.log(list.length());
