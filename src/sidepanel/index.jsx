import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Divider, Layout, Spin, Typography } from "antd";
import { Helmet } from "react-helmet";
import { Typewriter } from "react-simple-typewriter";

import ContentArea from "./components/ContentArea";
import InputArea from "./components/InputArea";

import "./styles/index.css";
import { LoadingOutlined } from "@ant-design/icons";
import { roles } from "./constants";
const { Content, Footer, Header } = Layout;
const { Text, Title } = Typography;

const headerStyle = {
  display: "flex",
  alignItems: "center",
  color: "#fff",
  height: 50,
  backgroundColor: "#fff",
  paddingLeft: 20,
  boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
  zIndex: 1,
};
const contentStyle = {
  textAlign: "center",
  background: "#fff",
  padding: "20px 10px",
  overflow: "auto",
  flexGrow: 1,
  scrollbarWidth: "thin",
  scrollbarColor: "#888 #f1f1f1",
};

const footerStyle = {
  width: "100%",
  background: "#fff",
  textAlign: "center",
  padding: "1.5rem",
  boxShadow: " rgba(0, 0, 0, 0.2) 0px -1px 5px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
};
const loadingDiv = {
  padding: "0 0 8px 8px",
};
function SidePanel() {
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState([]);
  const handleActionsSubmit = async ({ type, selectedText }) => {
    try {
      const content = selectedText;
      setGenerating(true);
      setSelectedText("");
      setMessages((prev) => [
        ...prev,
        { role: roles.USER, content: selectedText, typing: false },
      ]);
      const response = await fetch("http://localhost:3080/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          content: content,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        // doing something
        setMessages((prev) => [
          ...prev,
          { role: roles.ASSISTANT, content: data.data },
        ]);
      } else {
        throw new Error(data.message);
      }
      setGenerating(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (value) => {
    console.log(value, "values");
    try {
      if (value && value.length) {
        setGenerating(true);
        setMessages((prev) => [
          ...prev,
          { role: roles.USER, content: value, typing: false },
        ]);
        const response = await fetch("http://localhost:3080/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "NEW",
            messages: messages.map((msg) => ({
              content: msg.content,
              role: msg.role,
            })),
          }),
        });

        const data = await response.json();
        if (data.status === "success") {
          // doing something
          setMessages((prev) => [...prev, data.data]);
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Layout style={{ height: "100vh" }}>
        <Header style={headerStyle}>
          <img
            src="icon-16.png"
            style={{
              width: "40px",
              height: "43px",
              margin: 0,
              cursor: "pointer",
            }}
          />
          <Divider
            type="vertical"
            style={{ height: "1.9em", margin: "0 5px" }}
          />
          <Text className="app-title" level={3}>
            <Typewriter words={["Summarizer"]} />
            <span className="dots">...</span>
          </Text>
        </Header>
        <Content style={contentStyle}>
          <ContentArea
            messages={messages}
            onSubmit={handleActionsSubmit}
            setGenerating={setGenerating}
          />
        </Content>
        <Footer style={footerStyle}>
          {generating ? (
            <div style={loadingDiv}>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: "24px", marginRight: "8px" }}
                    spin
                  />
                }
              />
              <Typography.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                AI is generating text
              </Typography.Text>
            </div>
          ) : (
            ""
          )}

          <InputArea disabled={generating} onSubmit={onSubmit} />
        </Footer>
      </Layout>
    </>
  );
}
(() => {
  const container = document.createElement("div");
  if (!container) {
    throw new Error("Container not found");
  }
  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(<SidePanel />);
})();
