import LinkedList, {SinglyNode} from '@/examples/data-structure/linked-list';

/**
 * URL: https://www.geeksforgeeks.org/singly-linked-list-tutorial/
 * Doc: https://docs.google.com/document/d/1RxLj_q7xhg6wS1HpJrTftnBI7jshw5Mf24vpKDi2EUQ/edit?tab=t.0
 */
export default class SinglyLinkedList<D> extends LinkedList<D> {
  private head: SinglyNode<D> | undefined;
  private tail: SinglyNode<D> | undefined;

  constructor() {
    super();
    this.head = undefined;
    this.tail = undefined;
  }

  /** Time Complexity
   * 1. head pointer 하나만 쓰는 경우 > O(n), where n is the number of nodes in the linked list.
   * 2. tail pointer도 같이 쓰는 경우 > O(1)
   */
  push(data: D) {
    // TODO 추후 D 제네릭 타입에 undefined가 올 수 없도록 추가하고, 모든 자료구조에 undefined 막을 에정
    if (data === undefined) {
      throw new TypeError('undefined인 data를 push()할 수 없습니다.');
    }

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
  get(index: number): D | undefined {
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
   * URL: https://www.geeksforgeeks.org/dsa/reverse-a-linked-list/
   * Time Complexity: O(n)
   */
  reverse() {
    let beforeNode: SinglyNode<D> | undefined = undefined;
    let currentNode: SinglyNode<D> | undefined = this.head;

    while (currentNode) {
      const originalNextNode: SinglyNode<D> | undefined = currentNode.next;
      currentNode.next = beforeNode; // 첨에 여기서 head의 next도 같이 사라짐
      beforeNode = currentNode;
      currentNode = originalNextNode;
    }

    // https://www.geeksforgeeks.org/dsa/reverse-a-linked-list/ 에는 별도 linked list 인스턴스가 따로 있는게 아니어서 아래 코드가 추가로 필요함.
    [this.head, this.tail] = [this.tail, this.head];
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
  insertAt(index: number, data: D) {
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
      (this.tail as SinglyNode<D>).next = newNode;
      this.tail = newNode;

      // 중간에 삽입해야하는 경우
    } else {
      newNode.next = beforeNode.next;
      beforeNode.next = newNode;
    }
  }

  // 헤더 vs 중간 vs 마지막 삭제하는 로직은 insertAt()와 동일함.
  deleteAt(index: number) {
    if (index === 0) {
      const deletedData = this.head?.data;

      this.head = this.head?.next;

      // List의 길이가 0이 되버린 경우
      if (!this.head) {
        this.tail = undefined;
      }

      return deletedData;
    }

    let beforeNode = this.getBeforeNode(index);

    if (!beforeNode) {
      return undefined;
    }

    let deletedData = beforeNode.next?.data;

    if (beforeNode.next === this.tail) {
      beforeNode.next = undefined;
      this.tail = beforeNode;
    } else {
      beforeNode.next = beforeNode.next?.next;
    }

    return deletedData;
  }

  /**
   * https://www.geeksforgeeks.org/dsa/search-an-element-in-a-linked-list-iterative-and-recursive/
   * Time Complexity: O(n), where n is the number of nodes in the linked list.
   */
  findIndex(data: D): number {
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
    const array: D[] = [];

    for (const node of this) {
      array.push(node.data);
    }

    return array.join(',');
  }

  getHead(): D | undefined {
    return this.head?.data;
  }

  getTail(): D | undefined {
    return this.tail?.data;
  }

  toArray(): D[] {
    const result: D[] = [];

    for (const data of this) {
      result.push(data.data);
    }

    return result;
  }

  /**
   * index의 직전 노드를 반환합니다.
   * 경우는 index가 0이거나 리스트의 범위를 넘어섰을 때 undefined를 반환합니다.
   */
  private getBeforeNode(index: number): SinglyNode<D> | undefined {
    if (index === 0) {
      return undefined;
    }

    let nextIndex = 1;
    let beforeNode: SinglyNode<D> = this.head as SinglyNode<D>;

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