(() => {
  let sidePanelPort = null;

  // self.addEventListener('activate', event => {
  //   event.waitUntil(self.clients.claim());
  // });
  chrome.runtime.onInstalled.addListener(() => {

    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));

    chrome.runtime.onConnect.addListener(function (port) {
      console.log("on connection", port);
      if (port.name === "sidePanel") {
        console.log("connecting");
        sidePanelPort = port;
        sidePanelPort.onDisconnect.addListener(function () {
          sidePanelPort = null;
        });
      }
    });
    chrome.runtime.onMessage.addListener((message, sender) => {
      (async () => {
        console.log(message, "ng message");
        if (
          message.from === "selectionOverlay" &&
          message.subject === "openSidepanel"
        ) {
          // await chrome.sidePanel.open({ tabId: sender.tab.id });
          chrome.windows.getCurrent(window => chrome.sidePanel.open({ windowId: window.id }))
        }
        if (
          message.from === "selectionOverlay" &&
          message.subject === "textSelected" &&
          sidePanelPort
        ) {
          console.log("sending....", message);
          sidePanelPort.postMessage({ ...message, from: "background" });
        }
      })();
    });
  });
})();
