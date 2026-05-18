"""
Downloads source category photos and removes their backgrounds using rembg.
Produces public/products/cat-*.png with transparent alpha.

Runs inside .github/workflows/process-category-images.yml; the sandbox can't
reach most CDNs directly so this lives in CI.
"""

import os
import sys
import time
import urllib.request
import urllib.error
from rembg import remove

URLS = {
    "cat-disposable": "https://bayvape.ca/cdn/shop/files/waka-sopro-dm8000i-strawberry-watermelon_800x.jpg?v=1699503246",
    "cat-pod": "https://store.vaporesso.com/cdn/shop/files/XROS3_LemonYellow_2.png?v=1763950530",
    "cat-cartridge": "https://store.vaporesso.com/cdn/shop/files/XROS_0.8_MESH_Pod-3ml_new.png?v=1761554021",
    "cat-liquid": "https://commons.wikimedia.org/wiki/Special:FilePath/CBD_Vape_Juice_(E-Liquid)_(24281909498).jpg?width=800",
    "cat-accessory": "https://splitted.space/wp-content/uploads/2025/11/white-coiled-type-c-cable-main.webp",
    # cat-sale is intentionally NOT fetched — public/products/cat-sale.svg
    # is hand-written inline (deterministic, brand-free, no rembg needed).
}

OUT_DIR = "public/products"
os.makedirs(OUT_DIR, exist_ok=True)

# Wikimedia requires a descriptive User-Agent identifying the app + contact.
UA = "tyag-moskva-category-thumbs/1.0 (https://github.com/artemskiwh/q2; build via GitHub Actions) Python-urllib"


def fetch(url: str, max_attempts: int = 4) -> bytes:
    delay = 2
    last_err: Exception | None = None
    for attempt in range(max_attempts):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*"})
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            last_err = e
            if e.code == 429 or e.code >= 500:
                print(f"    attempt {attempt + 1}: HTTP {e.code}, sleeping {delay}s")
                time.sleep(delay)
                delay *= 2
                continue
            raise
        except Exception as e:
            last_err = e
            print(f"    attempt {attempt + 1}: {type(e).__name__}: {e}, sleeping {delay}s")
            time.sleep(delay)
            delay *= 2
    raise RuntimeError(f"giving up after {max_attempts} attempts") from last_err


failed: list[str] = []

for slug, url in URLS.items():
    out_path = os.path.join(OUT_DIR, f"{slug}.png")
    try:
        data = fetch(url)
        print(f"  {slug}: downloaded {len(data)} bytes")
        out_bytes = remove(data)
        with open(out_path, "wb") as f:
            f.write(out_bytes)
        print(f"  {slug}: wrote {out_path} ({len(out_bytes)} bytes)")
    except Exception as e:
        print(f"  {slug}: FAILED {type(e).__name__}: {e}")
        failed.append(slug)
    # Be polite to upstreams between downloads.
    time.sleep(1)

if failed:
    print(f"\n{len(failed)} failed: {failed}")
    sys.exit(1)
print("\nDone.")
