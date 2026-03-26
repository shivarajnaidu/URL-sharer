import { BUTTONS } from '../share/buttons.js';

/** @constant {string} Storage key for button visibility preferences. */
const SETTINGS_KEY = 'sharingButtonVisibility';

/**
 * Retrieve the visibility map for all sharing buttons from local storage.
 * Buttons not yet stored default to visible (`true`).
 * @returns {Promise<Object<string, boolean>>} Map of button ID → visible flag.
 */
export async function getButtonVisibility() {
    const { [SETTINGS_KEY]: settings = {} } = await chrome.storage.local.get(SETTINGS_KEY);
    const result = {};
    for (const btn of BUTTONS) {
        result[btn.id] = settings[btn.id] !== false; // default visible
    }
    return result;
}

/**
 * Persist a single button's visibility preference to local storage.
 * @param {string} id - The DOM ID of the button.
 * @param {boolean} visible - Whether the button should be shown.
 * @returns {Promise<void>}
 */
export async function setButtonVisibility(id, visible) {
    const { [SETTINGS_KEY]: settings = {} } = await chrome.storage.local.get(SETTINGS_KEY);
    settings[id] = visible;
    await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}
