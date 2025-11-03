/**
 * URL: https://www.geeksforgeeks.org/dsa/pangram-checking/#naive-approach-by-searching-for-each-character-omax_char-n-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1I5vzUlHqNCIZCx1rc3N6QAD1DRRKrCyOIm1cz6BYvFA/edit?tab=t.0
 * Time Complexity: O(n * MAX_CHAR)
 */
export function pangramUsingBruteForce(value: string): boolean {
  const lowerCase = value.toLowerCase();

  for (const alphabet of ALPHABETS) {
    if (!lowerCase.includes(alphabet.toLowerCase())) {
      return false;
    }
  }

  return true;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/pangram-checking/#expected-approach-using-visited-array-on-time-and-omax_char-space
 * Doc: https://docs.google.com/document/d/1I5vzUlHqNCIZCx1rc3N6QAD1DRRKrCyOIm1cz6BYvFA/edit?tab=t.0
 * Time Complexity: O(n + MAX_CHAR)
 */
export function pangramUsingSet(value: string): boolean {
  const set = new Set(value.toLowerCase());

  for (const alphabet of ALPHABETS) {
    if (!set.has(alphabet.toLowerCase())) {
      return false;
    }
  }

  return true;
}

const ALPHABETS = Array.from({length: 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1}, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
