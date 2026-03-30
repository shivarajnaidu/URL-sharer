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
            '<button id="qr-download" aria-label="Download QR code" title="Download QR code">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                    '<path d="M12 3v13M7 11l5 5 5-5"/>' +
                    '<path d="M5 21h14"/>' +
                '</svg>' +
            '</button>' +
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
    const downloadBtn = document.querySelector('#qr-download');

    btn.addEventListener('click', async () => {
        const { default: QRCode } = await import('../../vendor/qrcode.js');
        const ctx = canvas.getContext('2d');
        QRCode.toCanvas(canvas, url, { width: 200, margin: 1 }, (err) => {
            if (err) return console.error(err);

            // Extend canvas to fit brand watermark below the QR code
            const padding = 18;
            const originalHeight = canvas.height;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas.height = originalHeight + padding;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);

            // Brand watermark
            ctx.font = 'bold 16px sans-serif';
            ctx.fillStyle = '#2e7d32';
            ctx.textAlign = 'center';
            ctx.fillText('Made with URL Sharer', canvas.width / 2, originalHeight + 13);
        });
        overlay.classList.remove('hidden');
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `qrcode_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.add('hidden');
    });
}
