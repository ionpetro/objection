// Render brand/og.html to brand/og.png (1200x630) with headless Chrome, for X and chat previews that ignore SVG.
// Usage: node app/brand/render.mjs    (needs Google Chrome on macOS or `chrome`/`chromium` on PATH)
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const candidates = ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium", "google-chrome", "chromium", "chrome"];
const chrome = candidates.find((c) => c.startsWith("/") ? existsSync(c) : true);
const profile = mkdtempSync(join(tmpdir(), "objection-chrome-"));
execFileSync(chrome, ["--headless=new", `--user-data-dir=${profile}`, `--screenshot=${join(here, "og.png")}`, "--window-size=1200,630", "--hide-scrollbars", "--virtual-time-budget=4000", `file://${join(here, "og.html")}`], { stdio: "inherit" });
console.log("app/brand/og.png rendered");
