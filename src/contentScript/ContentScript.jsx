import { Badge, Button, Card, Radio, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CloseCircleFilled, CloseCircleOutlined, CopyOutlined, MessageOutlined } from "@ant-design/icons";
import './ContentScript.css'
const { Text, Paragraph } = Typography
const overlayDimensions = {
  width: 250,
  height: 50,
}
const cardLayout = {
  width: 400,
  height: 500,
}
const ButtonGroup = Button.Group;
export default function ContentScript({ }) {
  const [show, setShow] = useState(false);
  const [showSummarize, setShowSummarize] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef()
  const screenSizes = { bottom: window.innerHeight, right: window.innerWidth }
  useEffect(() => {

    document.addEventListener(
      "mouseup",
      (e) => {
        if (e.target.id !== 'summarizeOverlay') {
          const selection = window.getSelection()
          const text = selection.toString().trim();
          const rect = selection.getRangeAt(0).getBoundingClientRect();

          if (text.length > 0) {

            setShow(true);
            setSelectedText(text);
            setShowSummarize(false)
            let x = rect.right
            let y = rect.bottom;
            if ((screenSizes.right - overlayDimensions.width) < rect.right) {
              x = screenSizes.right - overlayDimensions.width
            }
            if ((screenSizes.bottom - overlayDimensions.height) < rect.bottom) {
              y = screenSizes.bottom - overlayDimensions.height
            }
            setPosition({ x, y })
          } else {
            setShow(false)
          }
        }
      },
    );
    // document.addEventListener(
    //   "mousedown",
    //   function (e) {

    //     console.log('mousedown');
    //     setShow(false);
    //   },
    //   false
    // );
  }, []);
  const overlayStyle = {
    display: show ? "block" : "none",
    position: "fixed",
    top: position.y + "px",
    left: position.x + "px",
    zIndex: 100,
    color: "white",
    borderRadius: "5px",
    width: '100px',
  };
  const handleClickSummarize = () => {
    console.log('doing something');
    setShowSummarize(true)
    console.log(position);
    let { x, y } = position;
    if ((screenSizes.right - cardLayout.width) < position.x) {
      x = screenSizes.right - cardLayout.width - 10
    }
    if ((screenSizes.bottom - cardLayout.height) < position.y) {
      y = screenSizes.bottom - cardLayout.height - 10
    }
    setPosition({ x, y })
  }
  return (
    <div ref={ref} id="summarizeOverlay" style={overlayStyle} >
      <Badge
        count={
          <Button
            style={{ zIndex: 1000 }}
            type="link"
            icon={
              <CloseCircleFilled style={{ color: "#f5222d" }} />
            }
            onClick={() => setShow(false)}
          />
        }
      >
        {
          showSummarize ? (
            <Card
              className="my-card"
              title="Summary"
              style={cardLayout}
              actions={[
                <Button icon={<MessageOutlined />}>Continue To Sidebar</Button>,
                <Button icon={<CopyOutlined />}>Copy To Clipboard</Button>,
              ]}
            >
              <Paragraph
                ellipsis={
                  {
                    rows: 4,
                    expandable: false,
                  }
                }
                disabled
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero id debitis veritatis sed sit.
                Laudantium reprehenderit soluta consectetur beatae,
                hic amet sequi quas porro ullam eligendi eveniet inventore tempore saepe alias repellendus dolorum autem? Exercitationem ipsam cum consectetur ducimus quas eligendi labore maxime neque reiciendis, nobis atque inventore eum temporibus.
              </Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita possimus enim esse? Consequatur harum quidem, quam laudantium dolore iure fugit dolorem temporibus vero eius officia illum, dicta sed beatae amet dolores doloremque aperiam maiores. Velit suscipit deleniti neque? Laudantium tenetur ab delectus illo a aperiam cum, asperiores impedit nulla debitis quisquam minima, deserunt ullam accusamus recusandae rerum, quod nesciunt nihil. Quasi quod fugiat porro nisi pariatur quas expedita, reprehenderit rerum tempora voluptatem sequi provident placeat. Provident reiciendis rerum dolor corrupti, quisquam quod. Explicabo, blanditiis debitis quas fugiat dolorum totam voluptas officia, commodi voluptatem amet doloremque quod consectetur, architecto aliquid ex?
            </Card>) : (<ButtonGroup size="middle">
              <Button onClick={handleClickSummarize}>Summarize</Button>
              <Button>Key Points</Button>
            </ButtonGroup>)
        }

      </Badge>
    </div>
  );
}
