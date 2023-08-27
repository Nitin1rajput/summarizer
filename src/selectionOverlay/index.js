import React from "react";
import { createRoot } from "react-dom/client";

import SelectionOverlay from "./components/SelectionOverlay";

(() => {
  const container = document.createElement("div");
  if (!container) {
    throw new Error("Container not exist");
  }
  container.id = "content-script";
  document.body.appendChild(container);

  // container.attachShadow({ mode: "open" });

  const root = createRoot(container);
  root.render(<SelectionOverlay />);
})();
