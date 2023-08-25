import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { RECIEVER, SENDER } from "../constants";
import { Space } from "antd";

export default function ContentArea() {
  // need to add logic for getting chats
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, []);
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <MessageBox
        message={"Try typing summarize me this : <following your content>"}
        typing={false}
      />
      <MessageBox message={"hi"} type={SENDER} />
      <MessageBox message={"hi"} type={RECIEVER} />
      <MessageBox
        message={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis quas hic quidem molestiae aut cumque facilis provident aspernatur. Harum soluta molestias beatae quod placeat rem dolore molestiae quo reprehenderit quia, sequi maiores inventore dolores magni, repellendus a commodi reiciendis! Voluptatum totam, nobis mollitia dolorum optio suscipit quam necessitatibus id natus eaque nulla quod impedit error ipsam facilis nihil ab amet voluptate temporibus ea reiciendis. Similique adipisci sit accusamus qui modi quis repellendus cum? Saepe accusantium eos ea aliquid perspiciatis nulla facilis modi tempora, molestiae tempore sequi nihil, ratione, delectus sapiente! Quibusdam facere eveniet sed. Distinctio quaerat minima at natus soluta!"
        }
        type={RECIEVER}
      />
      <MessageBox
        message={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis quas hic quidem molestiae aut cumque facilis provident aspernatur. Harum soluta molestias beatae quod placeat rem dolore molestiae quo reprehenderit quia, sequi maiores inventore dolores magni, repellendus a commodi reiciendis! Voluptatum totam, nobis mollitia dolorum optio suscipit quam necessitatibus id natus eaque nulla quod impedit error ipsam facilis nihil ab amet voluptate temporibus ea reiciendis. Similique adipisci sit accusamus qui modi quis repellendus cum? Saepe accusantium eos ea aliquid perspiciatis nulla facilis modi tempora, molestiae tempore sequi nihil, ratione, delectus sapiente! Quibusdam facere eveniet sed. Distinctio quaerat minima at natus soluta!"
        }
        type={SENDER}
      />
      <div ref={messagesEndRef} />
    </Space>
  );
}
