import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "../../assets/logo.png";
import SubscriptionPopup from "./SubscriptionPopup";

function Chat() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    addResponseMessage("Welcome to this **awesome** chat!");
    handleOpen()
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
      <SubscriptionPopup open={open} handleClose={handleClose} />
    </div>
  );
}

export default Chat;
