import { MaxHeap } from './heap';

describe('MaxHeap', () => {
  describe('General cases', () => {
    it('넣은 순서와 무관하게 큰 값부터 꺼낸다', () => {
      const heap = new MaxHeap();
      const input = [3, 1, 4, 1, 5, 9, 2, 6];

      input.forEach(n => heap.add(n));

      const extracted = input.map(() => heap.extractRoot());
      expect(extracted).toEqual([...input].sort((a, b) => b - a));
    });

    it('peek 은 최댓값을 꺼내지 않고 보여준다', () => {
      const heap = new MaxHeap();

      [2, 7, 5].forEach(n => heap.add(n));

      expect(heap.peek()).toBe(7);
      expect(heap.length).toBe(3);
    });

    it('length 는 넣고 꺼낸 개수를 따라간다', () => {
      const heap = new MaxHeap();

      [1, 2, 3].forEach(n => heap.add(n));
      heap.extractRoot();

      expect(heap.length).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('빈 힙에서 꺼내면 undefined 를 반환한다', () => {
      expect(new MaxHeap().extractRoot()).toBeUndefined();
    });

    it('같은 값이 여러 개여도 개수만큼 꺼낸다', () => {
      const heap = new MaxHeap();

      [4, 4, 4].forEach(n => heap.add(n));

      expect([heap.extractRoot(), heap.extractRoot(), heap.extractRoot()]).toEqual([4, 4, 4]);
    });
  });

  describe('Random', () => {
    it('무작위 입력에서 내림차순 정렬과 같은 순서로 꺼낸다', () => {
      for (let round = 0; round < 200; round++) {
        const heap = new MaxHeap();
        const input = Array.from({length: 50}, () => Math.floor(Math.random() * 1000));

        input.forEach(n => heap.add(n));

        expect(input.map(() => heap.extractRoot())).toEqual([...input].sort((a, b) => b - a));
      }
    });
  });
});
