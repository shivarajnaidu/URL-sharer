/*
Copyright (c) 2016 yuvaraj
This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { renderButtons } from './share/buttons.js';
import { initSocialButtons } from './share/social.js';
import { initCopyButton } from './share/copy.js';
import { initQRButton } from './share/qr.js';
import { getSelectedText } from './share/selection.js';
import { initRecentTab } from './recent/recent-ui.js';
import { initSettingsTab } from './settings/settings-ui.js';
import { initReviewPrompt } from './share/review.js';
import { saveRecentUrlViaBackground } from '../utils/messaging.js';

/**
 * Wire up the tab-switching UI.
 * Adds click listeners to `.tab-btn` elements that toggle the active
 * tab panel (via `data-tab` / `tab-<name>` ID convention).
 * @returns {void}
 */
function initTabs() {
    const btns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => p.classList.add('hidden'));
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
        });
    });
}

/**
 * Main entry point — runs when the popup is opened.
 * Queries the active tab, renders sharing buttons, initialises every
 * module (social links, copy, QR, recent, settings, review), and
 * displays the extension version.
 * @returns {Promise<void>}
 */
(async function init() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    const tabUrl = tab.url;
    const tabTitle = tab.title;
    const selectedText = await getSelectedText();

    // Render buttons from central registry
    const container = document.getElementById('social-sharing-link-container-layout');
    renderButtons(container);

    initSocialButtons(tabUrl, tabTitle, selectedText);
    initCopyButton(tabUrl, selectedText, tabTitle);
    initQRButton(tabUrl);

    // Delegate saving to the background script so storage writes
    // survive even if the popup closes before the write completes.
    document.getElementById('social-sharing-link-container-layout')
        .addEventListener('click', (e) => {
            if (e.target.closest('.sharing-buttons')) {
                saveRecentUrlViaBackground(tabUrl, tabTitle);
            }
        });

    initTabs();
    initRecentTab();
    await initSettingsTab();
    await initReviewPrompt();

    // Show version from manifest
    const versionEl = document.getElementById('version-number');
    if (versionEl) {
        versionEl.textContent = chrome.runtime.getManifest().version;
    }
})();
