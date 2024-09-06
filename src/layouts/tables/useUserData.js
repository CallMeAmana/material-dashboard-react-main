/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import CustomModal from "./CustomModal"; // Make sure the path to CustomModal is correct

const useUserData = () => {
  const [professorColumns, setProfessorColumns] = useState([]);
  const [professorRows, setProfessorRows] = useState([]);
  const [studentColumns, setStudentColumns] = useState([]);
  const [studentRows, setStudentRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For modal
  const [modalOpen, setModalOpen] = useState(false); // For modal

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/users");
      const result = await response.json();

      // Filter out new users and include only those with status "accepted", "rejected", or "banned"
      const filteredUsers = result.filter((user) =>
        ["accepted", "rejected", "banned"].includes(user.status)
      );

      const professorData = filteredUsers.filter((user) => user.Role === "Professor");
      const studentData = filteredUsers.filter((user) => user.Role === "Student");

      const columns = [
        { Header: "User", accessor: "author", width: "30%", align: "center" },
        { Header: "Role", accessor: "function", align: "left" },
        { Header: "Status", accessor: "status", align: "center" },
        { Header: "Joined", accessor: "employed", align: "center" },
        { Header: "Action", accessor: "action", align: "center" },
      ];

      setProfessorColumns(columns);
      setProfessorRows(createRows(professorData));
      setStudentColumns(columns);
      setStudentRows(createRows(studentData));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
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
        console.log("User banned successfully");
        fetchData(); // Refresh the data after banning the user
      } else {
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
        console.log("User deleted successfully");
        fetchData(); // Refresh the data after deleting the user
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to open the modal and show user details
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleAccept = (user) => {
    console.log("User accepted:", user);
    // Add logic for accepting the user
    handleModalClose();
  };

  const handleReject = (user) => {
    console.log("User rejected:", user);
    // Add logic for rejecting the user
    handleModalClose();
  };

  const Author = ({ name, email, onClick }) => (
    <MDBox
      display="flex"
      alignItems="center"
      lineHeight={1}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
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

  const createRows = (data) => {
    return data.map((user) => {
      const action =
        user.status === "accepted" ? (
          <MDBox display="flex" justifyContent="center" alignItems="center">
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="warning"
              fontWeight="medium"
              onClick={() => handleBan(user.id)}
            >
              <Icon>block</Icon>&nbsp;Ban
            </MDTypography>
            <MDBox mx={2} />
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="error"
              fontWeight="medium"
              onClick={() => handleDelete(user.id)}
            >
              <Icon>delete</Icon>&nbsp;Delete
            </MDTypography>
          </MDBox>
        ) : (
          <MDBox display="flex" justifyContent="center" alignItems="center">
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="error"
              fontWeight="medium"
              onClick={() => handleDelete(user.id)}
            >
              <Icon>delete</Icon>&nbsp;Delete
            </MDTypography>
          </MDBox>
        );

      return {
        author: (
          <Author
            name={`${user.nom} ${user.prenom}`}
            email={user.email}
            onClick={() => handleUserClick(user)}
          />
        ),
        function: <Job title={user.Role} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={user.status}
              color={
                user.status === "accepted"
                  ? "success"
                  : user.status === "banned"
                  ? "warning"
                  : "dark"
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
  };

  return {
    professorColumns,
    professorRows,
    studentColumns,
    studentRows,
    modalOpen,
    selectedUser,
    handleModalClose,
    handleBan,
    handleDelete,
  };
};

export default useUserData;
