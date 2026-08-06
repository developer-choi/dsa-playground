import {bare, withVisited} from './traversal-variants';

/**
 *              (1)
 *            /  |  \
 *         (2)  (5)  (9)
 *          |   /  \   \
 *         (3) (6)  (8) (10)
 *          |   |
 *         (4) (7)
 */
const directedTree = {
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

/** 같은 그림을 양방향으로 적은 것 — 자식이 부모를 다시 가리킨다 */
const undirectedTree = {
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

// withVisited 는 bare 가 하는 일을 전부 하고, 되돌아가는 길까지 감당한다.
// 무방향 그래프에 bare 를 돌리면 무한 루프라 테스트로 잡을 수 없다.
const coversDirected = [
  {name: 'bare', fn: bare},
  {name: 'withVisited', fn: withVisited},
];
const coversUndirected = coversDirected.slice(1);

describe.each(coversDirected)('$name — 단방향 트리', ({fn}) => {
  it('루트에서 시작하면 전체를 순회한다', () => {
    expect(fn(directedTree, 1)).toEqual([1, 9, 10, 5, 8, 6, 7, 2, 3, 4]);
  });

  it('중간 노드에서 시작하면 그 아래만 순회한다', () => {
    expect(fn(directedTree, 5)).toEqual([5, 8, 6, 7]);
  });

  it('말단 노드에서 시작하면 자기 자신만 반환한다', () => {
    expect(fn(directedTree, 4)).toEqual([4]);
  });
});

describe.each(coversUndirected)('$name — 무방향 트리', ({fn}) => {
  it('루트에서 시작하면 단방향과 같은 순서가 나온다', () => {
    expect(fn(undirectedTree, 1)).toEqual([1, 9, 10, 5, 8, 6, 7, 2, 3, 4]);
  });

  it('말단에서 시작해도 위로 올라가 전체를 순회한다', () => {
    expect(fn(undirectedTree, 4)).toEqual([4, 3, 2, 1, 9, 10, 5, 8, 6, 7]);
  });
});
