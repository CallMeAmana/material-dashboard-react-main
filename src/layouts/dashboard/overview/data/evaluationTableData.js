/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// Material Dashboard 2 React components
import { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import quiz from "assets/images/quiz.png";
import star from "assets/images/star.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
function Action() {
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Edit</MenuItem>
      <MenuItem onClick={closeMenu} style={{ color: "red" }}>
        Delete
      </MenuItem>
    </Menu>
  );
  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <MDBox color="text" px={2}>
        <Icon
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
          }}
          fontSize="semi-bold"
          onClick={openMenu}
        >
          more_vert
        </Icon>
      </MDBox>
      {renderMenu}
    </MDTypography>
  );
}
export default function data() {
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

  return {
    columns: [
      { Header: "Name", accessor: "author", width: "45%", align: "left" },
      { Header: "Last update", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: (
          <Button style={{ padding: "0px" }}>
            <Author image={quiz} name="Chapiter 1: Quiz" />
          </Button>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: <Action />,
      },
      {
        author: (
          <Button style={{ padding: "0px" }}>
            <Author image={quiz} name="Chapiter 2: Quiz" />
          </Button>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: <Action />,
      },
      {
        author: (
          <Button style={{ padding: "0px" }}>
            <Author image={quiz} name="Chapiter 3: Quiz" />
          </Button>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        action: <Action />,
      },
      {
        author: (
          <Button style={{ padding: "0px" }}>
            <Author image={quiz} name="Chapiter 4: Quiz" />
          </Button>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        action: <Action />,
      },
      {
        author: (
          <Button style={{ padding: "0px" }}>
            <Author image={quiz} name="Chapiter 5: Quiz" />
          </Button>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        action: <Action />,
      },
      {
        author: (
          <Button style={{ padding: "0px" }}>
            {" "}
            <Author image={quiz} name="Chapite 6: Quiz" />
          </Button>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        action: <Action />,
      },
      {
        author: (
          <Button style={{ padding: "0px" }}>
            {" "}
            <Author image={star} name="Test Final" />
          </Button>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/20
          </MDTypography>
        ),
        action: <Action />,
      },
    ],
  };
}
