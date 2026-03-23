import { ALL_BUTTONS, getButtonVisibility, setButtonVisibility } from './settings.js';

function applyVisibility(visibility) {
    for (const btn of ALL_BUTTONS) {
        const el = document.getElementById(btn.id);
        if (el) el.style.display = visibility[btn.id] ? '' : 'none';
    }
}

async function renderSettings() {
    const list = document.getElementById('settings-list');
    const visibility = await getButtonVisibility();

    list.innerHTML = '';
    for (const btn of ALL_BUTTONS) {
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
