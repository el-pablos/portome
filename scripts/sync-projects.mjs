#!/usr/bin/env node
/**
 * scripts/sync-projects.mjs
 * Fetches metadata for curated GitHub repos via `gh` CLI
 * and writes src/data/projects.generated.json.
 *
 * Usage:  node scripts/sync-projects.mjs
 * Requires: GitHub CLI (`gh`) authenticated
 */

import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "src", "data", "projects.generated.json");

/** Curated list of repos to showcase (owner/name) */
const REPOS = [
  "el-pablos/ai-whatsapp-chatbot",
  "el-pablos/pentest-for-qa",
  "el-pablos/tamshub-store",
  "el-pablos/reboot-godot-uas-projek",
  "el-pablos/caturnawa-uf-2025",
  "el-pablos/simulasi-atm-udin",
  "el-pablos/platform-aduan-masyarakat",
  "el-pablos/valentine",
  "el-pablos/unfollow-tools",
  "el-pablos/rpl-digital-library",
];

const FIELDS =
  "name,description,url,homepageUrl,primaryLanguage,repositoryTopics,stargazerCount,forkCount,updatedAt,createdAt";

function fetchRepo(nwo) {
  try {
    const raw = execSync(
      `gh repo view ${nwo} --json ${FIELDS}`,
      { encoding: "utf-8", timeout: 15_000 }
    );
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`⚠  Skipping ${nwo}: ${err.message}`);
    return null;
  }
}

console.log("🔄  Syncing GitHub projects…");

const projects = REPOS.map(fetchRepo)
  .filter(Boolean)
  .map((r) => ({
    name: r.name,
    description: r.description || "",
    url: r.url,
    homepage: r.homepageUrl || "",
    language: r.primaryLanguage?.name || "Unknown",
    topics: (r.repositoryTopics || []).map((t) => t.name),
    stars: r.stargazerCount,
    forks: r.forkCount,
    updatedAt: r.updatedAt,
    createdAt: r.createdAt,
  }))
  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(projects, null, 2) + "\n");

console.log(`✅  Wrote ${projects.length} projects → ${OUT}`);
