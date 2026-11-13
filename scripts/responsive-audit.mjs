// Runs the kavan-responsive-skill audit from the user's skill folder.
// Usage: npm run audit:responsive -- [urls...] [--crawl 20] [--edges] [--reduced-motion]
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";

const script = join(homedir(), ".claude", "skills", "kavan-responsive-skill", "scripts", "responsive-audit.mjs");
const args = process.argv.slice(2);
if (!args.some((a) => a.startsWith("http"))) args.unshift("http://localhost:3000/");
if (!args.includes("--out")) args.push("--out", "./responsive-audit");
const r = spawnSync(process.execPath, [script, ...args], { stdio: "inherit" });
process.exit(r.status ?? 1);
