#!/usr/bin/env node
/**
 * Fetches BRAND-SPECIFIC product photos and saves them under public/products/.
 * Also writes lib/product-images.ts mapping each slug -> array of paths
 * (so ProductGallery can show 1-3 different angles for popular items).
 *
 * Two-tier strategy:
 *  1. If GOOGLE_API_KEY + GOOGLE_CSE_ID are set, use Google Custom Search
 *     (image search) — returns actual brand product photos from retailers.
 *  2. If those aren't set OR a Google query fails / returns nothing, fall
 *     back to Unsplash (UNSPLASH_ACCESS_KEY) — generic vape photos, but
 *     keeps the workflow from failing.
 *
 * Run locally:
 *   GOOGLE_API_KEY=xxx GOOGLE_CSE_ID=yyy UNSPLASH_ACCESS_KEY=zzz \
 *     node scripts/fetch-product-images.mjs
 *
 * Quotas: Google CSE free tier = 100 queries/day. We do 1 query per product
 *   (36 queries), plenty of headroom. Unsplash demo = 50 req/h.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "products");
const MAP_FILE = join(ROOT, "lib", "product-images.ts");

const GOOGLE_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CSE = process.env.GOOGLE_CSE_ID;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
const HAS_GOOGLE = !!(GOOGLE_KEY && GOOGLE_CSE);
const HAS_UNSPLASH = !!UNSPLASH_KEY;

if (!HAS_GOOGLE && !HAS_UNSPLASH) {
  console.error(
    "ERROR: need at least one of (GOOGLE_API_KEY+GOOGLE_CSE_ID) or UNSPLASH_ACCESS_KEY.",
  );
  process.exit(1);
}

console.log(
  `Sources enabled: ${[
    HAS_GOOGLE ? "google-cse" : null,
    HAS_UNSPLASH ? "unsplash" : null,
  ]
    .filter(Boolean)
    .join(", ")}`,
);

const FORCE = process.argv.includes("--force");

// Brand-specific query per product. Used by both Google CSE and Unsplash.
const QUERY_OVERRIDES = {
  "duall-salt":             "Duall Salt disposable vape device",
  "waka-8000":              "WAKA 8000 puffs disposable vape",
  "waka-20000":             "WAKA 20000 puffs disposable vape",
  "waka-25000":             "WAKA 25000 puffs disposable vape",
  "waka-60000":             "WAKA 60000 puffs disposable vape",
  "elfbar-monnight-25000":  "Elf Bar Moonnight 25000 disposable",
  "geekbar-32000":          "Geek Bar 32000 puffs disposable",
  "geekbar-40000":          "Geek Bar 40000 puffs disposable",
  "geekbar-50000":          "Geek Bar 50000 puffs disposable",
  "vozol-shisha-25000":     "Vozol Shisha 25000 disposable vape",
  "bubble-mon-30000":       "Bubble Mon 30000 disposable vape",
  "puffmi-pure-12000":      "Puffmi Pure 12000 disposable vape",
  "laiska-queen-10000":     "Laiska Queen 10000 disposable vape",
  "fizzy-great-10000":      "Fizzy Great 10000 disposable vape",
  "vaporesso-xros-mini":    "Vaporesso XROS Mini pod kit",
  "vaporesso-xros-3-mini":  "Vaporesso XROS 3 Mini pod kit",
  "vaporesso-xros-4":       "Vaporesso XROS 4 pod kit",
  "vaporesso-xros-4-mini":  "Vaporesso XROS 4 Mini pod kit",
  "vaporesso-xros-5":       "Vaporesso XROS 5 pod kit",
  "vaporesso-xros-5-mini":  "Vaporesso XROS 5 Mini pod kit",
  "geekvape-hero-1-rte":    "GeekVape Hero 1 RTE pod kit",
  "geekvape-boost-le":      "GeekVape Aegis Boost LE pod",
  "geekvape-hero-3-classic":"GeekVape Hero 3 Classic pod kit",
  "geekvape-hero-2-crystal":"GeekVape Hero 2 Crystal pod kit",
  "geekvape-hero-2-new":    "GeekVape Hero 2 pod kit",
  "geekvape-hero-2-rte":    "GeekVape Hero 2 RTE pod",
  "geekvape-hero-5":        "GeekVape Hero 5 pod kit",
  "geekvape-boost-2":       "GeekVape Aegis Boost 2 B60 pod mod",
  "geekvape-boost-3":       "GeekVape Aegis Boost 3 pod mod",
  "xros-cart-04-2":         "Vaporesso XROS cartridge 0.4 ohm 2ml",
  "xros-cart-04-3":         "Vaporesso XROS cartridge 0.4 ohm 3ml",
  "xros-cart-06-2":         "Vaporesso XROS cartridge 0.6 ohm 2ml",
  "xros-cart-06-3":         "Vaporesso XROS cartridge 0.6 ohm 3ml",
  "xros-cart-08-2":         "Vaporesso XROS cartridge 0.8 ohm 2ml",
  "xros-cart-08-3":         "Vaporesso XROS cartridge 0.8 ohm 3ml",
  "xros-cart-10-2":         "Vaporesso XROS cartridge 1.0 ohm 2ml",
};

const CATEGORY_FALLBACK = {
  disposable: "disposable vape device",
  pod:        "pod system vape",
  cartridge:  "vape cartridge replacement",
  sale:       "disposable vape",
  liquid:     "e-liquid bottle vape",
  accessory:  "vape accessory",
};

async function loadProducts() {
  const src = await import("node:fs").then((m) =>
    m.promises.readFile(join(ROOT, "lib", "products.ts"), "utf8"),
  );
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

function buildQuery(product) {
  if (QUERY_OVERRIDES[product.slug]) return QUERY_OVERRIDES[product.slug];
  const cat = CATEGORY_FALLBACK[product.category] ?? "vape device";
  return `${product.brand} ${cat}`;
}

// ── Source 1: Google Custom Search Engine (image search) ──────────────────
async function searchGoogle(query, n) {
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", GOOGLE_KEY);
  url.searchParams.set("cx", GOOGLE_CSE);
  url.searchParams.set("q", query);
  url.searchParams.set("searchType", "image");
  url.searchParams.set("imgSize", "large");
  url.searchParams.set("safe", "active");
  url.searchParams.set("num", String(Math.min(n, 10)));
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google CSE ${res.status}: ${body.slice(0, 200)}`);
  }
  const json = await res.json();
  return (json.items ?? []).map((i) => ({ link: i.link, source: "google" }));
}

// ── Source 2: Unsplash (fallback) ─────────────────────────────────────────
async function searchUnsplash(query, n) {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", "portrait");
  url.searchParams.set("per_page", String(Math.min(n, 10)));
  url.searchParams.set("content_filter", "high");
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`Unsplash ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.results ?? []).map((p) => ({
    link: p.urls.regular,
    source: "unsplash",
  }));
}

async function findCandidates(query, n) {
  const out = [];
  if (HAS_GOOGLE) {
    try {
      const r = await searchGoogle(query, n);
      out.push(...r);
    } catch (e) {
      console.log(`  google-cse failed (${e.message.slice(0, 80)})`);
    }
  }
  // Always also pull from Unsplash if available — used when Google
  // candidates fail to download.
  if (HAS_UNSPLASH && out.length < n) {
    try {
      const r = await searchUnsplash(query, n);
      out.push(...r);
    } catch (e) {
      console.log(`  unsplash failed (${e.message.slice(0, 80)})`);
    }
  }
  return out;
}

async function downloadTo(url, file) {
  // Retailer CDNs often reject default Node UA; pretend to be a browser.
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`http ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) throw new Error(`not an image (${ct})`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error(`too small (${buf.length} B)`);
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

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const products = await loadProducts();
  console.log(`Loaded ${products.length} products`);

  const map = {};
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const p of products) {
    const wantedCount = p.isHot || p.isNew ? 3 : 1;
    const targets = Array.from({ length: wantedCount }, (_, i) =>
      i === 0
        ? join(OUT_DIR, `${p.slug}.jpg`)
        : join(OUT_DIR, `${p.slug}-${i + 1}.jpg`),
    );
    const publicPaths = Array.from({ length: wantedCount }, (_, i) =>
      i === 0 ? `/products/${p.slug}.jpg` : `/products/${p.slug}-${i + 1}.jpg`,
    );

    if (!FORCE && targets.every((t) => existsSync(t))) {
      map[p.slug] = publicPaths;
      skipped++;
      console.log(`[skip] ${p.slug} (already on disk)`);
      continue;
    }

    const query = buildQuery(p);
    try {
      // Fetch extra candidates to survive CDN bot-blocks.
      const candidates = await findCandidates(query, wantedCount + 6);
      const ok = [];
      for (const c of candidates) {
        if (ok.length >= wantedCount) break;
        const idx = ok.length;
        const target = targets[idx];
        try {
          const bytes = await downloadTo(c.link, target);
          ok.push(publicPaths[idx]);
          console.log(
            `[ok]   ${p.slug}#${idx + 1} (${c.source}) <- ${shortUrl(c.link)} ${(bytes / 1024).toFixed(0)} KB`,
          );
        } catch (err) {
          console.log(`[try]  ${p.slug}#${idx + 1} (${c.source}) skipped: ${err.message}`);
        }
      }
      if (ok.length === 0) {
        console.warn(`[miss] ${p.slug} — all candidates failed for "${query}"`);
        failed++;
      } else {
        map[p.slug] = ok;
        downloaded += ok.length;
      }
    } catch (err) {
      console.error(`[fail] ${p.slug}: ${err.message}`);
      failed++;
    }
  }

  const entries = Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  await writeFile(MAP_FILE, tsMap(entries));

  console.log(
    `\nDone. downloaded=${downloaded} skipped=${skipped} failed=${failed} products=${products.length}`,
  );
  console.log(`Map written to ${MAP_FILE}`);
}

function shortUrl(u) {
  try {
    const url = new URL(u);
    return url.hostname + url.pathname.slice(0, 40);
  } catch {
    return u.slice(0, 60);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
