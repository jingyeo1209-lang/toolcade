#!/usr/bin/env node
/**
 * Toolcade curation harness validator.
 * Exit 0 on success, 1 on failure.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const errors = [];
const warnings = [];

function load(rel) {
  return JSON.parse(readFileSync(join(root, rel), "utf8"));
}

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function isPlaceholder(url) {
  return !url || /여기에|placeholder|example\.com|TODO/i.test(url);
}

function validateCategoryContent(relPath) {
  const data = load(relPath);
  const { category, tools, decisionTree, comparisonColumns, faq } = data;

  if (!category?.slug || !category?.updatedAt) {
    fail(`[${relPath}] category.slug / updatedAt required`);
  }
  if (!category?.seo?.title || !category?.seo?.description) {
    fail(`[${relPath}] category.seo.title/description required`);
  }
  if (!Array.isArray(comparisonColumns) || comparisonColumns.length < 3) {
    fail(`[${relPath}] comparisonColumns incomplete`);
  }
  if (!Array.isArray(tools) || tools.length === 0) {
    fail(`[${relPath}] tools must be non-empty`);
  }

  const ranks = new Set();
  const slugs = new Set();

  for (const tool of tools || []) {
    const label = `${relPath}#${tool.slug || "?"}`;

    if (!tool.slug) fail(`${label}: slug required`);
    if (slugs.has(tool.slug)) fail(`${label}: duplicate slug`);
    slugs.add(tool.slug);

    if (ranks.has(tool.rank)) fail(`${label}: duplicate rank ${tool.rank}`);
    ranks.add(tool.rank);

    if (!tool.name) fail(`${label}: name required`);
    if (!tool.bestFor) fail(`${label}: bestFor required`);
    if (!tool.quote) fail(`${label}: quote required`);
    if (!Array.isArray(tool.highlights) || tool.highlights.length === 0) {
      fail(`${label}: highlights required`);
    }
    if (!Array.isArray(tool.cons) || tool.cons.length === 0) {
      fail(`${label}: cons required (at least 1)`);
    }
    if (!Array.isArray(tool.notFor) || tool.notFor.length === 0) {
      fail(`${label}: notFor required (at least 1)`);
    }
    if (!tool.comparison?.advantage || !tool.comparison?.freeQuota || !tool.comparison?.botVisibility) {
      fail(`${label}: comparison.advantage/freeQuota/botVisibility required`);
    }
    if (!tool.affiliate?.url || !tool.affiliate?.ctaLabel) {
      fail(`${label}: affiliate.url/ctaLabel required`);
    }
    if (isPlaceholder(tool.affiliate?.url)) {
      fail(`${label}: affiliate.url looks like a placeholder`);
    }
    if (/첫\s*달\s*무료|100%\s*무료|무조건/.test(tool.affiliate?.ctaLabel || "")) {
      warn(`${label}: CTA may over-claim benefit — double-check accuracy`);
    }
    if (/현존|압도적|최고의|정답입니다/.test(`${tool.quote} ${JSON.stringify(tool.highlights)}`)) {
      warn(`${label}: strong superlative found — prefer scoped claims`);
    }
  }

  for (const node of decisionTree || []) {
    if (!slugs.has(node.recommend)) {
      fail(`[${relPath}] decisionTree "${node.id}" recommends unknown slug "${node.recommend}"`);
    }
  }

  if (!faq || faq.length < 1) {
    warn(`[${relPath}] FAQ is empty — recommended for trust`);
  }
}

function validateSite() {
  const cats = load("data/categories.json");
  if (!cats.site?.affiliateDisclosure) {
    fail("categories.json: site.affiliateDisclosure required");
  }
  if (!cats.site?.adsDisclosure) {
    warn("categories.json: site.adsDisclosure missing — recommended for AdSense");
  }
  if (!cats.site?.contactEmail) {
    warn("categories.json: site.contactEmail missing — recommended for AdSense/trust pages");
  }
  if (!Array.isArray(cats.categories) || cats.categories.length === 0) {
    fail("categories.json: categories required");
  }
  for (const c of cats.categories) {
    if (c.status === "published" && !c.path) {
      fail(`categories.json: published category "${c.slug}" missing path`);
    }
  }
}

validateSite();
validateCategoryContent("data/meeting-notes.json");

if (warnings.length) {
  console.log("Warnings:");
  warnings.forEach((w) => console.log("  -", w));
  console.log("");
}

if (errors.length) {
  console.error("Validation failed:");
  errors.forEach((e) => console.error("  -", e));
  process.exit(1);
}

console.log("OK — curation harness validation passed.");
if (warnings.length) {
  console.log(`(${warnings.length} warning(s) — review recommended)`);
}
