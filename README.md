# URL-sharer

Share Everything You Want To Share.

A browser extension to quickly share the current page URL on social networks, via email, copy to clipboard, or as a QR code — with a built-in recent shares history and customizable button visibility.

## Features

- **Share** the current tab URL on Facebook, Twitter, Reddit, LinkedIn, StumbleUpon, Pinterest, or via Email
- **Copy** the URL (with optional selected text) to clipboard
- **QR Code** overlay for the current page
- **Recent tab** — keeps the last 10 shared URLs in local storage (no server, no sync)
- **Settings tab** — toggle which sharing buttons are visible; preferences persist across sessions
- Full keyboard navigation and screen-reader support (ARIA roles, focus-visible outlines)

## Install

### Firefox
https://addons.mozilla.org/en-US/firefox/addon/url-sharer/

### Google Chrome
https://chrome.google.com/webstore/detail/url-sharer/efbabpfmnagdngganefofhopnoddbmae?hl=en

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js)

### Setup

```bash
git clone https://github.com/shivarajnaidu/URL-sharer.git
cd URL-sharer
npm install
```

`npm install` automatically runs the build step (`postinstall`), which bundles `js/index.js` and its modules into `js/bundle.js` via esbuild.

To rebuild manually at any time:

```bash
npm run build
```

### Load the extension in your browser

**Chrome / Edge / Brave:**
1. Go to `chrome://extensions` (or `edge://extensions`, `brave://extensions`)
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `URL-sharer` project folder

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file in the project folder

After loading, click the extension icon in the toolbar to open the popup.

### Project structure

```
manifest.json            # Extension manifest (v3)
index.html               # Popup UI (three tabs: Share, Recent, Settings)
background-script.js     # Background service worker
js/
  index.js               # Entry point — initializes tabs, sharing, recent, settings
  bundle.js              # Auto-generated esbuild bundle (gitignored)
  modules/
    social.js            # Social sharing button URLs and click handlers
    copy.js              # Copy-to-clipboard logic
    qr.js                # QR code overlay
    selection.js         # Get selected text from active tab
    recent.js            # Recent shares storage (chrome.storage.local)
    recent-ui.js         # Recent tab rendering and clear button
    settings.js          # Button visibility storage (chrome.storage.local)
    settings-ui.js       # Settings tab rendering and toggle handlers
css/
  layout.css             # CSS variables, popup container, tab bar
  sharing.css            # Social button styles, brand colors, about section
  qr.css                 # QR code overlay styles
  recent.css             # Recent list styles
  settings.css           # Settings toggle list styles
icons/                   # Extension icons and SVG social icons
```

## Publishing

### Chrome Web Store

1. Ensure `npm install` has been run (so `js/bundle.js` exists)
2. Create a zip of the extension files:
   ```bash
   zip -r url-sharer.zip manifest.json index.html background-script.js js/bundle.js css/ icons/
   ```
3. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
4. Upload `url-sharer.zip`
5. Fill in listing details and submit for review

### Firefox Add-ons (AMO)

1. Ensure `npm install` has been run
2. Create a zip the same way as above
3. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/)
4. Submit the zip for review

> **Note:** Bump the `version` in both `manifest.json` and `package.json` before publishing a new release.

## Contributing

Any contributions are appreciated.

## Sponsor

If you find this extension useful, consider supporting the project:

[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-pink?logo=github)](https://github.com/sponsors/shivarajnaidu/)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/shivarajnaidu)

## License

This Program is Licensed under GPL v3.
Copyright (C) 2016 – present yuvaraj (aka shivaraj).
See [LICENSE](LICENSE) for more information.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.