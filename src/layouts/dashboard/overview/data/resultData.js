import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
export default function data(rowData) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  Author.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  return {
    columns: [
      { Header: "Name", accessor: "author", width: "45%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Result", accessor: "result", align: "center" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: rowData.map(({ name, image, email, status, result, date }) => ({
      author: <Author image={image} name={name} email={email} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={status}
            color={status === "passed" ? "success" : "error"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      result: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {result}
        </MDTypography>
      ),
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {date}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    })),
  };
}
