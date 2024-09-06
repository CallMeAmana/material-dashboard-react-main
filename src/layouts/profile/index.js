import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";

function Overview() {
  const [isEditing, setIsEditing] = useState(false);

  const [initialProfileInfo, setInitialProfileInfo] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson26@yahoo.com",
    role: "Admin",
    Password: "******", // Mot de passe (masqué par défaut) // Ajout de l'image dans le profil
  });
  const [userId, setUserId] = useState("64c68b4a02d0ce73013220f6"); // Example user ID, replace with actual user ID
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };
  const [profileInfo, setProfileInfo] = useState(initialProfileInfo);

  const handleCancel = () => {
    // Revert the profileInfo to initialProfileInfo and exit editing mode
    setProfileInfo(initialProfileInfo);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prenom: profileInfo.firstName,
          nom: profileInfo.lastName,
          email: profileInfo.email,
          Role: profileInfo.role,
          mdp: profileInfo.Password,
          image: profileInfo.image, // Consider handling image uploads separately
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      // Handle successful update
      setIsEditing(false); // Close the edit mode after saving changes
    } catch (error) {
      console.error("Error while saving profile:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        name={`${profileInfo.firstName} ${profileInfo.lastName}`}
        role={profileInfo.role}
        image={profileInfo.image}
      >
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Divider orientation="vertical" md={{ ml: -2, mr: 1 }} />
            {!isEditing ? (
              <>
                <ProfileInfoCard title="Profile Information" info={profileInfo} shadow={false} />
                <MDBox mt={2}>
                  <Button variant="contained" color="dark" onClick={handleEditToggle}>
                    Modifier le Profil
                  </Button>
                </MDBox>
              </>
            ) : (
              <MDBox p={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  Edit Profile Information
                </MDTypography>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={profileInfo.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last "
                  name="lastName"
                  value={profileInfo.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={profileInfo.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Role"
                  name="role"
                  value={profileInfo.role}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  name="Password"
                  type="password"
                  value={profileInfo.Password}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <MDBox mt={5} display="flex" justifyContent="space-between">
                  <MDButton variant="contained" color="info" onClick={handleSave}>
                    Save
                  </MDButton>
                  <Button variant="contained" color="dark" onClick={handleCancel}>
                    Cancel
                  </Button>
                </MDBox>
              </MDBox>
            )}
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
