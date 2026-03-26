// --- Tab ID tracking via session storage ---
// We keep track of tab IDs that were opened by the extension (e.g. sharing dialogs)
// so we can auto-close them once the sharing flow completes.

/**
 * Retrieve the list of tab IDs opened by this extension from session storage.
 * @returns {Promise<number[]>} Array of tab IDs tracked by the extension.
 */
async function getOpenedTabIDs() {
    const data = await chrome.storage.session.get('openedTabIDs');
    return data.openedTabIDs || [];
}

/**
 * Persist the list of opened tab IDs back to session storage.
 * @param {number[]} ids - The array of tab IDs to save.
 * @returns {Promise<void>}
 */
async function saveOpenedTabIDs(ids) {
    await chrome.storage.session.set({ openedTabIDs: ids });
}

// --- Tab helper predicates ---

/**
 * Check if a tab is on Facebook.
 * @param {chrome.tabs.Tab} tab - The tab to check.
 * @returns {boolean} `true` if the tab URL contains "facebook.com".
 */
function isFacebook(tab) {
    const { url } = tab;
    return url && url.includes('facebook.com');
}

/**
 * Check if a tab was originally opened by this extension.
 * @param {chrome.tabs.Tab} tab - The tab to check.
 * @returns {Promise<boolean>} `true` if the tab ID is in the tracked list.
 */
async function isTabOpenedByMe(tab) {
    const ids = await getOpenedTabIDs();
    return ids.includes(tab.id);
}

/**
 * Check if a tab is still loading.
 * @param {chrome.tabs.Tab} tab - The tab to check.
 * @returns {boolean} `true` if the tab status is "loading".
 */
function isLoading(tab) {
    const { status } = tab;
    return (status === 'loading');
}

/**
 * Check if a tab is a blank or new-tab page (nothing meaningful loaded yet).
 * @param {chrome.tabs.Tab} tab - The tab to check.
 * @returns {boolean} `true` if the tab URL is a new-tab or about:blank page.
 */
const isEmptyTab = (tab) => {
    const { url } = tab;
    return (url === 'chrome://newtab/') || (url === 'about:blank');
};

/**
 * Close a tab and remove its ID from the tracked list.
 * @param {number} id - The ID of the tab to close.
 * @returns {Promise<void>}
 */
async function closeTab(id) {
    chrome.tabs.remove(id);
    const ids = await getOpenedTabIDs();
    ids.splice(ids.indexOf(id), 1);
    await saveOpenedTabIDs(ids);
}

// --- Recent URL persistence ---

/** @constant {string} Storage key for the recent URLs array. */
const RECENT_STORAGE_KEY = 'recentSharedUrls';
/** @constant {number} Maximum number of recent entries to keep. */
const MAX_RECENT = 10;

/**
 * Save a shared URL to the recent list in local storage.
 * Duplicates are removed and the newest entry is placed first.
 * The list is capped at {@link MAX_RECENT} entries.
 * @param {string} url - The URL that was shared.
 * @param {string} title - The page title at the time of sharing.
 * @returns {Promise<void>}
 */
async function saveRecentUrl(url, title) {
    const { [RECENT_STORAGE_KEY]: existing = [] } = await chrome.storage.local.get(RECENT_STORAGE_KEY);
    const entry = { url, title, timestamp: Date.now() };

    // Remove duplicate if already present
    const filtered = existing.filter(e => e.url !== url);
    filtered.unshift(entry);

    await chrome.storage.local.set({
        [RECENT_STORAGE_KEY]: filtered.slice(0, MAX_RECENT)
    });
}

// --- Event listeners ---

// Listen for messages from the popup/content scripts.
// When a sharing tab is opened, the popup sends its ID here so we can track it.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'sharer-tab-id') {
        const { id } = request.data;
        getOpenedTabIDs().then(ids => {
            ids.push(id);
            saveOpenedTabIDs(ids);
        });
    }

    // Popup delegates recent-URL saving to the background to keep storage
    // writes out of the short-lived popup context.
    if (request.type === 'save-recent-url') {
        const { url, title } = request.data;
        saveRecentUrl(url, title);
    }
});

// Watch for tab URL/status changes so we can auto-close sharing tabs
// once the external sharing flow is finished.
chrome.tabs.onUpdated.addListener(onTabUpdateListener);

/**
 * Callback for `chrome.tabs.onUpdated`. Detects when a sharing tab
 * (opened by this extension) has finished its flow and auto-closes it.
 * @param {number} tabID - The ID of the updated tab.
 * @param {chrome.tabs.TabChangeInfo} changeInfo - Properties that changed.
 * @param {chrome.tabs.Tab} tab - The current state of the tab.
 * @returns {Promise<void>}
 */
async function onTabUpdateListener(tabID, changeInfo, tab) {
    // Ignore tabs that are still loading or are empty.
    if (isLoading(tab) || isEmptyTab(tab)) {
        return;
    }

    // Only act on tabs we opened ourselves.
    const isOpened = await isTabOpenedByMe(tab);
    if (!isOpened) return;

    const { url, id } = tab;

    // Facebook redirects to a "close" or "status" URL after sharing completes.
    // Detect that and automatically close the tab.
    if (isFacebook(tab) && (url.includes('dialog/return/close#_=_') || url.includes('latest_status_id='))) {
        closeTab(id);
    }
}