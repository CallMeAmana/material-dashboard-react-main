import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function UserDetailModal({ open, onClose, user }) {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <MDBox p={3} style={{ backgroundColor: "white", margin: "auto", width: "50%", top: "20%" }}>
        <MDTypography variant="h6" fontWeight="medium">
          User Details
        </MDTypography>
        <MDTypography variant="body1">Nom: {user.nom}</MDTypography>
        <MDTypography variant="body1">Role: {user.Role}</MDTypography>
        <MDTypography variant="body1">Modified: {user.modified}</MDTypography>
        {/* Add more details as needed */}
      </MDBox>
    </Modal>
  );
}

// Define prop types for validation
UserDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    nom: PropTypes.string,
    Role: PropTypes.string,
    modified: PropTypes.string,
  }).isRequired,
};

export default UserDetailModal;
