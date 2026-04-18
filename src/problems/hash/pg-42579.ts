/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42579
 */

export function hash(genres: string[], plays: number[]): number[] {
  if (genres.length !== plays.length) {
    throw new TypeError('plays 길이, genres 길이가 서로 다릅니다.');
  }

  const record: Record<string, {
    totalPlayCount: number,
    playedGenres: {count: number, index: number}[];
  }> = {};

  for(let i = 0 ; i < plays.length ; i++) {
    const playCount = plays[i];
    const genre = genres[i];

    if (genre in record) {
      record[genre].totalPlayCount += playCount;
      record[genre].playedGenres.push({
        index: i,
        count: playCount
      });

    } else {
      record[genre] = {
        totalPlayCount: playCount,
        playedGenres: [{count: playCount, index: i}]
      };
    }
  }

  for(const genre in record) {
    record[genre].playedGenres.sort((a, b) => b.count - a.count);
  }

  const list = Object.entries(record).sort(([_a, aPlayedGenres], [_b, bPlayedGenres]) => {
    return bPlayedGenres.totalPlayCount - aPlayedGenres.totalPlayCount;
  });

  const answer: number[] = [];

  for (const [_, {playedGenres}] of list) {
    for(const genre of playedGenres.slice(0, 2)) {
      answer.push(genre.index);
    }
  }

  return answer;
}
