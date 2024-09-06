import React from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({ open, onClose, user, onAccept, onReject }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <MDTypography variant="h4">User Details</MDTypography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        {user ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              value={user.nom}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Last Name"
              value={user.prenom}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Role"
              value={user.Role}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="E-mail"
              value={user.email}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Date"
              value={user.modified}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
            />
          </Box>
        ) : (
          <MDTypography variant="body1">No user details available.</MDTypography>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <MDButton
          onClick={() => {
            onAccept(user); // Call onAccept with the user details
            onClose();
          }}
          color="success"
          variant="outlined"
        >
          Accept
        </MDButton>
        <MDButton
          onClick={() => {
            onReject(user); // Call onReject with the user details
            onClose();
          }}
          color="error"
          variant="outlined"
        >
          Reject
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object, // Make sure to include user details as an object
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default CustomModal;
