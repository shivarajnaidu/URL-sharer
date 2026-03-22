/*
 * Copy URL (with optional selected text) to clipboard
 */
function showCopiedAlert() {
    const copiedAlert = document.querySelector('#url-copy span');
    copiedAlert.style.display = 'inline';
    setTimeout(() => {
        copiedAlert.style.display = 'none';
    }, 2000);
}

function copyURL(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopiedAlert();
    }).catch(err => {
        console.error('Failed to copy text:', err);
    });
}

export function initCopyButton(url, selectedText = '', tabTitle = '') {
    const btn = document.querySelector('#url-copy');
    const copyText = selectedText
        ? `"${selectedText}" — ${tabTitle} ${url}`
        : url;
    btn.addEventListener('click', () => {
        copyURL(copyText);
    });
}
