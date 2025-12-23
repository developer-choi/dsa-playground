/**
 * level1: https://www.geeksforgeeks.org/dsa/find-maximum-minimum-sum-subarray-size-k/
 * level2: https://www.geeksforgeeks.org/competitive-programming/cses-solutions-maximum-subarray-sum-ii/
 */
export function getMaxProfit(arr: number[], k: number): number {
  const A = 1;
  const N = arr.length;
  const B = k;

  // Initialize a deque to store indices in increasing
  // order of prefix sum values
  let dq = [];

  // Initialize a prefixSum array to store cumulative sums
  let prefixSum = new Array(N + 1).fill(0);

  // Initialize the answer to track the maximum sum
  let ans = Number.MIN_SAFE_INTEGER;

  // Calculate cumulative sums
  for (let i = 1; i <= N; i++) {
    prefixSum[i] += prefixSum[i - 1] + arr[i - 1];
  }

  // Loop through the first (B-1) indices to initialize
  // deque
  for (let i = 1; i < B; i++) {
    // Maintain deque in increasing order of prefix sum
    // values
    while (dq.length !== 0 && prefixSum[dq[0]] <= prefixSum[i]) {
      dq.shift();
    }
    dq.unshift(i);
  }

  // Loop through each starting index i from 0 to (n-a)
  for (let i = 0; i <= (N - A); i++) {

    // Maintain deque in increasing order of prefix sum
    // values
    while (i + B <= N && dq.length !== 0 && prefixSum[dq[0]] <= prefixSum[i + B]) {
      dq.shift();
    }

    // Push the right end index to the front of deque
    if (i + B <= N)
      dq.unshift(i + B);

    // If the index of maximum element outside the
    // current window , pop elements from the back of
    // the deque until the back index(index of maximum
    // element) is within the current window.
    while (dq.length !== 0 && dq[dq.length - 1] < (A + i)) {
      dq.pop();
    }

    // Update the answer by taking the maximum of the
    // current answer and the difference between the
    // prefix sum at the back(maximum element) of the
    // deque and the prefix sum at index i
    ans = Math.max(ans, prefixSum[dq[dq.length - 1]] - prefixSum[i]);
  }

  return ans;
}

export function thirdProblem() {
  // https://www.geeksforgeeks.org/dsa/length-of-longest-subarray-having-at-most-k-frequency/
}