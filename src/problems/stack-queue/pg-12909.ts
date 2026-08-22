/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/12909
 * Description: 올바른 괄호 — 괄호 문자열의 짝이 맞는지 여부를 반환
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
