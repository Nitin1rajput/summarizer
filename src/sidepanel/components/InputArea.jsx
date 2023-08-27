import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import React, { useState } from "react";
import "../styles/input-area.css";

const inputStyle = {
  width: "100%",
};
const containerStyle = {
  width: "100%",
  border: "1px solid #504099",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  padding: "12px",
};
const sendButtonStyle = {
  color: "#504099",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function InputArea() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="input-container" style={containerStyle}>
      <Input.TextArea
        autoSize={{
          minRows: 2,
          maxRows: 5,
        }}
        style={inputStyle}
        bordered={false}
        placeholder="Type a message"
        onPressEnter={(e) => {
          e.preventDefault();
          console.log(e, "something");
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Tooltip title="Send">
          <Button
            style={{
              ...sendButtonStyle,
              background: isHovered ? "#504099" : "#fff",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type={isHovered ? "primary" : "link"}
            icon={<SendOutlined style={{ color: isHovered ? "white" : "" }} />}
          />
        </Tooltip>
      </div>
    </div>
  );
}
