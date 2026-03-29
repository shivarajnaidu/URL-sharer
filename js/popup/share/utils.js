/**
 * Get the user's selected (highlighted) text from the active tab
 * using the `chrome.scripting` API.
 * @returns {Promise<string>} The selected text, or an empty string if none.
 */
export async function getSelectedText() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return '';

    try {
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString().trim(),
        });
        return results?.[0]?.result || '';
    } catch {
        return '';
    }
}

/**
 * Build the text payload to share.
 * If the user highlighted text, the result is a formatted quote followed by
 * the page title and URL; otherwise just the URL is returned.
 * @param {string} selectedText - Highlighted text on the page (may be empty).
 * @param {string} tabTitle - The active tab's title.
 * @param {string} tabUrl - The active tab's URL.
 * @returns {string} The assembled share text.
 */
export function buildShareText(selectedText, tabTitle, tabUrl) {
    if (selectedText) {
        return `"${selectedText}" — ${tabTitle} ${tabUrl}`;
    }
    return tabUrl;
}


/**
 * Build a safe, encoded list of share URLs for all social buttons.
 * Encodes the tab URL, title, and optional selected text, then returns
 * a resolved URL for each social platform.
 * Utility buttons (Copy, QR) are excluded.
 *
 * @param {string} tabUrl - The URL of the active tab.
 * @param {string} tabTitle - The title of the active tab.
 * @param {string} [selectedText=''] - User-highlighted text on the page.
 * @returns {{ id: string, href: string }[]} Array of button ID + resolved share URL pairs.
 */
export function getSafeFormatedSocialSharingURLs(tabUrl, tabTitle, selectedText = '') {
    const shareText = selectedText
        ? `"${selectedText}" — ${tabTitle}`
        : tabTitle;
    const encodedUrl = encodeURIComponent(tabUrl);
    const encodedText = encodeURIComponent(shareText);
    const encodedTitle = encodeURIComponent(tabTitle);

    return [
        {
            id: 'url-whatsapp',
            href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        },
        {
            id: 'url-facebook',
            href: `https://www.facebook.com/sharer.php?u=${encodedUrl}`
        },
        {
            id: 'url-twitter',
            href: `https://x.com/intent/post?text=${encodedText}%20${encodedUrl}`
        },
        {
            id: 'url-telegram',
            href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
        },
        {
            id: 'url-linkedin',
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`
        },
        {
            id: 'url-reddit',
            href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`
        },
        {
            id: 'url-pinterest',
            href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`
        },
        {
            id: 'url-threads',
            href: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`
        },
        {
            id: 'url-bluesky',
            href: `https://bsky.app/intent/compose?text=${encodedText}%20${encodedUrl}`
        },
        {
            id: 'url-tumblr',
            href: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${encodedText}`
        },
        {
            id: 'url-hackernews',
            href: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedText}`
        },
        {
            id: 'url-email',
            href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A${encodedUrl}`
        },
    ];
}



/**
 * Detect the current browser environment.
 * @returns {Promise<'firefox' | 'chrome' | 'unknown'>}
 */
export async function getBrowser() {
    if (typeof browser !== 'undefined' && browser.runtime?.getBrowserInfo) {
        return 'firefox';
    }

    if (typeof chrome !== 'undefined' && chrome.runtime) {
        return 'chrome';
    }
    return 'unknown';
}
