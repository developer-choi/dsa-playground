export default abstract class LinkedList<D> {
  abstract push(data: D): void;
  abstract get(index: number): D | undefined;
  abstract reverse(): void;
  abstract insertAt(index: number, data: D): void;
  abstract deleteAt(index: number): D | undefined;
  abstract findIndex(data: D): number;
  abstract length(): number;
  abstract toString(): string;
  abstract getHead(): D | undefined;
  abstract getTail(): D | undefined;
  abstract toArray(): D[]; // 테스트 목적으로 추가
}

export class SinglyNode<D> {
  data: D;
  next: SinglyNode<D> | undefined;

  constructor(data: D) {
    this.data = data;
    this.next = undefined;
  }
}

export class DoublyNode<D> {
  data: D;
  previous: DoublyNode<D> | undefined;
  next: DoublyNode<D> | undefined;

  constructor(data: D) {
    this.data = data;
    this.next = undefined;
    this.previous = undefined;
  }
}
