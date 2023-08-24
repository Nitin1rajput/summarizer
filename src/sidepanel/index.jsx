import { Card, Divider, Layout, Space, Typography } from "antd";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import ContentArea from "./components/ContentArea";
import InputArea from "./components/InputArea";
import { EditFilled } from "@ant-design/icons";
const { Content, Footer, Header } = Layout;
const { Text, Title } = Typography;
import "./styles/index.css";
const cardStyle = {
  height: "100%",
};
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
    // <Card style={cardStyle} actions={[<EditFilled />]} title="Summarizer">
    //   <ContentArea />

    //     <InputArea />

    // </Card>
    <Layout style={{ height: "100vh" }}>
      <Header style={headerStyle}>
        <img
          src="icon-16.png"
          style={{
            width: "40px",
            // marginTop: "10px",
            height: "43px",
            margin: 0,
          }}
        />
        <Divider type="vertical" style={{ height: "1.9em", margin: "0 5px" }} />
        <Text level={3}>Summarizer</Text>
      </Header>
      <Content style={contentStyle}>
        <ContentArea />
      </Content>
      <Footer style={footerStyle}>
        <InputArea />
      </Footer>
    </Layout>
  );
}
const container = document.createElement("div");
document.body.appendChild(container);
document.body.style.margin = 0;
document.body.style.padding = 0;

const root = createRoot(container);

root.render(<SidePanel />);
