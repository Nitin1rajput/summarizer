import { Badge, Button, Card, Typography, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseOutlined,
  CopyOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "../styles/selection-overlay.css";
import { Typewriter } from "react-simple-typewriter";
// constants
const { Paragraph } = Typography;
const ButtonGroup = Button.Group;

const screenSizes = { y: window.innerHeight, x: window.innerWidth };
const constants = {
  SUMMARY: "SUMMARY",
  KEY_POINTS: "KEY_POINTS",
};
// styles
const overlayDimensions = {
  width: 250,
  height: 30,
};
const cardLayout = {
  width: 350,
  maxHeight: 400,
};

const overlayStyle = {
  zIndex: 100,
  color: "white",
  borderRadius: "8px",
  width: "100px",
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 12px 0px",
  animation: "fadein .3s ease-in-out",
};

export default function SelectionOverlay({}) {
  // refs
  const scrollRef = useRef();
  // states
  const [show, setShow] = useState(false);
  const [showSummarize, setShowSummarize] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isCopied, setIsCopied] = useState(false)
  useEffect(() => {

    document.addEventListener("mouseup", async (e) => {
      try {
        if (e.target.id !== "summarize-app") {
          const selection = window.getSelection();
          const text = selection.toString().trim();

          if (text.length > 0) {
            setShow(true);
            setSelectedText(prevText => {
              if (text !== prevText) {
                setShowSummarize(false);
              }
              return text
            });
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            const relative = document.body.parentNode.getBoundingClientRect();

            let x = rect.right; // right of the selected text from left
            let y = rect.bottom - relative.top; // bottom of the selected text from top

            if (screenSizes.x - overlayDimensions.width < x) {
              x = screenSizes.x - overlayDimensions.width;
            }
            if (screenSizes.y - overlayDimensions.height < rect.y) {
              y -= overlayDimensions.height;
            }
            setPosition({ x, y });
          }
          await sendMessage({
            from: "selectionOverlay",
            subject: "textSelected",
            body: text,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  // methods
  const clearSelection = () => {
    if (window.getSelection) { window.getSelection().removeAllRanges(); }
    else if (document.selection) { document.selection.empty(); }
  }

  const sendMessage = async (message) => {
    console.log("sending from overlay");
    await chrome.runtime.sendMessage(message);
  };
  const countWords = (str) => {
    return str.trim().split(/\s+/).length;
  }
  const handleClickSummarize = async (type) => {
    try {
      setShowSummarize(true);
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      let x = rect.right; // right of the selected text from left
      let y = rect.bottom; // bottom of the selected text from top

      if (screenSizes.x - cardLayout.width < x) {
        x = screenSizes.x - cardLayout.maxHeight - 20;
      }
      if (screenSizes.y - cardLayout.maxHeight < y) {
        y = screenSizes.y - cardLayout.maxHeight - 10;
      }
      setPosition({ x, y });
      // api work
      setLoading(true);
      if (countWords(selectedText) > 2) {

        const response = await fetch("http://localhost:3080/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type,
            content: selectedText,
          }),
        });
        const data = await response.json();
        if (data.status === "success") {
          // doing something
          setSummary([data.data]);
        } else {
          throw new Error(data.message);
        }
      } else {
        setSummary('Content is too short to summarize')
      }
      setLoading(false);
      clearSelection()
    } catch (err) {
      console.log(err);
    }
  };

  const openSidepanel = async () => {
    await sendMessage({
      from: "selectionOverlay",
      subject: "openSidepanel",
    });
    await sendMessage({
      from: "selectionOverlay",
      subject: "textSelected",
      body: selectedText,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText);
    setIsCopied(true)
    const timeout = setTimeout(() => {
      console.log('doing');
      setIsCopied(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }
  return (
    <div className="summarize-app" id="summarize-app">
      {show ? (
        <div
          id="summarize-overlay"
          style={{
            ...overlayStyle,
            top: position.y + "px",
            left: position.x + "px",
            position: "absolute",
          }}
          onMouseEnter={() => setShowBadge(true)}
          onMouseLeave={() => setShowBadge(false)}
        >
          {showSummarize ? (
            <Card
              loading={loading}
              className="my-card"
              title={
                <>
                  <div className="container">
                    <Typography.Title level={3}>Summary</Typography.Title>
                    <Button
                      type="link"
                      icon={
                        <CloseOutlined
                          style={{
                            color: "rgb(108 108 108)",
                            fontSize: "1.3rem",
                          }}
                        />
                      }
                      onClick={() => setShow(false)}
                    />
                  </div>
                  <div
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                      marginBottom: "5px",
                      boxShadow:
                        "rgba(50, 50, 93, 0.10) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.2) 0px 0px 36px -19px inset",
                    }}
                  >
                    <Paragraph
                      ellipsis={{
                        rows: 2,
                        expandable: false,
                      }}
                    >
                      {selectedText}
                    </Paragraph>
                  </div>
                </>
              }
              style={cardLayout}
              actions={[
                <div className="container overlay-actions">
                  <Button
                    icon={<MessageOutlined />}
                    onClick={() => openSidepanel()}
                    id="continue"
                  >
                    Continue To Sidebar
                  </Button>
                  ,<Button onClick={handleCopy} icon={isCopied ? <CheckCircleOutlined /> : <CopyOutlined />}>{isCopied ? 'Copied' : 'Copy'}</Button>
                </div>,
              ]}
            >
              <div
                ref={scrollRef}
                style={{
                  maxHeight: "150px",
                  overflow: "auto",
                  whiteSpace: "pre-line",
                }}
              >
                <Typewriter
                  typeSpeed={10}
                  words={[`${summary}`]}
                />
              </div>
            </Card>
          ) : (
            <Badge
              style={{ display: showBadge ? "block" : "none" }}
              count={
                <Button
                  style={{ zIndex: 100 }}
                  type="link"
                  icon={<CloseCircleFilled style={{ color: "#f5222d" }} />}
                  onClick={() => setShow(false)}
                />
              }
            >
              <ButtonGroup size="middle">
                <Button onClick={() => handleClickSummarize(constants.SUMMARY)}>
                  Summarize
                </Button>
                <Button
                  onClick={() => handleClickSummarize(constants.KEY_POINTS)}
                >
                  Key Points
                </Button>
              </ButtonGroup>
            </Badge>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
