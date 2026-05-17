// Fetches real product photos via Exa Search and hosts them on Cloudinary.
// Runs in GitHub Actions (the sandbox has no outbound network).
//
// Required env vars (read from GitHub Secrets):
//   EXA_API_KEY        – your Exa API key (https://dashboard.exa.ai)
//   CLOUDINARY_URL     – cloudinary://api_key:api_secret@cloud_name
//   (or three separate vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
//
// Flags:
//   --force            re-fetch even if mapping already has a URL for the slug
//   --only=slug1,slug2 only fetch listed slugs

import { writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const ROOT = process.cwd();
const MAP_FILE = path.join(ROOT, "lib", "product-images.ts");

// ───── Cloudinary credentials ─────────────────────────────────────────
function parseCloudinary() {
  const url = process.env.CLOUDINARY_URL;
  if (url) {
    const m = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (!m) throw new Error("CLOUDINARY_URL malformed");
    return { apiKey: m[1], apiSecret: m[2], cloudName: m[3] };
  }
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary env. Set CLOUDINARY_URL or the 3 separate vars.");
  }
  return { cloudName, apiKey, apiSecret };
}

const cld = parseCloudinary();
const EXA_KEY = process.env.EXA_API_KEY;
if (!EXA_KEY) throw new Error("Missing EXA_API_KEY env");

