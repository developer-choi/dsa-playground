import {stack} from './directed-adjacency-list-dfs';

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
 *
 * 아래 방향으로만 적었다. 부모로 되돌아가는 간선이 없다.
 */
const graph = {
  1: [2, 5, 9],
  2: [3],
  3: [4],
  4: [],
  5: [6, 8],
  6: [7],
  7: [],
  8: [],
  9: [10],
  10: [],
};

describe.each(solutions)('$name', ({fn}) => {
  describe('General cases', () => {
    it('루트에서 시작하면 전체를 순회한다', () => {
      expect(fn(graph, 1)).toEqual([1, 9, 10, 5, 8, 6, 7, 2, 3, 4]);
    });

    it('중간 노드에서 시작하면 그 아래만 순회한다', () => {
      expect(fn(graph, 5)).toEqual([5, 8, 6, 7]);
      expect(fn(graph, 2)).toEqual([2, 3, 4]);
    });
  });

  describe('Boundary cases', () => {
    it('말단 노드에서 시작하면 자기 자신만 반환한다', () => {
      expect(fn(graph, 4)).toEqual([4]);
      expect(fn(graph, 7)).toEqual([7]);
    });

    it('자식이 하나뿐인 갈래는 일렬로 내려간다', () => {
      expect(fn(graph, 9)).toEqual([9, 10]);
    });
  });
});
