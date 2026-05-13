# Real product photos

Drop product images here (e.g. `duall-salt.jpg`, `waka-8000.png`).

Then in `lib/products.ts` add an `image` field to that product:

```ts
{
  slug: "duall-salt",
  brand: "DUALL",
  name: "DUALL SALT",
  image: "/products/duall-salt.jpg",  // <-- this line
  ...
}
```

The `ProductVisual` component will automatically use the real photo
when `image` is set, otherwise it falls back to the generated SVG silhouette.

Recommended specs:
- Aspect ratio: 4:5 (or 1:1)
- Resolution: 800×1000 minimum
- Format: WebP, JPG (background can be transparent on PNG)
- File size: keep under 200KB per image
