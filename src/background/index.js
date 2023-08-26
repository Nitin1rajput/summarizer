(() => {
  let sidePanelPort = null;

  chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));

    chrome.runtime.onConnect.addListener(function (port) {
      if (port.name === "popup") {
        sidePanelPort = port;
        sidePanelPort.onDisconnect.addListener(function () {
          sidePanelPort = null;
        });
      }
    });
    chrome.runtime.onMessage.addListener((message, sender) => {
      (async () => {
        if (message.from === "openSidepanel") {
          await chrome.sidePanel.open({ tabId: sender.tab.id });
        }
        if (
          message.from === "selectionOverlay" &&
          message.subject === "textSelected" &&
          sidePanelPort
        ) {
          popupPort.postMessage({ ...message, from: "background" });
        }
      })();
    });
  });
})();
