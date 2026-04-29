/**
 * 0 = 월요일
 * 6 = 일요일
 */
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function solution(day: Day, k: number): number[] {
  let sum = 0;
  const accumulatedDateCountOfMonth = [...DATE_COUNT_OF_MONTH];

  for (let i = 0; i < accumulatedDateCountOfMonth.length; i++) {
    accumulatedDateCountOfMonth[i] += sum;
    sum += DATE_COUNT_OF_MONTH[i];
  }

  return [0, ...accumulatedDateCountOfMonth]
    .map(daysBeforeMonth => getKthDayWeekday(day, daysBeforeMonth, k))
    .map(weekday => (weekday === 5 || weekday === 6 ? 1 : 0));
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
