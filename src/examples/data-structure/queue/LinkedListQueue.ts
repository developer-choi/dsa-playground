import Queue from '@/examples/data-structure/queue/index';
import SinglyLinkedList from '@/examples/data-structure/linked-list/SinglyLinkedList';

export default class LinkedListQueue extends Queue {
  private readonly list: SinglyLinkedList;

  constructor() {
    super();
    /**
     * CircularQueue와 비교했을 떄,
     * 둘 다 Auxiliary Space는 O(size)임.
     *
     * 하지만, CircularQueue는 사이즈가 고정이고
     * LinkedList는 사이즈가 가변이라는 차이가 있음.
     *
     * 즉 서로 Fixed Size vs Dynamic Size의 장단점을 갖고있음.
     */
    this.list = new SinglyLinkedList();
  }

  /**
   * CircularQueued와 비교했을 떄,
   * Time Complexity는 동일하게 O(1)임. head 포인터가 가리키는거 바로 가져오니까.
   */
  getFront(): number | undefined {
    return this.list.getHead();
  }

  /**
   * CircularQueued와 비교했을 떄,
   * Time Complexity는 동일하게 O(1)임. tail 포인터가 가리키는거 바로 가져오니까.
   */
  getRear(): number | undefined {
    return this.list.getTail();
  }

  /**
   * CircularQueued와 비교했을 떄,
   * Time Complexity는 동일하게 O(1)임. tail 포인터로 바로접근해서 그 뒤에 노드 1개 추가하니까.
   */
  enqueue(data: number): void {
    this.list.push(data);
  }

  /**
   * CircularQueued와 비교했을 떄,
   * Time Complexity는 동일하게 O(1)임. head 포인터로 바로 접근해서 삭제하니까.
   */
  dequeue(): number | undefined {
    return this.list.deleteAt(0);
  }

}