// https://school.programmers.co.kr/learn/courses/30/lessons/42576
export function bruteForceProgrammers42576(participants: string[], completions: string[]) {
  let result = [...participants];

  // O(n)
  for(let i = 0; i < completions.length; i++) {
    // O(n)
    const index = result.indexOf(completions[i]);

    // O(n)
    result.splice(index, 1);
  }

  return result[0];
}

export function mapSolutionProgrammers42576(participants: string[], completions: string[]) {
  // key = 참가자이름, value = count (0이면 삭제해야)
  const map = new Map<string, number>();

  for (const participant of participants) {
    map.set(participant, (map.get(participant) ?? 0) + 1);
  }

  for (const completion of completions) {
    const previousCount = map.get(completion) as number;

    if (previousCount === 1) {
      map.delete(completion);
    } else {
      map.set(completion, previousCount - 1);
    }
  }

  return [...map][0][0];
}
42576