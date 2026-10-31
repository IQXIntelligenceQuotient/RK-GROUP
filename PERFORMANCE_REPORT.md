# Performance and footer logo update - 31 October 2026

## Implemented
- Regenerated an alpha-transparent footer logo with original emblem and RK wording, light GROUP/tagline for the dark footer. Removed the white CSS backing. Original supplied logo files are retained.
- Generated responsive compressed WebP variants for 34 existing photographs/decorations. A shared OptimizedImage component selects sizes through srcset/sizes and supplies actual intrinsic dimensions, async decoding, lazy loading and high priority for the hero.
- Original WebPs total 2,850,526 bytes; largest optimized variants total 1,046,694 bytes (63% smaller). This compares the same source asset set, not a network speed claim. Originals remain available.
- Removed the redundant Framer Motion hero import. The existing shared Web Animations observer continues to supply motion. Compressed JS reduced from approximately 140KB to 100KB.
- Subset Manrope to the site's Latin glyphs and WOFF2: 164,700 raw bytes to 27,776 bytes. Font display swap is retained; the font is preloaded in static HTML.
- Animation intersection callbacks now consume observer-provided rectangles; setup batches geometry reads before class/style writes, avoiding the previous read/write interleaving.
- Enlarged service/industry action touch targets and limited Tailwind source discovery to src.

## Measurements
Production preview, DPR 1: mobile 390px hero 30,124 bytes; desktop 1440px hero 67,998 bytes. Original hero in the supplied report was approximately 375KiB. Traversal resource image payloads: mobile 321,118 bytes / desktop 690,898 bytes (before final footer recompression from 48,362 to 21,982 bytes). No broken images, request failures, console errors or horizontal overflow observed. Five-width animation/form/FAQ/anchor/reduced-motion checks passed.

A fresh pre-change live mobile Lighthouse run measured performance 50, FCP 5.4s, LCP 7.6s, TBT 310ms, CLS 0.003 and total bytes 1552KiB. Single synthetic runs vary with host/network conditions; post-deployment results should be compared on the same live URL. Raw QA reports are under .qa/ and gitignored.

## Hosting constraint
Live GitHub Pages asset response returned Cache-Control: max-age=600. Repository _headers files cannot configure this hosting response. This update reduces bytes and uses new/hashed asset paths; it does not claim to fix the host-controlled cache TTL. Longer HTTP cache lifetimes require hosting/CDN support. No service-worker workaround or hosting migration is introduced.

## Verification and scope
Build, lint, static HTML/SEO/subpath checks passed; metadata/OG image remain intact. Footer transparency confirmed as RGBA alpha 0-255 and computed CSS background rgba(0,0,0,0). No design or business-content rewrite. Full source images and the generated-logo prompt remain in src/assets/images/generated. Image variants and WOFF2 are committed, so CI needs no Python image/font dependencies. Physical low-end mobile devices remain untested.

## Verified live post-deployment audit
Same public URL, Lighthouse mobile configuration, one run before and one after:
| Metric | Before | After |
|---|---:|---:|
| Performance score |50|64|
| FCP |5.4s|4.2s|
| LCP |7.6s|4.6s|
| TBT |310ms|290ms|
| CLS |0.003|0.003|
| Transfer bytes |1552KiB|487KiB|
The optimized local preview scored 88, but that is a different hosting environment and is not the reported live score. These are synthetic single runs, not field measurements or a guarantee. The result is improved but still below a 90+ target; remaining render/startup costs and the Pages cache TTL are disclosed rather than hidden. Live footer transparency, optimized hero selection, loaded font and no page errors/overflow were verified. A final source-discovery restriction to JSX alone also reduced the compressed stylesheet from 32.49KB to 32.25KB; no additional score increase is claimed for that small follow-up.

Follow-up: verified the footer remains transparent on the public site. Enabled Lightning CSS 1.32.0 minification, reducing compressed CSS from 32.25KB to 31.58KB. Clean npm ci, build, lint and static HTML checks passed in a separate source export. This is a small additional byte reduction; no new Lighthouse score is claimed.
