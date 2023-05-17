import React, { useEffect } from "react";
import SubscriptionPopup from "./SubscriptionPopup";
import { PrettyChatWindow } from "react-chat-engine-pretty";

function Chat() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div style={{ height: "calc(100vh - 115px)" }}>
      <PrettyChatWindow
        projectId={'6151a0e4-48fc-4a3d-b67c-1ee393c7699c' || ""}
        username="pm000073" //{props.user.username}
        secret="pellifix_PM000073" //{props.user.secret}
        style={{ height: "100%" }}
      />
      {/* <SubscriptionPopup open={open} handleClose={handleClose} /> */}
    </div>
  );
}

export default Chat;
