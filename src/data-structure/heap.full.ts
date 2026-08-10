/**
 * 최대본. 문제에서 import 하지 않는다 — 최소본(heap.ts)으로 안 되는 문제를 만났을 때
 * 이 파일을 복사해 쓰는 용도.
 *
 * 지울 때: 문제는 보통 한 종류만 요구하므로 안 쓰는 쪽 클래스(MinHeap 또는 MaxHeap) 하나만
 * 지운다. abstract Heap 은 남겨도 그대로 컴파일되고 동작한다 — 남은 클래스 안으로 합치려면
 * 필드·생성자·메서드를 손으로 옮기고 abstract 를 떼야 하는데, 붙여넣는 줄이 조금 주는 것
 * 말고 얻는 게 없다.
 *
 * URL: https://www.geeksforgeeks.org/dsa/binary-heap/
 * URL: https://www.geeksforgeeks.org/javascript/min-heap-in-javascript/
 * URL: https://www.geeksforgeeks.org/javascript/max-heap-in-javascript/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 */

/**
 * 비교 함수의 타입 정의.
 * @returns {number}
 * - 음수: a가 b보다 작음
 * - 0: a와 b가 같음
 * - 양수: a가 b보다 큼
 */
export type Comparator<T> = (a: T, b: T) => number;

// Heap은 직접 만들면 안되고 자식으로만 만들어야하니 abstract 키워드가 맞음.
export abstract class Heap<T = number> {
  protected readonly array: T[];
  protected readonly comparator: Comparator<T>;

  protected constructor(comparator?: Comparator<T>) {
    this.array = [];
    this.comparator = comparator ?? ((a: T, b: T) => (a as number) - (b as number));
  }

  get length(): number {
    return this.array.length;
  }

  /**
   * min / max 값을 얻는데 Time Complexity가 O(1) 이라는게 가장 큰 장점임.
   * array는 O(n)인데.
   */
  peek(): T | undefined {
    return this.array[0];
  }

  /**
   * Time Complexity: O(h) - heapifyDown() 때문에.
   * History > https://www.geeksforgeeks.org/dsa/binary-heap/ 의 extractMin()
   */
  extractRoot(): T | undefined {
    if (this.array.length === 0) {
      return undefined;
    }

    const result = this.array[0];
    this.array[0] = this.array[this.array.length - 1];
    this.array.pop();

    /**
     * heapifyUp()이 아닌 heapifyDown()을 해야하는 이유는
     * heap의 규칙을 깨뜨린 요소가 제일 위에 있기 때문에,
     * 아래로 내려가면서 규칙을 재확인 해야하기 때문.
     */
    this.heapifyDown(0);
    return result;
  }

  /**
   * Time Complexity: O(h) - heapifyUp() 때문에.
   * History > https://www.geeksforgeeks.org/dsa/binary-heap/ 의 insert()
   */
  add(data: T): void {
    this.array.push(data);

    /**
     * heapifyDown()이 아닌 heapifyUp()을 해야하는 이유는
     * heap의 규칙을 깨뜨린 요소가 제일 뒤에 있기 때문에,
     * 위로 올라가면서 규칙을 재확인 해야하기 때문.
     */
    this.heapifyUp(this.array.length - 1);
  }

  /**
   * Time Complexity: O(h) - decreaseKey() 랑 extractMin() 때문에.
   *
   * History > https://www.geeksforgeeks.org/dsa/binary-heap/ deleteKey() 보고 만들었다가,
   * 1. Maxheap도 동시에 지원해야했어서 promoteToRoot()로 내부구현을 바꿨고,
   * 2. 제네릭을 지원해야해서 promoteToRoot() 대신 0번째 / 마지막 번째 요소 서로 바꾸고 재배열 하는걸로 바꿨음.
   */
  deleteKey(index: number) {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError('Index out of bounds');
    }

    const lastIndex = this.array.length - 1;
    [this.array[index], this.array[lastIndex]] = [this.array[lastIndex], this.array[index]];
    this.array.pop();

