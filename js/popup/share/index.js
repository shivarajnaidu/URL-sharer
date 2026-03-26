import { renderSocialButtons } from './social-buttons/buttons-ui.js';
import { initCopyButton } from './copy.js';
import { initQRButton, renderQRCodePopupUI } from './qr-ui.js';
import { getSelectedText } from './utils.js';
import { initReviewPrompt } from './review.js';
import { saveRecentUrlViaBackground } from '../../utils/messaging.js';

/**
 * Initialise everything on the Share tab:
 * renders social buttons, wires up copy and QR, and shows the review prompt.
 * @param {string} tabUrl - The URL of the active tab.
 * @param {string} tabTitle - The title of the active tab.
 * @returns {Promise<void>}
 */
export async function initShareTab(tabUrl, tabTitle) {
    const selectedText = await getSelectedText();

    const container = document.getElementById('social-sharing-link-container-layout');
    renderSocialButtons(container, tabUrl, tabTitle, selectedText);

    // Append the QR overlay so initQRButton can find its elements.
    renderQRCodePopupUI(container);

    container.addEventListener('click', (e) => {
        if (e.target.closest('.sharing-buttons')) {
            saveRecentUrlViaBackground(tabUrl, tabTitle);
        }
    });

    initCopyButton(tabUrl, selectedText, tabTitle);
    initQRButton(tabUrl);

    await initReviewPrompt();
}
