import { BUTTONS } from './buttons.js';
import { getButtonVisibility, setButtonVisibility } from './settings.js';

/**
 * Apply the saved visibility map to all sharing button DOM elements.
 * Hidden buttons receive `display: none`; visible ones are reset.
 * @param {Object<string, boolean>} visibility - Map of button ID → visible flag.
 * @returns {void}
 */
function applyVisibility(visibility) {
    for (const btn of BUTTONS) {
        const el = document.getElementById(btn.id);
        if (el) el.style.display = visibility[btn.id] ? '' : 'none';
    }
}

/**
 * Render the settings panel with one checkbox per button.
 * Each toggle updates storage and immediately reflects the change.
 * @returns {Promise<void>}
 */
async function renderSettings() {
    const list = document.getElementById('settings-list');
    const visibility = await getButtonVisibility();

    list.innerHTML = '';
    for (const btn of BUTTONS) {
        const li = document.createElement('li');

        const label = document.createElement('label');
        label.className = 'settings-toggle';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = visibility[btn.id];
        checkbox.setAttribute('aria-label', `Show ${btn.label}`);
        checkbox.addEventListener('change', async () => {
            await setButtonVisibility(btn.id, checkbox.checked);
            const updated = await getButtonVisibility();
            applyVisibility(updated);
        });

        const span = document.createElement('span');
        span.textContent = btn.label;

        label.appendChild(checkbox);
        label.appendChild(span);
        li.appendChild(label);
        list.appendChild(li);
    }
}

/**
 * Initialise the settings tab.
 * Applies saved visibility on load, renders the settings checkboxes,
 * and re-renders when the user switches to the settings tab.
 * @returns {Promise<void>}
 */
export async function initSettingsTab() {
    // Apply saved visibility on load
    const visibility = await getButtonVisibility();
    applyVisibility(visibility);

    // Re-render settings when tab is opened
    document.querySelector('[data-tab="settings"]').addEventListener('click', () => {
        renderSettings();
    });

    renderSettings();
}
