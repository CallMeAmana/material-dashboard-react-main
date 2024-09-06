// @mui material components
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// react-router components
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Data
function Overview() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (location.pathname === "/dashboard/overview") {
      navigate("/overview/course");
    }
  }, [location, navigate]);
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Course"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      school
                    </Icon>
                  }
                  component={Link}
                  to="/overview/course"
                />
                <Tab
                  label="Students"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      people
                    </Icon>
                  }
                  component={Link}
                  to="/overview/etudiants"
                />
                <Tab
                  label="Evaluation"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      assessment
                    </Icon>
                  }
                  component={Link}
                  to="/overview/evaluation"
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </DashboardLayout>
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
      <DashboardLayout>
        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default Overview;
