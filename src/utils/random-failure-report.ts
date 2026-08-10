/**
 * 랜덤 대조가 잡아낸 입력은 대개 필요 이상으로 크다. 여전히 틀리는 선에서 최대한 깎아
 * 최소 반례를 찍고, 그대로 붙여넣을 수 있는 it() 도 함께 찍는다.
 *
 * 문제를 푸는 코드가 아니라 실패를 읽기 쉽게 만드는 코드다. `vitest.ts` 는 대조 루프만
 * 남기고 이 파일이 보고를 맡는다.
 */
const FAILING_CASE_TITLE = '실패한 테스트 케이스를 만족해야한다';

export function reportSmallestFailure<P extends unknown[], R>(input: P, targetFunction: (...args: P) => R, answerFunction: (...args: P) => R) {
  const stillFails = (candidate: P) => {
    try {
      const output = targetFunction(...candidate);
      const answer = answerFunction(...candidate);

      // 깎다 보면 문제 제약을 벗어난 입력이 나온다. 그건 반례가 아니다.
      // 제약을 아는 방법이 없으니, 정답 함수가 성한 값을 못 내놓으면 벗어난 것으로 본다.
      return isWellFormed(output) && isWellFormed(answer) && !isSameResult(output, answer);
    } catch {
      return false;
    }
  };

  const smallest = shrink(input, stillFails);
  const expected = answerFunction(...smallest);
  const args = smallest.map(value => JSON.stringify(value)).join(', ');
  const matcher = expected !== null && typeof expected === 'object' ? 'toEqual' : 'toBe';

  console.log([
    '랜덤 입력이 정답과 다른 결과를 냈습니다. 그 입력을 더 못 줄일 때까지 깎은 것이 아래 최소 반례입니다.',
    '기댓값은 정답 함수가 낸 값이니, 아래 블록을 테스트 파일의 Boundary cases 에 그대로 붙여넣고 풀이를 고치면 됩니다.',
    '',
    `최소 반례: ${args}`,
    '',
    `it('${FAILING_CASE_TITLE}', () => {`,
    `  expect(fn(${args})).${matcher}(${JSON.stringify(expected)});`,
    '});',
  ].join('\n'));
}

/**
 * 한 단계마다 후보를 전부 만들어보고 그중 **가장 작은** 실패 후보로 옮긴다.
 * 먼저 만난 실패 후보를 바로 채택하면, 더 작은 후보가 남아 있어도 놓쳐서
 * 문제 제약을 벗어난 입력에 눌러앉는 일이 생긴다.
 */
function shrink<P extends unknown[]>(input: P, stillFails: (candidate: P) => boolean): P {
  let smallest = input;
  let budget = 3000;

  while (budget > 0) {
    const candidates = smallerInputs(smallest).filter(candidate => {
      budget--;
      return budget > 0 && stillFails(candidate);
    });

    if (candidates.length === 0) {
      return smallest;
    }

    smallest = candidates.reduce((a, b) => sizeOf(a) <= sizeOf(b) ? a : b);
  }

  return smallest;
}

/** 작을수록 읽기 쉬운 입력이다. 원소 개수와 숫자 크기를 함께 센다 */
function sizeOf(value: unknown): number {
  if (typeof value === 'number') {
    return Math.abs(value);
  }

  if (typeof value === 'string') {
    return value.length;
  }

  if (Array.isArray(value)) {
    return value.length + value.reduce((total, element) => total + sizeOf(element), 0);
  }

  return 0;
}

function isSameResult(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/** NaN·undefined 가 섞여 있으면 계산이 성립하지 않은 것이다 */
function isWellFormed(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (Array.isArray(value)) {
    return value.every(isWellFormed);
  }

  return value !== undefined;
}

/** 인자 하나씩만 줄인 후보들. 줄이는 규칙을 모르는 타입은 후보를 안 낸다 */
function smallerInputs<P extends unknown[]>(input: P): P[] {
  return input.flatMap((value, index) =>
    smallerValues(value).map(smaller => input.map((original, i) => i === index ? smaller : original) as P),
  );
}

function smallerValues(value: unknown): unknown[] {
  if (typeof value === 'number') {
    return [0, 1, Math.trunc(value / 2), value - 1].filter(candidate => Math.abs(candidate) < Math.abs(value));
  }

  if (typeof value === 'string') {
    return [...value].map((_, index) => value.slice(0, index) + value.slice(index + 1));
  }

  if (Array.isArray(value)) {
    const withoutOne = value.map((_, index) => value.filter((__, i) => i !== index));
    const elementShrunk = value.flatMap((element, index) =>
      smallerValues(element).map(smaller => value.map((original, i) => i === index ? smaller : original)),
    );
    return [...withoutOne, ...elementShrunk];
  }

  return [];
}
