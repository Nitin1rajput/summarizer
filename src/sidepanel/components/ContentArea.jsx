import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { RECIEVER, SENDER, roles, summarizeType } from "../constants";
import { Button, Space } from "antd";

export default function ContentArea({ messages, onSubmit, setGenerating }) {
  // need to add logic for getting chats

  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "sidePanel" });

    port.onMessage.addListener((msg) => {
      if (msg.from === "background" && msg.subject === "textSelected") {
        setSelectedText(msg.body);
      }
    });
  }, []);

  const handleActions = (type) => {
    onSubmit({
      type,
      selectedText,
    });
  };
  let count = 0;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <MessageBox
        message={"Try typing summarize me this : <following your content>"}
        typing={false}
      />
      {messages.map((message, idx) => (
        <MessageBox
          key={idx}
          message={message.content}
          typing={message.typing}
          role={message.role}
          setGenerating={setGenerating}
        />
      ))}
      {selectedText.length ? (
        <MessageBox
          message={selectedText}
          role={roles.ASSISTANT}
          typing={false}
          actions={[
            <Button onClick={() => handleActions(summarizeType.SUMMARY)}>
              Summary
            </Button>,
            <Button onClick={() => handleActions(summarizeType.KEY_POINTS)}>
              Key Points
            </Button>,
          ]}
        />
      ) : (
        ""
      )}
    </Space>
  );
}
