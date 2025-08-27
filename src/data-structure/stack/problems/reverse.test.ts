import StackUsingLinkedList from '@/data-structure/stack/StackUsingLinkedList';
import {reverseStackUsingRecursive} from '@/data-structure/stack/problems/reverse';

// yarn test src/data-structure/stack/problems/reverse.test.ts
describe('reverseStackUsingRecursive()', () => {
  it('stack을 뒤집을 수 있어야 한다.', () => {
    const stack = new StackUsingLinkedList<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    const reversedStack = reverseStackUsingRecursive(stack);
    expect(reversedStack.pop()).toBe(1);
    expect(reversedStack.pop()).toBe(2);
    expect(reversedStack.pop()).toBe(3);
  });
});
