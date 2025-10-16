import {heapScoville} from '@/coding-test/heap/scoville';

// yarn test src/coding-test/heap/scoville.test.ts
describe('hwapScoville()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(heapScoville([1, 2, 3, 9, 10, 12], 7)).toBe(2);
    });
  });

  describe('Boundary cases', () => {
    it('스코빌지수 배열이 0개인 경우에는 언제나 0이 반환되야한다.', () => {
      expect(heapScoville([], 2)).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('스코빌지수 배열이 2개고, k보다 큰거 하나, 작은거 하나 있을 때도 잘 되야한다.', () => {
      expect(heapScoville([3, 1], 2)).toBe(1);
    });

    describe('아무리 섞어도 k 이상 될 수 없는 경우', () => {
      it('배열 길이가 2개인 경우에도 잘 되야한다.', () => {
        expect(heapScoville([3, 4], 100)).toBe(-1);
      });
      it('배열 길이가 1개인 경우에도 잘 되야한다.', () => {
        expect(heapScoville([3], 100)).toBe(-1);
      });
    });

    describe('안섞어도 전부 k 이상인 경우', () => {
      it('배열 길이가 2개인 경우에도 잘 되야한다.', () => {
        expect(heapScoville([3, 4], 0)).toBe(0);
      });
      it('배열 길이가 1개인 경우에도 잘 되야한다.', () => {
        expect(heapScoville([3], 0)).toBe(0);
      });
    });
  });
});
