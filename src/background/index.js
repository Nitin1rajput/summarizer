let lastMessage = null;
let activeTabId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "textSelected") {
    lastMessage = request;
    activeTabId = sender.tab.id;
    console.log(lastMessage, activeTabId);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  activeTabId = activeInfo.tabId;
});
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "overlay") {
    console.log(port, "port");
    port.onMessage.addListener((request) => {
      if (request.message === "fetchLastMessage") {
        console.log("sending last message");
        port.postMessage(lastMessage);
      }
    });

    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
      if (tabId === activeTabId && changeInfo.status === "complete") {
        console.log("sending last message");
        port.postMessage(lastMessage);
      }
    });
  }
});
