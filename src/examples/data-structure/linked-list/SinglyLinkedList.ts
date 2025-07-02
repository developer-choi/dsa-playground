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
    let index = -1;

    this.traverse({
      onLoop: node => {
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
      onLoop: (node) => {
        length++;
        return !node.next;
      },
    });

    return length;
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

    while (pointer) {
      const needToReturn = onLoop?.(pointer);

      if (needToReturn) {
        return;
      }

      if (pointer.next) {
        pointer = pointer.next;
      } else {
        break;
      }
    }

    onLoopEnd?.(pointer);
  }
}

interface TraverseParameter {
  onLoop?: (node: Node) => boolean; // head부터 tail까지 1번씩 실행됨.
  onLoopEnd?: (tail: Node | undefined) => void; // head조차 없으면 undefined일 수 있음.
}

const list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
console.log(list.get(0));
console.log(list.get(1));
console.log(list.get(2));
console.log(list.get(3));
