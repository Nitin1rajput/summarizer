import { Card } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";

function Options() {
  return (
    <Card title="Hello World">
      <h1>This is options page, we will provide mode features soon</h1>
    </Card>
  );
}

(() => {
  const appContainer = document.createElement("div");
  if (!appContainer) {
    throw new Error("Cannot find app container");
  }
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);

  root.render(<Options />);
})();
