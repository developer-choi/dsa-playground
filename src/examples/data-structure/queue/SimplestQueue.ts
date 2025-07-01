import Queue from '@/examples/data-structure/queue/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/array-implementation-of-queue-simple/
 * Doc: https://docs.google.com/document/d/1wgKMP81FqWcW2bWlXtkmmBwoDo3QFQOmByRfcBACIkA/edit?tab=t.0
 *
 * Auxiliary Space: O(n), as here we are using an n size array for implementing Queue
 */
export default class SimplestQueue extends Queue {
  private readonly queue: number[];

  constructor() {
    super();
    this.queue = [];
  }

  getFront(): number | undefined {
    return this.queue[0];
  }

  getRear(): number | undefined {
    return this.queue[this.queue.length - 1];
  }

  // Time Complexity: O(1)
  enqueue(data: number) {
    this.queue.push(data);
  }

  // Time Complexity: O(n), 왜냐하면 shift()가 젤 앞에꺼 리턴하고 그 뒤에꺼 다 한칸씩 당겨와야해서
  dequeue(): number | undefined {
    return this.queue.shift();
  }

  toString() {
    return this.queue.join(' ')
  }
}

const q = new SimplestQueue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
console.log(q.getFront()); // Expected: 1
q.dequeue();
q.enqueue(4);
console.log(q.toString()); // Expected: 2 3 4
