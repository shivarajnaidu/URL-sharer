import { notifySharerTabOpened } from '../../utils/messaging.js';

/**
 * Assign a sharing URL to a button element, opening it in a new tab
 * on click and notifying the background script of the new tab ID.
 * @param {Object} btn - A button descriptor.
 * @param {string} btn.id - The DOM element ID of the button.
 * @param {string} btn.href - The sharing URL to open.
 * @returns {void}
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
            notifySharerTabOpened(tab.id);
        });
        window.setTimeout(() => window.close(), 10);
    });
}

/**
 * Initialise all social-sharing buttons by building their share URLs
 * and attaching click handlers that open the URL in a new tab.
 * @param {string} [tabUrl=''] - The URL of the active tab.
 * @param {string} [tabTitle=''] - The title of the active tab.
 * @param {string} [selectedText=''] - User-highlighted text on the page.
 * @returns {void}
 */
export function initSocialButtons(tabUrl = '', tabTitle = '', selectedText = '') {
    const shareText = selectedText
        ? `"${selectedText}" — ${tabTitle}`
        : tabTitle;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(tabUrl);
    const encodedTitle = encodeURIComponent(tabTitle);

    const socialBtns = [
        { id: 'url-whatsapp', href: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
        { id: 'url-facebook', href: `https://www.facebook.com/sharer.php?u=${encodedUrl}` },
        { id: 'url-instagram', href: `https://www.instagram.com/` },
        { id: 'url-twitter', href: `https://twitter.com/share?url=${encodedUrl}&text=${encodedText}` },
        { id: 'url-telegram', href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
        { id: 'url-linkedin', href: `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedText}` },
        { id: 'url-reddit', href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}` },
        { id: 'url-pinterest', href: `http://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}` },
        { id: 'url-threads', href: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}` },
        { id: 'url-bluesky', href: `https://bsky.app/intent/compose?text=${encodedText}%20${encodedUrl}` },
        { id: 'url-tumblr', href: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${encodedText}` },
        { id: 'url-hackernews', href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedText}` },
        { id: 'url-email', href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A${encodedUrl}` },
    ];

    socialBtns.forEach(urlAssigner);
}
