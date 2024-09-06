import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/dashboard/overview/data/courseOverviewData";
import EditChapterForm from "../components/EditChapterForm";
import AddChapterForm from "../components/AddChapterForm";
import PropTypes from "prop-types";
const AddChapterButton = ({ onClick }) => {
  const buttonStyle = {
    backgroundColor: "#30D630",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    padding: "12px 25px",
    textAlign: "center",
    transition: "background-color 150ms, transform 150ms",
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = "#7ecb7e";
    e.target.style.transform = "translateY(-2px)";
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = "#30D630";
    e.target.style.transform = "translateY(0)";
  };

  AddChapterButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
    >
      Add Chapter
    </button>
  );
};

export default function CourseListe() {
  const [showEditChapterForm, setShowEditChapterForm] = useState(false);
  const [showAddChapterForm, setShowAddChapterForm] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [chapters, setChapters] = useState([
    { id: 1, title: "chapter 1: JavaScript", created: "2024-01-01" },
    { id: 2, title: "chapter 2: Python", created: "2024-02-01" },
    { id: 3, title: "chapter 3: PHP", created: "2024-02-01" },
    { id: 4, title: "chapter 4: React", created: "2024-02-01" },
  ]);

  const handleEditChapterFormClose = () => {
    setShowEditChapterForm(false);
  };

  const handleEditChapter = (chapter) => {
    setCurrentChapter(chapter);
    setShowEditChapterForm(true);
  };

  const handleDeleteChapter = (chapterID) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterID));
  };

  const handleChapterUpdate = (updatedChapter) => {
    setChapters(
      chapters.map((chapter) => (chapter.id === updatedChapter.id ? updatedChapter : chapter))
    );
    setShowEditChapterForm(false);
  };

  const handleAddChapterFormClose = () => {
    setShowAddChapterForm(false);
  };

  const handleAddChapter = (newChapter) => {
    setChapters([...chapters, newChapter]);
  };

  const { columns, rows } = authorsTableData(chapters, handleEditChapter, handleDeleteChapter);

  return (
    <div>
      <DashboardLayout>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  justifyContent="space-between"
                  display="flex"
                >
                  <MDTypography variant="h6" color="white">
                    Course Overview
                  </MDTypography>
                  <div style={{ marginRight: "30px" }}>
                    <AddChapterButton onClick={() => setShowAddChapterForm(true)} />
                  </div>
                </MDBox>

                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
              {currentChapter && (
                <EditChapterForm
                  chapter={currentChapter}
                  open={showEditChapterForm}
                  onClose={handleEditChapterFormClose}
                  onUpdate={handleChapterUpdate}
                />
              )}
              <AddChapterForm
                open={showAddChapterForm}
                onClose={handleAddChapterFormClose}
                onAdd={handleAddChapter}
              />
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </div>
  );
}
