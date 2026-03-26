/**
 * Create and append the QR code overlay markup to the given container.
 * Must be called before `initQRButton` so the overlay elements exist in the DOM.
 * @param {HTMLElement} container - The element to append the overlay into.
 * @returns {void}
 */
export function renderQRCodePopupUI(container) {
    const overlay = document.createElement('div');
    overlay.id = 'qr-overlay';
    overlay.className = 'qr-overlay hidden';
    overlay.innerHTML =
        '<div class="qr-container">' +
            '<canvas id="qr-canvas"></canvas>' +
            '<button id="qr-close" aria-label="Close QR code">&times;</button>' +
        '</div>';
    container.appendChild(overlay);
}

/**
 * Initialise the QR code button and overlay.
 * Clicking the button generates a QR code for the given URL and shows it
 * in a modal overlay. The QRCode library is lazy-loaded on first click.
 * The overlay can be dismissed by clicking the close button or clicking
 * outside the QR container.
 * @param {string} url - The URL to encode as a QR code.
 * @returns {void}
 */
export function initQRButton(url) {
    const btn = document.querySelector('#url-qr');
    const overlay = document.querySelector('#qr-overlay');
    const canvas = document.querySelector('#qr-canvas');
    const closeBtn = document.querySelector('#qr-close');

    btn.addEventListener('click', async () => {
        const { default: QRCode } = await import('../../vendor/qrcode.js');
        QRCode.toCanvas(canvas, url, { width: 200, margin: 1 }, (err) => {
            if (err) console.error(err);
        });
        overlay.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.add('hidden');
    });
}
