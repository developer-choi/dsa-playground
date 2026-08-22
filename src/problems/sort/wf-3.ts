/**
 * URL: src/problems/sort/wf-3.md
 * Description: 등수 매기기 — 각 학생의 등수(자신보다 높은 점수를 받은 학생 수 + 1)를 순서대로 반환
 */

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