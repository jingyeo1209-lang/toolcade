#!/usr/bin/env node
/**
 * Scaffold coming-soon category shells from data/categories.json.
 * Skips published categories and existing custom pages that already mount content.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cats = JSON.parse(readFileSync(join(root, "data/categories.json"), "utf8"));

const SKIP = new Set(["meeting-notes"]); // full curated pages

function shell(slug, title) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="toolcade-root" content="../../">
  <title>${title} | Toolcade</title>
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
  <link rel="stylesheet" href="../../css/toolcade.css">
</head>
<body>
  <div id="ph-nav"></div>
  <div id="app"><p style="padding:2rem;color:#667085">로딩 중…</p></div>
  <div id="ph-footer"></div>
  <script src="../../data/categories.bundle.js"></script>
  <script src="../../js/paths.js"></script>
  <script src="../../js/shell.js"></script>
  <script src="../../js/analytics.js"></script>
  <script src="../../js/load-data.js"></script>
  <script src="../../js/render.js"></script>
  <script>
    ToolcadeRender.mountComingSoonPage({
      slug: "${slug}",
      categoriesUrl: "data/categories.json",
    }).catch((err) => {
      console.error(err);
      document.getElementById("app").innerHTML =
        '<p style="padding:2rem;color:#dc2626">카테고리를 불러오지 못했습니다.</p>';
    });
  </script>
</body>
</html>
`;
}

let created = 0;
for (const c of cats.categories) {
  if (SKIP.has(c.slug) || c.status === "published") continue;
  if (!c.path) continue;
  const out = join(root, c.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, shell(c.slug, c.title), "utf8");
  created += 1;
  console.log("wrote", c.path);
}

console.log(`OK — scaffolded ${created} coming-soon category page(s).`);
