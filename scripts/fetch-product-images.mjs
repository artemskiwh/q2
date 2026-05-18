// Fetches real product photos via Exa Search and uploads them to Cloudinary.
// Triggered from .github/workflows/exa-fetch.yml.
//
// Requires env vars:
//   EXA_API_KEY     – Exa Search API key
//   CLOUDINARY_URL  – cloudinary://api_key:api_secret@cloud_name

import Exa from "exa-js";
import { v2 as cloudinary } from "cloudinary";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const MAP_FILE = path.join(ROOT, "lib", "product-images.ts");

if (!process.env.EXA_API_KEY) throw new Error("Missing EXA_API_KEY");

// Cloudinary is optional — if the URL is missing or cloud_name is invalid,
// we fall back to storing the raw Exa URLs directly (they're already on
// reliable e-commerce CDNs).
const useCloudinary = !!process.env.CLOUDINARY_URL;
if (useCloudinary) {
  cloudinary.config(process.env.CLOUDINARY_URL);
}
const exa = new Exa(process.env.EXA_API_KEY);

// Catalogue mirrors lib/products.ts. One photo per product — multi-angle
// requests overwrote hand-curated single-photo selections, so we keep
// `hero: false` for everything and let manual edits in product-images.ts
// stick. Only products without a cached entry get refetched.
const PRODUCTS = [
  { slug: "duall-salt",            hero: false, queries: ["DUALL SALT single disposable vape device isolated white background"] },
  { slug: "waka-8000",             hero: false, queries: ["WAKA SMASH 8000 puffs disposable vape product photo"] },
  { slug: "waka-20000",            hero: false, queries: ["WAKA soPro PA20000 single device front view white background"] },
  { slug: "waka-25000",            hero: false, queries: ["WAKA PA25000 single disposable vape one device white background"] },
  { slug: "waka-60000",            hero: false, queries: ["WAKA soMatch MB60000 disposable vape product photo"] },
  { slug: "fizzy-great-10000",     hero: false, queries: ["FIZZY Great 10000 disposable vape product photo"] },
  { slug: "elfbar-monnight-25000", hero: false, queries: ["ELFBAR Moonnight 25000 puffs disposable vape"] },
  { slug: "geekbar-40000",         hero: false, queries: ["Geek Bar Pulse 40000 puffs disposable vape product photo"] },
  { slug: "geekbar-50000",         hero: false, queries: ["Geek Bar 50000 puffs disposable vape product photo"] },
  { slug: "vozol-shisha-25000",    hero: false, queries: ["VOZOL Shisha 25000 disposable vape product photo"] },
  { slug: "bubble-mon-30000",      hero: false, queries: ["Bubble Mon 30000 disposable vape product photo"] },
  { slug: "puffmi-pure-12000",     hero: false, queries: ["Puffmi Pure 12000 disposable vape product photo"] },
  { slug: "laiska-queen-10000",    hero: false, queries: ["Laiska Queen 10000 disposable vape product"] },
  { slug: "vaporesso-xros-mini",   hero: false, queries: ["Vaporesso XROS Mini pod system white background"] },
  { slug: "vaporesso-xros-3-mini", hero: false, queries: ["Vaporesso XROS 3 Mini pod system white background"] },
  { slug: "vaporesso-xros-4",      hero: false, queries: ["Vaporesso XROS 4 pod kit white background"] },
  { slug: "vaporesso-xros-4-mini", hero: false, queries: ["Vaporesso XROS 4 Mini pod system white background"] },
  { slug: "vaporesso-xros-5",      hero: false, queries: ["Vaporesso XROS 5 pod kit white background"] },
  { slug: "vaporesso-xros-5-mini", hero: false, queries: ["Vaporesso XROS 5 Mini pod system white background"] },
  { slug: "geekvape-boost-le",     hero: false, queries: ["Geekvape Aegis Boost LE pod mod product photo"] },
  { slug: "geekvape-hero-3-classic", hero: false, queries: ["Geekvape Wenax Hero 3 Classic pod product photo"] },
  { slug: "geekvape-hero-2-new",   hero: false, queries: ["Geekvape Wenax Hero 2 pod product photo"] },
  { slug: "geekvape-hero-5",       hero: false, queries: ["Geekvape Wenax Hero 5 pod product photo"] },
  { slug: "geekvape-boost-2",      hero: false, queries: ["Geekvape Aegis Boost 2 B60 pod mod product photo"] },
  { slug: "geekvape-boost-3",      hero: false, queries: ["Geekvape Aegis Boost 3 pod mod product photo"] },
  // Category thumbnails — minimalist, brand-free product photography.
  { slug: "cat-disposable",        hero: false, queries: ["sleek disposable vape pen device isolated minimalist studio photography no brand"] },
  { slug: "cat-pod",               hero: false, queries: ["refillable pod vape system minimalist product photography white background no logo"] },
  { slug: "cat-cartridge",         hero: false, queries: ["empty vape pod cartridge isolated minimalist studio photo white background"] },
  { slug: "cat-liquid",            hero: false, queries: ["clear glass dropper bottle e-liquid amber minimalist isolated white background"] },
  { slug: "cat-accessory",         hero: false, queries: ["coiled usb-c charging cable minimalist product photography white background"] },
  { slug: "cat-sale",              hero: false, queries: ["red sale tag price label minimalist product photography studio shot"] },
];

