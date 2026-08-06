import {stack} from './adjacency-list-dfs';

const solutions = [
  {name: 'stack', fn: stack},
];

/**
 *              (1)
 *            /  |  \
 *         (2)  (5)  (9)
 *          |   /  \   \
 *         (3) (6)  (8) (10)
 *          |   |
 *         (4) (7)
 */
const graph = {
  1: [2, 5, 9],
  2: [1, 3],
  3: [2, 4],
  4: [3],
  5: [1, 6, 8],
  6: [5, 7],
  7: [6],
  8: [5],
  9: [1, 10],
  10: [9],
};

describe.each(solutions)('$name', ({fn}) => {
  describe('General cases', () => {
    it('1번에서 시작하면 마지막에 넣은 가지(9)부터 끝까지 판다', () => {
      expect(fn(graph, 1)).toEqual([1, 9, 10, 5, 8, 6, 7, 2, 3, 4]);
    });

    it('중간 노드(5)에서 시작하면 부모 방향으로도 거슬러 올라간다', () => {
      expect(fn(graph, 5)).toEqual([5, 8, 6, 7, 1, 9, 10, 2, 3, 4]);
    });

    it('말단 노드(4)에서 시작해도 그래프 전체를 순회한다', () => {
      expect(fn(graph, 4)).toEqual([4, 3, 2, 1, 9, 10, 5, 8, 6, 7]);
    });
  });

  describe('Boundary cases', () => {
    it('연결된 노드가 없으면 시작 노드만 반환한다', () => {
      expect(fn({1: []}, 1)).toEqual([1]);
    });

    it('도달할 수 없는 노드는 결과에 포함하지 않는다', () => {
      // 1-2 / 3-4 로 끊어진 그래프
      const disconnected = {1: [2], 2: [1], 3: [4], 4: [3]};

      expect(fn(disconnected, 1)).toEqual([1, 2]);
      expect(fn(disconnected, 3)).toEqual([3, 4]);
    });
  });

  describe('Edge cases', () => {
    it('사이클이 있어도 같은 노드를 두 번 담지 않는다', () => {
      // 1-2, 2-3, 3-1 삼각형
      const cyclic = {1: [2, 3], 2: [1, 3], 3: [1, 2]};

      expect(fn(cyclic, 1)).toEqual([1, 3, 2]);
    });
  });
});
