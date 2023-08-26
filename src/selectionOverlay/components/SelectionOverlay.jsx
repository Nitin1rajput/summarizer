import { Badge, Button, Card, Typography, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const sendMessage = async (message) => {
    await chrome.runtime.sendMessage(message);
  };
  useEffect(() => {
    document.addEventListener("mouseup", async (e) => {
      if (e.target.id !== "summarize-app") {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text.length > 0) {
          setShow(true);
          setSelectedText(text);
          setShowSummarize(false);
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
          console.log(x, y, "selection");
          setPosition({ x, y });
          await sendMessage({
            from: "selectionOverlay",
            subject: "textSelected",
            body: text,
          });
        }
      }
    });
    window.addEventListener("click", (e) => {
      console.log(e.target.id);
      if (e.target.id === "summarize-overlay") {
        console.log("hiii");
      }
    });
  }, []);

  const handleClickSummarize = async () => {
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
    await chrome.runtime.sendMessage({
      from: "selectionOverlay",
      subject: "textSelected",
    });
  };

  const onCharacterTyped = () =>
    (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
  // window.onmouseover = (e) => console.log(e.clientX, e.clientY);
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Libero id debitis veritatis sed sit. Laudantium
                      reprehenderit soluta consectetur beatae, hic amet sequi
                      quas porro ullam eligendi eveniet inventore tempore saepe
                      alias repellendus dolorum autem? Exercitationem ipsam cum
                      consectetur ducimus quas eligendi labore maxime neque
                      reiciendis, nobis atque inventore eum temporibus.
                    </Paragraph>
                  </div>
                </>
              }
              style={cardLayout}
              actions={[
                <div className="container overlay-actions">
                  <Button
                    icon={<MessageOutlined />}
                    onClick={async () =>
                      sendMessage({
                        from: "selectionOverlay",
                        subject: "openSidepanel",
                      })
                    }
                    id="continue"
                  >
                    Continue To Sidebar
                  </Button>
                  ,<Button icon={<CopyOutlined />}>Copy</Button>
                </div>,
              ]}
            >
              <div
                ref={scrollRef}
                style={{ maxHeight: "150px", overflow: "auto" }}
              >
                <Typewriter
                  onType={onCharacterTyped}
                  typeSpeed={10}
                  words={[
                    `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Expedita possimus enim esse? Consequatur harum quidem, quam
                    laudantium dolore iure fugit dolorem temporibus vero eius
                    officia illum, dicta sed beatae amet dolores doloremque
                    aperiam maiores. Velit suscipit deleniti neque? Laudantium
                    tenetur ab delectus illo a aperiam cum, asperiores impedit
                    nulla debitis quisquam minima, deserunt ullam accusamus
                    recusandae rerum, quod nesciunt nihil. Quasi quod fugiat
                    porro nisi pariatur quas expedita, reprehenderit rerum
                    tempora voluptatem sequi provident placeat. Provident
                    reiciendis rerum dolor corrupti, quisquam quod. Explicabo,
                    blanditiis debitis quas fugiat dolorum totam voluptas
                    officia, commodi voluptatem amet doloremque quod
                    consectetur, architecto aliquid ex?`,
                  ]}
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
                <Button onClick={handleClickSummarize}>Summarize</Button>
                <Button onClick={handleClickSummarize}>Key Points</Button>
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
