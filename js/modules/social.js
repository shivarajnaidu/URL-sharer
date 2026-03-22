/*
 * Send Message To Background Script
 */
export function sendMessage(type, data) {
    chrome.runtime.sendMessage({ type, data });
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
        const href = event.currentTarget.href;
        chrome.tabs.create({ url: href }).then((tab) => {
            sendMessage('sharer-tab-id', { id: tab.id });
        });
        window.setTimeout(() => window.close(), 10);
    });
}

/*
 * Make Social Button Objects
 */
export function initSocialButtons(tabUrl = '', tabTitle = '') {
    const socialBtns = [
        { id: 'url-facebook', href: `https://www.facebook.com/sharer.php?u=${tabUrl}` },
        { id: 'url-twitter', href: `https://twitter.com/share?url=${tabUrl}` },
        { id: 'url-reddit', href: `https://www.reddit.com/submit?url=${tabUrl}` },
        { id: 'url-linkedin', href: `https://www.linkedin.com/shareArticle?url=${tabUrl}` },
        { id: 'url-stumbleupon', href: `http://www.stumbleupon.com/submit?url=${tabUrl}` },
        { id: 'url-pinterest', href: `http://pinterest.com/pin/create/button/?url=${tabUrl}` },
        { id: 'url-email', href: `mailto:?subject=${tabTitle}&body=${tabUrl}` },
    ];

    socialBtns.forEach(urlAssigner);
}
