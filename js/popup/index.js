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

import { initShareTab } from './share/index.js';
import { initTabHeaders } from './tab-header-ui.js';
import { initRecentTab } from './recent/recent-ui.js';
import { initSettingsTab } from './settings/settings-ui.js';


/**
 * Main entry point — runs when the popup is opened.
 * Queries the active tab, renders sharing buttons, initialises every
 * module (social links, copy, QR, recent, settings, review), and
 * displays the extension version.
 * @returns {Promise<void>}
 */
async function init() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    const tabUrl = tab.url;
    const tabTitle = tab.title;

    initTabHeaders();
    await initShareTab(tabUrl, tabTitle);
    initRecentTab();
    initSettingsTab();
}


init();
