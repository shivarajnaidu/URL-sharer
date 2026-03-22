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
export function initSocialButtons(tabUrl = '', tabTitle = '', selectedText = '') {
    const shareText = selectedText
        ? `"${selectedText}" — ${tabTitle}`
        : tabTitle;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(tabUrl);
    const encodedTitle = encodeURIComponent(tabTitle);

    const socialBtns = [
        { id: 'url-facebook', href: `https://www.facebook.com/sharer.php?u=${encodedUrl}` },
        { id: 'url-twitter', href: `https://twitter.com/share?url=${encodedUrl}&text=${encodedText}` },
        { id: 'url-reddit', href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}` },
        { id: 'url-linkedin', href: `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedText}` },
        { id: 'url-stumbleupon', href: `http://www.stumbleupon.com/submit?url=${encodedUrl}&title=${encodedText}` },
        { id: 'url-pinterest', href: `http://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}` },
        { id: 'url-email', href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A${encodedUrl}` },
    ];

    socialBtns.forEach(urlAssigner);
}
