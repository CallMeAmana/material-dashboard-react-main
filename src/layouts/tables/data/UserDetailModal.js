/* eslint-disable react/prop-types */
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const UserDetailModal = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="user-modal-title">
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="user-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">
            <strong>Name:</strong> {`${user.nom} ${user.prenom}`}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.Role}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {user.status}
          </Typography>
          <Typography variant="body1">
            <strong>Joined:</strong> {new Date(user.modified).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserDetailModal;
