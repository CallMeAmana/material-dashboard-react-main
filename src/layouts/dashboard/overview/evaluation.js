import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import authorsTableData2 from "layouts/dashboard/overview/data/evaluationTableData";
import DataTable from "examples/Tables/DataTable";
import Result from "./data/results";

///images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useState } from "react";

export default function Evalution() {
  const data = [
    {
      name: "John Michael",
      email: "john@creative-tim.com",
      status: "passed",
      result: "20/20",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      status: "passed",
      result: "20/20",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      image: team4,
      email: "laurent@creative-tim.com",
      status: "passed",
      result: "20/20",
      date: "23/04/18",
    },
    {
      name: "Michael Levi",
      image: team3,
      email: "michael@creative-tim.com",
      status: "passed",
      result: "20/20",
      date: "23/04/18",
    },
    {
      name: "Richard Gran",
      image: team3,
      email: "richard@creative-tim.com",
      status: "passed",
      result: "20/20",
      date: "23/04/18",
    },
    {
      name: "Miriam Eric",
      image: team4,
      email: "miriam@creative-tim.com",
      status: "failed",
      result: "9/20",
      date: "23/04/18",
    },
  ];

  const [rowData, setRowsData] = useState(data);
  const { columns: columns2, rows: rows2 } = authorsTableData2();

  return (
    <div>
      <DashboardLayout>
        <MDBox pt={6} pb={3}>
          <MDBox
            mx={0}
            mt={-3}
            py={3}
            px={2}
            mb={3}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              evaluation
            </MDTypography>
          </MDBox>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card>
                <MDBox pt={1}>
                  <DataTable
                    table={{ columns: columns2, rows: rows2 }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Result rowData={rowData} />
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </div>
  );
}
