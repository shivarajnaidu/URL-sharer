/**
 * @typedef {Object} ButtonDescriptor
 * @property {string} id       - DOM element ID for the button.
 * @property {string} label    - Human-readable label shown in settings.
 * @property {string} icon     - SVG filename (without extension) inside icons/svg/.
 * @property {string} title    - Tooltip text (title attribute).
 * @property {boolean} [utility] - If `true`, the button is a utility (not a social share link).
 */

/**
 * Central button registry — single source of truth for all sharing buttons.
 * HTML rendering, social.js URLs, and settings.js all derive from this list.
 * @type {ButtonDescriptor[]}
 */
export const BUTTONS = [
    {
        id: 'url-whatsapp',
        label: 'WhatsApp',
        icon: 'whatsapp',
        title: 'Share On WhatsApp'
    },

    {
        id: 'url-facebook',
        label: 'Facebook',
        icon: 'facebook',
        title: 'Share On Facebook'
    },

    {
        id: 'url-twitter',
        label: 'Twitter',
        icon: 'twitter',
        title: 'Share On Twitter'
    },

    {
        id: 'url-telegram',
        label: 'Telegram',
        icon: 'telegram',
        title: 'Share On Telegram'
    },

    {
        id: 'url-linkedin',
        label: 'LinkedIn',
        icon: 'linkedin',
        title: 'Share On LinkedIn'
    },

    {
        id: 'url-reddit',
        label: 'Reddit',
        icon: 'reddit',
        title: 'Share On Reddit'
    },

    {
        id: 'url-pinterest',
        label: 'Pinterest',
        icon: 'pinterest',
        title: 'Share On Pinterest'
    },

    {
        id: 'url-threads',
        label: 'Threads',
        icon: 'threads',
        title: 'Share On Threads'
    },

    {
        id: 'url-bluesky',
        label: 'Bluesky',
        icon: 'bluesky',
        title: 'Share On Bluesky'
    },

    {
        id: 'url-tumblr',
        label: 'Tumblr',
        icon: 'tumblr',
        title: 'Share On Tumblr'
    },

    {
        id: 'url-hackernews',
        label: 'Hacker News',
        icon: 'hackernews',
        title: 'Share On Hacker News'
    },

    {
        id: 'url-email',
        label: 'Email',
        icon: 'email',
        title: 'Share via Email'
    },

    {
        id: 'url-copy',
        label: 'Copy',
        icon: 'copy',
        title: 'Copy And Share',
        utility: true
    },

    {
        id: 'url-qr',
        label: 'QR Code',
        icon: 'qrcode',
        title: 'Show QR Code', utility: true
    },
];
