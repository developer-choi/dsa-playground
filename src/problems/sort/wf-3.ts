/**
 * Docs: docs/company-test/wf-3.md
 * Description: 등수 매기기 — 각 학생의 등수를 배열로 반환 (동점자 동일 등수)
 */

export function sort(grade: number[]): number[] {
  const gradeUsers: { index: number; grade: number; level: number }[] = grade.map((value, index) => ({
    level: -1,
    index,
    grade: value,
  }));

  gradeUsers.sort((a, b) => b.grade - a.grade);

  let previous = { grade: 0, level: 0 };

  for (let i = 0; i < gradeUsers.length; i++) {
    const user = gradeUsers[i];

    if (user.grade !== previous.grade) {
      user.level = i + 1;
      previous.grade = user.grade;
      previous.level = user.level;
    } else {
      user.level = previous.level;
    }
  }

  gradeUsers.sort((a, b) => a.index - b.index);

  return gradeUsers.map(({ level }) => level);
}
