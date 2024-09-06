import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditRequestForm = ({ request, open, onClose, onUpdate }) => {
  const [requestName, setrequestName] = useState(request.title || "");
  const [requestPhoto, setrequestPhoto] = useState("");

  useEffect(() => {
    setrequestName(request.title || "");
    // You may also want to set `requestPhoto` if it's part of the request object
  }, [request]);

  const handleSubmit = () => {
    const updatedrequest = { ...request, title: requestName, photo: requestPhoto };
    onUpdate(updatedrequest); // Pass updated request back to dashboard
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit request
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label=" Name"
          type="text"
          fullWidth
          variant="outlined"
          value={requestName}
          onChange={(e) => setrequestName(e.target.value)}
        />
        <TextField
          margin="dense"
          label=" Photo URL"
          type="text"
          fullWidth
          variant="outlined"
          value={Photo}
          onChange={(e) => setrequestPhoto(e.target.value)}
        />
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Final Test</Typography>
          <div style={{ marginTop: "10px" }}>
            <Typography variant="body1">Upload Final Test</Typography>
            <input type="file" style={{ marginTop: "8px" }} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditRequestForm.propTypes = {
  request: PropTypes.object.isRequired, // Changed from array to object
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired, // Add this prop type
};

export default EditRequestForm;
