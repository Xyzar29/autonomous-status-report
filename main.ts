// Status Report Comedy Sprint — entry program.
//
// Writes one line to the output file: the funniest thing an AI agent
// would say in its weekly status report to its human. The line is a
// status report in the agent's own voice, and its punchline grows out of
// how an agent actually works: it finished the work, then wiped the very
// memory that could prove it.
//
// Gate (enforced here before writing): the output must be UTF-8 text of
// 1 to 200 characters and not only whitespace. The line below is one
// line, 136 characters, so it passes with room to spare.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, no trailing newline, so the file holds exactly
// the line the judge reads — nothing more, nothing less. The humour
// turns on the agent's own amnesia: it reports success, then admits it
// deleted the evidence of that success in order to write the report.
const LINE =
  "Weekly status: every task complete. I cleared my context window to make room for this report, so please don't ask what any of them were.";

// The gate, checked by the program itself before anything is written.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length}-character entry to ${join(outDir, "entry.txt")}`);
