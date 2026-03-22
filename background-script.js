'use strict';

const openedTabIDs = [];

function isFacebook(tab) {
    const { url } = tab;
    return url && url.includes('facebook.com');
}

function isTabOpenedByMe(tab) {
    const { id } = tab;
    return openedTabIDs.includes(id);
}

function isLoading(tab) {
    const { status } = tab;
    return (status === 'loading');
}

const isEmptyTab = (tab) => {
    const { url } = tab;
    return (url === 'chrome://newtab/') || (url === 'about:blank');
};

function closeTab(id) {
    chrome.tabs.remove(id);
    openedTabIDs.splice(openedTabIDs.indexOf(id), 1);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'sharer-tab-id') {
        const { id } = request.data;
        openedTabIDs.push(id);
    }
});

chrome.tabs.onUpdated.addListener(onTabUpdateListener);

function onTabUpdateListener(tabID, changeInfo, tab) {
    if (isLoading(tab) || !isTabOpenedByMe(tab) || isEmptyTab(tab)) {
        return;
    }

    const { url, id } = tab;

    if (isFacebook(tab) && (url.includes('dialog/return/close#_=_') || url.includes('latest_status_id='))) {
        closeTab(id);
    }
}