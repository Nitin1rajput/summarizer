import React from "react";
import { createRoot } from "react-dom/client";
import { Divider, Layout, Typography } from "antd";
import { Helmet } from "react-helmet";
import { Typewriter } from "react-simple-typewriter";

import ContentArea from "./components/ContentArea";
import InputArea from "./components/InputArea";

import "./styles/index.css";
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
};
function SidePanel() {
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
          <ContentArea />
        </Content>
        <Footer style={footerStyle}>
          <InputArea />
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
