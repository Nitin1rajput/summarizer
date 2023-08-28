(() => {
  let sidePanelPort = null;

  chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));

    chrome.runtime.onConnect.addListener(function (port) {
      if (port.name === "sidePanel") {
        sidePanelPort = port;
        sidePanelPort.onDisconnect.addListener(function () {
          sidePanelPort = null;
        });
      }
    });
    chrome.runtime.onMessage.addListener((message, sender) => {
      (async () => {
        if (
          message.from === "selectionOverlay" &&
          message.subject === "openSidepanel"
        ) {
          // await chrome.sidePanel.open({ tabId: sender.tab.id });
          chrome.windows.getCurrent((window) =>
            chrome.sidePanel.open({ windowId: window.id })
          );
        }
        if (
          message.from === "selectionOverlay" &&
          message.subject === "textSelected" &&
          sidePanelPort
        ) {
          sidePanelPort.postMessage({ ...message, from: "background" });
        }
      })();
    });
  });
})();
