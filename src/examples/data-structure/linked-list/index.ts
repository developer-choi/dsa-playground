export default abstract class LinkedList {
  abstract push(data: number): void;
  abstract get(index: number): number | undefined;
  abstract insertAt(index: number, data: number): void;
  abstract deleteAt(index: number): number | undefined;
  abstract findIndex(index: number): number;
  abstract length(): number;
  abstract toString(): string;
  abstract getHead(): number | undefined;
  abstract getTail(): number | undefined;
}

export class SinglyNode {
  data: number;
  next: SinglyNode | undefined;

  constructor(data: number) {
    this.data = data;
    this.next = undefined;
  }
}

export class DoublyNode {
  data: number;
  previous: DoublyNode | undefined;
  next: DoublyNode | undefined;

  constructor(data: number) {
    this.data = data;
    this.next = undefined;
    this.previous = undefined;
  }
}
