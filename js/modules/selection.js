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
