import Queue from '@/data-structure/queue';

/**
 * URL: https://www.geeksforgeeks.org/dsa/array-implementation-of-queue-simple/
 * Doc: https://docs.google.com/document/d/1wgKMP81FqWcW2bWlXtkmmBwoDo3QFQOmByRfcBACIkA/edit?tab=t.0
 *
 * Auxiliary Space: O(n), as here we are using an n size array for implementing Queue
 */
export default class SimplestQueue<D> extends Queue<D> {
  private readonly queue: D[];

  constructor() {
    super();
    this.queue = [];
  }

  getFront(): D | undefined {
    return this.queue[0];
  }

  getRear(): D | undefined {
    return this.queue[this.queue.length - 1];
  }

  // Time Complexity: O(1)
  enqueue(data: D) {
    this.queue.push(data);
  }

  // Time Complexity: O(n), 왜냐하면 shift()가 젤 앞에꺼 리턴하고 그 뒤에꺼 다 한칸씩 당겨와야해서
  dequeue(): D | undefined {
    return this.queue.shift();
  }

  toString() {
    return this.queue.join(' ')
  }
}
