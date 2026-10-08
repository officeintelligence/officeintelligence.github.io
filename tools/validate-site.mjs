import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const origin = new URL("https://officeintelligence.github.io/");
const homepage = path.join(root, "assets/homepage");
const privateMarkers =
  /\/home\/(?!npc\/)[^/\s]+\/|\/data[12]\/projects\/|\/tmp\/|review-notes|SOURCE_BINDINGS|finance-[a-f0-9]{20,}/;
let checked = 0;
const styles = new Set();
function localReference(value, containingFile) {
  if (!value || /^(?:data:|mailto:|tel:|javascript:)/i.test(value)) return;
  const target = new URL(
    value,
    new URL(
      path.relative(root, containingFile).split(path.sep).join("/"),
      origin,
    ),
  );
  if (target.origin !== origin.origin) return;
  let file = path.resolve(root, "." + decodeURIComponent(target.pathname));
  assert.ok(
    file === path.resolve(root) || file.startsWith(root),
    `Path leaves website: ${value}`,
  );
  if (fs.existsSync(file) && fs.statSync(file).isDirectory())
    file = path.join(file, "index.html");
  assert.ok(
    fs.existsSync(file) && fs.statSync(file).isFile(),
    `Missing local resource: ${value} in ${containingFile}`,
  );
  if (file.endsWith(".css")) styles.add(file);
  if (target.hash && /\.(html|svg)$/.test(file)) {
    const ids = new Set(
      [...fs.readFileSync(file, "utf8").matchAll(/\sid=["']([^"']+)["']/g)].map(
        (match) => match[1],
      ),
    );
    assert.ok(
      ids.has(decodeURIComponent(target.hash.slice(1))),
      `Missing anchor: ${value}`,
    );
  }
  checked++;
}
for (const name of ["index.html", "zh.html"]) {
  const file = path.join(root, name);
  const html = fs.readFileSync(file, "utf8");
  assert.ok(!/noindex|nofollow/i.test(html), `${name} must be indexable`);
  assert.ok(
    !privateMarkers.test(html),
    `${name} includes private workspace metadata`,
  );
  assert.match(html, /name="homepage-release" content="[a-f0-9]{16}"/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/officeintelligence\.github\.io\//,
  );
  assert.match(
    html,
    new RegExp(`<html lang="${name === "zh.html" ? "zh-CN" : "en"}"`),
  );
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: duplicate DOM IDs`);
  for (const match of html.matchAll(
    /\b(?:href|src|poster|data-src)="([^"]+)"/g,
  ))
    localReference(match[1], file);
}
for (const file of styles) {
  const css = fs.readFileSync(file, "utf8");
  assert.ok(!privateMarkers.test(css));
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g))
    if (!match[1].startsWith("#")) localReference(match[1], file);
}
for (const name of [
  "docatlas/index.html",
  "xl-docbench/index.html",
  ".nojekyll",
])
  assert.ok(fs.existsSync(path.join(root, name)), name);
for (const name of [
  "DM-SANS-LICENSE.txt",
  "NEWSREADER-LICENSE.txt",
  "fonts/NotoSansSC-OFL.txt",
  "fonts/NotoSerifSC-OFL.txt",
])
  assert.match(
    fs.readFileSync(path.join(homepage, name), "utf8"),
    /OPEN FONT LICENSE/i,
  );
function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Unexpected symlink: ${file}`);
    if (entry.isDirectory()) {
      scan(file);
      continue;
    }
    assert.ok(
      /\.(css|js|svg|png|webp|mp4|woff2|txt)$/.test(entry.name),
      `Unexpected homepage asset: ${file}`,
    );
    assert.ok(
      !/keyframe|screenshot|source\.png|still-cool|\.pdf$|\.ttf$|\.zip$|\.jsonl$/.test(
        entry.name,
      ),
    );
    if (/\.(css|js|svg|txt)$/.test(entry.name))
      assert.ok(
        !privateMarkers.test(fs.readFileSync(file, "utf8")),
        `Private path in ${file}`,
      );
  }
}
scan(homepage);
console.log(
  `PASS static site: ${checked} local references, ${styles.size} stylesheets, bilingual metadata, subsite entries and font licenses.`,
);
