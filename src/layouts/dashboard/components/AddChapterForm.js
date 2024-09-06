import React, { useState } from "react";
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

const AddChapterForm = ({ open, onClose, onAdd }) => {
  const [chapterName, setChapterName] = useState("");
  const [chapterPhoto, setChapterPhoto] = useState("");

  const handleSubmit = () => {
    const newChapter = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      title: chapterName,
      created: new Date().toISOString().split("T")[0], // Current date
    };
    onAdd(newChapter);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add Chapter
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
          label="Chapter Name"
          type="text"
          fullWidth
          variant="outlined"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
        />
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">File</Typography>
          <div style={{ marginTop: "10px" }}>
            <Typography variant="body1">Upload Chapter File</Typography>
            <input type="file" style={{ marginTop: "8px" }} />
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Quiz</Typography>
          <div style={{ marginTop: "10px" }}>
            <Typography variant="body1">Upload Quiz File</Typography>
            <input type="file" style={{ marginTop: "8px" }} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddChapterForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddChapterForm;