    if (this.array.length > 0 && index < this.array.length) {
      const parentIndex = this.getFamilyIndexes(index).parent;
      if (parentIndex >= 0 && this.shouldSwap(this.array[parentIndex], this.array[index])) {
        this.heapifyUp(index);
      } else {
        this.heapifyDown(index);
      }
    }
  }

  // heapifyUp() 에서 사용하기 위해 반드시 오버라이딩 해야함.
  protected abstract shouldSwap(parentItem: T, childrenItem: T): boolean;

  /**
   * URL: https://www.geeksforgeeks.org/dsa/binary-heap/
   * Doc: https://docs.google.com/document/d/1HUHbm0GTjutNvsWu4imZIXkQUTt18yy7IzldOHtQtDc/edit?tab=t.0
   * @return parent, left, right index가 array의 범위를 벗어나는 경우, -1이 응답됨.
   */
  protected getFamilyIndexes(index: number) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const parent = Math.floor((index - 1) / 2);

    return {
      left: left >= this.array.length ? -1 : left,
      right: right >= this.array.length ? -1 : right,
      parent: parent < 0 ? -1 : parent,
    };
  }

  /**
   * GFG 링크에서 insert() 예제에서 스왑하는 부분만 코드로 분리했음
   * Time Complexity: O(h) - 트리 높이만큼만 순회함.
   * History > https://www.geeksforgeeks.org/dsa/binary-heap/ 의 insert() 에서 코드만 분리헀음.
   */
  protected heapifyUp(targetIndex: number) {
    let currentIndex = targetIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.shouldSwap(this.array[parentIndex], this.array[currentIndex])) {
      [this.array[parentIndex], this.array[currentIndex]] = [this.array[currentIndex], this.array[parentIndex]];

      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }

  /**
   * targetIndex를 제외한 나머지 index는 heap 조건을 만족한다고 가정 (GFG와 동일)
   * GFG 링크에서 MinHeapify() 메소드를 이름 바꿔서 구현했음.
   * Time Complexity: O(h) - 트리 높이만큼만 순회함.
   * History > https://www.geeksforgeeks.org/dsa/binary-heap/ 에서 MinHeapify()
   */
  protected heapifyDown(targetIndex: number): void {
    let extremeIndex = this.getExtremeIndex(targetIndex);

    if (extremeIndex !== targetIndex) {
      [this.array[targetIndex], this.array[extremeIndex]] = [this.array[extremeIndex], this.array[targetIndex]];
      this.heapifyDown(extremeIndex);
    }
  }

  /**
   * @description 부모, 왼쪽자식, 오른쪽 자식 3개중 가장 우선순위가 높은 인덱스 찾기
   * MinHeap이면 가장 작은값 찾기
   * MaxHeap이면 가장 큰 값 찾기
   * History > https://www.geeksforgeeks.org/dsa/binary-heap/ 에서 MinHeapify() 에서 그냥 코드만 분리한거
   */
  private getExtremeIndex(targetIndex: number) {
    const {left, right} = this.getFamilyIndexes(targetIndex);
    let extremeIndex = targetIndex;

    [left, right].forEach(index => {
      if (index !== -1 && this.shouldSwap(this.array[extremeIndex], this.array[index])) {
        extremeIndex = index;
      }
    });

    return extremeIndex;
  }
}

export class MinHeap<T = number> extends Heap<T> {
  constructor(comparator?: Comparator<T>) {
    super(comparator);
  }

  protected shouldSwap(parentItem: T, childrenItem: T): boolean {
    return this.comparator(parentItem, childrenItem) > 0;
  }

  /**
   * Time Complexity: O(h) - bubbleUp() 때문에.
   */
  decreaseKey(index: number, newItem: T): void {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError('Index out of bounds');
    }

    if (this.comparator(newItem, this.array[index]) > 0) {
      throw new TypeError(`새로운 값(${newItem})은 기존 값(${this.array[index]})보다 작아야 합니다.`);
    }

    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}

export class MaxHeap<T = number> extends Heap<T> {
  constructor(comparator?: Comparator<T>) {
    super(comparator);
  }

  protected shouldSwap(parentItem: T, childrenItem: T): boolean {
    return this.comparator(parentItem, childrenItem) < 0;
  }

  increaseKey(index: number, newItem: T): void {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError('Index out of bounds');
    }

    if (this.comparator(newItem, this.array[index]) < 0) {
      throw new TypeError(`새로운 값(${newItem})은 기존 값(${this.array[index]})보다 커야 합니다.`);
    }

    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}
