import { hash } from './pg-42579';
import { compareFunctionsWithRandomInputs } from '@/utils/jest';

const solutions = [
  { name: 'hash', fn: hash },
];

describe.each(solutions)('베스트앨범 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('장르별 재생수 합이 큰 장르부터, 장르 내 재생수 높은 곡 2개씩의 인덱스를 반환한다', () => {
      const genres = ['classic', 'pop', 'classic', 'classic', 'pop'];
      const plays = [500, 600, 150, 800, 2500];
      expect(fn(genres, plays)).toEqual([4, 1, 3, 0]);
    });

    it('장르당 곡이 3개 이상이면 각 장르 상위 2곡만 반환한다', () => {
      const genres = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C'];
      const plays = [10, 20, 30, 100, 200, 300, 1, 2, 3];
      expect(fn(genres, plays)).toEqual([5, 4, 2, 1, 8, 7]);
    });
  });

  describe('Boundary cases', () => {
    it('장르당 곡이 정확히 2개면 두 곡 모두 반환한다', () => {
      const genres = ['A', 'A', 'B', 'B'];
      const plays = [10, 20, 100, 200];
      expect(fn(genres, plays)).toEqual([3, 2, 1, 0]);
    });

    it('장르당 곡이 1개뿐이면 해당 곡만 반환한다', () => {
      const genres = ['A', 'B', 'C'];
      const plays = [10, 100, 5];
      expect(fn(genres, plays)).toEqual([1, 0, 2]);
    });

    it('장르당 3곡에서 모두 재생수가 동률이면 index가 낮은 2곡을 반환한다', () => {
      const genres = ['A', 'A', 'A', 'B', 'B', 'B'];
      const plays = [10, 10, 10, 20, 20, 20];
      expect(fn(genres, plays)).toEqual([3, 4, 0, 1]);
    });

    it('장르당 2곡에서 모두 재생수가 동률이면 index가 낮은 순으로 반환한다', () => {
      const genres = ['A', 'A', 'B', 'B'];
      const plays = [10, 10, 20, 20];
      expect(fn(genres, plays)).toEqual([2, 3, 0, 1]);
    });

    it('장르가 1개뿐이어도 해당 장르 상위 2곡을 반환한다', () => {
      const genres = ['A', 'A', 'A'];
      const plays = [10, 20, 30];
      expect(fn(genres, plays)).toEqual([2, 1]);
    });
  });

  describe('Edge cases', () => {
    it('빈 배열이면 빈 배열을 반환한다', () => {
      expect(fn([], [])).toEqual([]);
    });

    it('genres와 plays의 길이가 다르면 TypeError를 던진다', () => {
      expect(() => fn(['A', 'B'], [10])).toThrow(TypeError);
    });
  });

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: fn,
        answerFunction: (genres: string[], plays: number[]) => {
          if (genres.length !== plays.length) throw new TypeError();
          const genreSum: Record<string, number> = {};
          for (let i = 0; i < genres.length; i++) {
            genreSum[genres[i]] = (genreSum[genres[i]] ?? 0) + plays[i];
          }
          const songs = genres.map((g, i) => ({ genre: g, play: plays[i], index: i }));
          songs.sort((a, b) => {
            if (genreSum[a.genre] !== genreSum[b.genre]) return genreSum[b.genre] - genreSum[a.genre];
            if (a.play !== b.play) return b.play - a.play;
            return a.index - b.index;
          });
          const count: Record<string, number> = {};
          const result: number[] = [];
          for (const s of songs) {
            count[s.genre] = (count[s.genre] ?? 0) + 1;
            if (count[s.genre] <= 2) result.push(s.index);
          }
          return result;
        },
        generateInput: () => {
          // 문제 제약: 장르 합은 서로 달라야 함. 동률이면 재생성.
          while (true) {
            const length = Math.floor(Math.random() * 41) + 10;
            const genreNames = ['A', 'B', 'C', 'D', 'E'];
            const genreCount = Math.floor(Math.random() * 5) + 1;
            const pool = genreNames.slice(0, genreCount);
            const genres = Array.from({length}, () => pool[Math.floor(Math.random() * genreCount)]);
            const plays = Array.from({length}, () => Math.floor(Math.random() * 100));
            const sum: Record<string, number> = {};
            for (let i = 0; i < genres.length; i++) {
              sum[genres[i]] = (sum[genres[i]] ?? 0) + plays[i];
            }
            const sums = Object.values(sum);
            if (new Set(sums).size === sums.length) {
              return [genres, plays] as [string[], number[]];
            }
          }
        },
        iterationCount: 1000,
      });
    });
  });
});
