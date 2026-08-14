#!/usr/bin/env node
// 랜덤 대조 블록의 모양을 강제한다. 두 가지를 막는다.
//
// 하나 — 정답 함수·입력 생성기가 describe 블록 안에 인라인으로 박히는 것. 그 둘은 AI가 쓰고
// 사람은 거의 안 읽는데, describe 안에 있으면 정작 읽고 싶은 테스트 케이스보다 먼저 눈에
// 들어온다. 복습할 때 답이 바로 보이는 것도 문제다.
// targetFunction 은 대상이 아니다. describe.each 콜백 인자(fn)를 닫고 있어서 최상위로 못 나간다.
//
// 둘 — compareFunctionsWithRandomInputs 를 놔두고 for 루프를 직접 짜는 것. 유틸은 실패한 입력·
// 출력·기댓값을 함께 찍어주는데, 손으로 짠 루프는 몇 번째에서 왜 틀렸는지를 안 알려준다.
// AI 는 example.md 에 적힌 모양을 따라가므로 예시만으로는 반복해서 새어나간다.
//
// 인자로 받은 .test.ts 만 검사한다. 인자가 없으면 src/problems 전체를 본다.
import { createSourceFile, ScriptTarget, forEachChild, isCallExpression, isIdentifier, isArrowFunction, isFunctionExpression, isPropertyAssignment, isFunctionDeclaration, isExpressionStatement, isPropertyAccessExpression, isStringLiteral } from 'typescript';
import { readFileSync, globSync } from 'node:fs';

const HOISTED_KEYS = ['answerFunction', 'generateInput'];
const RANDOM_UTIL = 'compareFunctionsWithRandomInputs';
const RANDOM_TITLE = '랜덤 입력으로 정답과 동일한지 검증한다';
const RANDOM_ITERATIONS = 1000;

/** 허용 형태: `answer` / `(a, b) => answer(a, b)` — 즉 아래 선언을 부르기만 하는 얇은 껍데기 */
function isThinDelegate(node) {
  if (isIdentifier(node)) {
    return true;
  }

  if (!isArrowFunction(node) && !isFunctionExpression(node)) {
    return false;
  }

  const { body } = node;

  return isCallExpression(body) && isIdentifier(body.expression) && body.arguments.every(isIdentifier);
}

function isDescribeCall(statement) {
  if (!isExpressionStatement(statement) || !isCallExpression(statement.expression)) {
    return false;
  }

  // describe(...) / describe.each(...)(...) 둘 다 텍스트 선두로 판별한다
  return statement.expression.getText(statement.getSourceFile()).startsWith('describe');
}

/** describe('Random', ...) — 랜덤 대조 전용 블록 */
function isRandomBlock(node) {
  if (!isCallExpression(node) || !isIdentifier(node.expression) || node.expression.text !== 'describe') {
    return false;
  }

  const [title] = node.arguments;

  return title !== undefined && isStringLiteral(title) && title.text.startsWith('Random');
}

function subtreeHas(node, predicate) {
  if (predicate(node)) {
    return true;
  }

  return forEachChild(node, child => subtreeHas(child, predicate)) ?? false;
}

function isMathRandom(node) {
  return isPropertyAccessExpression(node) && isIdentifier(node.expression) && node.expression.text === 'Math' && node.name.text === 'random';
}

function isRandomUtilCall(node) {
  return isCallExpression(node) && isIdentifier(node.expression) && node.expression.text === RANDOM_UTIL;
}

