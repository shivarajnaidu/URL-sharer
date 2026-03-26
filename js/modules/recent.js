/** @constant {string} Storage key for the recent URLs array. */
const STORAGE_KEY = 'recentSharedUrls';
/** @constant {number} Maximum number of recent entries to keep. */
const MAX_RECENT = 10;

/**
 * Save a URL to the recent-shared list in local storage.
 * Duplicates are removed and the newest entry is placed first.
 * The list is capped at {@link MAX_RECENT} entries.
 * @param {string} url - The URL that was shared.
 * @param {string} title - The page title at the time of sharing.
 * @returns {Promise<void>}
 */
export async function saveRecentUrl(url, title) {
    const { [STORAGE_KEY]: existing = [] } = await chrome.storage.local.get(STORAGE_KEY);
    const entry = { url, title, timestamp: Date.now() };

    // Remove duplicate if already present
    const filtered = existing.filter(e => e.url !== url);
    filtered.unshift(entry);

    await chrome.storage.local.set({
        [STORAGE_KEY]: filtered.slice(0, MAX_RECENT)
    });
}

/**
 * Retrieve the list of recently shared URLs from local storage.
 * @returns {Promise<Array<{url: string, title: string, timestamp: number}>>}
 */
export async function getRecentUrls() {
    const { [STORAGE_KEY]: entries = [] } = await chrome.storage.local.get(STORAGE_KEY);
    return entries;
}

/**
 * Remove all recently shared URLs from local storage.
 * @returns {Promise<void>}
 */
export async function clearRecentUrls() {
    await chrome.storage.local.remove(STORAGE_KEY);
}
