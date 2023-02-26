import React, { useEffect } from "react";
import { Modal, Box } from "@mui/material";
import "./ThanksPopup.scss";
import { useNavigate, useLocation } from "react-router-dom";

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
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ThanksPopup;
