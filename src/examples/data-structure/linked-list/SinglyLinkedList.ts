import LinkedList, {SinglyNode} from '@/examples/data-structure/linked-list';

/**
 * URL: https://www.geeksforgeeks.org/singly-linked-list-tutorial/
 * Doc: https://docs.google.com/document/d/1RxLj_q7xhg6wS1HpJrTftnBI7jshw5Mf24vpKDi2EUQ/edit?tab=t.0
 */
export default class SinglyLinkedList extends LinkedList {
  private head: SinglyNode | undefined;
  private tail: SinglyNode | undefined;

  constructor() {
    super();
    this.head = undefined;
    this.tail = undefined;
  }

  /** Time Complexity
   * 1. head pointer 하나만 쓰는 경우 > O(n), where n is the number of nodes in the linked list.
   * 2. tail pointer도 같이 쓰는 경우 > O(1)
   */
  push(data: number) {
    const newNode = new SinglyNode(data);

    // 실제로는, tail이 있다면 head가 반드시 있지만 else에서 Type Guard 때문에 이렇게 조건을 잡았음.
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
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

  getHead(): number | undefined {
    return this.head?.data;
  }

  getTail(): number | undefined {
    return this.tail?.data;
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
    const newNode = new SinglyNode(data);

    // head에 삽입해야하는 경우
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;

      // List에 요소가 1개밖에 없는 경우
      if (!this.head.next) {
        this.tail = this.head;
      }

      return;
    }

    const beforeNode = this.getBeforeNode(index);

    if (!beforeNode) {
      return;
    }

    // tail에 삽입해야하는 경우
    if (!beforeNode.next) {
      (this.tail as SinglyNode).next = newNode;
      this.tail = newNode;

      // 중간에 삽입해야하는 경우
    } else {
      newNode.next = beforeNode.next;
      beforeNode.next = newNode;
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
    if (index === 0) {
      this.head = this.head?.next;

      // List의 길이가 0이 되버린 경우
      if (!this.head) {
        this.tail = undefined;
      }

      return;
    }

    let beforeNode = this.getBeforeNode(index);

    if (!beforeNode) {
      return;
    }

    if (beforeNode.next === this.tail) {
      beforeNode.next = undefined;
      this.tail = beforeNode;
    } else {
      beforeNode.next = beforeNode.next?.next;
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

  /**
   * index의 직전 노드를 반환합니다.
   * 경우는 index가 0이거나 리스트의 범위를 넘어섰을 때 undefined를 반환합니다.
   */
  private getBeforeNode(index: number): SinglyNode | undefined {
    if (index === 0) {
      return undefined;
    }

    let nextIndex = 1;
    let beforeNode: SinglyNode = this.head as SinglyNode;

    while (beforeNode.next && nextIndex < index) {
      beforeNode = beforeNode.next;
      nextIndex++;
    }

    // 배열 길이보다 index가 큰 경우
    if (nextIndex !== index) {
      return undefined;
    }

    return beforeNode;
  }

  public* [Symbol.iterator]() {
    let pointer = this.head;
    while (pointer) {
      yield pointer;
      pointer = pointer.next;
    }
  }
}

// TODO 테스트 코드 짤 때 toString()이랑 head, tail이 올바른위치에 있는지랑 테스트코드 돌리자 아 시발 불편해죽겠네
// TODO 테스트 케이스는 특히 긱포긱 지켜야하고, 내 과거 커밋에서 간단하게 테스트했던 코드도 지켜야함.
const list = new SinglyLinkedList();
list.push(1);
list.push(3);
list.push(5);
console.log(list.toString()); // 1, 3, 5
list.insertAt(0, 0);
console.log(list.toString()); // 0, 1, 3, 5
list.insertAt(2, 2);
console.log(list.toString()); // 0, 1, 2, 3, 5
list.insertAt(4, 4);
console.log(list.toString()); // 0, 1, 2, 3, 4, 5
list.insertAt(6, 6);
console.log(list.toString()); // 0, 1, 2, 3, 4, 5, 6
list.deleteAt(0);
console.log(list.toString()); // 1, 2, 3, 4, 5, 6
list.deleteAt(2);
console.log(list.toString()); // 1, 2, 4, 5, 6
list.deleteAt(3);
console.log(list.toString()); // 1, 2, 4, 6
list.deleteAt(0);
list.deleteAt(0);
list.deleteAt(0);
list.deleteAt(0);
console.log(list.toString() === '' ? 'empty string' : list.toString()); // empty string