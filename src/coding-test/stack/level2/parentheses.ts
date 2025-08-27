import StackUsingLinkedList from '@/data-structure/stack/StackUsingLinkedList';

// https://school.programmers.co.kr/learn/courses/30/lessons/12909
function solution(input: string){
  // 이 문제에서는 괄호만 나오기 때문에, 무조건 문자열 길이가 짝수여야함.
  if (input.length % 2 !== 0) {
    return false;
  }

  const stack: (')' | '(')[] = [];

  for(const char of input) {
    switch(char) {
      case '(':
        stack.push(char);
        break;

      case ')':
        const top = stack.pop();

        if(top !== '(') {
          return false;
        }
    }
  }

  return stack.length === 0;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-for-balanced-parentheses-in-an-expression/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0#heading=h.ika3ybx2u5yu
 * 응용: https://school.programmers.co.kr/learn/courses/30/lessons/12909
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
        try {
          const data = stack.pop();
          const isPair = (char === ')' && data === '(') || (char === '}' && data === '{') || (char === ']' && data === '[');

          if (!isPair) {
            return false;
          }
        } catch (error) {
          if (error instanceof RangeError) {
            return false;
          } else {
            throw error;
          }
        }
        break;
      }
    }
  }

  return stack.length === 0;
}