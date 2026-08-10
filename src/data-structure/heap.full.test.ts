import { Comparator, Heap, MaxHeap, MinHeap } from './heap.full';

/** 평탄화하며 toArrayByLevel() 을 지웠으므로 내부 배열을 직접 본다 */
function toArray<T>(heap: Heap<T>): T[] {
  return [...(heap as unknown as {array: T[]}).array];
}

/** 원본의 iterativeIsHeap 자리 — 모든 부모가 자식보다 우선순위가 높은지 확인 */
function isHeap<T>(type: 'min' | 'max', array: T[], comparator: Comparator<T> = (a, b) => (a as number) - (b as number)) {
  return array.every((item, index) => {
    return [2 * index + 1, 2 * index + 2]
      .filter(childIndex => childIndex < array.length)
      .every(childIndex => {
        const compared = comparator(item, array[childIndex]);
        return type === 'min' ? compared <= 0 : compared >= 0;
      });
  });
}

const implementations = [
  {name: 'MinHeap', HeapClass: MinHeap, type: 'min' as const},
  {name: 'MaxHeap', HeapClass: MaxHeap, type: 'max' as const},
];

describe.each(implementations)('$name', ({HeapClass, type}) => {
  describe('General cases', () => {
    it('삽입할 때마다 힙 조건을 유지한다', () => {
      const inputs = [
        Array.from({length: 60}, (_, i) => i + 1),
        Array.from({length: 60}, (_, i) => 60 - i),
        [7, 7, 3, 9, 1, 9, 3, 5, 5, 1],
      ];

      inputs.forEach(input => {
        const heap = new HeapClass();

        input.forEach(value => {
          heap.add(value);
          expect(isHeap(type, toArray(heap))).toBe(true);
        });
      });
    });

    it('루트를 반복해 꺼내면 정렬된 순서로 나온다', () => {
      const heap = new HeapClass();
      [2, 3, 10, 4, 5].forEach(value => heap.add(value));

      const expecteds = type === 'min'
        ? [
          {root: 2, array: [3, 4, 10, 5]},
          {root: 3, array: [4, 5, 10]},
          {root: 4, array: [5, 10]},
          {root: 5, array: [10]},
          {root: 10, array: []},
          {root: undefined, array: []},
        ]
        : [
          {root: 10, array: [5, 4, 3, 2]},
          {root: 5, array: [4, 2, 3]},
          {root: 4, array: [3, 2]},
          {root: 3, array: [2]},
          {root: 2, array: []},
          {root: undefined, array: []},
        ];

      expecteds.forEach(expected => {
        expect(heap.extractRoot()).toBe(expected.root);
        expect(toArray(heap)).toEqual(expected.array);
      });
    });

    it('키를 갱신하면 힙 조건이 복구된다', () => {
      const heap = new HeapClass();
      [10, 15, 20, 30, 40].forEach(value => heap.add(value));

      if (heap instanceof MinHeap) {
        heap.decreaseKey(3, 5);
        expect(toArray(heap)).toEqual([5, 10, 20, 15, 40]);
      } else {
        heap.increaseKey(1, 60);
        expect(toArray(heap)).toEqual([60, 40, 15, 10, 20]);
      }
    });

    it('루트 / 중간 / 잎 어디를 지워도 힙 조건이 유지된다', () => {
      const heap = new HeapClass();
      [13, 16, 31, 41, 51, 100].forEach(value => heap.add(value));

      const expecteds = type === 'min'
        ? [
          {index: 0, array: [16, 41, 31, 100, 51]},
          {index: heap.length - 2, array: [16, 41, 31, 100]},
          {index: 2, array: [16, 41, 100]},
        ]
        : [
          {index: 0, array: [51, 41, 16, 13, 31]},
          {index: heap.length - 2, array: [51, 41, 16, 13]},
          {index: 2, array: [51, 41, 13]},
        ];

      heap.deleteKey(expecteds[0].index);
      expect(toArray(heap)).toEqual(expecteds[0].array);

      heap.deleteKey(heap.length - 1);
      expect(toArray(heap)).toEqual(expecteds[1].array);

      heap.deleteKey(expecteds[2].index);
      expect(toArray(heap)).toEqual(expecteds[2].array);
    });

    it('length 는 넣고 꺼낸 개수를 따라간다', () => {
      const heap = new HeapClass();

      expect(heap.length).toBe(0);

      [1, 2, 3, 4].forEach(value => heap.add(value));
      expect(heap.length).toBe(4);

      heap.extractRoot();
      heap.deleteKey(0);
      expect(heap.length).toBe(2);
    });
  });

  describe('Boundary cases', () => {
    it('원소가 하나뿐일 때 꺼내면 빈 힙이 된다', () => {
      const heap = new HeapClass();
      heap.add(42);

      expect(heap.extractRoot()).toBe(42);
      expect(toArray(heap)).toEqual([]);
      expect(heap.length).toBe(0);
      expect(heap.peek()).toBeUndefined();
    });

    it('마지막 인덱스를 지우면 재배열 없이 그것만 빠진다', () => {
      const heap = new HeapClass();
      [1, 2, 3, 4, 5].forEach(value => heap.add(value));
      const before = toArray(heap);

      heap.deleteKey(heap.length - 1);

      expect(toArray(heap)).toEqual(before.slice(0, -1));
    });

    // 지운 자리를 메운 값이 부모보다 우선순위가 높은 배치. deleteKey 의 heapifyUp 쪽 분기를 밟는다
    it('지운 자리로 올라온 값이 위로 올라가야 하면 위로 올린다', () => {
      const heap = new HeapClass();
      const {input, expected} = type === 'min'
        ? {
          input: [1, 2, 100, 3, 4, 101, 102, 5, 6, 7],
          expected: [1, 2, 7, 3, 4, 100, 102, 5, 6],
        }
        : {
          input: [100, 99, 1, 98, 97, 0, -1, 96, 95, 94],
          expected: [100, 99, 94, 98, 97, 1, -1, 96, 95],
        };

      input.forEach(value => heap.add(value));
      // 넣는 동안 자리가 안 바뀌는 입력이라, 지우기 직전 배열은 넣은 순서 그대로다
      expect(toArray(heap)).toEqual(input);

      heap.deleteKey(5);

      expect(toArray(heap)).toEqual(expected);
      expect(isHeap(type, toArray(heap))).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('빈 힙에서 꺼내면 undefined 를 반환한다', () => {
      expect(new HeapClass().extractRoot()).toBeUndefined();
    });

    it('범위 밖 인덱스를 지우려 하면 RangeError 를 던진다', () => {
      const heap = new HeapClass();
      heap.add(1);

      expect(() => heap.deleteKey(-1)).toThrow(RangeError);
      expect(() => heap.deleteKey(1)).toThrow(RangeError);
      expect(() => new HeapClass().deleteKey(0)).toThrow(RangeError);
    });

    // 안 막으면 없는 자리에 값이 들어가 배열이 늘어나고, length 가 그 길이를 그대로 답한다
    it('범위 밖 인덱스로 키를 갱신하려 하면 RangeError 를 던지고 힙을 건드리지 않는다', () => {
      const heap = new HeapClass();
      [10, 20, 30].forEach(value => heap.add(value));

      const update = (index: number) => heap instanceof MinHeap ? heap.decreaseKey(index, 5) : heap.increaseKey(index, 99);

      expect(() => update(-1)).toThrow(RangeError);
      expect(() => update(heap.length)).toThrow(RangeError);
      expect(() => update(99)).toThrow(RangeError);
      expect(toArray(heap)).toEqual(type === 'min' ? [10, 20, 30] : [30, 10, 20]);
      expect(heap.length).toBe(3);
    });

    it('반대 방향으로 키를 갱신하려 하면 TypeError 를 던진다', () => {
      const heap = new HeapClass();
      heap.add(10);

      if (heap instanceof MinHeap) {
        expect(() => heap.decreaseKey(0, 30)).toThrow(TypeError);
      } else {
        expect(() => heap.increaseKey(0, 5)).toThrow(TypeError);
      }
    });

    it('힙 조건을 깨지 않는 갱신은 자리를 바꾸지 않는다', () => {
      const heap = new HeapClass();
      [10, 20, 30].forEach(value => heap.add(value));

      if (heap instanceof MinHeap) {
        heap.decreaseKey(1, 15);
        expect(toArray(heap)).toEqual([10, 15, 30]);
      } else {
        heap.increaseKey(1, 25);
        expect(toArray(heap)).toEqual([30, 25, 20]);
      }
    });

    it('같은 값이 여러 개여도 개수만큼 꺼낸다', () => {
      const heap = new HeapClass();
      [4, 4, 4].forEach(value => heap.add(value));

      expect([heap.extractRoot(), heap.extractRoot(), heap.extractRoot(), heap.extractRoot()]).toEqual([4, 4, 4, undefined]);
    });
  });

  describe('Random', () => {
    it('무작위로 넣고 꺼내는 것을 섞어도 힙 조건이 유지된다', () => {
      for (let round = 0; round < 200; round++) {
        const heap = new HeapClass();
        const remaining: number[] = [];

        for (let step = 0; step < 60; step++) {
          if (remaining.length === 0 || Math.random() < 0.6) {
            const value = Math.floor(Math.random() * 100);
            heap.add(value);
            remaining.push(value);
          } else {
            const extracted = heap.extractRoot() as number;
            const expected = type === 'min' ? Math.min(...remaining) : Math.max(...remaining);

            expect(extracted).toBe(expected);
            remaining.splice(remaining.indexOf(extracted), 1);
          }

          expect(isHeap(type, toArray(heap))).toBe(true);
          expect(heap.length).toBe(remaining.length);
        }
      }
    });
  });
});

describe('비교 함수를 넣은 경우', () => {
  type Job = [priority: number, name: string];

  const byPriority: Comparator<Job> = (a, b) => a[0] - b[0];

  it('MinHeap 은 우선순위가 낮은 것부터 꺼낸다', () => {
    const heap = new MinHeap<Job>(byPriority);
    const jobs: Job[] = [[3, 'c'], [1, 'a'], [2, 'b'], [5, 'e'], [4, 'd']];

    jobs.forEach(job => heap.add(job));

    expect(jobs.map(() => heap.extractRoot())).toEqual([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e']]);
  });

  it('MaxHeap 은 우선순위가 높은 것부터 꺼낸다', () => {
    const heap = new MaxHeap<Job>(byPriority);
    const jobs: Job[] = [[3, 'c'], [1, 'a'], [2, 'b']];

    jobs.forEach(job => heap.add(job));

    expect(jobs.map(() => heap.extractRoot())).toEqual([[3, 'c'], [2, 'b'], [1, 'a']]);
  });

  it('deleteKey 도 넣어준 비교 함수를 따른다', () => {
    const heap = new MinHeap<Job>(byPriority);
    const jobs: Job[] = [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd'], [5, 'e']];

    jobs.forEach(job => heap.add(job));
    heap.deleteKey(1);

    expect(isHeap('min', toArray(heap), byPriority)).toBe(true);
    expect(heap.length).toBe(4);
    expect(heap.extractRoot()).toEqual([1, 'a']);
  });

  it('decreaseKey 는 넣어준 비교 함수로 방향을 판단한다', () => {
    const heap = new MinHeap<Job>(byPriority);
    ([[10, 'x'], [20, 'y'], [30, 'z']] as Job[]).forEach(job => heap.add(job));

    heap.decreaseKey(2, [5, 'w']);

    expect(heap.peek()).toEqual([5, 'w']);
    expect(() => heap.decreaseKey(0, [99, 'q'])).toThrow(TypeError);
  });
});
