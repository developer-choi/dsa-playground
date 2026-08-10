// `src/data-structure/` 구현체가 든 커밋을 실행하기 직전, 짝 테스트가 없는 파일을 한 줄
// 띄운다. 차단하지 않고 사용자에게 묻지도 않는다 — 컨텍스트에 넣고 그대로 통과시킨다.
//
// 왜 CLAUDE.md 한 줄로 부족한가 — 짝 테스트는 "지금 안 만들어도 당장 아무 일도 안 일어나는"
// 종류의 규칙이라, 문제를 푸는 데 급한 순간에 가장 먼저 밀린다. 그리고 자료구조는 실전에서
// 복붙해 쓰는 물건이라, 안 돌려본 구현을 시험 중에 처음 믿게 되는 게 정확히 이 규칙이 막으려는
// 사고다. 훅은 컨텍스트가 아니라 코드로 돌아 압축의 영향을 안 받으므로, 커밋하는 순간 다시 놓는다.
//
// 판정은 커밋 명령에 적힌 경로와 디스크만 본다. 짝 테스트가 이미 커밋돼 있으면 이번 커밋에
// 없어도 통과다 — 파일이 있느냐만 보기 때문이다.
//
// 이 파일은 local/hooks/의 원본이며 sync:local-system이 .claude/hooks/로 배포한다.
// 산출물을 직접 수정하지 말 것. self-contained I/O (공용 hook-utils 없음).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// `git commit`·`git -C <경로> commit` 둘 다.
const GIT_COMMIT = /\bgit\b[^|;&\n]*?\bcommit\b/;

// 커밋 명령에 적힌 `src/data-structure/` 밑 .ts 경로. 경로 구분자는 셸이 / 를 받으므로 / 만 본다.
const IMPLEMENTATION = /(^|[\s"'=/\\])(src\/data-structure\/[^\s"';|&]*\.ts)\b/g;

// `git -C <경로>` 의 경로. 명령에 적힌 상대 경로는 이 자리를 기준으로 푼다.
const WORKING_DIR = /\bgit\b\s+-C\s+("[^"]+"|'[^']+'|\S+)/;

function workingDirOf(command) {
  const matched = command.match(WORKING_DIR);
  return matched ? matched[1].replace(/^["']|["']$/g, "") : process.cwd();
}

export function missingTests(command, exists = fs.existsSync) {
  const cmd = String(command || "");
  if (!GIT_COMMIT.test(cmd)) return [];

  const baseDir = workingDirOf(cmd);

  return [...cmd.matchAll(IMPLEMENTATION)]
    .map(([, , filePath]) => filePath)
    .filter(filePath => !filePath.endsWith(".test.ts"))
    .filter(filePath => !exists(path.resolve(baseDir, filePath.replace(/\.ts$/, ".test.ts"))));
}

function main() {
  let payload;
  try {
    payload = JSON.parse(fs.readFileSync(0, "utf8"));
  } catch {
    return;
  }
  if (payload.tool_name !== "Bash") return;

  const missing = missingTests((payload.tool_input || {}).command);
  if (missing.length === 0) return;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        additionalContext:
          `[자료구조 짝 테스트] 짝 테스트가 없는 구현체가 이 커밋에 있다: ${missing.join(", ")}. ` +
          "자료구조는 실전에서 복붙해 쓰는 물건이라, 안 돌려본 구현을 시험 중에 처음 믿게 되는 " +
          "일을 막으려면 최소본·최대본 모두 테스트를 함께 둔다. 지금 만들 수 없는 사정이면 " +
          "사용자에게 알리고 진행한다. 커밋은 차단되지 않는다.",
      },
    }),
  );
}

// 직접 실행일 때만 훅을 돌린다. import(유닛테스트)로 들어올 땐 발동하지 않는다.
if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  main();
  process.exit(0);
}
