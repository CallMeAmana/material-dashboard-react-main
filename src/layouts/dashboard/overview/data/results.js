import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import authorsTableData from "layouts/dashboard/overview/data/resultData";
import DataTable from "examples/Tables/DataTable";
export default function Result(Props) {
  const { columns: columns1, rows: rows1 } = authorsTableData(Props.rowData);

  return (
    <div>
      <Card>
        <MDBox pt={1}>
          <DataTable
            table={{ columns: columns1, rows: rows1 }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </Card>
    </div>
  );
}
