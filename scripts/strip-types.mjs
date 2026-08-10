#!/usr/bin/env node
import { transpileModule, ScriptTarget, ModuleKind } from 'typescript';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/strip-types.mjs <file.ts>');
  process.exit(1);
}

const SRC_DIR = resolve(process.cwd(), 'src');

// import { A } from '@/x' / './x' — 따옴표를 안 쓰는 부분만 먹으므로 여러 줄 import 도 걸린다
const IMPORT_RE = /^import\s+[^'"]*?from\s+['"]([^'"]+)['"];?[ \t]*$/gm;
const EXPORT_ONLY_RE = /^export\s*\{[^}]*\}\s*;?[ \t]*$/gm;

function resolveSpecifier(specifier, importerPath) {
  const base = specifier.startsWith('@/')
    ? resolve(SRC_DIR, specifier.slice(2))
    : resolve(dirname(importerPath), specifier);

  for (const candidate of [base, `${base}.ts`, resolve(base, 'index.ts')]) {
    if (existsSync(candidate) && candidate.endsWith('.ts')) {
      return candidate;
    }
  }

  throw new Error(`import 대상을 찾지 못했습니다: '${specifier}' (${importerPath})`);
}

/** 로컬 import 를 따라가며 의존 파일을 먼저 담는다 (깊은 것부터) */
function collect(path, collected = new Map(), stack = []) {
  if (collected.has(path)) {
    return collected;
  }
  if (stack.includes(path)) {
    throw new Error(`import 순환입니다: ${[...stack, path].join(' → ')}`);
  }

  const source = readFileSync(path, 'utf-8');

  for (const [, specifier] of source.matchAll(IMPORT_RE)) {
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) {
      throw new Error(`외부 패키지는 합칠 수 없습니다: '${specifier}' (${path})`);
    }
    collect(resolveSpecifier(specifier, path), collected, [...stack, path]);
  }

  collected.set(path, source);
  return collected;
}

/** import 문·export 키워드를 걷어낸다. 줄 수는 그대로 둬서 빈 줄 복원이 어긋나지 않게 한다 */
function toPlainScript(source) {
  return source
    .replace(IMPORT_RE, m => '\n'.repeat(m.split('\n').length - 1))
    .replace(EXPORT_ONLY_RE, '')
    .replace(/^export\s+/gm, '');
}

const entryPath = resolve(filePath);

let merged;
try {
  merged = [...collect(entryPath).values()].map(toPlainScript).join('\n');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const { outputText } = transpileModule(merged, {
  compilerOptions: {
    target: ScriptTarget.ESNext,
    module: ModuleKind.ESNext,
    removeComments: true,
  },
});

// 4-space → 2-space
const indentFixed = outputText.replace(/^( {4})+/gm, m => ' '.repeat(m.length / 2));

// 원본의 빈 줄 위치를 출력에 재삽입.
// 주석만 있는 줄은 출력에 없으므로(removeComments) 셈에서 뺀다 — 안 빼면 이후 빈 줄이 통째로 밀린다
function reinsertBlankLines(orig, out) {
  const origLines = orig.split('\n').filter(line => !/^\s*(\/\/|\/?\*)/.test(line));
  const outLines = out.trimEnd().split('\n');

  let outIdx = 0;
  const result = [];

  for (const origLine of origLines) {
    if (origLine.trim() === '') {
      result.push('');
    } else {
      if (outIdx < outLines.length) {
        result.push(outLines[outIdx++]);
      }
    }
  }

  while (outIdx < outLines.length) {
    result.push(outLines[outIdx++]);
  }

  return result.join('\n') + '\n';
}

const output = reinsertBlankLines(merged, indentFixed);

const outPath = resolve(process.cwd(), 'solution.js');
writeFileSync(outPath, output);
console.log(`→ ${outPath}`);
