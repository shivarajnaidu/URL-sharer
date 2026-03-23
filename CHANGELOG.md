# Changelog

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