// ───── Catalogue with handcrafted queries ─────────────────────────────
// For HOT/NEW products we want 3 angles → 3 distinct queries (front / hand / case).
const PRODUCTS = [
  { slug: "duall-salt",                brand: "DUALL",     name: "DUALL SALT",                  isHot: true,  queries: ["DUALL SALT vape product photo", "DUALL SALT vape side view", "DUALL SALT vape device"] },
  { slug: "waka-8000",                 brand: "WAKA",      name: "WAKA 8000 puffs",             isHot: true,  queries: ["WAKA SMASH 8000 puffs disposable vape", "WAKA SMASH 8000 vape side view", "WAKA SMASH 8000 vape device"] },
  { slug: "waka-20000",                brand: "WAKA",      name: "WAKA 20000 puffs",            isNew: true,  queries: ["WAKA soPro PA20000 disposable vape", "WAKA 20000 puffs vape side view", "WAKA 20000 vape box"] },
  { slug: "waka-25000",                brand: "WAKA",      name: "WAKA 25000 puffs",            isNew: true,  queries: ["WAKA soPro PA25000 vape", "WAKA 25000 puffs vape side view", "WAKA 25000 puffs vape product"] },
  { slug: "waka-60000",                brand: "WAKA",      name: "WAKA 60000 puffs",            isHot: true,  queries: ["WAKA soMatch MB60000 vape", "WAKA 60000 puffs vape side view", "WAKA soMatch vape device"] },
  { slug: "fizzy-great-10000",         brand: "FIZZY",     name: "FIZZY Great 10000",                          queries: ["FIZZY Great 10000 disposable vape product photo"] },
  { slug: "elfbar-monnight-25000",     brand: "ELFBAR",    name: "ELFBAR Monnight 25000",       isHot: true,  queries: ["ELFBAR Moonnight 25000 puffs disposable vape", "ELFBAR Moonnight 25000 vape side", "ELFBAR Moonnight 25000 vape screen"] },
  { slug: "geekbar-32000",             brand: "GEEKBAR",   name: "GEEKBAR 32000",                              queries: ["Geek Bar 32000 puffs disposable vape product photo"] },
  { slug: "geekbar-40000",             brand: "GEEKBAR",   name: "GEEKBAR 40000",                              queries: ["Geek Bar Pulse 40000 puffs disposable vape"] },
  { slug: "geekbar-50000",             brand: "GEEKBAR",   name: "GEEKBAR 50000",               isHot: true,  queries: ["Geek Bar 50000 puffs disposable vape product photo", "Geek Bar 50000 side view", "Geek Bar 50000 vape device"] },
  { slug: "vozol-shisha-25000",        brand: "VOZOL",     name: "Vozol Shisha 25000",                         queries: ["Vozol Shisha 25000 disposable vape product photo"] },
  { slug: "bubble-mon-30000",          brand: "BUBBLE MON",name: "Bubble Mon 30000",            isNew: true,  queries: ["Bubble Mon 30000 disposable vape", "Bubble Mon 30000 vape side view", "Bubble Mon 30K vape product"] },
  { slug: "puffmi-pure-12000",         brand: "PUFFMI",    name: "Puffmi Pure 12000",                          queries: ["Puffmi Pure 12000 disposable vape product photo"] },
  { slug: "laiska-queen-10000",        brand: "LAISKA",    name: "Laiska Queen 10000",                         queries: ["Laiska Queen 10000 disposable vape product"] },
  { slug: "vaporesso-xros-mini",       brand: "VAPORESSO", name: "XROS Mini",                                  queries: ["Vaporesso XROS Mini pod system product photo"] },
  { slug: "vaporesso-xros-3-mini",     brand: "VAPORESSO", name: "XROS 3 Mini",                                queries: ["Vaporesso XROS 3 Mini pod system product photo white background"] },
  { slug: "vaporesso-xros-4",          brand: "VAPORESSO", name: "XROS 4",                      isNew: true,  queries: ["Vaporesso XROS 4 pod kit product photo", "Vaporesso XROS 4 side view", "Vaporesso XROS 4 pod kit colors"] },
  { slug: "vaporesso-xros-4-mini",     brand: "VAPORESSO", name: "XROS 4 Mini",                                queries: ["Vaporesso XROS 4 Mini pod system product photo"] },
  { slug: "vaporesso-xros-5",          brand: "VAPORESSO", name: "XROS 5",                      isNew: true,  queries: ["Vaporesso XROS 5 pod kit product photo", "Vaporesso XROS 5 side view", "Vaporesso XROS 5 colors"] },
  { slug: "vaporesso-xros-5-mini",     brand: "VAPORESSO", name: "XROS 5 Mini",                                queries: ["Vaporesso XROS 5 Mini pod system product photo"] },
  { slug: "xros-cart-04-2",            brand: "VAPORESSO", name: "XROS cartridge 0.4 Ω · 2 ml",                queries: ["Vaporesso XROS replacement pod cartridge 0.4 ohm 2ml"] },
  { slug: "xros-cart-04-3",            brand: "VAPORESSO", name: "XROS cartridge 0.4 Ω · 3 ml",                queries: ["Vaporesso XROS replacement pod cartridge 0.4 ohm 3ml"] },
  { slug: "xros-cart-06-2",            brand: "VAPORESSO", name: "XROS cartridge 0.6 Ω · 2 ml",                queries: ["Vaporesso XROS replacement pod cartridge 0.6 ohm 2ml"] },
  { slug: "xros-cart-06-3",            brand: "VAPORESSO", name: "XROS cartridge 0.6 Ω · 3 ml",                queries: ["Vaporesso XROS replacement pod cartridge 0.6 ohm 3ml"] },
  { slug: "xros-cart-08-2",            brand: "VAPORESSO", name: "XROS cartridge 0.8 Ω · 2 ml",                queries: ["Vaporesso XROS replacement pod cartridge 0.8 ohm 2ml"] },
  { slug: "xros-cart-08-3",            brand: "VAPORESSO", name: "XROS cartridge 0.8 Ω · 3 ml",                queries: ["Vaporesso XROS replacement pod cartridge 0.8 ohm 3ml"] },
  { slug: "xros-cart-10-2",            brand: "VAPORESSO", name: "XROS cartridge 1.0 Ω · 2 ml",                queries: ["Vaporesso XROS replacement pod cartridge 1.0 ohm 2ml"] },
  { slug: "geekvape-hero-1-rte",       brand: "GEEK VAPE", name: "Hero 1 RTE",                                 queries: ["Geekvape Wenax Hero 1 RTE pod product photo"] },
  { slug: "geekvape-boost-le",         brand: "GEEK VAPE", name: "Boost LE",                                   queries: ["Geekvape Aegis Boost LE pod mod product photo"] },
  { slug: "geekvape-hero-3-classic",   brand: "GEEK VAPE", name: "Hero 3 Classic",                             queries: ["Geekvape Wenax Hero 3 Classic pod product photo"] },
  { slug: "geekvape-hero-2-crystal",   brand: "GEEK VAPE", name: "Hero 2 Crystal",                             queries: ["Geekvape Wenax Hero 2 Crystal pod product photo"] },
  { slug: "geekvape-hero-2-new",       brand: "GEEK VAPE", name: "Hero 2 (new)",                isNew: true,  queries: ["Geekvape Wenax Hero 2 pod product photo", "Geekvape Wenax Hero 2 side view", "Geekvape Wenax Hero 2 colors"] },
  { slug: "geekvape-hero-2-rte",       brand: "GEEK VAPE", name: "Hero 2 RTE",                                 queries: ["Geekvape Wenax Hero 2 RTE pod product photo"] },
  { slug: "geekvape-hero-5",           brand: "GEEK VAPE", name: "Hero 5",                      isNew: true,  queries: ["Geekvape Wenax Hero 5 pod product photo", "Geekvape Wenax Hero 5 side view", "Geekvape Wenax Hero 5 colors"] },
  { slug: "geekvape-boost-2",          brand: "GEEK VAPE", name: "Boost 2 (B60)",                              queries: ["Geekvape Aegis Boost 2 B60 pod mod product photo"] },
  { slug: "geekvape-boost-3",          brand: "GEEK VAPE", name: "Boost 3",                     isNew: true, isHot: true, queries: ["Geekvape Aegis Boost 3 pod mod product photo", "Geekvape Aegis Boost 3 side view", "Geekvape Aegis Boost 3 colors"] },
];

