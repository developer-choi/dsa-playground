import {heapScoville} from '@/coding-test/heap/scoville';

// yarn test src/coding-test/heap/scoville.test.ts
describe('hwapScoville()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(heapScoville([1, 2, 3, 9, 10, 12], 2)).toBe(2);
    });
  });

  describe('Edge cases', () => {
    // TODO
    describe('아무리 섞어도 k 이상 될 수 없는 경우', () => {
      // 배열길이가 2 이상
      // 배열길이가 1
      // 배열길이가 0
    });

    // TODO
    describe('안섞어도 전부 k 이상인 경우', () => {
      // 배열길이가 2 이상
      // 배열길이가 1
      // 배열길이가 0
    });

    it('아무리 섞어도 k 이상이 될 수 없다면 -1을 반환해야한다.', () => {
      expect(heapScoville([1, 2, 3], Number.MAX_SAFE_INTEGER)).toBe(-1);
    });

    it('섞지않아도 k를 만족할 수 있다면 0을 반환해야한다', () => {
      expect(heapScoville([3, 4, 5], 1)).toBe(0);
    });
  });
});
