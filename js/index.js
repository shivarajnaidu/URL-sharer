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

;
(function () {
    'use strict';

    // Send Message To Background Script
    function sendMessage(tab) {
        const { id } = tab;
        browser.runtime.sendMessage({
            type: 'sharer-tab-id',
            data: { id }
        });
    }

    /*
     * Assign URLs To Respective Element
     */
    function urlAssigner(btn = {}) {
        const { id, href } = btn;
        const a = document.getElementById(id);
        a.href = href;
        a.target = '_blank';
        a.addEventListener('click', event => {
            event.preventDefault();
            const { href } = event.target;
            chrome.tabs.create({ url: href }, sendMessage)
            window.setTimeout(() => window.close(), 10)
        });
    }


    /* 
     * Make Copy Button  
     */
    const showAlertOnColied = () => {
        const copiedAlert = document.querySelector('#url-copy span');
        copiedAlert.style.display = 'inline';
        setTimeout(() => {
            copiedAlert.style.display = 'none';
        }, 2000);
    };

    const copyURL = (url) => {
        const input = document.querySelector('#url-copy > input');
        input.value = url;
        input.style.display = 'block';
        input.select();
        document.execCommand('copy');
        input.style.display = 'none';

        // Show/Hide Copied Text On Text Copy
        showAlertOnColied();
    };

    const makeCopyButton = (url) => {
        const btn = document.querySelector('#url-copy');
        btn.addEventListener('click', () => {
            copyURL(url);
        });
    }

    /*
     * Make Social Button Objects
     */

    function mkBtns(tabUrl = '', tabTitle = '') {

        const socialBtns = [];

        const facebook = {};
        facebook.href = `https://www.facebook.com/sharer.php?u=${tabUrl}`;
        facebook.id = 'url-facebook';
        socialBtns.push(facebook);

        const twitter = {};
        twitter.href = `https://twitter.com/share?url=${tabUrl}`;
        twitter.id = 'url-twitter';
        socialBtns.push(twitter);

        const reddit = {};
        reddit.href = `https://www.reddit.com/submit?url=${tabUrl}`;
        reddit.id = 'url-reddit';
        socialBtns.push(reddit);

        const linkedin = {};
        linkedin.href = `https://www.linkedin.com/shareArticle?url=${tabUrl}`;
        linkedin.id = 'url-linkedin';
        socialBtns.push(linkedin);

        const stumbleupon = {};
        stumbleupon.href = `http://www.stumbleupon.com/submit?url=${tabUrl}`;
        stumbleupon.id = 'url-stumbleupon';
        socialBtns.push(stumbleupon);

        const pinterest = {};
        pinterest.href = `http://pinterest.com/pin/create/button/?url=${tabUrl}`;
        pinterest.id = 'url-pinterest';
        socialBtns.push(pinterest);

        const email = {};
        email.href = `mailto:?subject=${tabTitle}&body=${tabUrl}`;
        email.id = 'url-email';
        socialBtns.push(email);

        socialBtns.forEach(urlAssigner);
    }

    ;
    (function getCurrentTabUrl() {
        const queryInfo = {
            active: true,
            currentWindow: true
        };

        chrome.tabs.query(queryInfo, (tabs = []) => {
            if (tabs.length === 0) {
                return;
            }

            const tab = (tabs[0] || {});
            const tabUrL = tab.url;
            const tabTitle = tab.title;
            mkBtns(tabUrL, tabTitle);
            makeCopyButton(tabUrL);
        });

        // End
    })();

})();