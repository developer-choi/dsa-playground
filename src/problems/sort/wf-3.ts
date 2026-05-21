export function sort(grades: number[]): number[] {
  const scoreRecord: Record<number, {count: number, upper: number;}> = {};

  for (const grade of grades) {
    if (grade in scoreRecord) {
      scoreRecord[grade].count++;

    } else {
      scoreRecord[grade] = {
        count: 1,
        upper: 0
      };
    }
  }

  const sorted = Object.entries(scoreRecord).sort((a, b) => Number(a[0]) - Number(b[0]));
  let acc = 0;

  for(const [, value] of sorted) {
    value.upper = grades.length - acc - value.count;
    acc += value.count;
  }

  return grades.map(grade => scoreRecord[grade].upper + 1);
}
