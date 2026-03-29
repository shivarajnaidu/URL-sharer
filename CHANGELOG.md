# Changelog

## v1.7.6 — Share URL Fixes, Brand Promotion & Cleanup

### Share URL Fixes
- Twitter/X: Updated from deprecated `twitter.com/share` to `x.com/intent/post`
- LinkedIn: Switched to `shareArticle` with `title`, `summary`, and `source` params
- Facebook: Added `quote` parameter to `sharer.php` for pre-filled share text
- Pinterest: Changed from `http://` to `https://`

### Brand Promotion
- Every share now appends a "Shared via URL-sharer" signature visible only to the recipient
- Signature stored as a constant (`BRAND_PROMOTION`) in `js/constants.js` for easy toggling
- WhatsApp uses a plain-text variant without emoji for compatibility

### Removed
- Removed Instagram — no web share API exists; button, CSS styles, share URL entry, and icon deleted
- Platform count updated to 14

## v1.7.5 — QR Code Enhancements & Layout Fixes

### QR Code
- Added download button to QR overlay — saves the QR code as `qrcode.png`
- Download button positioned top-left of the QR container, styled in primary colour with a download arrow icon

### Layout
- Set minimum height of `#popup-container` to always exceed the QR code image height
- Footer (about/review section) in the Share tab now sticks to the bottom of the panel

## v1.7.4 — ES Modules & Code Quality

### ES Module Migration
- Converted `background-script.js` to an ES module; added `"type": "module"` to manifest
- Replaced `<script src="js/bundle.js">` with `<script type="module" src="js/index.js">` — browser loads app code directly as ES modules
- QR code library (`qrcode`) lazy-loaded via dynamic `import()` on first click instead of eagerly bundled

### Build Changes
- Build step now only vendors the `qrcode` npm package into `js/vendor/qrcode.js` (ESM)
- Renamed build script from `build` to `build:vendor` to reflect its purpose
- Removed the full-app bundle (`js/bundle.js`); all app code served as native ES modules

### Documentation
- Added JSDoc-style comments with `@param`, `@returns`, and type annotations to every function across all JS files
- Added section comments and explanatory inline comments to `background-script.js`

## v1.7.3 — Review Prompt & Version Display

- Added subtle review prompt
- Review link auto-detects Firefox vs Chrome and opens the correct store page
- Added version number display in the Settings tab (pulled from manifest)


## v1.7.2 — Firefox Popup Fix

- Fixed popup collapsing to ~90px on Firefox desktop due to `100vw` media query override
- Moved `min-width` from `:root` to `#popup-container`
- Mobile media query now properly resets sizing for small screens

## v1.7.1 — Remove StumbleUpon

- Removed StumbleUpon (service shut down in 2018) — button, share URL, icon, and CSS removed
- Platform count updated to 15

## v1.7 — More Platforms, Dynamic Rendering & Polish

### New Platforms
- WhatsApp, Instagram, Telegram, Threads, Bluesky, Tumblr, Hacker News
- Buttons sorted by global popularity (WhatsApp first, legacy platforms last)

### Dynamic Rendering
- All sharing buttons now rendered from a central registry (`buttons.js`)
- No hardcoded button HTML — add/remove platforms by editing one array
- Settings and social modules import from the same registry

### Fixes
- Twitter/X brand color updated to black (`#000`) with proper hover
- LinkedIn given its own official blue (`#0A66C2`)
- StumbleUpon icon replaced with correct logo from Wikimedia Commons
- Telegram, Threads, Tumblr, Hacker News icons sourced from Wikimedia/Simple Icons
- Removed Pocket (service shut down July 2025)
- Footer separated from button grid into its own row

### Layout
- 6-column CSS Grid for sharing buttons

## v1.6 — Recent Shares & UI Overhaul

### New Features
- **Recent tab** — last 10 shared URLs stored locally via `browser.storage.local`
- **Clear All** button to wipe history
- **Settings tab** — toggle visibility of each sharing button (Facebook, Twitter, Reddit, etc.); preferences persist across sessions
- URLs saved only on sharing button click, not on popup open

### Accessibility
- ARIA roles on tabs (`tablist`, `tab`, `tabpanel`, `aria-selected`)
- `role="button"` + keyboard support on Copy/QR buttons
- `aria-live` on "Copied!" toast; `aria-label` on close/clear buttons
- `:focus-visible` outlines on all interactive elements
- Improved color contrast (WCAG AA)

### UI/UX
- Wider popup (450px), system font stack, per-brand hover colors
- Hover scale + shadow transitions, active press feedback
- Restyled "Copied!" tooltip, larger QR close target

### Code Quality
- CSS split into `layout.css`, `sharing.css`, `qr.css`, `recent.css`
- CSS custom properties (`:root`) for all shared values
- Consolidated focus-visible rule; DRY brand color declarations
- JS modules: `recent.js` (storage) + `recent-ui.js` (rendering)
- JS modules: `settings.js` (storage) + `settings-ui.js` (rendering)
