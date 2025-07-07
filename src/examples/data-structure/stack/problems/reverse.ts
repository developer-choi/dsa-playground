import Stack from '@/examples/data-structure/stack';
import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

/**
 * URL: https://www.geeksforgeeks.org/dsa/reverse-a-stack-using-recursion/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0#heading=h.ika3ybx2u5yu
 *
 * 하지만 아직 정답을 맞추지 못했음.
 * 보조 데이터변수를 선언했으니까.
 * 이 조차도 안하고 풀 수 있어야함.
 */
export function reverseStackUsingRecursive(stack: Stack<number>): Stack<number> {
  const newStack = new StackUsingLinkedList<number>();

  function recursive() {
    const value = stack.pop();
    newStack.push(value);

    if (stack.length >= 1) {
      recursive();
    }
  }

  recursive();

  return newStack;
}
