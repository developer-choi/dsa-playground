export default abstract class Queue<D> {
  abstract getFront(): D | undefined;
  abstract getRear(): D | undefined;
  abstract enqueue(data: D): void;
  abstract dequeue(): D | undefined;
}
