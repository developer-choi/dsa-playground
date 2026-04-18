/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/12909
 */

export function stack(text: string): boolean {
  const charStacks: string[] = [];

  for(const char of text) {
    switch (char) {
      case '(':
        charStacks.push(char);
        break;

      case ')': {
        if (charStacks.pop() === '(') {
          break;
        } else {
          return false;
        }
      }
    }
  }

  return charStacks.length === 0;
}
