import {
  SendOutlined,
  RightCircleFilled,
  MessageFilled,
} from "@ant-design/icons";
import { Button, Input, Space, Tooltip } from "antd";
import React, { useState } from "react";
// import "../styles/InputArea.css";
const inputStyle = {
  width: "100%",
};
export default function InputArea() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      direction="vertical"
      style={{
        width: "100%",
        border: "1px solid #504099",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        padding: "12px",
      }}
    >
      <Input.TextArea
        autoSize={{
          minRows: 2,
          maxRows: 5,
        }}
        style={inputStyle}
        bordered={false}
        placeholder="Type a message"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Tooltip title="Send">
          <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type={isHovered ? "primary" : "link"}
            style={{
              background: isHovered ? "#504099" : "#fff",
              color: "#504099",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={<SendOutlined style={{ color: isHovered ? "white" : "" }} />}
          />
        </Tooltip>
      </div>
    </div>
  );
}
