import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "../../assets/logo.png";

function Chat() {
  useEffect(() => {
    addResponseMessage("Welcome to this **awesome** chat!");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };


  const getCustomLauncher = (handleToggle) =>
    <button onClick={handleToggle}>This is my launcher component!</button>

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="My new awesome title"
        subtitle="And my cool subtitle"
        launcher={handleToggle => getCustomLauncher(handleToggle)}
      />
    </div>
  );
}

export default Chat;
