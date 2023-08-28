import React from "react";
import { roles } from "../constants";
import { Card } from "antd";
import { Typewriter } from "react-simple-typewriter";

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
export default function MessageBox({
  message,
  role,
  actions,
  setGenerating,
  typing = true,
  ...porps
}) {
  switch (role) {
    case roles.ASSISTANT:
      boxStyle = leftBoxStyle;
      break;
    case roles.USER:
      boxStyle = rightBoxStyle;
      break;
    default:
      //center
      boxStyle = centerBoxStyle;
      break;
  }
  let wordCount = 0;
  const onType = () => {
    wordCount++;
    if (wordCount === message.length) {
      setGenerating(false);
      props.onType()
    }
  };
  return (
    // <Tooltip
    //   placement="rightBottom"
    //   title={
    //     <Button
    //       size="small"
    //       role="link"
    //       icon={<CopyOutlined style={{ color: "white" }} />}
    //     />
    //   }
    //   arrow={false}
    //   color="#777272"
    //   overlayInnerStyle={{ zIndex: 0 }}
    // >
    <Card
      style={boxStyle}
      bodyStyle={{ padding: "10px 15px", whiteSpace: "pre-line" }}
      actions={actions}
    >
      {typing ? (
        <Typewriter words={[message]} typeSpeed={10} onType={onType} />
      ) : (
        message
      )}
    </Card>
    // </Tooltip>
  );
}
