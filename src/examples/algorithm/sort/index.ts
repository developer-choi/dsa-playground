export interface SortParam {
  value: number[];
  order: 'asc' | 'desc';
}

export interface SortResult {
  output: number[];
  logger: SortedHistoryLogger;
}

export class SortedHistoryLogger {
  readonly input: SortParam;

  // 외부에서 수정하라고 있는값은 아님.
  swapCount = 0;
  comparisonCount = 0;
  loopHistory: number[][] = [];
  swapHistory: string[] = [];

  constructor(input: SortParam) {
    this.input = input;
    this.loopHistory.push([...input.value]);
  }

  compare() {
    this.comparisonCount++;
  }

  onBeforeSwap(array: number[], index1: number, index2: number) {
    this.swapCount++;
    this.swapHistory.push(array.map((value, index) => {
      if (index !== index1 && index !== index2) {
        return value;
      } else {
        return `[${value}]`;
      }
    }).join(', '));
  }

  onLoopEnd(array: number[]) {
    this.loopHistory.push([...array]);
  }
}
