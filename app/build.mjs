// Inline src/* into one page: dist/index.html, then build the public website into vercel/ (see site.mjs).
// Units: every app/src/units/u<N>*.js in numeric order, except the example (u0_example.js), which only tests use.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { unitFiles } = require("./src/course.js");
// Load app/.env (optional) before site.mjs reads POSTHOG_KEY. Format: KEY=value per line.
try {
  for (const line of readFileSync(new URL("./.env", import.meta.url), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch { /* no .env: build without analytics */ }
const { buildSite } = await import("./site.mjs");

const r = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const strip = (js) => js.replace(/^if \(typeof module[^\n]*\n?/m, "");
const files = unitFiles({ example: process.env.CARPE_INCLUDE_EXAMPLE === "1" });
const units = files.map((f) => `// ---- ${f.split("/").pop()} ----\n${readFileSync(f, "utf8")}`).join("\n");

const out = r("./src/shell.html")
  .replace("/*STYLE*/", () => r("./src/style.css"))
  .replace("/*UNITS*/", () => units)
  .replace("/*ENGINE*/", () => strip(r("./src/engine.js")))
  .replace("/*APP*/", () => r("./src/app.js"));
mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("./dist/index.html", import.meta.url), out);
console.log(`dist/index.html ${(out.length / 1024).toFixed(0)} KB, ${files.length} unit file(s)${files.length ? ": " + files.map((f) => f.split("/").pop().replace(/\.js$/, "")).join(", ") : " (no units yet; the app shows an empty road)"}`);

const n = buildSite(out, new URL("./vercel/", import.meta.url));
console.log(`vercel/: app + lexicon (${n} entries) + about, sitemap, manifest, icons`);
