import { BUTTONS } from './buttons.js';

const SETTINGS_KEY = 'sharingButtonVisibility';

export async function getButtonVisibility() {
    const { [SETTINGS_KEY]: settings = {} } = await chrome.storage.local.get(SETTINGS_KEY);
    const result = {};
    for (const btn of BUTTONS) {
        result[btn.id] = settings[btn.id] !== false; // default visible
    }
    return result;
}

export async function setButtonVisibility(id, visible) {
    const { [SETTINGS_KEY]: settings = {} } = await chrome.storage.local.get(SETTINGS_KEY);
    settings[id] = visible;
    await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}
