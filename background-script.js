async function getOpenedTabIDs() {
    const data = await chrome.storage.session.get('openedTabIDs');
    return data.openedTabIDs || [];
}

async function saveOpenedTabIDs(ids) {
    await chrome.storage.session.set({ openedTabIDs: ids });
}

function isFacebook(tab) {
    const { url } = tab;
    return url && url.includes('facebook.com');
}

async function isTabOpenedByMe(tab) {
    const ids = await getOpenedTabIDs();
    return ids.includes(tab.id);
}

function isLoading(tab) {
    const { status } = tab;
    return (status === 'loading');
}

const isEmptyTab = (tab) => {
    const { url } = tab;
    return (url === 'chrome://newtab/') || (url === 'about:blank');
};

async function closeTab(id) {
    chrome.tabs.remove(id);
    const ids = await getOpenedTabIDs();
    ids.splice(ids.indexOf(id), 1);
    await saveOpenedTabIDs(ids);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'sharer-tab-id') {
        const { id } = request.data;
        getOpenedTabIDs().then(ids => {
            ids.push(id);
            saveOpenedTabIDs(ids);
        });
    }
});

chrome.tabs.onUpdated.addListener(onTabUpdateListener);

async function onTabUpdateListener(tabID, changeInfo, tab) {
    if (isLoading(tab) || isEmptyTab(tab)) {
        return;
    }

    const isOpened = await isTabOpenedByMe(tab);
    if (!isOpened) return;

    const { url, id } = tab;

    if (isFacebook(tab) && (url.includes('dialog/return/close#_=_') || url.includes('latest_status_id='))) {
        closeTab(id);
    }
}