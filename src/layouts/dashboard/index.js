import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import Button from "@mui/material/Button"; // Import Button
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import CourseCard from "./components/CourseCard";
import CustomModal from "./components/CustomModal";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [BannedUsers, setBannedUsers] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visibleRequests, setVisibleRequests] = useState(4); // State to control the number of visible requests
  const [acceptedProfessorsCount, setAcceptedProfessorsCount] = useState(0);
  const [acceptedStudentsCount, setAcceptedStudentsCount] = useState(0);
  useEffect(() => {
    // Fetch accepted professors count
    fetch(`http://127.0.0.1:5000/api/users/accepted/professors`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Accepted Professors Count:", data.count);
        setAcceptedProfessorsCount(data.count);
      })
      .catch((error) => console.error("Error fetching accepted professors count:", error));

    // Fetch accepted students count
    fetch(`http://127.0.0.1:5000/api/users/accepted/students`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Accepted Students Count:", data.count);
        setAcceptedStudentsCount(data.count);
      })
      .catch((error) => console.error("Error fetching accepted students count:", error));

    // Fetch new requests (status "new") from the API
    fetch(`http://127.0.0.1:5000/api/users/status/new`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("New users:", data);
        setRequests(data); // New requests
      })
      .catch((error) => console.error("Error fetching new requests:", error));

    // Fetch accepted requests
    fetch(`http://127.0.0.1:5000/api/users/status/accepted`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Accepted users:", data);
        setAcceptedRequests(data); // Accepted requests
      })
      .catch((error) => console.error("Error fetching accepted users:", error));

    fetch(`http://127.0.0.1:5000/api/users/status/banned`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("banned users:", data);
        setBannedUsers(data); // banned requests
      })
      .catch((error) => console.error("Error fetching banned users:", error));

    // Fetch rejected requests
    fetch(`http://127.0.0.1:5000/api/users/status/rejected`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Rejected users:", data);
        setRejectedRequests(data); // Rejected requests
      })
      .catch((error) => console.error("Error fetching rejected users:", error));
  }, []);
  // Filter accepted professors and students
  const handleEditRequest = (request) => {
    if (!request) return;

    // Update request status to 'accepted'
    const updatedRequest = { ...request, status: "accepted" };

    // Send a PUT request to update the status in the backend
    fetch(`http://127.0.0.1:5000/api/users/${request.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accepted" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update request status in the backend");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Request status updated in backend:", data);

        // Move request to acceptedRequests list and remove from requests list
        setRequests((prevRequests) => prevRequests.filter((req) => req.id !== request.id));
        setAcceptedRequests((prevAccepted) => [...prevAccepted, updatedRequest]);

        setCurrentRequest(updatedRequest);
        setShowEditForm(true);
      })
      .catch((error) => console.error("Error updating request status:", error));
  };

  const handleDeleteRequest = (request) => {
    if (!request) return;

    // Update request status to 'rejected'
    const updatedRequest = { ...request, status: "rejected" };

    // Send a PUT request to update the status in the backend
    fetch(`http://127.0.0.1:5000/api/users/${request.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "rejected" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update request status in the backend");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Request status updated in backend:", data);

        // Move request to rejectedRequests list and remove from requests list
        setRequests((prevRequests) => prevRequests.filter((req) => req.id !== request.id));
        setRejectedRequests((prevRejected) => [...prevRejected, updatedRequest]);

        setCurrentRequest(updatedRequest);
        setShowEditForm(true);
      })
      .catch((error) => console.error("Error updating request status:", error));
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setShowCustomModal(true);
  };

  const handleAccept = (user) => {
    fetch(`http://127.0.0.1:5000/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accepted" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User status updated:", data);
        // Optionally update the frontend with the new user data
        handleEditRequest(user);
      })
      .catch((error) => console.error("Error updating user status:", error));
  };

  const handleReject = (user) => {
    fetch(`http://127.0.0.1:5000/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "rejected" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User status updated:", data);
        // Optionally update the frontend with the new user data
        handleDeleteRequest(user);
      })
      .catch((error) => console.error("Error updating user status:", error));
  };

  const handleShowMoreRequests = () => {
    setVisibleRequests((prev) => prev + 4); // Increase the number of visible requests by 5
  };
  const handleShowLessRequests = () => {
    setVisibleRequests((prev) => Math.max(prev - 4, 4));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="people"
                title="New requests"
                count={requests.length > 0 ? requests.length : 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="people"
                title="Professors"
                count={acceptedProfessorsCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="people"
                title="Students"
                count={acceptedStudentsCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="people"
                title="Accepted users"
                count={acceptedRequests.length} // Show accepted requests count
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="people"
                title="Rejected users"
                count={rejectedRequests.length} // Show rejected requests count
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="people"
                title="Banned users"
                count={BannedUsers.length}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} lg={12}>
              <Card
                sx={{
                  position: "relative",
                  mt: 2,
                  mx: 0,
                  py: 2,
                  px: 2,
                }}
              >
                <MDBox pt={2} px={2} lineHeight={1.25}>
                  <MDTypography variant="h6" fontWeight="medium">
                    New Requests
                  </MDTypography>
                  <MDBox mb={3}>
                    <MDTypography variant="button" color="text">
                      {requests.length > 0 ? `${requests.length} New Requests` : "0 New Requests"}
                    </MDTypography>
                  </MDBox>
                </MDBox>

                <Grid container spacing={2}>
                  {requests.slice(0, visibleRequests).map((request) => (
                    <Grid item xs={12} md={6} lg={6} key={request.id}>
                      <CourseCard
                        key={request.id}
                        nom={request.nom}
                        prenom={request.prenom}
                        Role={request.Role}
                        modified={request.modified}
                        onClick={() => handleCardClick(request)}
                        onEdit={() => handleEditRequest(request)}
                        onDelete={() => handleDeleteRequest(request)}
                      />
                    </Grid>
                  ))}
                </Grid>
                {visibleRequests < requests.length && (
                  <MDBox textAlign="center" mt={2} display="flex" justifyContent="center" gap={2}>
                    <MDButton variant="contained" color="primary" onClick={handleShowMoreRequests}>
                      Show More Requests
                    </MDButton>
                    {visibleRequests > 4 && (
                      <MDButton variant="outlined" color="primary" onClick={handleShowLessRequests}>
                        Show Less Requests
                      </MDButton>
                    )}
                  </MDBox>
                )}
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {showCustomModal && (
        <CustomModal
          open={showCustomModal}
          onClose={() => setShowCustomModal(false)}
          user={selectedUser}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import MDBox from "components/MDBox";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import MDTypography from "components/MDTypography";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import CourseCard from "./components/CourseCard";
// import AddCourseButton from "./components/AddCourseButton";
// import AddCourseForm from "./components/AddCourseForm";

// function Dashboard() {
//   const { sales, tasks } = reportsLineChartData;
//   const [showForm, setShowForm] = useState(false);

//   const handleAddCourseClick = () => {
//     setShowForm(true);
//   };

//   const handleFormClose = () => {
//     setShowForm(false);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4} lg={4}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="dark"
//                 icon="book"
//                 nom="Courses"
//                 count={6}
//                 percentage={{
//                   color: "success",
//                   amount: "+55%",
//                   label: "than last week",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={4} lg={4}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 icon="people"
//                 nom="Students"
//                 count="2,300"
//                 percentage={{
//                   color: "success",
//                   amount: "+3%",
//                   label: "than last month",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={4} lg={4}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="success"
//                 icon="people"
//                 nom="Students Online"
//                 count="100"
//                 percentage={{
//                   color: "success",
//                   amount: "+1%",
//                   label: "than yesterday",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//         </Grid>
//         <MDBox>
//           <Grid container spacing={0}>
//             <Grid item xs={12} md={6} lg={12}>
//               <Card
//                 sx={{
//                   position: "relative",
//                   mt: 2,
//                   mx: 0,
//                   py: 2,
//                   px: 2,
//                 }}
//               >
//                 <MDBox pt={2} px={2} lineHeight={1.25}>
//                   <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <MDTypography variant="h6" fontWeight="medium">
//                       Your Courses
//                     </MDTypography>
//                     <AddCourseButton onClick={handleAddCourseClick} />
//                   </div>
//                   <MDBox mb={3}>
//                     <MDTypography variant="button" color="text">
//                       6 Courses
//                     </MDTypography>
//                   </MDBox>
//                 </MDBox>
//                 <MDBox p="2">
//                   <Grid container spacing={6}>
//                     <CourseCard
//                       image={require("assets/images/java.jpg")}
//                       nom={"JavaScript"}
//                       desc={"JavaScript Programming - Full Course"}
//                     />
//                     <CourseCard
//                       image={require("assets/images/java.jpg")}
//                       nom={"JavaScript"}
//                       desc={"JavaScript Programming - Full Course"}
//                     />
//                     <CourseCard
//                       image={require("assets/images/java.jpg")}
//                       nom={"JavaScript"}
//                       desc={"JavaScript Programming - Full Course"}
//                     />
//                     <CourseCard
//                       image={require("assets/images/java.jpg")}
//                       nom={"JavaScript"}
//                       desc={"JavaScript Programming - Full Course"}
//                     />
//                     <CourseCard
//                       image={require("assets/images/java.jpg")}
//                       nom={"JavaScript"}
//                       desc={"JavaScript Programming - Full Course"}
//                     />
//                     <CourseCard
//                       image={require("assets/images/java.jpg")}
//                       nom={"JavaScript"}
//                       desc={"JavaScript Programming - Full Course"}
//                     />
//                   </Grid>
//                 </MDBox>
//               </Card>
//               <AddCourseForm open={showForm} onClose={handleFormClose} />
//             </Grid>
//           </Grid>
//         </MDBox>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Dashboard;
