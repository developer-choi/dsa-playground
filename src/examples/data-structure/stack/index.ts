export default abstract class Stack {
  /**
   * @throws {RangeError} Stack overflow
   */
  abstract push(value: number): void;

  /**
   * @throws {RangeError} Stack underflow
   */
  abstract pop(): number;

  /**
   * @return undefined Stack is empty
   */
  abstract peek(): number | undefined;
}
