import React from "react";
import MessageBox from "./MessageBox";
import { RECIEVER, SENDER } from "../constants";
import { Space } from "antd";

export default function ContentArea() {
  return (
    <Space direction="vertical">
      <MessageBox message={"Left"} type={SENDER} />
      <MessageBox message={"Right."} type={RECIEVER} />
      <MessageBox message={"Left"} type={SENDER} />
      <MessageBox
        message={
          "Right Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad beatae dolores eveniet laborum deleniti vel odit, sunt reprehenderit perferendis nulla perspiciatis id officia voluptas nobis est accusamus facere eligendi? Ipsa."
        }
        type={RECIEVER}
      />
      <MessageBox
        message={
          "Right Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad beatae dolores eveniet laborum deleniti vel odit, sunt reprehenderit perferendis nulla perspiciatis id officia voluptas nobis est accusamus facere eligendi? Ipsa."
        }
        type={RECIEVER}
      />
      <MessageBox message={"Left"} type={SENDER} />
      <MessageBox message={"Left"} type={SENDER} />
    </Space>
  );
}
