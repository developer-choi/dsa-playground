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
        return; // 추가 후 종료
      }

      currentIndex++;
      beforeNode = node;
    }
  }

  /** TODO
   * URL: https://www.geeksforgeeks.org/dsa/reverse-a-linked-list/
   * 정답 안보고 풀어보려다 막혔음.
   *
   * 1==>2==>3==>4 에서
   * 1,2,3,4 순회하면서
   * 1<==2<==3<==4로 만들려고 했음.
   * 단, 중간에 next를 계속 역순으로 바꾸지만 1==>4 방향으로 계속 가긴 가야해서
   * temporary 변수를 여러개 선언했었는데 복잡한 감이 있는듯.
   *
   * 미래에는 아이디어 안떠오르면 그냥 긱포긱에서 reverse() 어케 하는지 지문 보고 코드 보기 전에 그 지문대로 직접 구현해보면 될듯
   * @deprecated
   */
  reverse() {
    let originalPointer = this.head;
    let newTailPointer = originalPointer;

    while (originalPointer) {
      let originalPointerNext = originalPointer.next;

      if (newTailPointer !== originalPointer) {
        let temp = newTailPointer;
        newTailPointer = originalPointer;
        newTailPointer.next = temp;
      }

      originalPointer = originalPointerNext;
    }

    this.head = newTailPointer;
  }

  // 헤더 vs 중간 vs 마지막 삭제하는 로직은 insertAt()와 동일함.
  deleteAt(index: number) {
    let currentIndex = 0;
    let beforeNode: Node | undefined = undefined;

    for (const node of this) {
      if (currentIndex === index) {
        if (node === this.head) {
          this.head = this.head?.next;
        } else {
          // 이 노드가 중간노드여도, 마지막 노드여도, 상관없이 이 코드라인 하나로 대응이 가능함.
          (beforeNode as Node).next = node.next;
        }
        return; // 삭제 후 종료
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
console.log(list.toString()); // 0, 1, 2, 3, 4, 5
list.deleteAt(0);
console.log(list.toString()); // 1, 2, 3, 4, 5
list.deleteAt(2);
console.log(list.toString()); // 1, 2, 4, 5
list.deleteAt(3);
console.log(list.toString()); // 1, 2, 4