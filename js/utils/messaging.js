/**
 * Centralised messaging layer for communicating with the background service worker.
 *
 * All chrome.runtime.sendMessage calls in the popup should go through here.
 * The background script (background-script.js) handles each message type
 * in its onMessage listener.
 *
 * Message types:
 *  - 'sharer-tab-id'   : Registers a newly opened sharing tab so the background
 *                        can auto-close it once the sharing flow completes.
 *  - 'save-recent-url' : Asks the background to persist a shared URL to local
 *                        storage (delegated to avoid losing the write if the
 *                        popup closes before it finishes).
 */

/**
 * Low-level helper — send an arbitrary message to the background script.
 * @param {string} type - The message type identifier.
 * @param {Object} data - The payload to send with the message.
 * @returns {void}
 */
export function sendMessage(type, data) {
    chrome.runtime.sendMessage({ type, data });
}

/**
 * Notify the background script that a new sharing tab was opened,
 * so it can track the tab ID and close it when the flow completes.
 * @param {number} tabId - The ID of the newly created sharing tab.
 * @returns {void}
 */
export function notifySharerTabOpened(tabId) {
    sendMessage('sharer-tab-id', { id: tabId });
}

/**
 * Ask the background script to save a URL to the recent-shared list.
 * Storage is handled in the background so the write is not lost
 * if the popup closes immediately after clicking a sharing button.
 * @param {string} url - The URL that was shared.
 * @param {string} title - The page title at the time of sharing.
 * @returns {void}
 */
export function saveRecentUrlViaBackground(url, title) {
    sendMessage('save-recent-url', { url, title });
}
