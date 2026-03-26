/** @constant {string} Storage key for the review-prompt state. */
const REVIEW_KEY = 'reviewPrompt';

/**
 * Return the appropriate review URL for the current browser.
 * @returns {string} Review page URL (Firefox Add-ons or Chrome Web Store).
 */
function getReviewUrl() {
    console.log(browser.runtime)
    const isFirefox = typeof browser !== 'undefined' && browser.runtime?.id;
    return isFirefox
        ? 'https://addons.mozilla.org/en-US/firefox/addon/url-sharer/reviews/'
        : 'https://chrome.google.com/webstore/detail/url-sharer/efbabpfmnagdngganefofhopnoddbmae/reviews';
}

/**
 * Initialise the review prompt.
 * Tracks how many times the popup has been opened. After 3+ uses the
 * review link is shown. Once clicked, it is permanently dismissed.
 * @returns {Promise<void>}
 */
export async function initReviewPrompt() {
    const { [REVIEW_KEY]: data = {} } = await chrome.storage.local.get(REVIEW_KEY);

    // User already clicked the review link — never show again
    if (data.dismissed) return;

    // Increment usage count
    const count = (data.count || 0) + 1;
    await chrome.storage.local.set({ [REVIEW_KEY]: { ...data, count } });

    // Show only after 3+ uses
    if (count < 3) return;

    const link = document.getElementById('review-link');
    if (!link) return;

    link.href = getReviewUrl();
    link.classList.remove('hidden');

    link.addEventListener('click', async () => {
        await chrome.storage.local.set({ [REVIEW_KEY]: { ...data, count, dismissed: true } });
    });
}
