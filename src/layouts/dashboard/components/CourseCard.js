import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Box, Typography, IconButton, Paper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import "./CourseCard.css";

// eslint-disable-next-line react/prop-types
export default function CourseCard({ nom, prenom, Role, modified, onEdit, onDelete, onClick }) {
  return (
    <Paper
      elevation={3}
      className="course-card"
      style={{ borderRadius: "15px", cursor: "pointer" }}
      onClick={onClick} // Trigger the modal when the card is clicked
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" className="course-card-title">
            <span className="course-card-title">
              {nom} {prenom}
            </span>
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" className="course-card-info">
              Role: {Role}
            </Typography>
            <Typography variant="body2" className="course-card-info" style={{ marginLeft: "16px" }}>
              Date: {modified}
            </Typography>
          </Box>
        </Box>
        <Box className="course-card-actions">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEdit();
            }}
            color="success"
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
            color="error"
          >
            <DoDisturbIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

// Define the prop types for validation
CourseCard.propTypes = {
  nom: PropTypes.string.isRequired,
  Role: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import Grid from "@mui/material/Grid";

// export default function CourseCard(Props) {
//   return (
//     <>
//       <Grid item xs={12} md={6} xl={3}>
//         <DefaultProjectCard
//           image={Props.image}
//           title={Props.title}
//           description={Props.desc}
//           action={{
//             type: "internal",
//             route: "/dashboard/overview",
//             color: "info",
//             label: "Overview",
//           }}
//         />
//       </Grid>
//     </>
//   );
// }
