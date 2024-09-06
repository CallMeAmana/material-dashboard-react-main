import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Settings() {
  const [profileInfo, setProfileInfo] = useState({
    name: "Richard Davis",
    email: "richard.davis@example.com",
    password: "",
    jobTitle: "CEO / Co-Founder",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };
  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const handleSave = () => {
    if (isVerifyingEmail) {
      // Verify the verification code and update the email
      if (verificationCode === "12345") {
        setProfileInfo({ ...profileInfo, email: newEmail });
        setIsVerifyingEmail(false);
        setVerificationCode("");
        setNewEmail("");
        console.log("Saved profile info:", profileInfo);
      } else {
        console.log("Invalid verification code");
      }
    } else {
      // Start the verification process
      setIsVerifyingEmail(true);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Card sx={{ p: 3, mt: 5 }}>
          <MDTypography variant="h6" fontWeight="medium">
            Settings
          </MDTypography>
          <MDBox mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MDInput
                  label="Name"
                  name="name"
                  value={profileInfo.name}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MDInput
                  label="Email"
                  name="email"
                  value={profileInfo.email}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MDInput
                  label="Password"
                  name="password"
                  type="password"
                  value={profileInfo.password}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MDInput
                  label="Job Title"
                  name="jobTitle"
                  value={profileInfo.jobTitle}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <MDBox mt={3}>
              <MDButton variant="gradient" color="info" onClick={handleSave}>
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Settings;
