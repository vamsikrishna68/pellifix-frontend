import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import "./ThanksPopup.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { secondsToTime } from "../../utils/formatter";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "60%",
  p: 0,
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  borderColor: "transparent",
};

function ThanksPopup({ open, handleClose }) {
  const [counter, setCounter] = useState(50);
  useEffect(() => {
    const timer = setInterval(() => timeCountDown(), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const timeCountDown = () => {
    if (counter === 0) {
      navigate("/auth/chat");
    } else {
      setCounter(counter - 1);
    }
  };
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="subscribe-popup"
    >
      <Box sx={style}>
        <div className="thanks-content">
          <div className="tc-1">
            <div className="tc-2">
              <h1>Thank you !</h1>
              <p>Thanks for subscribing to our news letter. </p>
              <p>you should receive a confirmation email soon </p>
              <button
                onClick={() => navigate("/auth/chat")}
                className="go-home"
              >
                Previous page
              </button>

              {counter ? (
                <p>
                  Redirecting to chat in <b>{secondsToTime(counter)}</b>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ThanksPopup;
