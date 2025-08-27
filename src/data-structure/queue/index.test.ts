import SimplestQueue from '@/data-structure/queue/SimplestQueue';
import CircularQueue from '@/data-structure/queue/CircularQueue';
import LinkedListQueue from '@/data-structure/queue/LinkedListQueue';

const CAPACITY = 3;

// yarn test src/data-structure/queue/index.test.ts
const queues = [
  {name: 'SimplestQueue', createInstance: () => new SimplestQueue()},
  {name: 'CircularQueue', createInstance: () => new CircularQueue(CAPACITY)},
  {name: 'LinkedListQueue', createInstance: () => new LinkedListQueue()},
];

describe.each(queues)('Data Structure > $name', ({createInstance}) => {
  it('enqueue / dequeue를 반복하더라도 잘 동작해야한다.', () => {
    const instance = createInstance();

    // 1회차 enqueue
    instance.enqueue(1);
    expect(instance.getFront()).toBe(1);
    expect(instance.getRear()).toBe(1);

    instance.enqueue(2);
    expect(instance.getFront()).toBe(1);
    expect(instance.getRear()).toBe(2);

    instance.enqueue(3);
    expect(instance.getFront()).toBe(1);
    expect(instance.getRear()).toBe(3);

    // 1회차 dequeue
    expect(instance.dequeue()).toBe(1);
    expect(instance.getFront()).toBe(2);
    expect(instance.getRear()).toBe(3);

    expect(instance.dequeue()).toBe(2);
    expect(instance.getFront()).toBe(3);
    expect(instance.getRear()).toBe(3);

    // 2회차 enqueue
    instance.enqueue(4);
    expect(instance.getFront()).toBe(3);
    expect(instance.getRear()).toBe(4);

    instance.enqueue(5);
    expect(instance.getFront()).toBe(3);
    expect(instance.getRear()).toBe(5);

    // 2회차 dequeue
    expect(instance.dequeue()).toBe(3);
    expect(instance.getFront()).toBe(4);
    expect(instance.getRear()).toBe(5);

    expect(instance.dequeue()).toBe(4);
    expect(instance.getFront()).toBe(5);
    expect(instance.getRear()).toBe(5);

    expect(instance.dequeue()).toBe(5);
    expect(instance.getFront()).toBe(undefined);
    expect(instance.getRear()).toBe(undefined);
  });
});
