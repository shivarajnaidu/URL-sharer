# URL-sharer

Share Everything You Want To Share.

A browser extension to quickly share the current page URL on social networks, via email, copy to clipboard, or as a QR code.

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

`npm install` automatically runs the build step (`postinstall`), which bundles the QR code library into `js/qrcode.min.js` from `node_modules`. This file is gitignored and must be generated locally.

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
manifest.json          # Extension manifest (v2)
index.html             # Popup UI (inline SVG icons)
background-script.js   # Background script
js/
  index.js             # Popup logic (sharing buttons, copy, QR)
  qrcode.min.js        # Auto-generated QR code bundle (gitignored)
css/
  sharer.css           # Popup styles
icons/                 # Extension icons
```

## Publishing

### Chrome Web Store

1. Ensure `npm install` has been run (so `js/qrcode.min.js` exists)
2. Create a zip of the extension files (excluding dev/build files):
   ```bash
   zip -r url-sharer.zip manifest.json index.html background-script.js js/ css/ fonts/ icons/ -x "js/qrcode.min.js"
   ```
   Then add the built file:
   ```bash
   zip url-sharer.zip js/qrcode.min.js
   ```
   Or simply zip everything needed in one step:
   ```bash
   zip -r url-sharer.zip manifest.json index.html background-script.js js/index.js js/qrcode.min.js css/ icons/
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