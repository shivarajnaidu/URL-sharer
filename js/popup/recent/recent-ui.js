import { getRecentUrls, clearRecentUrls } from './recent.js';

/**
 * Fetch recently shared URLs from storage and render them as a list.
 * Shows an empty-state message when there are no entries, or a clear
 * button and timestamped links when entries exist.
 * @returns {Promise<void>}
 */
async function renderRecent() {
    const list = document.getElementById('recent-list');
    const empty = document.getElementById('recent-empty');
    const clearBtn = document.getElementById('recent-clear');
    const entries = await getRecentUrls();

    list.innerHTML = '';
    if (entries.length === 0) {
        empty.classList.remove('hidden');
        clearBtn.classList.add('hidden');
        return;
    }
    empty.classList.add('hidden');
    clearBtn.classList.remove('hidden');
    entries.forEach(entry => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = entry.url;
        a.target = '_blank';
        a.textContent = entry.title || entry.url;
        a.title = entry.url;
        const time = document.createElement('time');
        time.textContent = new Date(entry.timestamp).toLocaleString();
        li.appendChild(a);
        li.appendChild(time);
        list.appendChild(li);
    });
}

/**
 * Initialise the "Recent" tab.
 * Renders saved URLs on load, wires up the clear button,
 * and re-fetches entries whenever the tab is switched to.
 * @returns {void}
 */
export function initRecentTab() {
    renderRecent();

    document.getElementById('recent-clear').addEventListener('click', async () => {
        await clearRecentUrls();
        renderRecent();
    });

    // Re-fetch when switching to the Recent tab
    document.querySelector('[data-tab="recent"]').addEventListener('click', () => {
        renderRecent();
    });
}
