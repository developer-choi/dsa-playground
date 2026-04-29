/**
 * Docs: docs/company-test/wf-1.md
 * Description: 아파트 관리비 — 1~12월 각 달의 납부일(k일)이 주말이면 직전 평일 이동 여부 반환
 */

const DATE_COUNT_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];

export function simulation(day: number, k: number): number[] {
  let sum = 0;
  const accumulatedDateCountOfMonth = [...DATE_COUNT_OF_MONTH];

  for (let i = 0; i < accumulatedDateCountOfMonth.length; i++) {
    accumulatedDateCountOfMonth[i] += sum;
    sum += DATE_COUNT_OF_MONTH[i];
  }

  return [0, ...accumulatedDateCountOfMonth]
    .map(dateCount => getDayOfK(day + dateCount, k))
    .map(d => (d === 5 || d === 6 ? 1 : 0));
}

function getDayOfK(day: number, k: number): number {
  return (day + k - 1) % 7;
}
