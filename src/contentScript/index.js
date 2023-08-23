import { createRoot } from "react-dom/client";
import ContentScript from "./ContentScript2";
import React, { useEffect } from "react";

(() => {
  const container = document.createElement("div");
  if (!container) {
    throw new Error("Container not exist");
  }
  container.id = "content-script";
  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(<ContentScript />);
})();
