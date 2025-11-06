/**
 * URL: https://www.geeksforgeeks.org/dsa/given-two-strings-find-first-string-subsequence-second/
 * Doc: https://docs.google.com/document/d/1I5vzUlHqNCIZCx1rc3N6QAD1DRRKrCyOIm1cz6BYvFA/edit?tab=t.0
 * Time Complexity: O(n) - original의 길이만큼
 */
export function subsequenceUsingIterative(sequence: string, original: string): boolean {
  let sequenceIndex = 0;

  for (let i = 0; i < original.length && sequenceIndex < sequence.length; i++) {
    if (original[i] === sequence[sequenceIndex]) {
      sequenceIndex++;
    }
  }

  return sequenceIndex === sequence.length;
}
