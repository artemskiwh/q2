import { withBasePath } from "@/lib/path";
import { Reveal } from "./Reveal";

const PHOTOS = ["g1.jpg", "g2.jpg", "g3.jpg", "g4.jpg", "g5.jpg", "g6.jpg"];

/**
 * LETH-style auto-scrolling photo strip. Every frame is the same size
 * (uniform square), the row loops seamlessly and pauses on hover.
 */
export function Gallery() {
  const loop = [...PHOTOS, ...PHOTOS];

  return (
    <section id="gallery" className="relative overflow-hidden py-20 md:py-28">
      <Reveal>
        <h2 className="section-title">Атмосфера</h2>
        <p className="section-sub mx-auto mt-4 max-w-md">
          Коктейли, свет и вечера ICON
        </p>
      </Reveal>

      <div className="gallery-strip mt-14">
        <div className="gallery-track">
          {loop.map((p, i) => (
            <figure key={i} className="gallery-item">
              <img
                src={withBasePath(`/gallery/${p}`)}
                alt="Атмосфера ICON"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
