export function getMaxProfit(profitAndLoss: number[], subArrayMaxLength: number): number {
  let max = 0;
  const window: number[] = [];
  let sumOfWindow = 0;

  for(const item of profitAndLoss) {
    window.push(item);
    sumOfWindow += item;

    if (window.length < subArrayMaxLength) {
      continue;
    }

    max = Math.max(max, sumOfWindow);

    const firstItem = window.shift() as number;
    sumOfWindow -= firstItem;
  }

  return max;
}
