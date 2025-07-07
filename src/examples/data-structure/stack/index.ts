export default abstract class Stack<D> {
  abstract get length(): number;

  /**
   * @throws {RangeError} Stack overflow
   */
  abstract push(data: D): void;

  /**
   * @throws {RangeError} Stack underflow
   */
  abstract pop(): D;

  /**
   * @return undefined Stack is empty
   */
  abstract peek(): D | undefined;
}
