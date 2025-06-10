export interface SortParam {
  value: number[];
  order: 'asc' | 'desc';
}

export interface SortResult {
  value: number[];
  loopHistory: number[][];
  comparisonCount: number;
  swapCount: number;
}
