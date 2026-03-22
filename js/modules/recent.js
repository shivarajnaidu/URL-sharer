const STORAGE_KEY = 'recentSharedUrls';
const MAX_RECENT = 10;

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

export async function getRecentUrls() {
    const { [STORAGE_KEY]: entries = [] } = await chrome.storage.local.get(STORAGE_KEY);
    return entries;
}

export async function clearRecentUrls() {
    await chrome.storage.local.remove(STORAGE_KEY);
}
