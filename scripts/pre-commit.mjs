#!/usr/bin/env node
// 커밋 직전, 이번 커밋이 건드린 것만 검사한다.
//
// 왜 전체를 안 도는가 — 코테 레포는 과거에 푼 문제가 랜덤 대조에서 깨진 채 남아 있을 수 있다.
// 전체를 게이트로 걸면 무관한 커밋까지 전부 막힌다. 스테이징된 파일과 관련된 테스트만 돌린다.
//
// 타입 검사만 예외로 전체를 본다. tsc 는 프로젝트 단위라 파일 단위로 쪼갤 수 없다.
import { spawnSync, execFileSync } from 'node:child_process';

const TSC = 'node_modules/typescript/bin/tsc';
const VITEST = 'node_modules/vitest/vitest.mjs';
const CHECK_TEST_LAYOUT = 'scripts/check-test-layout.mjs';

function stagedFiles() {
  const output = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACM'], { encoding: 'utf8' });

  return output.split('\n').map(line => line.trim()).filter(line => line.endsWith('.ts'));
}

/** 실패하면 그 자리에서 커밋을 막는다 — 뒤 검사를 더 돌려봐야 고칠 곳만 늘어난다 */
function run(label, args) {
  console.log(`▸ ${label}`);
  const { status } = spawnSync(process.execPath, args, { stdio: 'inherit' });

  if (status !== 0) {
    process.exit(status ?? 1);
  }
}

const staged = stagedFiles();

if (staged.length === 0) {
  process.exit(0);
}

run('타입 검사', [TSC, '--noEmit']);

const stagedTests = staged.filter(file => file.endsWith('.test.ts'));

if (stagedTests.length > 0) {
  run('테스트 배치 검사', [CHECK_TEST_LAYOUT, ...stagedTests]);
}

run('관련 테스트', [VITEST, 'related', '--run', ...staged]);
