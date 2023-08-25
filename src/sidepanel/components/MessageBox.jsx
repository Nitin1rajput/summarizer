import React from "react";
import { RECIEVER, SENDER } from "../constants";
import { Button, Card, Tooltip } from "antd";
import { Typewriter } from "react-simple-typewriter";
import { CopyOutlined } from "@ant-design/icons";

let boxStyle = {};

const messageBoxStyle = {
  background: "rgb(124 101 227)",
  marginBottom: "10px",
  maxWidth: "80%",
  textAlign: "left",
};
const leftBoxStyle = {
  ...messageBoxStyle,
  float: "left",
  background: "#F5F5F5",
  color: "black",
  borderRadius: "1px 12px 12px 12px",
};
const rightBoxStyle = {
  ...messageBoxStyle,
  float: "right",
  background: "#9769ec",
  color: "#fff",
  borderRadius: "12px 2px 12px 12px",
};
const centerBoxStyle = {
  margin: "auto",
  width: "60%",
  clear: "both",
  color: "grey",
};
export default function MessageBox({ message, type, typing = true }) {
  switch (type) {
    case SENDER:
      boxStyle = leftBoxStyle;
      break;
    case RECIEVER:
      boxStyle = rightBoxStyle;
      break;
    default:
      //center
      boxStyle = centerBoxStyle;
      break;
  }
  return (
    <Tooltip
      placement="rightBottom"
      title={
        <Button
          size="small"
          type="link"
          icon={<CopyOutlined style={{ color: "white" }} />}
        />
      }
      arrow={false}
      color="#777272"
      overlayInnerStyle={{ zIndex: 0 }}
    >
      <Card style={boxStyle} bodyStyle={{ padding: "10px 15px" }}>
        {typing ? <Typewriter words={[message]} typeSpeed={10} /> : message}
      </Card>
    </Tooltip>
  );
}
