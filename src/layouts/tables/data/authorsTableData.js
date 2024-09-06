/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox"; // Replace with actual imports
import MDTypography from "components/MDTypography"; // Replace with actual imports
import MDBadge from "components/MDBadge"; // Replace with actual imports
import { Icon, Box } from "@mui/material"; // Replace with actual imports

export default function DataTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/users"); // Replace with your actual API endpoint
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const handleBan = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${userId}/ban`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Handle successful ban (e.g., update UI or show a success message)
        console.log("User banned successfully");
        // Optionally, refresh the user list or remove the banned user from the UI
      } else {
        // Handle errors (e.g., user not found)
        console.error("Failed to ban user");
      }
    } catch (error) {
      console.error("Error while banning user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUserData(userData.filter((user) => user.id !== userId));
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "User", accessor: "author", width: "30%", align: "center" },
    { Header: "Role", accessor: "function", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "Joined", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = userData.map((user) => {
    const action =
      user.status === "accepted" ? (
        <>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="warning"
            fontWeight="medium"
            onClick={() => handleBan(user.id)} // Function to handle banning the user
          >
            <Icon>block</Icon>
            Ban
          </MDTypography>
          <Box mx={2} />
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="error"
            fontWeight="medium"
            onClick={() => handleDelete(user.id)}
          >
            <Icon>delete</Icon>
            Delete
          </MDTypography>
        </>
      ) : (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="error"
          fontWeight="medium"
          onClick={() => handleDelete(user.id)}
        >
          <Icon>delete</Icon>
          Delete
        </MDTypography>
      );

    return {
      author: <Author name={`${user.nom} ${user.prenom}`} email={user.email} />,
      function: <Job title={user.Role} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={user.status}
            color={
              user.status === "accepted" ? "success" : user.status === "banned" ? "warning" : "dark"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {new Date(user.modified).toLocaleDateString()}
        </MDTypography>
      ),
      action: action,
    };
  });

  return {
    columns,
    rows,
  };
}
