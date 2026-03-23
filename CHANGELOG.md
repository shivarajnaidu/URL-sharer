# Changelog

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
