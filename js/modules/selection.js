/*
 * Get selected text from the active tab using chrome.scripting API
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

/*
 * Build share text with optional selected quote
 */
export function buildShareText(selectedText, tabTitle, tabUrl) {
    if (selectedText) {
        return `"${selectedText}" — ${tabTitle} ${tabUrl}`;
    }
    return tabUrl;
}
