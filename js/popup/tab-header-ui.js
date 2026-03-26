/**
 * Wire up the tab-switching UI.
 * Adds click listeners to `.tab-btn` elements that toggle the active
 * tab panel (via `data-tab` / `tab-<name>` ID convention).
 * @returns {void}
 */

export function initTabHeaders() {
    const btns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => p.classList.add('hidden'));
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
        });
    });
}
