import {diskController} from '@/coding-test/heap/disk-controller';

describe('diskController()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(diskController([[0, 3], [1, 9], [3, 5]])).toBe(8);
    });
  });

  describe('Boundary cases', () => {
    it('빈배열이 전달되면 0이 반환되야한다.', () => {
      expect(diskController([])).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('아주나중에 시작되는것도 잘 되야한다', () => {
      expect(diskController([[100, 3]])).toBe(103);
    });

    it('동시에 시작하는 작업이 있더라도 잘 동작해야한다.', () => {
      expect(diskController([[0, 3], [0, 2], [0, 1]])).toBe(6);
    });
  });
});
