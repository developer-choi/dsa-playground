#!/usr/bin/env node
// 문제 파일의 이름이 등재된 출처 접두사로 시작하는지 본다.
//
// 접두사는 스캐폴딩이 URL에서 파싱해 정하는데, URL이 없는 기업 코테 문제는 사람이 손으로
// 정한다. 그렇게 정한 이름은 틀려도 에러가 안 나고, 잘못 붙은 접두사는 다음에 같은 문제를
// 다시 만났을 때 grep 에 안 걸려 같은 문제가 두 번 스캐폴딩된다. 실제로 표에 없던 wf 가
// 파일 여덟 개에 굳을 때까지 아무도 표와 대조하지 않았다.
//
// 접두사 목록의 정본은 convention.md 의 표다 — 여기 옮겨 적으면 둘이 갈린다. 새 출처를
// 쓰려면 표에 먼저 등재해야 하고, 그 등재가 곧 이 검사의 허용 목록이 된다.
//
// 카테고리 폴더 직속 파일만 본다. 그 아래 하위 폴더(dfs-bfs/basic 등)는 문제 풀이가 아니라
// 연습 파일 자리라 번호가 없다.
//
// 인자로 받은 경로만 검사한다. 인자가 없으면 src/problems 전체를 본다.
import { readFileSync, globSync } from 'node:fs';

const CONVENTION = 'local/contexts/convention.md';
const PROBLEM_ROOT = 'src/problems';

/** convention.md 「파일명 컨벤션」 표의 접두사 열을 읽는다 */
export function registeredPrefixes(markdown) {
  const section = markdown.slice(markdown.indexOf('## 파일명 컨벤션'));
  const table = section.slice(0, section.indexOf('\n## ', 1));

  return [...table.matchAll(/^\|[^|]+\|\s*`([a-z]+)`\s*\|/gm)].map(([, prefix]) => prefix);
}

export function violationsOf(filePath, prefixes) {
  const relative = filePath.replaceAll('\\', '/');
  const segments = relative.slice(relative.indexOf(PROBLEM_ROOT) + PROBLEM_ROOT.length + 1).split('/');

  // 카테고리 폴더 직속이 아니면(카테고리/파일 두 조각이 아니면) 대상이 아니다
  if (segments.length !== 2) {
    return [];
  }

  const [, name] = segments;

  if (new RegExp(`^(${prefixes.join('|')})-\\d+`).test(name)) {
    return [];
  }

  return [`${relative}  파일명이 등재된 출처 접두사로 시작하지 않습니다. 쓸 수 있는 접두사: ${prefixes.join(', ')} — 새 출처는 ${CONVENTION} 표에 먼저 등재하세요`];
}

function main() {
  const prefixes = registeredPrefixes(readFileSync(CONVENTION, 'utf8'));

  if (prefixes.length === 0) {
    console.error(`${CONVENTION} 「파일명 컨벤션」 표에서 접두사를 못 읽었습니다`);
    process.exit(1);
  }

  const targets = process.argv.slice(2).filter(path => path.replaceAll('\\', '/').includes(`${PROBLEM_ROOT}/`));
  const files = targets.length > 0 ? targets : globSync(`${PROBLEM_ROOT}/**/*.{ts,md}`);
  const found = files.flatMap(file => violationsOf(file, prefixes));

  if (found.length === 0) {
    return;
  }

  console.error(found.join('\n'));
  process.exit(1);
}

if (process.argv[1]?.endsWith('check-path-convention.mjs')) {
  main();
}
