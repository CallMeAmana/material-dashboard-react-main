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

const EditChapterForm = ({ chapter, open, onClose, onUpdate }) => {
  const [chapterName, setChapterName] = useState(chapter.title || "");
  const [chapterPhoto, setChapterPhoto] = useState("");

  useEffect(() => {
    setChapterName(chapter.title || "");
  }, [chapter]);

  const handleSubmit = () => {
    const updatedChapter = { ...chapter, title: chapterName };
    onUpdate(updatedChapter); // Pass updated chapter back to dashboard
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit chapter
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

EditChapterForm.propTypes = {
  chapter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditChapterForm;
