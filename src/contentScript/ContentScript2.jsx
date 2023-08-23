import { Badge, Button, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

const ButtonGroup = Button.Group;
export default function ContentScript({}) {
  const [show, setShow] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener(
      "mouseup",
      (e) => {
        const selectedText = window.getSelection().toString().trim();
        console.log(selectedText, "selectedText");
        if (selectedText.length > 0) {
          setShow(true);
          setSelectedText(selectedText);
          setPosition({ x: e.clientX, y: e.clientY });
        } else {
          setShow(false);
          setSelectedText("");
          setPosition({ x: 0, y: 0 });
        }
      },
      false
    );
    document.addEventListener(
      "mousedown",
      function (e) {
        setShow(false);
        setSelectedText("");
        setPosition({ x: 0, y: 0 });
      },
      false
    );
  }, []);
  console.log(show, selectedText, position, "ye sb");
  const overlayStyle = {
    display: show ? "block" : "none",
    position: "fixed",
    top: position.y + "px",
    left: position.x + "px",
    zIndex: 100,
    color: "white",
    borderRadius: "5px",
  };
  return (
    <div id="overlay" style={overlayStyle}>
      <Badge
        count={
          <Button
            icon={
              <CloseCircleFilled style={{ color: "#f5222d", zIndex: 1000 }} />
            }
            onClick={() => setShow(false)}
          />
        }
      >
        <ButtonGroup size="middle">
          <Button>Summarize</Button>
          <Button>Key Points</Button>
        </ButtonGroup>
      </Badge>
    </div>
  );
}
