import { BUTTONS } from './buttons.js';
import { notifySharerTabOpened } from '../../../utils/messaging.js';
import { getSafeFormatedSocialSharingURLs } from '../utils.js';

export { BUTTONS };

/**
 * Create a single sharing button anchor element from a button descriptor.
 * If a resolved `href` is provided the click handler is attached immediately.
 * @param {import('./social-button-config.js').ButtonDescriptor} btn
 * @param {string} [href] - Resolved share URL for this button.
 * @returns {HTMLAnchorElement}
 */
function createSocialButton(btn, href) {
    const a = document.createElement('a');
    a.className = 'sharing-buttons';
    a.id = btn.id;
    a.title = btn.title;

    if (btn.utility) {
        a.setAttribute('role', 'button');
        a.tabIndex = 0;
    }

    const img = document.createElement('img');
    img.decoding = 'async';
    img.src = `icons/svg/${btn.icon}.svg`;
    img.alt = btn.label;
    a.appendChild(img);

    // Copy button needs a "Copied !" span
    if (btn.id === 'url-copy') {
        const span = document.createElement('span');
        span.setAttribute('aria-live', 'polite');
        span.textContent = 'Copied !';
        a.appendChild(span);
    }

    if (href) {
        a.href = href;
        a.target = '_blank';
        a.addEventListener('click', event => {
            event.preventDefault();
            // Open the share URL in a new tab instead of navigating the popup.
            chrome.tabs.create({ url: event.currentTarget.href }).then((tab) => {
                // Tell the background script to track this tab so it can
                // auto-close it once the platform's sharing flow completes.
                notifySharerTabOpened(tab.id);
            });
            // Close the popup shortly after opening the share tab.
            window.setTimeout(() => window.close(), 10);
        });
    }

    return a;
}

/**
 * Render all sharing buttons into the given container element,
 * wiring up share URLs and click handlers in the same pass.
 * Also appends the QR code overlay markup.
 * @param {HTMLElement} container - The parent element to append buttons into.
 * @param {string} tabUrl - The URL of the active tab.
 * @param {string} tabTitle - The title of the active tab.
 * @param {string} [selectedText=''] - User-highlighted text on the page.
 * @returns {void}
 */
export function renderSocialButtons(container, tabUrl, tabTitle, selectedText = '') {
    const urlMap = Object.fromEntries(
        getSafeFormatedSocialSharingURLs(tabUrl, tabTitle, selectedText).map(b => [b.id, b.href])
    );

    for (const btn of BUTTONS) {
        container.appendChild(createSocialButton(btn, urlMap[btn.id]));
    }
}
