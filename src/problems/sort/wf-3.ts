export function solution(grade: number[]): number[] {
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