// ───── Helpers ───────────────────────────────────────────────────────
const looksLikeImage = (u) =>
  typeof u === "string" &&
  /^https?:\/\//.test(u) &&
  !/logo|favicon|sprite|placeholder|icon-/i.test(u);

// GitHub Pages is https — rewrite any http:// source URLs to avoid mixed-content blocks.
const toHttps = (u) => (typeof u === "string" ? u.replace(/^http:\/\//, "https://") : u);

async function searchImage(query) {
  try {
    const res = await exa.searchAndContents(query, {
      type: "auto",
      numResults: 8,
      text: false,
      highlights: false,
    });
    for (const item of res.results ?? []) {
      const candidate = typeof item.image === "string" ? item.image : item.image?.url;
      if (candidate && looksLikeImage(candidate)) return candidate;
    }
    return null;
  } catch (e) {
    console.error(`  exa error for "${query}":`, e.message);
    return null;
  }
}

async function uploadHosted(remoteUrl, slug, angle) {
  remoteUrl = toHttps(remoteUrl);
  if (!useCloudinary) {
    return remoteUrl;
  }
  const publicId = angle ? `tyag/${slug}_${angle}` : `tyag/${slug}`;
  try {
    const result = await cloudinary.uploader.upload(remoteUrl, {
      public_id: publicId,
      overwrite: true,
      eager: [
        { width: 900, height: 900, crop: "pad", background: "white", quality: "auto", fetch_format: "auto" },
      ],
    });
    return result.eager?.[0]?.secure_url ?? result.secure_url;
  } catch (e) {
    console.error(`  cloudinary error for ${publicId}, falling back to source:`, e.message);
    return remoteUrl;
  }
}

// ───── Preserve existing entries ─────────────────────────────────────
async function loadExisting() {
  try {
    const src = await readFile(MAP_FILE, "utf8");
    const m = src.match(/PRODUCT_IMAGES\s*:\s*Record<[^>]+>\s*=\s*(\{[\s\S]*?\});/);
    if (!m) return {};
    return new Function(`return ${m[1]}`)();
  } catch {
    return {};
  }
}

// ───── Main ──────────────────────────────────────────────────────────
async function main() {
  const force = process.argv.includes("--force");
  const out = await loadExisting();

  for (const p of PRODUCTS) {
    const wantAngles = p.hero ? 3 : 1;
    const existingUrls = Array.isArray(out[p.slug]) ? out[p.slug] : [];
    // Treat local "/products/foo.jpg" entries as user-curated and never re-fetch them.
    if (!force && existingUrls.length >= wantAngles && existingUrls.every((u) => u.startsWith("https://") || u.startsWith("/"))) {
      console.log(`✓ ${p.slug} (cached, ${existingUrls.length} angles)`);
      continue;
    }

    console.log(`\n→ ${p.slug} (${wantAngles} angles)`);
    const urls = [];
    for (let i = 0; i < wantAngles; i++) {
      const query = p.queries[i] ?? p.queries[0];
      const img = await searchImage(query);
      if (!img) {
        console.log(`  [${i + 1}] no image for "${query}"`);
        continue;
      }
      console.log(`  [${i + 1}] source: ${img.slice(0, 100)}${img.length > 100 ? "..." : ""}`);
      const hosted = await uploadHosted(img, p.slug, i === 0 ? null : i + 1);
      if (hosted) {
        urls.push(hosted);
        console.log(`  [${i + 1}] hosted: ${hosted}`);
      }
    }
    if (urls.length > 0) out[p.slug] = urls;
  }

  const body = `// Auto-generated by scripts/fetch-product-images.mjs — do not edit by hand.
// Maps product slug -> ordered array of Cloudinary URLs.
// Run via: Actions → "Fetch product images (Exa + Cloudinary)" → Run workflow.

export const PRODUCT_IMAGES: Record<string, string[]> = ${JSON.stringify(out, null, 2)};
`;
  await writeFile(MAP_FILE, body);
  console.log(`\nWrote ${Object.keys(out).length} mappings to ${MAP_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
