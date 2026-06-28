#!/usr/bin/env node
import { transpileModule, ScriptTarget, ModuleKind } from 'typescript';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/strip-types.mjs <file.ts>');
  process.exit(1);
}

const source = readFileSync(resolve(filePath), 'utf-8');
const { outputText } = transpileModule(source, {
  compilerOptions: {
    target: ScriptTarget.ESNext,
    module: ModuleKind.ESNext,
    removeComments: true,
  },
});

// 4-space → 2-space
const indentFixed = outputText.replace(/^( {4})+/gm, m => ' '.repeat(m.length / 2));

// 원본의 빈 줄 위치를 출력에 재삽입
function reinsertBlankLines(orig, out) {
  const origLines = orig.split('\n');
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

const output = reinsertBlankLines(source, indentFixed);

const outPath = resolve(process.cwd(), 'solution.js');
writeFileSync(outPath, output);
console.log(`→ ${outPath}`);
