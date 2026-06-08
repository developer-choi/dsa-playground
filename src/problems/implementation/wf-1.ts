/**
 * URL: src/problems/implementation/wf-1.md
 * Description: 아파트 관리비
 */

export function simulation(day: number, k: number): number[] {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
    const resultDay = isWeekend(day, {month, date: k});

    if (resultDay === 5 || resultDay === 6) {
      return 1;
    } else {
      return 0;
    }
  });
}

function isWeekend(dayOfNewYear: number, target: {month: number, date: number}) {
  return (target.date - 1 + dayOfNewYear + ACCUMULATED_DATE[target.month - 1]) % 7;
}

const ORIGINAL_DATE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const ACCUMULATED_DATE: number[] = [0];

for (let i = 1; i < ORIGINAL_DATE.length; i++) {
  ACCUMULATED_DATE[i] = ACCUMULATED_DATE[i - 1] + ORIGINAL_DATE[i - 1];
}
