# Animation repair report - 31 October 2026

Confirmed causes:
- The previous observer started opacity at zero after content had entered view, allowing visible-to-hidden flashes during anchors or fast scrolling.
- The reveal target list included both copy containers and nested features, allowing compounded motion.
- Card hover combined transform translateY(-3px) and a separate translate lift; both were measured active in Chromium.
- Callback-local stagger indexing restarted on each observer batch. 230ms delays and 1000ms durations made sequence timing inconsistent.
- The typing component cleared the full server-rendered word after hydration. It is no longer mounted; the new brief requests scroll-linked colour.
- Vision colour had both CSS keyframe and JavaScript animation owners.

Repairs:
- One shared reveal observer; one-time WeakSet tracking; initially visible/anchor-restored content never hidden.
- Pre-entry observation (100px below viewport) starts ordinary reveals before they are painted in view. Fast jumps skip hiding already-visible content and cancel pending effects.
- No global hidden-content classes, permanent compositor hints, looping backgrounds or paragraph-by-paragraph state updates.
- Reveal translate/scale is separate from hover transform. No simultaneous parent/child reveal targets.
- Cards: 760ms, 110ms desktop / 75ms mobile stagger, capped at 440ms. Images: 900ms. Heading groups: 720ms. Supporting text: 650ms. CTA: 620ms. Icons: 500ms.
- FAQ retains native details behaviour, 300ms content expansion and one entrance for its container. No form inputs are animated/remounted.
- Healthier uses a semantic scroll-gradient word, cached dimensions and one rAF-throttled motion listener. Reduced motion shows the complete green word.
- Floating back-to-top state only updates when its visibility threshold changes.

Vision finding:
The asset URL and wrapper dimensions were valid. No genuine missing image was reproduced. It loaded with simulated delayed responses, and appeared in settled full-page captures. Its original image is retained.

Verification:
Build, lint and static HTML/SEO/subpath checks passed. Chromium tested at 1440, 1280, 768, 390 and 320px. Slow/fast traversal, reverse/repeated scrolling, anchor refresh, Back/Forward, FAQ expansion, preserved form input values, reduced motion, delayed WebP requests (+180ms), no-JavaScript HTML and full-page capture were exercised. No page errors, overflow, invisible settled targets or repeat card animations were observed. Hover measured transform -5px with translate none. Healthier progress measured 0% -> 89.55% -> 0%. No simultaneously animated nested targets were found in the dedicated check. No-JS output retains the H1 and 12 FAQ details.

Measured lab results (single runs, not field CWV or FPS guarantees):
| Width | Observed CLS | Long tasks | Maximum task ms | Vision width px |
|---|---:|---:|---:|---:|
|1440|0.0017|2|107|639|
|1280|0.0019|2|324|559|
|768|0.0023|1|80|680|
|390|0.0230|1|80|358|
|320|0.0052|1|79|288|
Long tasks include initial hydration and test activity. No before/after performance improvement is claimed.

Files changed:
- src/components/common/PresentationEffects.jsx
- src/components/common/FloatingActions.jsx
- src/pages/Home.jsx
- src/main.jsx
- src/motion-repair.css
- ANIMATION_REPAIR_REPORT.md

Artifacts: .qa/motion-results.json, .qa/motion-extra-results.json, .qa/repaired-1440.png and .qa/repaired-390.png (gitignored). Full-page screenshots inspected after traversal and image/font settling; interactive scrolling checked separately.

Limits: physical iOS/Android and low-end devices were not tested. These checks do not rule out every intermittent glitch. Initially visible content deliberately skips entrance hiding to prevent hydration flashes.

## Follow-up verification of the re-uploaded brief
The uploaded brief was identical to the previous request. Two coverage gaps were found and closed: process heading/intro targets were absent from the shared selector, and the initial hero entrance had been omitted to avoid a hydration flash. The hero now uses a short translate-only text entrance with opacity always 1, plus a gentle photograph scale. Anchor-restored visits skip this initial sequence; reduced-motion users skip it. Process headings use the existing one-time observer. No design/content changes.

Repeated lab run at 1440/1280/768/390/320px passed the same interaction, visibility and overflow checks. Observed CLS: 0.0017, 0.0019, 0.0023, 0.0233, 0.0052 respectively. Long-task counts: 3/3/3/3/2; largest tasks: 553/138/157/118/138ms. These include startup work on a shared Windows host, and show why no fixed frame-rate claim is made. Delayed vision image loading, no-JS H1/12 FAQ details, single-property hover and scroll-colour reversal passed again. Follow-up files: PresentationEffects.jsx and this report.

## Visible in-viewport trigger refinement
On explicit reapplication, the pre-entry margin was found to let some reveals finish before users saw them. Changed to the brief's threshold 0.12 and bottom root margin -6%. Normal scrolling now visibly reveals content inside the viewport. The fast-jump bypass uses a short 200ms guard after large scroll deltas rather than skipping all content above 72% viewport height. Initial/anchor-restored content remains readable. Browser sampling observed cards at y=803-806px in a 900px viewport with duration 760ms and delays 0/110/220/330/440ms; 21 animation samples were captured and zero cards replayed on reverse scrolling. All five responsive regression scenarios passed again. Latest observed CLS remains 0.0017-0.0233; physical device/FPS limitations still apply.
