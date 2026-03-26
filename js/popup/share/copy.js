/*
 * Copy URL (with optional selected text) to clipboard
 */

/**
 * Briefly show a "Copied !" alert next to the copy button.
 * The alert is hidden again after 2 seconds.
 * @returns {void}
 */
function showCopiedAlert() {
    const copiedAlert = document.querySelector('#url-copy span');
    copiedAlert.style.display = 'inline';
    setTimeout(() => {
        copiedAlert.style.display = 'none';
    }, 2000);
}

/**
 * Write the given text to the system clipboard and show a confirmation alert.
 * @param {string} text - The text to copy to the clipboard.
 * @returns {void}
 */
function copyURL(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopiedAlert();
    }).catch(err => {
        console.error('Failed to copy text:', err);
    });
}

/**
 * Initialise the copy-to-clipboard button.
 * If selected text is provided, the copied string includes the quote,
 * tab title, and URL; otherwise just the URL is copied.
 * @param {string} url - The current tab URL.
 * @param {string} [selectedText=''] - Text the user highlighted on the page.
 * @param {string} [tabTitle=''] - The title of the active tab.
 * @returns {void}
 */
export function initCopyButton(url, selectedText = '', tabTitle = '') {
    const btn = document.querySelector('#url-copy');
    const copyText = selectedText
        ? `"${selectedText}" — ${tabTitle} ${url}`
        : url;
    btn.addEventListener('click', () => {
        copyURL(copyText);
    });
}
