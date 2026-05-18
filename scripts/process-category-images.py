"""
Downloads source category photos and removes their backgrounds using rembg.
Produces public/products/cat-*.png with transparent alpha.

Runs inside .github/workflows/process-category-images.yml; the sandbox can't
reach most CDNs directly so this lives in CI.
"""

import os
import sys
import urllib.request
from rembg import remove

URLS = {
    "cat-disposable": "https://bayvape.ca/cdn/shop/files/waka-sopro-dm8000i-strawberry-watermelon_800x.jpg?v=1699503246",
    "cat-pod": "https://store.vaporesso.com/cdn/shop/files/XROS3_LemonYellow_2.png?v=1763950530",
    "cat-cartridge": "https://store.vaporesso.com/cdn/shop/files/XROS_0.8_MESH_Pod-3ml_new.png?v=1761554021",
    "cat-liquid": "https://commons.wikimedia.org/wiki/Special:FilePath/CBD_Vape_Juice_(E-Liquid)_(24281909498).jpg?width=800",
    "cat-accessory": "https://splitted.space/wp-content/uploads/2025/11/white-coiled-type-c-cable-main.webp",
    "cat-sale": "https://commons.wikimedia.org/wiki/Special:FilePath/Price_Tag.png?width=800",
}

OUT_DIR = "public/products"
os.makedirs(OUT_DIR, exist_ok=True)

ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
failed: list[str] = []

for slug, url in URLS.items():
    out_path = os.path.join(OUT_DIR, f"{slug}.png")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": ua, "Accept": "image/*"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        print(f"  {slug}: downloaded {len(data)} bytes")
        out_bytes = remove(data)
        with open(out_path, "wb") as f:
            f.write(out_bytes)
        print(f"  {slug}: wrote {out_path} ({len(out_bytes)} bytes)")
    except Exception as e:
        print(f"  {slug}: FAILED {type(e).__name__}: {e}")
        failed.append(slug)

if failed:
    print(f"\n{len(failed)} failed: {failed}")
    sys.exit(1)
print("\nDone.")
