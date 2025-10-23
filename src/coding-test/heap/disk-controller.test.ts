import {diskController} from '@/coding-test/heap/disk-controller';

// yarn test src/coding-test/heap/disk-controller.test.ts
describe('diskController()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      // (3-0) + (8-3) + (17-1) = 3 + 5 + 16 = 24. 24/3 = 8
      expect(diskController([[0, 3], [1, 9], [3, 5]])).toBe(8);
    });
  });

  describe('Boundary cases', () => {
    it('빈배열이 전달되면 0이 반환되야한다.', () => {
      expect(diskController([])).toBe(0);
    });

    it('작업이 하나만 있을 경우, 해당 작업의 소요 시간만 반환해야 한다.', () => {
      expect(diskController([[0, 10]])).toBe(10);
    });
  });

  describe('Edge cases', () => {
    it('아주나중에 시작되는것도 잘 되야한다', () => {
      expect(diskController([[100, 3]])).toBe(3);
    });

    it('동시에 시작하는 작업이 있더라도 잘 동작해야한다.', () => {
      expect(diskController([[0, 3], [0, 2], [0, 1]])).toBe(3);
    });

    /**
     * 소요시간이 0번째 작업이 더 길지만, (우선순위상 낮음)
     * 작업은 0번째 작업을 더 먼저 해야함.
     */
    it('현재 처리 가능한 작업이 나중에 요청될 더 짧은 작업보다 우선되어야 한다.', () => {
      expect(diskController([[0, 5], [1, 2]])).toBe(5);
    });
  });
});
