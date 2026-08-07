/**
 * AnimatedHero — Home hero with subtle mouse-parallax depth.
 *
 * The first React island on the site; previously this hero lived as static
 * markup in `src/pages/index.astro`. Now the content + the parallax effect
 * are colocated in this component, mounted on the home page with
 * `client:load` (above-fold; should animate immediately).
 *
 * Each layer declares its depth via `data-depth` (px). On pointermove the
 * pointer is normalized to [-1, 1] relative to the hero-grid center; a
 * rAF loop lerps the current offset toward the target and writes
 * `transform: translate3d(...)` to every `[data-depth]` element. Layers
 * closer to the foreground move less; the art slot (back layer) moves
 * the most.
 *
 * Layer map:
 *   - hero-art          data-depth="10"   (back)
 *   - hero-eyebrow      data-depth="6"    (mid)
 *   - hero-headline     data-depth="6"    (mid)
 *   - hero-lede         data-depth="3"    (front)
 *   - hero-actions      data-depth="3"    (front)
 *   - hero-trust        data-depth="2"    (front-most)
 *
 * Disabled under `prefers-reduced-motion` and on viewports <768px (touch-
 * primary; pointermove is too coarse to feel right under a thumb).
 *
 * Cite: DESIGN.md §4 (home hero), §10 (motion principles — subtle, optional,
 * never decorative).
 */
import { useEffect, useRef } from 'react';
import { getImage } from 'astro:assets';
import designJpg from '@/assets/photos/design.jpg';
import '@/styles/hero.css';

const LERP = 0.1;

// Build-time image optimization (WebP + responsive widths). Astro's <Image>
// is an Astro component and can't be rendered from React JSX, so we
// resolve the optimized URLs here and render a plain <img>.
const designImg = await getImage({
  src: designJpg,
  format: 'webp',
  widths: [400, 800, 1200],
});

export default function AnimatedHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 768px)');
    if (reduceMotion.matches || !wide.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const clampUnit = (n: number) => Math.max(-1, Math.min(1, n));

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      target.x = clampUnit(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      target.y = clampUnit(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    let raf = 0;
    const tick = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      const layers = root.querySelectorAll<HTMLElement>('[data-depth]');
      layers.forEach((el) => {
        const depth = Number(el.dataset.depth ?? 0);
        const tx = current.x * depth;
        const ty = current.y * depth;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="container-phx">
          <div className="hero-grid" ref={rootRef}>
            <div className="hero-content">
              <p className="hero-eyebrow" data-depth="6">
                Phuriwaj Ruengnaowaroj
              </p>
              <h1 className="hero-headline" data-depth="6">
                Writing about web craft, design systems, and the occasional deep dive.
              </h1>
              <p className="hero-lede" data-depth="3">
                A developer and designer thinking out loud about how interfaces
                communicate — from component APIs to the grammar hiding in our
                design tokens. Based in Bangkok, working on tooling for design
                systems at scale.
              </p>
              <div className="hero-actions" data-depth="3">
                <a className="hero-btn hero-btn-primary" href="/garden">
                  Open the Garden
                </a>
                <a className="hero-btn hero-btn-outline" href="/essays">
                  Read the latest essay
                </a>
              </div>
              <p className="hero-trust" data-depth="2">
                Built with — Astro, Tailwind, MDX, Space Grotesk, Inter, JetBrains Mono
              </p>
            </div>
            <div className="hero-art" data-depth="10">
              <img
                src={designImg.src}
                srcSet={designImg.srcSet.attribute}
                sizes="(min-width: 1024px) 800px, 100vw"
                alt="Vintage letterpress type case filled with metal letterforms"
                loading="lazy"
                decoding="async"
                className="tp-img"
              />
            </div>
          </div>
        </div>
    </section>
  );
}