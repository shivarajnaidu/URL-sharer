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

import { initSocialButtons } from './modules/social.js';
import { initCopyButton } from './modules/copy.js';
import { initQRButton } from './modules/qr.js';

(function getCurrentTabUrl() {
    const queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo).then((tabs = []) => {
        if (tabs.length === 0) {
            return;
        }

        const tab = tabs[0] || {};
        const tabUrl = tab.url;
        const tabTitle = tab.title;

        initSocialButtons(tabUrl, tabTitle);
        initCopyButton(tabUrl);
        initQRButton(tabUrl);
    });
})();
