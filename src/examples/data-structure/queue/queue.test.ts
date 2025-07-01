import SimplestQueue from '@/examples/data-structure/queue/SimplestQueue';
import CircularQueue from '@/examples/data-structure/queue/CircularQueue';

const CAPACITY = 3;

const queues = [
  {name: 'SimplestQueue Queue', instance: new SimplestQueue()},
  {name: 'CircularQueue', instance: new CircularQueue(CAPACITY)},
];

describe.each(queues)('$name Algorithm', ({instance}) => {
  it('1회차에 넣을 때 잘 들어가야한다.', () => {
    instance.enqueue(1);
    expect(instance.getFront()).toBe(1);
    expect(instance.getRear()).toBe(1);

    instance.enqueue(2);
    expect(instance.getFront()).toBe(1);
    expect(instance.getRear()).toBe(2);

    instance.enqueue(3);
    expect(instance.getFront()).toBe(1);
    expect(instance.getRear()).toBe(3);
  });

  it('1회차에 제거할 때 잘 빠져야한다.', () => {
    expect(instance.dequeue()).toBe(1);
    expect(instance.getFront()).toBe(2);
    expect(instance.getRear()).toBe(3);

    expect(instance.dequeue()).toBe(2);
    expect(instance.getFront()).toBe(3);
    expect(instance.getRear()).toBe(3);
  });

  it('2회차에 넣을 때 잘 들어가야한다.', () => {
    instance.enqueue(4);
    expect(instance.getFront()).toBe(3);
    expect(instance.getRear()).toBe(4);

    instance.enqueue(5);
    expect(instance.getFront()).toBe(3);
    expect(instance.getRear()).toBe(5);
  });

  it('2회차에 제거할 때 잘 빠져야한다.', () => {
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
