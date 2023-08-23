/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
var lastMessage = null;
var activeTabId = null;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "textSelected") {
    lastMessage = request;
    activeTabId = sender.tab.id;
    console.log(lastMessage, activeTabId);
  }
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  activeTabId = activeInfo.tabId;
});
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "overlay") {
    console.log(port, "port");
    port.onMessage.addListener(function (request) {
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
/******/ })()
;
//# sourceMappingURL=background.js.map