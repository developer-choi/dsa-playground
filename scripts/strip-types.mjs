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

const formatted = outputText.replace(/^( {4})+/gm, m => ' '.repeat(m.length / 2));

const outPath = resolve(process.cwd(), 'solution.js');
writeFileSync(outPath, formatted);
console.log(`→ ${outPath}`);
