/**
 * URL: https://www.geeksforgeeks.org/dsa/the-stock-span-problem/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0
 */
export function stockSpanUsingLoop(array: number[]): number[] {
  const answer: number[] = [];

  for (let i = 0; i < array.length; i++) {
    let count = 1;
    const current = array[i];

    for (let j = i - 1; j >= 0; j--) {
      const value = array[j];

      if (value <= current) {
        count++;
      } else {
        break;
      }
    }
    answer.push(count);
  }

  return answer;
}
