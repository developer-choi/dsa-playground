import StackUsingArray from '@/examples/data-structure/stack/StackUsingArray';
import Stack from '@/examples/data-structure/stack';

const CAPACITY = 4;

const stacks = [
  {name: 'StackUsingArray', createInstance: () => new StackUsingArray(CAPACITY)},
];

describe.each(stacks)('Data Structure > $name', ({createInstance}) => {
  let stack: Stack;

  beforeEach(() => {
    stack = createInstance();
  });

  describe('Initial State', () => {
    it('should return undefined when peeking an empty stack', () => {
      expect(stack.peek()).toBeUndefined();
    });

    it('should throw a "Stack underflow" error when popping an empty stack', () => {
      expect(() => stack.pop()).toThrow(RangeError);
    });
  });

  describe('push() operation', () => {
    it('should return the last pushed value on peek()', () => {
      stack.push(10);
      expect(stack.peek()).toBe(10);

      stack.push(20);
      expect(stack.peek()).toBe(20);
    });

    it('should throw a "Stack overflow" error when the stack is full', () => {
      for (let i = 1; i <= CAPACITY; i++) {
        stack.push(i);
      }

      expect(() => stack.push(99)).toThrow(RangeError);
    });
  });

  describe('pop() operation', () => {
    beforeEach(() => {
      stack.push(10);
      stack.push(20);
      stack.push(30);
    });

    it('should remove and return values in LIFO (Last-In, First-Out) order', () => {
      expect(stack.pop()).toBe(30);
      expect(stack.pop()).toBe(20);
      expect(stack.pop()).toBe(10);
    });

    it('should update peek() to show the new top value after a pop', () => {
      expect(stack.peek()).toBe(30);

      stack.pop();

      expect(stack.peek()).toBe(20);
    });

    it('should be in the initial state after popping all values', () => {
      // Pop all three items
      stack.pop();
      stack.pop();
      stack.pop();

      // Re-verify the initial state tests
      expect(stack.peek()).toBeUndefined();
      expect(() => stack.pop()).toThrow(RangeError);
    });
  });
});