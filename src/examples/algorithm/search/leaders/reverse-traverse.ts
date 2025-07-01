/**
 * Doc: https://docs.google.com/document/d/1kPMKSQSaUhiVBOv7nfBv-ah8zsnPXWUA-q0L6hVsqNo/edit?tab=t.0#heading=h.8o8ypziyq6rk
 * Official: https://www.geeksforgeeks.org/dsa/find-first-and-last-positions-of-an-element-in-a-sorted-array/
 */
function reverseTraverseFindLeaders(array: number[]): number[] {
  if (array.length === 0) {
    return [];
  }

  const result = [array[array.length - 1]]; // 제일 우측은 어차피 정답이기 때문에 처음부터 포함
  let max = result[0];

  for (let i = array.length - 2; i >= 0; i--) {
    if (max < array[i]) {
      max = array[i];
      result.unshift(array[i]);
    }
  }

  return result;
}

// Expected: []
console.log(reverseTraverseFindLeaders([]));

// Expected: [1]
console.log(reverseTraverseFindLeaders([1]));

// Expected: [17, 5, 2]
console.log(reverseTraverseFindLeaders([16, 17, 4, 3, 5, 2]));

// Expected: [5, 2]
console.log(reverseTraverseFindLeaders([1, 2, 3, 4, 5, 2]));
