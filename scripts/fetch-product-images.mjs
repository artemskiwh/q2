#!/usr/bin/env node
/**
 * Fetches BRAND-SPECIFIC vape product photos using public web image search.
 *
 * Sources (no API keys needed):
 *   1. Bing Images web scrape — primary, very high hit rate
 *   2. DuckDuckGo Images — fallback when Bing finds nothing
 *
 * Designed to run on a GitHub Actions runner where outbound network is open.
 *Смотри, ты не так понял, нужны сами фото товаров. К каждым вейпам нужны фотографии именно этих вейпов, если вейп популярный можешь добавить несколько разных визуалов, тойсть разных кадров этого товара (под разным углом, как это делают обычно)
И так тебе нужно подбирать изображения ко всем вейпам, которые тут находятся.
 * Popular products (isHot or isNew) get 3 different angles via three slightly
 * different queries (front / side / packaging). Others get a single photo.
 *
 * Run locally:
 *   node scripts/fetch-product-images.mjs           # only missing
 *   node scripts/fetch-product-images.mjs --force   # re-download all
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
Смотри, ты не так понял, нужны сами фото товаров. К каждым вейпам нужны фотографии именно этих вейпов, если вейп популярный можешь добавить несколько разных визуалов, тойсть разных кадров этого товара (под разным углом, как это делают обычно)
И так тебе нужно подбирать изображения ко всем вейпам, которые тут находятся.
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "products");
const MAP_FILE = join(ROOT, "lib", "product-images.ts");

const FORCE = process.argv.includes("--force");

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Brand-specific queries per product slug. For popular products multiple
// queries are listed (one per angle); each is run separately to maximise
// the chance of getting visually distinct photos.
const QUERY_OVERRIDES = {
  "duall-salt":             ["Duall Salt одноразка вейп", "Duall Salt disposable vape", "Duall Salt vape device side"],
  "waka-8000":              ["WAKA 8000 puffs disposable vape", "WAKA 8000 vape side view", "WAKA 8000 puffs box packaging"],
  "waka-20000":             ["WAKA 20000 puffs disposable vape"],
  "waka-25000":             ["WAKA 25000 puffs disposable vape"],
  "waka-60000":             ["WAKA 60000 puffs disposable vape", "WAKA 60000 vape side view", "WAKA 60000 puffs packaging"],
  "elfbar-monnight-25000":  ["Elf Bar Moonnight 25000 disposable", "Elf Bar Moonnight 25000 vape side", "Elf Bar Moonnight 25000 box"],
  "geekbar-32000":          ["Geek Bar Pulse 32000 disposable vape"],
  "geekbar-40000":          ["Geek Bar 40000 puffs disposable vape"],
  "geekbar-50000":          ["Geek Bar Pulse X 50000 disposable", "Geek Bar Pulse X 50K vape side", "Geek Bar Pulse X 50K box"],
  "vozol-shisha-25000":     ["Vozol Shisha 25000 disposable vape"],
  "bubble-mon-30000":       ["Bubble Mon 30000 disposable vape", "Bubble Mon 30000 vape side", "Bubble Mon 30000 packaging"],
  "puffmi-pure-12000":      ["Puffmi Pure 12000 disposable vape"],
  "laiska-queen-10000":     ["Laiska Queen 10000 одноразка вейп"],
  "fizzy-great-10000":      ["Fizzy Great 10000 disposable vape"],
  "vaporesso-xros-mini":    ["Vaporesso XROS Mini pod kit"],
  "vaporesso-xros-3-mini":  ["Vaporesso XROS 3 Mini pod kit"],
  "vaporesso-xros-4":       ["Vaporesso XROS 4 pod kit", "Vaporesso XROS 4 side view", "Vaporesso XROS 4 colors"],
  "vaporesso-xros-4-mini":  ["Vaporesso XROS 4 Mini pod kit"],
  "vaporesso-xros-5":       ["Vaporesso XROS 5 pod kit", "Vaporesso XROS 5 OLED display", "Vaporesso XROS 5 colors"],
  "vaporesso-xros-5-mini":  ["Vaporesso XROS 5 Mini pod kit"],
  "geekvape-hero-1-rte":    ["GeekVape Aegis Hero pod kit"],
  "geekvape-boost-le":      ["GeekVape Aegis Boost LE pod kit"],
  "geekvape-hero-3-classic":["GeekVape Aegis Hero 3 Classic pod kit"],
  "geekvape-hero-2-crystal":["GeekVape Aegis Hero 2 Crystal pod kit"],
  "geekvape-hero-2-new":    ["GeekVape Aegis Hero 2 pod kit", "GeekVape Hero 2 side view", "GeekVape Hero 2 colors"],
  "geekvape-hero-2-rte":    ["GeekVape Aegis Hero 2 RTE pod"],
  "geekvape-hero-5":        ["GeekVape Aegis Hero 5 pod kit", "GeekVape Hero 5 OLED", "GeekVape Hero 5 colors"],
  "geekvape-boost-2":       ["GeekVape Aegis Boost 2 B60 pod mod"],
  "geekvape-boost-3":       ["GeekVape Aegis Boost 3 pod mod", "GeekVape Boost 3 OLED screen", "GeekVape Boost 3 colors"],
  "xros-cart-04-2":         ["Vaporesso XROS cartridge 0.4 ohm 2ml"],
  "xros-cart-04-3":         ["Vaporesso XROS cartridge 0.4 ohm 3ml"],
  "xros-cart-06-2":         ["Vaporesso XROS cartridge 0.6 ohm 2ml"],
  "xros-cart-06-3":         ["Vaporesso XROS cartridge 0.6 ohm 3ml"],
  "xros-cart-08-2":         ["Vaporesso XROS cartridge 0.8 ohm 2ml"],
  "xros-cart-08-3":         ["Vaporesso XROS cartridge 0.8 ohm 3ml"],
  "xros-cart-10-2":         ["Vaporesso XROS cartridge 1.0 ohm 2ml"],
};

async function loadProducts() {
  const src = await readFile(join(ROOT, "lib", "products.ts"), "utf8");
  const items = [];
  const re =
    /\{\s*slug:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*name:\s*"[^"]+",\s*category:\s*"([^"]+)"([\s\S]*?)\n\s{2}\},/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    items.push({
      slug: m[1],
      brand: m[2],
      category: m[3],
      isHot: /isHot:\s*true/.test(m[4]),
      isNew: /isNew:\s*true/.test(m[4]),
    });
  }
  return items;
}

// ── Bing Images (HTML scrape, no API key) ────────────────────────────────
// Bing embeds each result's metadata as a JSON-escaped string in the
// m="..." attribute of class="iusc" anchors. We extract `murl` from each.
async function searchBing(query) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(
    query,
  )}&form=HDRSC2&first=1&tsc=ImageBasicHover`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "Accept-Language": "en-US,en;q=0.9",
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Bing HTTP ${res.status}`);
  const html = await res.text();
  const urls = [];
  const re = /m="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null && urls.length < 30) {
    const raw = m[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    try {
      const json = JSON.parse(raw);
      if (json.murl && typeof json.murl === "string" && json.murl.startsWith("http")) {
        urls.push(json.murl);
      }
    } catch {
      // not a JSON blob, skip
    }
  }
  return urls;
}

// ── DuckDuckGo Images (no API key, two-step) ─────────────────────────────
async function searchDuckDuckGo(query) {
  const r1 = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`,
    { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) },
  );
  if (!r1.ok) throw new Error(`DDG init HTTP ${r1.status}`);
  const html = await r1.text();
  const vqdMatch =
    html.match(/vqd=['"]?([\d-]+)['"]?/) || html.match(/vqd=([0-9-]+)&/);
  if (!vqdMatch) throw new Error("DDG: vqd token not found");
  const vqd = vqdMatch[1];

  const url = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(
    query,
  )}&vqd=${vqd}&f=,,,,,size:Large&p=1`;
  const r2 = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Referer: "https://duckduckgo.com/",
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!r2.ok) throw new Error(`DDG HTTP ${r2.status}`);
  const text = await r2.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("DDG: invalid JSON");
  }
  return (json.results ?? [])
    .map((r) => r.image)
    .filter((u) => typeof u === "string" && u.startsWith("http"));
}

async function findImageUrls(query) {
  const seen = new Set();
  const out = [];
  for (const fn of [searchBing, searchDuckDuckGo]) {
    try {
      const urls = await fn(query);
      for (const u of urls) {
        if (!seen.has(u)) {
          seen.add(u);
          out.push(u);
        }
      }
      if (out.length >= 15) break;
    } catch (e) {
      console.log(`    ${fn.name} failed: ${e.message.slice(0, 80)}`);
    }
  }
  return out;
}

async function downloadTo(url, file) {
  const u = new URL(url);
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8",
      Referer: u.origin,
    },
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`http ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) throw new Error(`not an image (${ct.slice(0, 30)})`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) throw new Error(`too small (${buf.length} B)`);
  if (buf.length > 4_000_000) {
    throw new Error(`too big (${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
  }
  await writeFile(file, buf);
  return buf.length;
}

function tsMap(entries) {
  const body = entries
    .map(([slug, paths]) => `  "${slug}": ${JSON.stringify(paths)},`)
    .join("\n");
  return `// Auto-generated by scripts/fetch-product-images.mjs — do not edit by hand.
// Maps product slug -> ordered array of paths under /public/.
// The first entry is the primary photo (used in cards). Additional entries
// are used by ProductGallery for multi-angle product detail pages.

export const PRODUCT_IMAGES: Record<string, string[]> = {
${body}
};
`;
}

function shortUrl(u) {
  try {
    const x = new URL(u);
    return x.hostname + x.pathname.slice(0, 40);
  } catch {
    return u.slice(0, 60);
  }
}

async function fetchProductImages(p, queries, wantedCount) {
  const targets = Array.from({ length: wantedCount }, (_, i) =>
    i === 0
      ? join(OUT_DIR, `${p.slug}.jpg`)
      : join(OUT_DIR, `${p.slug}-${i + 1}.jpg`),
  );
  const publicPaths = Array.from({ length: wantedCount }, (_, i) =>
    i === 0 ? `/products/${p.slug}.jpg` : `/products/${p.slug}-${i + 1}.jpg`,
  );

  if (!FORCE && targets.every((t) => existsSync(t))) {
    console.log(`[skip] ${p.slug} (already on disk)`);
    return publicPaths;
  }

  const downloaded = [];
  const usedUrls = new Set();
  for (let idx = 0; idx < wantedCount; idx++) {
    const q = queries[idx] ?? queries[0];
    console.log(`  [${idx + 1}/${wantedCount}] "${q}"`);
    const urls = await findImageUrls(q);
    let success = false;
    for (const url of urls) {
      if (usedUrls.has(url)) continue;
      try {
        const bytes = await downloadTo(url, targets[idx]);
        usedUrls.add(url);
        downloaded.push(publicPaths[idx]);
        console.log(
          `    ok <- ${shortUrl(url)} ${(bytes / 1024).toFixed(0)} KB`,
        );
        success = true;
        break;
      } catch {
        // Try next candidate
      }
    }
    if (!success) {
      console.log(`    MISS for "${q}"`);
      break; // don't keep adding angles if one fails
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return downloaded;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const products = await loadProducts();
  console.log(`Loaded ${products.length} products. FORCE=${FORCE}`);

  const map = {};
  let total = 0;
  let failed = 0;

  for (const p of products) {
    const wantedCount = p.isHot || p.isNew ? 3 : 1;
    const queries =
      QUERY_OVERRIDES[p.slug] ??
      [`${p.brand} ${p.category === "cartridge" ? "vape cartridge" : "vape"}`];
    console.log(`\n→ ${p.slug}  (${wantedCount} angle${wantedCount > 1 ? "s" : ""})`);
    try {
      const result = await fetchProductImages(p, queries, wantedCount);
      if (result.length > 0) {
        map[p.slug] = result;
        total += result.length;
      } else {
        failed++;
      }
    } catch (err) {
      console.error(`[err] ${p.slug}: ${err.message}`);
      failed++;
    }
  }

  const entries = Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  await writeFile(MAP_FILE, tsMap(entries));

  console.log(
    `\nDone. downloaded=${total} failed=${failed} products=${products.length}`,
  );
  console.log(`Map written to ${MAP_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

