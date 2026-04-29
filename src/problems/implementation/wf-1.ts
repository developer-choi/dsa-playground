/**
 * 0 = 월요일
 * 6 = 일요일
 */
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function solution(day: Day, k: number): number[] {
  const accumulatedDateCountOfMonth = [0];

  for (let i = 1; i <= DATE_COUNT_OF_MONTH.length; i++) {
    accumulatedDateCountOfMonth[i] = accumulatedDateCountOfMonth[i - 1] + DATE_COUNT_OF_MONTH[i - 1];
  }

  return accumulatedDateCountOfMonth.map(daysBeforeMonth => {
    const kthDay = getKthDayWeekday(day, daysBeforeMonth, k);

    if (kthDay === 5 || kthDay === 6) {
      return 1;
    } else {
      return 0;
    }
  });
}

/**
 * 해당 월 K일의 요일을 반환한다.
 *
 * @param newYearWeekday 1월 1일의 요일 (0=월 ~ 6=일)
 * @param daysBeforeMonth 1월 1일부터 해당 월 1일까지의 일수 (1월=0, 2월=31, 3월=31+28, ...)
 * @param k 납부일
 * @returns 해당 월 K일의 요일 (0=월 ~ 6=일)
 */
function getKthDayWeekday(newYearWeekday: Day, daysBeforeMonth: number, k: number): Day {
  return (newYearWeekday + daysBeforeMonth + k - 1) % 7 as Day;
}

const DATE_COUNT_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];
