import {sortByNumber} from '@forworkchoe/core/utils';

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

  if (items.length === count) {
    throw new TypeError(`${array}에 ${target}이 존재하지않아서 closet elements를 계산할 수 없습니다.`);
  }

  items = sortByNumber('asc', items, item => item.diff);

  const result: number[] = [];

  for (let i = 0; i < count; i++) {
    result.push(items[i].value);
  }

  return result;
}