// ───── Exa search ────────────────────────────────────────────────────
async function exaSearch(query) {
  const res = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: { "x-api-key": EXA_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      numResults: 8,
      type: "auto",
      contents: { extras: { imageLinks: 5 } },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Exa search ${res.status}: ${t.slice(0, 200)}`);
  }
  const json = await res.json();
  return json.results ?? [];
}

function pickImageUrl(exaResults) {
  // Each result may carry `extras.imageLinks` (Exa) and `image` (OG image).
  // Strategy: gather all candidates, drop tiny/icon URLs, prefer .jpg/.png/.webp.
  const candidates = [];
  for (const r of exaResults) {
    if (r.image) candidates.push(r.image);
    if (r.extras?.imageLinks?.length) candidates.push(...r.extras.imageLinks);
  }
  // Heuristics: skip logos/icons, prefer URLs with "product" or proper extension
  const looksGood = (u) =>
    /^https?:\/\//.test(u) &&
    !/logo|favicon|icon|sprite|placeholder/i.test(u) &&
    /\.(jpe?g|png|webp)(\?|$)/i.test(u);

  return candidates.find(looksGood) ?? candidates[0] ?? null;
}

// ───── Cloudinary signed remote fetch ────────────────────────────────
function sha1(str) {
  return createHash("sha1").update(str).digest("hex");
}

async function cloudinaryUpload(remoteUrl, slug, angle) {
  const publicId = angle ? `tyag/${slug}_${angle}` : `tyag/${slug}`;
  const timestamp = Math.floor(Date.now() / 1000);

  // Apply white background + auto-crop transformation on the master copy
  // so all product photos look uniform on the site.
  const eager = "c_pad,h_900,w_900,b_white,f_auto,q_auto";

  const paramsToSign = `eager=${eager}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}`;
  const signature = sha1(paramsToSign + cld.apiSecret);

  const form = new URLSearchParams();
  form.set("file", remoteUrl);
  form.set("api_key", cld.apiKey);
  form.set("timestamp", String(timestamp));
  form.set("public_id", publicId);
  form.set("eager", eager);
  form.set("overwrite", "true");
  form.set("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cld.cloudName}/image/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Cloudinary ${res.status}: ${txt.slice(0, 300)}`);
  }
  const json = await res.json();
  // Prefer the eager transformed URL so the visible image is already padded white.
  return json.eager?.[0]?.secure_url ?? json.secure_url;
}

// ───── Existing mapping (preserve cached entries) ────────────────────
async function loadExistingMap() {
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
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice("--only=".length).split(",") : null;

  const existing = await loadExistingMap();
  const out = { ...existing };

  for (const p of PRODUCTS) {
    if (only && !only.includes(p.slug)) continue;
    if (!force && out[p.slug]?.length && out[p.slug].every((u) => u.startsWith("https://"))) {
      console.log(`✓ ${p.slug} (cached)`);
      continue;
    }

    const wantAngles = (p.isHot || p.isNew) ? 3 : 1;
    const urls = [];
    console.log(`\n→ ${p.slug} (${wantAngles} angle${wantAngles > 1 ? "s" : ""})`);

    for (let i = 0; i < wantAngles; i++) {
      const q = p.queries[i] ?? p.queries[0];
      try {
        const results = await exaSearch(q);
        const img = pickImageUrl(results);
        if (!img) {
          console.log(`  [${i + 1}] no image for query "${q}"`);
          continue;
        }
        console.log(`  [${i + 1}] source: ${img}`);
        const hosted = await cloudinaryUpload(img, p.slug, i === 0 ? null : i + 1);
        urls.push(hosted);
        console.log(`  [${i + 1}] hosted: ${hosted}`);
      } catch (e) {
        console.log(`  [${i + 1}] error: ${e.message}`);
      }
    }

    if (urls.length > 0) {
      out[p.slug] = urls;
    }
  }

  const body = `// Auto-generated by scripts/fetch-product-images-exa.mjs — do not edit by hand.
// Maps product slug -> ordered array of Cloudinary URLs (Exa Search results, processed
// through Cloudinary remote-fetch for consistent white-padded thumbnails).

export const PRODUCT_IMAGES: Record<string, string[]> = ${JSON.stringify(out, null, 2)};
`;
  await writeFile(MAP_FILE, body);
  console.log(`\nWrote mapping for ${Object.keys(out).length} products to ${MAP_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
