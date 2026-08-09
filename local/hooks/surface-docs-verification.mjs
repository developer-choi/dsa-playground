// `docs/` 필기가 든 커밋을 실행하기 직전, `/fact-check`·`/write-refine` 을 돌렸는지 한 줄
// 띄운다. 차단하지 않고 사용자에게 묻지도 않는다 — 컨텍스트에 넣고 그대로 통과시킨다.
//
// 왜 CLAUDE.md 한 줄로 부족한가 — 2026-08-09 사고. 필기 4개를 고쳐 커밋하면서 두 스킬 다
// 안 돌렸고, 그 안에 틀린 주장 2건이 들어 있었다. 규칙은 그 순간 컨텍스트에 있었다(공식 문서
// context-window.md: 프로젝트 루트 CLAUDE.md는 압축마다 디스크에서 재주입). 없었던 건
// 부르라는 대상이다 — 스킬 목록은 압축에서 유일하게 재주입되지 않고("The skill listing is
// the one exception"), 한 번이라도 호출한 스킬만 본문째 보존된다. fact-check 는 그날 아침
// 만들어져 목록에 한 줄 오른 게 전부라, 쓸 상황이 온 밤에는 이름조차 남아 있지 않았다.
// 훅은 컨텍스트가 아니라 코드로 돌아 압축의 영향을 안 받으므로, 사라진 그 이름을 커밋하는
// 순간 다시 놓는다.
//
// 판정은 커밋 명령 문장만 본다. 파일 내용도 diff도 안 본다 — "얼마나 고쳤나"는 명령줄에
// 없고, 안내만 하는 훅이라 헛발동해도 한 줄 읽고 지나가는 게 전부다. 정밀도는 차단하거나
// 물을 때만 값어치가 있다.
//
// 이 파일은 local/hooks/의 원본이며 sync:local-system이 .claude/hooks/로 배포한다.
// 산출물을 직접 수정하지 말 것. self-contained I/O (공용 hook-utils 없음).
import fs from "node:fs";
import { fileURLToPath } from "node:url";

// `git commit`·`git -C <경로> commit` 둘 다. 이 레포의 커밋은 대부분 후자라 두 단어가 붙어
// 있다고 보면 거의 다 놓친다 — 2026-08-09 집계에서 인접 기준은 61건 중 0건을 잡았다.
const GIT_COMMIT = /\bgit\b[^|;&\n]*?\bcommit\b/;

// 커밋 명령에 적힌 `docs/` 밑 .md 경로. 경로 구분자는 셸이 / 를 받으므로 / 만 본다.
const DOCS_NOTE = /(^|[\s"'=/\\])docs\/[^\s"';|&]*\.md\b/;

export function needsReminder(command) {
  const cmd = String(command || "");
  return GIT_COMMIT.test(cmd) && DOCS_NOTE.test(cmd);
}

function main() {
  let payload;
  try {
    payload = JSON.parse(fs.readFileSync(0, "utf8"));
  } catch {
    return;
  }
  if (payload.tool_name !== "Bash") return;
  if (!needsReminder((payload.tool_input || {}).command)) return;

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        additionalContext:
          "[필기 커밋] 이 커밋에 `docs/` 필기가 들어 있다. 코드가 이렇게 동작한다는 주장을 " +
          "새로 적거나 고쳤다면, 커밋 전에 `/fact-check` 로 그 주장을 실측과 대조하고 그다음 " +
          "`/write-refine` 으로 다듬는다. 이미 돌렸거나 주장을 건드리지 않은 변경이면 그대로 " +
          "진행한다. 커밋은 차단되지 않는다.",
      },
    }),
  );
}

// 직접 실행일 때만 훅을 돌린다. import(유닛테스트)로 들어올 땐 발동하지 않는다.
if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  main();
  process.exit(0);
}
