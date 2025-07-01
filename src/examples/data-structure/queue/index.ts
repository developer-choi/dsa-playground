export default abstract class Queue {
  abstract getFront(): number | undefined;
  abstract getRear(): number | undefined;
  abstract enqueue(data: number): void;
  abstract dequeue(): number | undefined;
}
