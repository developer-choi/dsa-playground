/**
 * URL: https://www.geeksforgeeks.org/dsa/check-whether-two-strings-are-anagram-of-each-other/#expected-approach-1-using-hash-map-or-dictionary
 * Doc: https://docs.google.com/document/d/1I5vzUlHqNCIZCx1rc3N6QAD1DRRKrCyOIm1cz6BYvFA/edit?tab=t.0
 * Time Complexity: O(n) - 순회가 text 2개의 길이 + 유일한 문자갯수 만큼만 발생함, 그래서 결국 O(n)임
 */
export function anagramUsingHashmap(text1: string, text2: string): boolean {
  const map = new Map<string, number>();

  for (const char of text1) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }

  for (const char of text2) {
    map.set(char, (map.get(char) ?? 0) - 1);
  }

  for (const [, value] of map) {
    if (value !== 0) {
      return false;
    }
  }

  return true;
}
