function find(array: number[], target: number): boolean {
  let start = 0;
  let end = array.length - 1;

  while(start <= end) {
    const middle = Math.floor((start + end) / 2);
    const value = array[middle];

    if (target === value) {
      return true;
    }

    if (target < value) {
      end = middle;
    } else {
      start = middle;
    }
  }

  return false;
}

console.log(find([1, 2, 3, 4, 5], 1));
