#!/usr/bin/env node
// 필기(`docs/`)가 커밋을 해시로 가리키는지 본다.
//
// 이 파일이 존재하는 이유: `CLAUDE.md` 「실제로 빠졌던 오해는 남긴다」가 파일 경로·커밋 해시로
// 가리키지 말고 추상화해 적으라고 정해뒀는데, 그 규칙에 닿는 검사가 없었다. pre-commit은
// `src/problems/**`의 경로 컨벤션과 `.ts`의 tsc·vitest만 보고 **`docs/`는 어떤 검사도 안 거친다.**
//
// 그리고 이 위반은 조용하고 늦게 터진다 — 해시를 적은 순간에는 링크가 멀쩡히 열리고, rebase로
// 그 커밋이 사라진 뒤에야 죽는데 그때는 무슨 커밋이었는지 복원할 수 없다. 실제로 두 건이
// 그렇게 들어와 있었다(2026-08-31 확인).
//
// 판정은 40자 16진 문자열 매칭뿐이라 판단이 안 든다. 짧은 해시(7~8자)는 안 잡는다 —
// 일반 낱말·식별자와 구분이 안 서 오탐이 난다.
//
// 사용: node scripts/check-commit-hash.mjs [파일…]   (인자 없으면 staged 중 docs/*.md)

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const FULL_SHA = /\b[0-9a-f]{40}\b/g;

function stagedDocs() {
  try {
    return execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACM'], { encoding: 'utf8' })
      .split('\n')
      .filter((f) => f.startsWith('docs/') && f.endsWith('.md'));
  } catch {
    return [];
  }
}

const files = process.argv.slice(2).length ? process.argv.slice(2) : stagedDocs();
const hits = [];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  fs.readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .forEach((line, i) => {
      for (const m of line.matchAll(FULL_SHA)) hits.push({ file, lineNo: i + 1, sha: m[0], line: line.trim() });
    });
}

if (!hits.length) {
  if (files.length) console.log(`docs/ ${files.length}개 파일에 커밋 해시 없음`);
  process.exit(0);
}

console.error('필기가 커밋을 해시로 가리킨다 — rebase 하면 가리키던 자리가 사라진다:');
for (const { file, lineNo, sha, line } of hits) {
  console.error(`  ${file}:${lineNo}  ${sha.slice(0, 10)}…`);
  console.error(`    ${line.slice(0, 120)}`);
}
console.error('');
console.error('커밋을 가리키지 말고 무엇을 잘못 봤는지를 추상화해 적는다 — 틀린 식·구조의 모양과 새는 입력.');
process.exit(1);
