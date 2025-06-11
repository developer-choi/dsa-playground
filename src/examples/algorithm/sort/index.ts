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
  swapHistory: string[] = [];
  comparisonCount = 0;
  compareHistory: string[] = [];
  loopHistory: number[][] = [];

  constructor(input: SortParam) {
    this.input = input;
    this.loopHistory.push([...input.value]);
  }

  onBeforeCompare(array: number[], index1: number, index2: number) {
    this.comparisonCount++;
    this.compareHistory.push(formatter(array, index1, index2));
  }

  onBeforeSwap(array: number[], index1: number, index2: number) {
    this.swapCount++;
    this.swapHistory.push(formatter(array, index1, index2));
  }

  onLoopEnd(array: number[]) {
    this.loopHistory.push([...array]);
  }
}

function formatter(array: number[], index1: number, index2: number) {
  return array.map((value, index) => {
    if (index !== index1 && index !== index2) {
      return value;
    } else {
      return `[${value}]`;
    }
  }).join(', ');
}
