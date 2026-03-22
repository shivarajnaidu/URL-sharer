/*
 * Copy URL to clipboard
 */
function showCopiedAlert() {
    const copiedAlert = document.querySelector('#url-copy span');
    copiedAlert.style.display = 'inline';
    setTimeout(() => {
        copiedAlert.style.display = 'none';
    }, 2000);
}

function copyURL(url) {
    navigator.clipboard.writeText(url).then(() => {
        showCopiedAlert();
    }).catch(err => {
        console.error('Failed to copy text:', err);
    });
}

export function initCopyButton(url) {
    const btn = document.querySelector('#url-copy');
    btn.addEventListener('click', () => {
        copyURL(url);
    });
}
