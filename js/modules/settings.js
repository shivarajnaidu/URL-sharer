const SETTINGS_KEY = 'sharingButtonVisibility';

const ALL_BUTTONS = [
    { id: 'url-facebook',    label: 'Facebook' },
    { id: 'url-twitter',     label: 'Twitter' },
    { id: 'url-reddit',      label: 'Reddit' },
    { id: 'url-linkedin',    label: 'LinkedIn' },
    { id: 'url-stumbleupon', label: 'StumbleUpon' },
    { id: 'url-pinterest',   label: 'Pinterest' },
    { id: 'url-email',       label: 'Email' },
    { id: 'url-copy',        label: 'Copy' },
    { id: 'url-qr',          label: 'QR Code' },
];

export { ALL_BUTTONS };

export async function getButtonVisibility() {
    const { [SETTINGS_KEY]: settings = {} } = await chrome.storage.local.get(SETTINGS_KEY);
    const result = {};
    for (const btn of ALL_BUTTONS) {
        result[btn.id] = settings[btn.id] !== false; // default visible
    }
    return result;
}

export async function setButtonVisibility(id, visible) {
    const { [SETTINGS_KEY]: settings = {} } = await chrome.storage.local.get(SETTINGS_KEY);
    settings[id] = visible;
    await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}
