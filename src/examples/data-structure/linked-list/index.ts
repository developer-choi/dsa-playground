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
