import { hash } from './pg-42579';

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
});
