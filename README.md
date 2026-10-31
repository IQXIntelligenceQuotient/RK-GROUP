# RK Group website foundation

## Approved brand assets

Use the owner-supplied logos saved in `public/images/brand/` throughout the website. The combined logo is the primary header and footer identity; the symbol is used for favicon and app icons. The compact logo is an additional supplied reference. Its checkerboard background is baked into the RGB file, so do not assume it is transparent. Originals are preserved unchanged.

For future image-generation requests, use these exact assets as brand references. Preserve the logo artwork, colours, proportions and lettering. Generate images only when requested; do not invent alternative RK Group logos. Keep all services under the one RK Group brand.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm install
npm run dev
```

## Build and verify

```sh
npm run lint
npm run build
npm run verify:ssg
npm run preview
```

Build generates readable HTML for every route registered in src/data/routes.js, plus a 404 page. React hydrates this markup. Tailwind v4 uses the Vite plugin and CSS-first configuration in src/index.css; tailwind.config.js is a reference file. React DOM handles server rendering; Helmet is unnecessary.

## Before publishing

Copy .env.example to .env and set VITE_SITE_URL to the real production origin. The example domain deliberately produces noindex pages. The example domain keeps the website out of public indexing until the production origin and operational claims are approved. VITE_ variables are public: never place secrets in them.

## Homepage content and enquiries

The homepage implements the supplied RK Group content under one brand: hero, about, nine services, six facility types, approach, process, vision, quotation form, twelve FAQs, final call to action and footer. Navigation links use homepage anchors; no unimplemented service pages are linked.

The quotation form validates required fields, prepares a readable message locally, and offers a WhatsApp link. It does not submit data to a backend, send messages automatically, or claim that a quotation has been received. Visitors review and send the draft in WhatsApp. Telephone and direct WhatsApp links remain available without JavaScript. The privacy and terms dialogs describe this flow; the owner should review them before launch.

Update service, FAQ and industry data in src/data/. Future standalone pages need a React route plus registration in src/data/routes.js so build-time HTML is generated. Product availability, geographic coverage and waste-related permissions remain subject to confirmation.

## Photography sources

All photographs are illustrative stock, not RK Group premises, clients or operations. Owner-supplied logos are preserved under public/images/brand/.

- Commercial building: Zulfugar Karimov, Pexels, https://www.pexels.com/photo/modern-glass-office-building-surrounded-by-greenery-33719788/
- Cleaning materials: Jonathan Borba, Pexels, https://www.pexels.com/photo/close-up-of-cleaning-supplies-with-gloves-28576636/
- Floor cleaning: Andrea Piacquadio, Pexels, https://www.pexels.com/photo/male-employee-cleaning-floor-in-restaurant-3769711/

Register important new images in src/data/images.js. Use descriptive alt text, actual dimensions and lazy loading except for the hero.

## Hosting

Publish dist on a static host that serves directory index.html files and the generated 404.html with an HTTP 404 status. Avoid a blanket SPA fallback: new public routes must be prerendered. Rebuild whenever content changes. The Vite development server uses client rendering for fast development; verify crawlable content in the production dist output.

## Reference documentation

- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [React server rendering](https://react.dev/reference/react-dom/server/renderToString)
- [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot)

## Reference design update

The supplied UI reference guides the curved photographic hero, five-column pastel service cards, photographic sector cards, compact process band and dark footer. The quotation form, FAQs, approach and vision remain included. Manrope is hosted locally with its Open Font License under public/fonts/. Product category artwork is lightweight original SVG illustration, not a representation of specific stocked models.

Additional illustrative stock photographs: Pexels photos 15340130 (industrial facility), 14267571 (healthcare room) and 33762983 (retail mall). These are contextual images, not RK Group operations.

Office card: Pexels photo 8606292. Housing card: Pexels photo 35271111.

## Generated photographic assets

The latest supplied services/about/industries reference is implemented with nine generated service-category photographs and one generated branded lobby scene. Production WebP files are under public/images/services/*-photo.webp and public/images/home/rk-group-cleaning-lobby.webp. Full PNG originals, the corrected logo version and the built-in image_gen prompt record are saved under src/assets/images/generated/. Earlier SVG category assets are retained but are no longer used in the cards.

Generated images are illustrative marketing scenes, not evidence of actual stocked models, RK Group employees, customers or premises. Service descriptions and waste-scope qualifications remain authoritative. The about image was corrected using the approved supplied logo as a reference.

The contact banner uses a generated illustrative support scene: public/images/home/rk-group-support.webp. The original and generation prompt are retained in src/assets/images/generated/ and image-generation.json. Contact channels use confirmed phone and WhatsApp details; business hours, email and social accounts are omitted pending verification.
