interface InternalItem {
  diff: number;
  value: number;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-closest-elements-given-value/
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * Time Complexity: O(n * log n)
 */
export function myClosestElements(array: number[], count: number, target: number): number[] {
  let items: InternalItem[] = [];

  for (const data of array) {
    if (data !== target) {
      items.push({
        value: data,
        diff: Math.abs(target - data)
      });
    }
  }

  items.sort((a, b) => {
    if (a.diff !== b.diff) {
      return a.diff - b.diff;

    } else {
      return b.value - a.value; // GFG 문제에서 차이가 똑같으면 둘중 더 큰값으로 하라고 했음
    }
  });

  const result: number[] = [];

  for (const {value} of items) {
    if (value === target) {
      continue;
    }

    result.push(value);

    if (result.length === count) {
      break;
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-closest-elements-given-value/#naive-aprroach-using-absolute-difference-and-custom-sorting-onlogn-time-and-on-space
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * Time Complexity: O(n * log n)
 */
export function closestElementsUsingSort(array: number[], count: number, target: number): number[] {
  const items = array.toSorted((a, b) => {
    const diffA = Math.abs(target - a)
    const diffB = Math.abs(target - b);

    if (diffA !== diffB) {
      return diffA - diffB;

    } else {
      return b - a; // GFG 문제에서 차이가 똑같으면 둘중 더 큰값으로 하라고 했음
    }
  });

  const result: number[] = [];

  for (const value of items) {
    if (value === target) {
      continue;
    }

    result.push(value);

    if (result.length === count) {
      break;
    }
  }

  return result;
}
