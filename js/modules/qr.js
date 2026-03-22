import QRCode from 'qrcode';

/*
 * QR Code overlay
 */
export function initQRButton(url) {
    const btn = document.querySelector('#url-qr');
    const overlay = document.querySelector('#qr-overlay');
    const canvas = document.querySelector('#qr-canvas');
    const closeBtn = document.querySelector('#qr-close');

    btn.addEventListener('click', () => {
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
