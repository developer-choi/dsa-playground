import StackUsingArray from '@/examples/data-structure/stack/StackUsingArray';
import Stack from '@/examples/data-structure/stack';
import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

const CAPACITY = 4;

// yarn test src/examples/data-structure/stack/BinarySearchTree.test.ts
const stacks = [
  {name: 'StackUsingArray', createInstance: () => new StackUsingArray<number>(CAPACITY)},
  {name: 'StackUsingLinkedList', createInstance: () => new StackUsingLinkedList<number>()},
];

describe.each(stacks)('Data Structure > $name', ({createInstance}) => {
  let stack: Stack<number>;

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

  // 테스트용 메소드여서 간단하게 테스트
  describe('toArray() operation', () => {
    it('should correctly convert the stack to an array', () => {
      const array = [1, 2, 3];

      array.forEach(data => {
        stack.push(data);
      });

      expect(stack.toArray()).toEqual(array);
    });
  });
});
