import SinglyLinkedList from '../linked-list/SinglyLinkedList';
import Stack from '@/data-structure/stack/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/implement-a-stack-using-singly-linked-list/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0#heading=h.ika3ybx2u5yu
 */
export default class StackUsingLinkedList<D> extends Stack<D> {
  private readonly linkedList: SinglyLinkedList<D>;
  private _length: number;

  constructor() {
    super();
    this.linkedList = new SinglyLinkedList<D>();
    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  push(data: D) {
    this.linkedList.insertAt(0, data);
    this._length++;
  }

  pop() {
    const headData = this.linkedList.getHead();

    /**
     * 여기서 !headData로 체크하면 큰일남.
     * headData기 빈문자열, 0 이런 데이터를 가리키고있어도 falsy로 체크됨.
     */
    if (headData === undefined) {
      throw new RangeError('Stack underflow');
    }

    this.linkedList.deleteAt(0);
    this._length--;
    return headData;
  }

  peek() {
    return this.linkedList.getHead();
  }

  // 테스트 목적으로 추가한 메소드이며 성능상 안좋은게 맞습니다.
  toArray(): D[] {
    return Array.from(this.linkedList).toReversed();
  }
}
