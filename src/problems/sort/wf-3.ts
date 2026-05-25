export function sort(grades: number[]): number[] {
  const sorted = [...grades].sort((a, b) => b - a);
  const indexByGrade: Record<number, number> = {};

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] in indexByGrade) {
      continue;
    }

    indexByGrade[sorted[i]] = i;
  }

  return grades.map(grade => indexByGrade[grade] + 1);
}