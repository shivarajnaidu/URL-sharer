/**
 * Central button registry — single source of truth for all sharing buttons.
 * HTML rendering, social.js URLs, and settings.js all derive from this list.
 */
const BUTTONS = [
    { id: 'url-whatsapp',    label: 'WhatsApp',     icon: 'whatsapp',    title: 'Share On WhatsApp' },
    { id: 'url-facebook',    label: 'Facebook',     icon: 'facebook',    title: 'Share On Facebook' },
    { id: 'url-instagram',   label: 'Instagram',    icon: 'instagram',   title: 'Share On Instagram' },
    { id: 'url-twitter',     label: 'Twitter',      icon: 'twitter',     title: 'Share On Twitter' },
    { id: 'url-telegram',    label: 'Telegram',     icon: 'telegram',    title: 'Share On Telegram' },
    { id: 'url-linkedin',    label: 'LinkedIn',     icon: 'linkedin',    title: 'Share On LinkedIn' },
    { id: 'url-reddit',      label: 'Reddit',       icon: 'reddit',      title: 'Share On Reddit' },
    { id: 'url-pinterest',   label: 'Pinterest',    icon: 'pinterest',   title: 'Share On Pinterest' },
    { id: 'url-threads',     label: 'Threads',      icon: 'threads',     title: 'Share On Threads' },
    { id: 'url-bluesky',     label: 'Bluesky',      icon: 'bluesky',     title: 'Share On Bluesky' },
    { id: 'url-tumblr',      label: 'Tumblr',       icon: 'tumblr',      title: 'Share On Tumblr' },
    { id: 'url-hackernews',  label: 'Hacker News',  icon: 'hackernews',  title: 'Share On Hacker News' },
    { id: 'url-stumbleupon', label: 'StumbleUpon',  icon: 'stumbleupon', title: 'Share On StumbleUpon' },
    { id: 'url-email',       label: 'Email',        icon: 'email',       title: 'Share via Email' },
    { id: 'url-copy',        label: 'Copy',         icon: 'copy',        title: 'Copy And Share',  utility: true },
    { id: 'url-qr',          label: 'QR Code',      icon: 'qrcode',      title: 'Show QR Code',    utility: true },
];

export { BUTTONS };

/**
 * Render all sharing buttons into the given container element.
 */
export function renderButtons(container) {
    for (const btn of BUTTONS) {
        const a = document.createElement('a');
        a.className = 'sharing-buttons';
        a.id = btn.id;
        a.title = btn.title;

        if (btn.utility) {
            a.setAttribute('role', 'button');
            a.tabIndex = 0;
        }

        const img = document.createElement('img');
        img.decoding = 'async';
        img.src = `icons/svg/${btn.icon}.svg`;
        img.alt = btn.label;
        a.appendChild(img);

        // Copy button needs a "Copied !" span
        if (btn.id === 'url-copy') {
            const span = document.createElement('span');
            span.setAttribute('aria-live', 'polite');
            span.textContent = 'Copied !';
            a.appendChild(span);
        }

        container.appendChild(a);
    }

    // QR overlay
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
