import {bare, withState, withVisited} from './traversal-variants';

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

// withVisited 만 되돌아가는 길을 감당한다.
// bare · withState 는 visited 가 없어서 무방향 그래프에 돌리면 무한 루프라 테스트로 잡을 수 없다.
const coversDirected = [
  {name: 'bare', fn: bare},
  {name: 'withVisited', fn: withVisited},
  {name: 'withState', fn: (graph: Record<number, number[]>, start: number) => withState(graph, start).map(({node}) => node)},
];
const coversUndirected = [{name: 'withVisited', fn: withVisited}];

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

describe('withState — 노드와 함께 담아온 상태', () => {
  const byNode = new Map(withState(directedTree, 1).map((frame) => [frame.node, frame]));

  it('시작 노드는 온 곳이 없고 깊이가 0이다', () => {
    expect(byNode.get(1)).toEqual({node: 1, parent: null, depth: 0, path: [1]});
  });

  it('꺼낸 노드마다 어디서 왔는지 알 수 있다', () => {
    expect(byNode.get(7)!.parent).toBe(6);
    expect(byNode.get(10)!.parent).toBe(9);
  });

  it('깊이는 시작점에서 몇 번 내려왔는지다', () => {
    expect(byNode.get(5)!.depth).toBe(1);
    expect(byNode.get(6)!.depth).toBe(2);
    expect(byNode.get(7)!.depth).toBe(3);
  });

  it('갈래가 나뉘어도 경로가 서로 섞이지 않는다', () => {
    expect(byNode.get(7)!.path).toEqual([1, 5, 6, 7]);
    expect(byNode.get(4)!.path).toEqual([1, 2, 3, 4]);
  });
});
