import StackUsingLinkedList from '@/examples/data-structure/stack/StackUsingLinkedList';

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-for-balanced-parentheses-in-an-expression/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0#heading=h.ika3ybx2u5yu
 */
export default function parenthesesUsingStack(value: string): boolean {
  const stack = new StackUsingLinkedList<string>();

  for (const char of value) {
    switch (char) {
      case '(':
      case '{':
      case '[': {
        stack.push(char);
        break;
      }

      case ')':
      case '}':
      case ']': {
        const data = stack.pop();
        const isPair = (char === ')' && data === '(') || (char === '}' && data === '{') || (char === ']' && data === '[');

        if (!isPair) {
          return false;
        }
        break;
      }
    }
  }

  return stack.length === 0;
}
