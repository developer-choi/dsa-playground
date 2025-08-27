export interface SortParam {
  value: number[];
  order: 'asc' | 'desc';
}

export interface SortResult {
  output: number[];
  logger?: SortedHistoryLogger;
}

export interface SortedHistoryLoggerOptions {
  disableSwapHistory: boolean;
  disableCompareHistory: boolean;
}

// 사용방법 > 3개의 메소드를 반드시 sort 함수 내에서 1번씩만 호출하기. compare-swap-loop
export class SortedHistoryLogger {
  readonly input: SortParam;
  readonly options: SortedHistoryLoggerOptions;

  // 외부에서 수정하라고 있는값은 아님.
  comparisonCount = 0;
  swapCount = 0;
  loopCount = 0;
  history: string[] = [];

  constructor(input: SortParam, options?: Partial<SortedHistoryLoggerOptions>) {
    this.input = input;
    this.options = {
      disableSwapHistory: !!options?.disableSwapHistory,
      disableCompareHistory: !!options?.disableCompareHistory
    };

    const allOptionsIsDisabled = Object.entries(this.options).every(([, value]) => value);

    if (!allOptionsIsDisabled) {
      this.loopCount = 1;
      this.history.push(`### [Initial] - ${input.value.join(', ')}`);
    }
  }

  onBeforeCompare(array: number[], index1: number, index2: number) {
    this.comparisonCount++;
    if (!this.options.disableCompareHistory) {
      this.history.push(this.formatter(array, index1, index2, 'Comparing'));
    }
  }

  onBeforeSwap(array: number[], index1: number, index2: number) {
    this.swapCount++;
    if (!this.options.disableSwapHistory) {
      this.history.push(this.formatter(array, index1, index2, 'Before swap'));
    }
  }

  onLoopEnd(array: number[]) {
    const order = getOrderNumber(this.loopCount);
    this.history.push(`### [${order} loop ended] - ${array.join(', ')}`);
    this.loopCount++;
  }

  private formatter(array: number[], index1: number, index2: number, keyword: string) {
    const arrayString = array.map((value, index) => {
      if (index !== index1 && index !== index2) {
        return value;
      } else {
        return `[${value}]`;
      }
    }).join(', ');

    const order = getOrderNumber(this.loopCount);
    return `[${order} Iteration] - [${keyword}] - ${arrayString}`;
  }
}

export function logSortAlgorithmCases(algorithm: (param: SortParam) => SortResult) {
  // best
  console.dir(algorithm({
    value: [1, 2, 3, 4, 5],
    order: 'asc'
  }), {
    depth: null
  });

  // worst
  console.dir(algorithm({
    value: [5, 4, 3, 2, 1],
    order: 'asc'
  }), {
    depth: null
  });
}

function getOrderNumber(order: number): '1st' | '2nd' | '3rd' | `${number}th` {
  if (order === 1) {
    return '1st';
  }

  if (order === 2) {
    return '2nd';
  }

  if (order === 3) {
    return '3rd';
  }

  return `${order}th`;
}
