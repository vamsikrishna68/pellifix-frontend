import React, { useEffect } from "react";
import SubscriptionPopup from "./SubscriptionPopup";
import { getMembership } from "../../api/api";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { ls } from "../../utils/localStorage";
import { Buffer } from "buffer";

function Chat() {
  const [open, setOpen] = React.useState(false);
  const [credential, setCredential] = React.useState(
    JSON.parse(ls.getItem("chat_keys")) || ""
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (credential && credential.token) {
      setCredential(base64ToJson(credential.token));
    } else {
      setCredential("");
    }
    checkSubscription();
  }, []);
  function base64ToJson(base64String) {
    const json = Buffer.from(base64String, "base64").toString();
    return JSON.parse(json);
  }

  const checkSubscription = async () => {
    try {
      const response = await getMembership();
      if (response && response.status >= 200 && response.status <= 300) {
        if (response?.data?.is_membership) {
          handleClose();
        } else {
          handleOpen();
        }
      }
    } catch (error) {
      handleClose();
      toast.error(
        error?.response?.data?.error?.message || "Something wend wrong",
        {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Zoom,
        }
      );
    }
  };

  return (
    <div style={{ height: "calc(100vh - 115px)" }}>
      {open ? (
        <SubscriptionPopup open={open} handleClose={handleClose} />
      ) : credential?.username && credential?.secret ? (
        <>
          <PrettyChatWindow
            projectId={process.env.REACT_APP_CHAT_PROJECT_ID || ""}
            username={credential.username}
            secret={credential.secret}
            style={{ height: "100%" }}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Chat;
