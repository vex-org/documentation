import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(projectRoot, "docs");
const bundlePath = join(docsRoot, "vex_docs.txt");
const checkOnly = process.argv.includes("--check");

function markdownFiles(directory) {
  const result = [];

  for (const entry of readdirSync(directory)) {
    if (entry === ".vitepress") continue;

    const absolute = join(directory, entry);
    if (statSync(absolute).isDirectory()) {
      result.push(...markdownFiles(absolute));
    } else if (entry.endsWith(".md")) {
      result.push(relative(docsRoot, absolute).replaceAll("\\", "/"));
    }
  }

  return result;
}

const discovered = markdownFiles(docsRoot);
const discoveredSet = new Set(discovered);
const priorBundle = existsSync(bundlePath) ? readFileSync(bundlePath, "utf8") : "";
const markerPattern = /^\/\/ File: \.\/(.+\.md)$/gm;
const priorOrder = [...priorBundle.matchAll(markerPattern)].map((match) => match[1]);

const seen = new Set();
const ordered = [];
for (const file of priorOrder) {
  if (discoveredSet.has(file) && !seen.has(file)) {
    ordered.push(file);
    seen.add(file);
  }
}
for (const file of discovered.sort()) {
  if (!seen.has(file)) ordered.push(file);
}

const separator = "// ============================================================================";
const generated = ordered
  .map((file) => {
    const source = readFileSync(join(docsRoot, file), "utf8").trimEnd();
    return `${separator}\n// File: ./${file}\n${separator}\n${source}\n`;
  })
  .join("\n\n");

if (checkOnly) {
  if (priorBundle !== generated) {
    console.error("docs/vex_docs.txt is stale; run `npm run docs:bundle`.");
    process.exit(1);
  }
  console.log(`docs/vex_docs.txt is current (${ordered.length} Markdown files).`);
} else {
  writeFileSync(bundlePath, generated);
  console.log(`Updated docs/vex_docs.txt from ${ordered.length} Markdown files.`);
}
