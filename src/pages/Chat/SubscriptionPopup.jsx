import React, { useEffect } from "react";
import { Modal, Typography, Box, Avatar, IconButton } from "@mui/material";
import "./SubscriptionPopup.scss";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "60%",
  bgcolor: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px !important",
  p: 2,
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  borderColor: "#fff",
};

function SubscriptionPopup({ open, handleClose }) {
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
        <img src={require("../../assets/img/details-1.png")} alt="subscribe" />
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Subscribe to our Pellifix
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Subscribe to chat with the person to your liking.
        </Typography>
        <Typography
          id="modal-button"
          sx={{ mt: 2 }}
          variant="subtitle1"
          component="span"
          onClick={() => navigate(`/auth/subscribe`)}
        >
          Subscribe
        </Typography>
      </Box>
    </Modal>
  );
}

export default SubscriptionPopup;
