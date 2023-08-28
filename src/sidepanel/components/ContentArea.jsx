import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { roles, summarizeType } from "../constants";
import { Button, Space } from "antd";

export default function ContentArea({ selectedText, messages, onSubmit, setGenerating }) {
  // refs
  const scrollRef = useRef();
  // methods
  const handleActions = (type) => {
    onSubmit({
      type,
      selectedText,
    });
  };
  const onCharacterTyped = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

  };
  // effects
  useEffect(() => {
    onCharacterTyped();
  }, [messages, selectedText]);

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
          onType={onCharacterTyped}
        />
      ))}
      {selectedText.length ? (
        <MessageBox
          onType={onCharacterTyped}
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
      <div ref={scrollRef}></div>
    </Space>
  );
}
