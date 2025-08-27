import Queue from '@/data-structure/queue/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/introduction-to-circular-queue/
 * Doc: https://docs.google.com/document/d/1wgKMP81FqWcW2bWlXtkmmBwoDo3QFQOmByRfcBACIkA/edit?tab=t.0
 *
 * Circular 라는 단어를 써서 오히려 햇갈렸는데,
 * 1. 실제 메모리에 원형 구조로 데이터가 저장되는건 일단 말이안됨 ㅋㅋ Contiguous로 저장되는 그 배열 맞음.
 * 2. 그렇다고 Circular Linked List 처럼 포인터가 서로 원형으로 가리키는 구조도 아님.
 * 3. 여기서 말하는 Circular는, 그냥 Linear / Contiguous 특징을 가진 Array에서 this.front 포인터가 원형으로 빙글빙글 돌면서 가리킨다. 는 뜻이었음.
 *
 * dequeue() ==> this.front를 우측으로 한칸 옮겨야함 근데 계속 우측으로 한칸 옮기면? capacity 벗어남. 그래서 다시 0부터 가리키게 함.
 * enqueue() ==> Linear + Contiguous 배열의 제일 끝에 추가해야함. ==> this.front가 한 중간쯤에 있음 ==> 그럼 capacity보다 절반 벗어남 ==> 순환해서 다시 0부터 절반까지로 데이터 집어넣음.
 */
export default class CircularQueue<D> extends Queue<D> {
  private readonly array: D[];
  private readonly capacity: number;
  private size: number;
  private frontIndex: number;

  constructor(capacity: number) {
    super();
    this.array = [];
    this.size = 0;
    this.capacity = capacity;
    this.frontIndex = 0;
  }

  getFront(): D | undefined {
    if (this.size === 0) {
      return undefined;
    }

    return this.array[this.frontIndex];
  }

  getRear(): D | undefined {
    if (this.size === 0) {
      return undefined;
    }

    const currentRearIndex = (this.frontIndex + this.size - 1) % this.capacity;
    return this.array[currentRearIndex];
  }

  /**
   * 1. 실행 후 frontIndex는 그대로 있어야함
   * 2. 배열 제일 끝에 새로운 아이템을 추가해야함.
   */
  enqueue(data: D): void {
    if (this.size === this.capacity) {
      return;
    }

    /**
     * 여기서 %를 안쓰면, this.front + size가 capacity를 넘어갔을 때 대응이 안됨.
     *
     * 예시)
     * 1. capacity 3 만들고
     * 2. enqueue() x 3회 하면 this.front 0 / size 3 되고
     * 3. dequeue() x 2회 하면 this.front 2 / size 1 되고
     * 4. 다시 enqueue() x 3회 하면 this.front 2 유지되면서 size는 3 되고
     * 이 때 this.front + this.size 하면 5나옴
     */
    const nextRearIndex = (this.frontIndex + this.size) % this.capacity;
    this.array[nextRearIndex] = data;
    this.size++;
  }

  /**
   * 실행 후 frontIndex가 우측으로 한칸 이동해야함.
   * 단, capacity를 벗어나면 다시 0부터 시작해야함.
   *
   * SimplestQueue와 달리, dequeue()의 Time Complexity가 O(1)임.
   */
  dequeue(): D | undefined {
    if (this.size === 0) {
      return undefined;
    }

    const frontValue = this.getFront();

    // 여기서 % 안쓰면, capacity가 3이면 front가 3이될 수 있음.
    this.frontIndex = (this.frontIndex + 1) % this.capacity;
    this.size--;
    return frontValue;
  }
}
