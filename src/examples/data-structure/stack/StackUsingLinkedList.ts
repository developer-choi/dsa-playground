import LinkedList from '../linked-list';
import SinglyLinkedList from '../linked-list/SinglyLinkedList';
import Stack from '@/examples/data-structure/stack';

/**
 * URL: https://www.geeksforgeeks.org/dsa/implement-a-stack-using-singly-linked-list/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0#heading=h.ika3ybx2u5yu
 */
export default class StackUsingLinkedList<D> extends Stack<D> {
  private readonly linkedList: LinkedList<D>;

  constructor() {
    super();
    this.linkedList = new SinglyLinkedList();
  }

  push(data: D) {
    this.linkedList.insertAt(0, data);
  }

  pop() {
    const headData = this.linkedList.getHead();

    if (!headData) {
      throw new RangeError('Stack underflow');
    }

    this.linkedList.deleteAt(0);
    return headData;
  }

  peek() {
    return this.linkedList.getHead();
  }
}
