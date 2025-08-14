import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {breadthFirstTraversal} from '@/examples/data-structure/tree/complete-binary/operation/traversal';

export interface RandomCase<P extends unknown[], R> {
  inputs: P;
  expected: R;
}

export interface TestWithRandomParam<P extends unknown[], R> {
  targetFunction: (...args: P) => R;
  generateCase: () => RandomCase<P, R>;
}

// 함수를 정답과 비교하는 테스트함수
export function testWithRandomCases<P extends unknown[], R>(options: TestWithRandomParam<P, R>) {
  const { targetFunction, generateCase } = options;
  const iterationCount = 50;

  for (let i = 0; i < iterationCount; i++) {
    const { inputs, expected } = generateCase();
    const output = targetFunction(...inputs);

    try {
      expect(output).toEqual(expected);
    } catch (error) {
      console.error({
        inputs: JSON.stringify(inputs),
        expected: JSON.stringify(expected),
        output: JSON.stringify(output),
      });
      throw error;
    }
  }
}

export interface CompareFunctionsOptions<P extends unknown[], R> {
  targetFunction: (...args: P) => R;
  answerFunction: (...args: P) => R;
  generateInput: () => P;
  iterationCount?: number;
  handleError?: (param: {input: P, output: R, expected: R}) => void;
}

// 함수와 정답함수가 서로 아웃풋이 같은지 비교하는 함수
export function compareFunctionsWithRandomInputs<P extends unknown[], R>(options: CompareFunctionsOptions<P, R>) {
  const {targetFunction, answerFunction, generateInput, handleError, iterationCount = 500} = options;

  for (let i = 0; i < iterationCount; i++) {
    const input = generateInput();
    const output = targetFunction(...input);
    const expected = answerFunction(...input);

    try {
      expect(output).toEqual(expected);
    } catch (error) {
      if (handleError) {
        handleError({input, output, expected});
      } else {
        console.dir({input, output, expected}, {depth: 10});
      }
      throw error;
    }
  }
}

/**
 * @description 테스트코드에서 쓰기 위해 level, data만 따로 요약하는 함수
 * @return BFS 기준으로 순회해서 배열을 만들어서 level, data만 따로 추출하여 반환
 */
export function summarizeBinaryTree<D>(root: BinaryTreeNode<D> | undefined): {level: number, data: D}[] {
  if (!root) {
    return [];
  }

  return [...breadthFirstTraversal(root)].map(({node, level, parent}) => ({
    level,
    data: node.data,
    direction: parent?.direction,
    parent: parent?.node.data
  }));
}
