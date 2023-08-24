import React from "react";
import { RECIEVER, SENDER } from "../constants";
import { Card } from "antd";

let messageBoxStyle = {
  background: "rgb(124 101 227)",

  marginBottom: "10px",
  maxWidth: "80%",
};
export default function MessageBox({ message, type }) {
  let position = "";
  console.log(message, type);
  switch (type) {
    case SENDER:
      position = "left";
      console.log("sender");
      messageBoxStyle = {
        ...messageBoxStyle,
        float: "left",
        background: "#F5F5F5",
        color: "black",
        borderRadius: "1px 12px 12px 12px",
      };
      break;
    case RECIEVER:
      position = "right";
      console.log("idhr");
      messageBoxStyle = {
        ...messageBoxStyle,
        float: "right",
        background: "#9769ec",
        color: "#fff",
        borderRadius: "12px 2px 12px 12px",
      };
      break;
    default:
      position = "center";
      break;
  }
  console.log(messageBoxStyle);
  return (
    <Card style={messageBoxStyle} bodyStyle={{ padding: "5px 15px" }}>
      {message}
    </Card>
  );
}
