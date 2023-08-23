import { Radio } from "antd";
import React, { useEffect, useState } from "react";

export default function ContentScript({}) {
  const [show, setShow] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "overlay" });

    port.postMessage({ message: "fetchLastMessage" });

    port.onMessage.addListener((response) => {
      if (response.message === "textSelected") {
        console.log(response, "textSelected");
        setSelectedText(response.selectedText);
        setPosition({ x: response.x, y: response.y });
        setShow(true);
      } else if (response.message === "textDeselected") {
        setShow(false);
      }
    });

    return () => {
      if (port.isConnected()) {
        port.disconnect();
      }
    };
  }, []);
  console.log(show, selectedText, position, "ye sb");
  const overlayStyle = {
    display: show ? "block" : "none",
    position: "fixed",
    top: position.y + "px",
    left: position.x + "px",
    zIndex: 100000,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };
  return (
    <div id="overlay" style={overlayStyle}>
      <Radio.Group value="small">
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
    </div>
  );
}
