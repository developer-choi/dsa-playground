/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42577?language=javascript
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 */
export function solution42577(phoneNumbers: string[]): boolean {
  let map = new Map<string, string>();

  for (const phoneNumber of phoneNumbers) {
    let string = '';

    // 이거 때문에 O(n^2)가 아니냐 할 수 있지만, 문제 제한조건이 전화번호가 최대 20자리라고 해서 사실상 O(n)이 됨.
    for (const char of phoneNumber) {
      string += char;

      if (map.has(string)) {
        return false;
      }
    }

    map.set(phoneNumber, phoneNumber);
  }

  // 접두사가 되는 문자열이 접두사인 문자열보다 뒤에 나오는 경우 떄문에 반대로 순회한번 더함
  map = new Map<string, string>();

  for (let i = phoneNumbers.length - 1; i >= 0; i--) {
    const phoneNumber = phoneNumbers[i];
    let string = '';

    for (const char of phoneNumber) {
      string += char;

      if (map.has(string)) {
        return false;
      }
    }

    map.set(phoneNumber, phoneNumber);
  }

  return true;
}