function lineOf(sourceFile, node) {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

/**
 * Random 블록 안의 검증 케이스가 정해진 모양인지 본다.
 * 단일 케이스 서술이 아니라 반복 검증 루틴이므로 `it` 이 아니라 `test` 로 쓰고, 문구는 파일마다
 * 달라질 이유가 없으므로 하나로 고정한다. 반복 횟수도 같은 이유로 고정이다.
 */
function randomCaseViolations(sourceFile, randomBlock) {
  const found = [];

  function visit(node) {
    if (isCallExpression(node) && isIdentifier(node.expression) && (node.expression.text === 'it' || node.expression.text === 'test')) {
      const [title] = node.arguments;

      if (subtreeHas(node, isRandomUtilCall)) {
        if (node.expression.text === 'it') {
          found.push({ line: lineOf(sourceFile, node), message: '랜덤 대조는 단일 케이스가 아니라 검증 루틴입니다. it 대신 test 를 쓰세요' });
        }

        if (title !== undefined && isStringLiteral(title) && title.text !== RANDOM_TITLE) {
          found.push({ line: lineOf(sourceFile, title), message: `랜덤 대조 문구는 '${RANDOM_TITLE}' 로 통일합니다` });
        }
      }
    }

    if (isPropertyAssignment(node) && isIdentifier(node.name) && node.name.text === 'iterationCount') {
      const literal = node.initializer.getText(sourceFile);

      if (literal !== String(RANDOM_ITERATIONS)) {
        found.push({ line: lineOf(sourceFile, node), message: `iterationCount 는 ${RANDOM_ITERATIONS} 입니다` });
      }
    }

    forEachChild(node, visit);
  }

  visit(randomBlock);

  return found;
}

export function violationsOf(filePath, code) {
  const sourceFile = createSourceFile(filePath, code, ScriptTarget.ESNext, true);
  const violations = [];

  function visit(node) {
    // 규칙 1. answerFunction·generateInput 에 인라인 본문 금지
    if (isPropertyAssignment(node) && isIdentifier(node.name) && HOISTED_KEYS.includes(node.name.text) && !isThinDelegate(node.initializer)) {
      violations.push({
        line: lineOf(sourceFile, node),
        message: `${node.name.text} 에 인라인 본문이 있습니다. describe 아래에 function 으로 선언하고 여기서는 호출만 하세요`,
      });
    }

    // 규칙 2. 랜덤 입력은 describe 밖 생성기에서 만든다
    if (isMathRandom(node)) {
      violations.push({
        line: lineOf(sourceFile, node),
        message: 'describe 안에서 Math.random 을 쓰고 있습니다. 입력 생성은 describe 아래 generateInput 함수로 내리세요',
      });
    }

    // 규칙 3. 랜덤 블록은 반복 대조 유틸을 쓴다
    if (isRandomBlock(node) && !subtreeHas(node, isRandomUtilCall)) {
      violations.push({
        line: lineOf(sourceFile, node),
        message: `Random 블록이 ${RANDOM_UTIL} 를 쓰지 않습니다. 직접 for 루프를 돌리면 실패한 입력·출력·기댓값이 안 찍힙니다`,
      });
    }

    // 규칙 5. 랜덤 블록의 검증 케이스는 test() + 고정 문구 + 정해진 반복 횟수
    if (isRandomBlock(node)) {
      violations.push(...randomCaseViolations(sourceFile, node));
    }

    forEachChild(node, visit);
  }

  // Math.random 검사는 describe 안쪽만 본다 — 아래로 내려간 생성기는 당연히 써야 한다
  sourceFile.statements.filter(isDescribeCall).forEach(visit);

  // 규칙 4. 최상위 function 선언은 마지막 describe 뒤에
  const statements = sourceFile.statements;
  const lastDescribeIndex = statements.findLastIndex(isDescribeCall);

  if (lastDescribeIndex !== -1) {
    statements.forEach((statement, index) => {
      if (isFunctionDeclaration(statement) && index < lastDescribeIndex) {
        violations.push({
          line: lineOf(sourceFile, statement),
          message: `function ${statement.name?.text ?? ''} 선언이 describe 위에 있습니다. 파일 아래로 내리세요`,
        });
      }
    });
  }

  return violations.sort((a, b) => a.line - b.line);
}

function main() {
  const targets = process.argv.slice(2).filter(path => path.endsWith('.test.ts'));
  const files = targets.length > 0 ? targets : globSync('src/problems/**/*.test.ts');

  const found = files.flatMap(file =>
    violationsOf(file, readFileSync(file, 'utf8')).map(({ line, message }) => `${file}:${line}  ${message}`),
  );

  if (found.length === 0) {
    return;
  }

  console.error(found.join('\n'));
  process.exit(1);
}

if (process.argv[1]?.endsWith('check-test-layout.mjs')) {
  main();
}
