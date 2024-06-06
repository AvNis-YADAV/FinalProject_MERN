import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";
import "./Bot.css";

function Bot() {
  const [chatBox, setChatBox] = useState(false);
  const [username, setUsername] = useState(null);

  const usName = localStorage.getItem("user");
  let nextTrigger;

  useEffect(function() {
    setUsername(usName);
    console.log(username);
    nextTrigger = `${username === null ? "Ask Name" : "Name"}`;
    console.log(nextTrigger);
  });

  const handleChatBot = () => {
    setChatBox((visible) => !visible);
  };

  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to GigFindr",
      trigger: "Ask Name",
    },
    {
      id: "Ask Name",
      message: "Please enter your name",
      trigger: "waiting1",
    },
    {
      id: "waiting1",
      user: true,
      trigger: "Name",
    },
    {
      id: "Name",
      message: "Hi {previousValue}, Please select your issue",
      // message: `${
      //   username === null ? "Hi {previousValue}" : `Hi ${username._id}`
      // }, Please select your issue`,
      trigger: "issues",
    },
    {
      id: "issues",
      options: [
        { value: "AI", label: "AI", trigger: "AI" },
        { value: "Video", label: "Video", trigger: "Video" },

        { value: "Logo Design", label: "Logo Design", trigger: "Logo Design" },
        { value: "SEO", label: "SEO", trigger: "SEO" },
        { value: "Video Over", label: "Video Over", trigger: "Video Over" },
        {
          value: "Video Explainer",
          label: "Video Explainer",
          trigger: "Video Explainer",
        },
        {
          value: "Social Media",
          label: "Social Media",
          trigger: "Social Media",
        },
        { value: "Translation", label: "Translation", trigger: "Translation" },
        { value: "Book Cover", label: "Book Cover", trigger: "Book Cover" },
        { value: "Data Entry", label: "Data Entry", trigger: "Data Entry" },
        { value: "Wordpress", label: "Wordpress", trigger: "Wordpress" },
      ],
    },
    {
      id: "AI",
      message: "Thanks for telling AI issue",
      end: true,
    },
    {
      id: "Video",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Logo Design",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "SEO",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Video Over",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Video Explainer",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Social Media",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Translation",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Book Cover",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Data Entry",
      message: "Thanks for telling video issue",
      end: true,
    },
    {
      id: "Wordpress",
      message: "Thanks for telling video issue",
      end: true,
    },
  ];

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
          zIndex: "1",
          backgroundColor: "#6e48aa",
          borderRadius: "10px",
        }}
      >
        {chatBox ? (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span
                style={{
                  outline: "none",
                  background: "none",
                  color: "white",
                  fontSize: "25px",
                  width: "20px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={() => handleChatBot()}
              >
                X
              </span>
            </div>

            <Segment floated="right" hideHeader={true}>
              <ChatBot width="23vw" steps={steps} />
            </Segment>
          </>
        ) : (
          <div className="botIcon" onClick={() => handleChatBot()}>
            <div className="botIconContainer">
              <div className="iconInner">
                <i className="fa fa-commenting" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Bot;
