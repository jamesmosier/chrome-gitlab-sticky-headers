chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

const initTab = (details) => {
  chrome.tabs.sendMessage(
    details.tabId,
    { type: 'init' }
  );
};

chrome.webNavigation.onCompleted.addListener(initTab);
chrome.webNavigation.onHistoryStateUpdated.addListener(initTab);
