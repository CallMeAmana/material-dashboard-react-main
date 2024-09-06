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
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddCourseForm = ({ open, onClose }) => {
  const [courseName, setCourseName] = useState("");
  const [coursePhoto, setCoursePhoto] = useState("");
  const [numChapters, setNumChapters] = useState(1);
  const [chapters, setChapters] = useState([{ name: "", pdf: "", quiz: "" }]);

  const handleNumChaptersChange = (event) => {
    const value = event.target.value;
    setNumChapters(value);

    const newChapters = Array.from(
      { length: value },
      (_, i) => chapters[i] || { name: "", pdf: "", quiz: "" }
    );
    setChapters(newChapters);
  };

  const handleChapterChange = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log({ courseName, coursePhoto, chapters });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add Course
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
          label="Course Name"
          type="text"
          fullWidth
          variant="outlined"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Course Photo URL"
          type="text"
          fullWidth
          variant="outlined"
          value={coursePhoto}
          onChange={(e) => setCoursePhoto(e.target.value)}
        />
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Number of Chapters</Typography>
          <input
            type="number"
            value={numChapters}
            onChange={handleNumChaptersChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        {chapters.map((chapter, index) => (
          <div key={index} style={{ marginTop: "20px" }}>
            <Typography variant="h6">Chapter {index + 1}</Typography>
            <TextField
              margin="dense"
              label="Chapter Name"
              type="text"
              fullWidth
              variant="outlined"
              value={chapter.name}
              onChange={(e) => handleChapterChange(index, "name", e.target.value)}
            />
            <div style={{ marginTop: "10px" }}>
              <Typography variant="body1">Upload Chapter PDF</Typography>
              <input
                type="file"
                onChange={(e) => handleChapterChange(index, "pdf", e.target.files[0])}
                style={{ marginTop: "8px" }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <Typography variant="body1">Upload Quiz</Typography>
              <input
                type="file"
                onChange={(e) => handleChapterChange(index, "quiz", e.target.files[0])}
                style={{ marginTop: "8px" }}
              />
            </div>
          </div>
        ))}
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

AddCourseForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddCourseForm;

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   IconButton,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const AddCourseForm = ({ open, onClose }) => {
//   const [courseName, setCourseName] = useState("");
//   const [coursePhoto, setCoursePhoto] = useState("");
//   const [numChapters, setNumChapters] = useState(1);
//   const [chapters, setChapters] = useState([{ name: "", pdf: "", quiz: "" }]);

//   const handleNumChaptersChange = (event) => {
//     const value = event.target.value;
//     setNumChapters(value);

//     const newChapters = Array.from(
//       { length: value },
//       (_, i) => chapters[i] || { name: "", pdf: "", quiz: "" }
//     );
//     setChapters(newChapters);
//   };

//   const handleChapterChange = (index, field, value) => {
//     const newChapters = [...chapters];
//     newChapters[index][field] = value;
//     setChapters(newChapters);
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log({ courseName, coursePhoto, chapters });
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>
//         Add Course
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Course Name"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={courseName}
//           onChange={(e) => setCourseName(e.target.value)}
//         />
//         <TextField
//           margin="dense"
//           label="Course Photo URL"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={coursePhoto}
//           onChange={(e) => setCoursePhoto(e.target.value)}
//         />
//         <FormControl fullWidth margin="dense">
//           <InputLabel>Number of Chapters</InputLabel>
//           <Select
//             value={numChapters}
//             onChange={handleNumChaptersChange}
//             variant="outlined"
//             label="Number of Chapters"
//             fullWidth
//           >
//             {[...Array(20).keys()].map((num) => (
//               <MenuItem key={num + 1} value={num + 1}>
//                 {num + 1}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         {chapters.map((chapter, index) => (
//           <div key={index} style={{ marginTop: "20px" }}>
//             <Typography variant="h6">Chapter {index + 1}</Typography>
//             <TextField
//               margin="dense"
//               label="Chapter Name"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={chapter.name}
//               onChange={(e) => handleChapterChange(index, "name", e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               label="Upload Chapter PDF"
//               type="file"
//               fullWidth
//               variant="outlined"
//               autoFocus
//               onChange={(e) => handleChapterChange(index, "pdf", e.target.files[0])}
//             />
//             <TextField
//               margin="dense"
//               label="Upload Quiz"
//               type="file"
//               fullWidth
//               variant="outlined"
//               onChange={(e) => handleChapterChange(index, "quiz", e.target.files[0])}
//             />
//           </div>
//         ))}
//         <div style={{ marginTop: "20px" }}>
//           <Typography variant="h6">Final Test</Typography>
//           <TextField
//             margin="dense"
//             label="Upload Final Test"
//             type="file"
//             fullWidth
//             variant="outlined"
//           />
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// AddCourseForm.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default AddCourseForm;
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import inputLabel from "assets/theme/components/form/inputLabel";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   IconButton,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const AddCourseForm = ({ open, onClose }) => {
//   const [courseName, setCourseName] = useState("");
//   const [coursePhoto, setCoursePhoto] = useState("");
//   const [numChapters, setNumChapters] = useState(1);
//   const [chapters, setChapters] = useState([{ name: "", pdf: "", quiz: "" }]);

//   const handleNumChaptersChange = (event) => {
//     const value = event.target.value;
//     setNumChapters(value);

//     const newChapters = Array.from(
//       { length: value },
//       (_, i) => chapters[i] || { name: "", pdf: "", quiz: "" }
//     );
//     setChapters(newChapters);
//   };

//   const handleChapterChange = (index, field, value) => {
//     const newChapters = [...chapters];
//     newChapters[index][field] = value;
//     setChapters(newChapters);
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log({ courseName, coursePhoto, chapters });
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>
//         Add Course
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Course Name"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={courseName}
//           onChange={(e) => setCourseName(e.target.value)}
//         />
//         <TextField
//           margin="dense"
//           label="Course Photo URL"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={coursePhoto}
//           onChange={(e) => setCoursePhoto(e.target.value)}
//         />
//         <FormControl fullWidth margin="dense">
//           <inputLabel>Number of Chapters</inputLabel>
//           <Select
//             value={numChapters}
//             onChange={handleNumChaptersChange}
//             variant="outlined"
//             label="Number of Chapters"
//             fullWidth
//           >
//             {[...Array(20).keys()].map((num) => (
//               <MenuItem key={num + 1} value={num + 1}>
//                 {num + 1}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         {chapters.map((chapter, index) => (
//           <div key={index} style={{ marginTop: "20px" }}>
//             <Typography variant="h6">Chapter {index + 1}</Typography>
//             <TextField
//               margin="dense"
//               label="Chapter Name"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={chapter.name}
//               onChange={(e) => handleChapterChange(index, "name", e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               label="Upload Chapter PDF"
//               type="file"
//               fullWidth
//               variant="outlined"
//               onChange={(e) => handleChapterChange(index, "pdf", e.target.files[0])}
//             />
//             <TextField
//               margin="dense"
//               label="Upload Quiz"
//               type="file"
//               fullWidth
//               variant="outlined"
//               onChange={(e) => handleChapterChange(index, "quiz", e.target.files[0])}
//             />
//           </div>
//         ))}
//         <div style={{ marginTop: "20px" }}>
//           <Typography variant="h6">Final Test</Typography>
//           <TextField
//             margin="dense"
//             label="Upload Final Test"
//             type="file"
//             fullWidth
//             variant="outlined"
//           />
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// AddCourseForm.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default AddCourseForm;
