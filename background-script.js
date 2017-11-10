'use strict';

;
(function() {

    const openedTabIDs = [];

    function isFacebook(tab) {
        const { url } = tab;
        return url.includes('facebook.com');
    }

    function isTabOpenedByMe(tab) {
        const { id } = tab;
        return openedTabIDs.includes(id);
    }

    function isLoading(tab) {
        const { status } = tab;
        return (status === 'loading');
    }

    function closeTab(id) {
        browser.tabs.remove(id);
        openedTabIDs.splice(openedTabIDs.indexOf(id), 1);
    }


    //  Add Listener For On Message Event And Get And Store Opened Tab IDs For Future Reference...

    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'sharer-tab-id') {
            const { id } = request.data;
            openedTabIDs.push(id);
        }
    });


    // On Tab Update Detect And Close The Tab Automatically

    chrome.tabs.onUpdated.addListener(onTabUpdateListener);

    function onTabUpdateListener(tabID, changeInfo, tab) {
        console.log(tabID, tab);

        if (isLoading(tab) || !isTabOpenedByMe(tab)) {
            return;
        }

        const { url, id } = tab;

        if (isFacebook(tab) && (url.includes('dialog/return/close#_=_') || url.includes('latest_status_id='))) {
            closeTab(id)
        }

        if (url === 'https://plus.google.com/') {
            closeTab(id)
        }


    }
})();