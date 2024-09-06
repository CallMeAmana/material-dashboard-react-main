/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// Material Dashboard 2 React components
import { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import book from "assets/images/book.png";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

import PropTypes from "prop-types";

function Action({ onEdit, onDelete, chapter }) {
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleEdit = () => {
    onEdit(chapter);
    closeMenu();
  };

  const handleDelete = () => {
    onDelete(chapter.id);
    closeMenu();
  };

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
      <MenuItem onClick={handleEdit}>Edit</MenuItem>
      <MenuItem onClick={handleDelete} style={{ color: "red" }}>
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

Action.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  chapter: PropTypes.object.isRequired,
};

export default function data(rowData, onEdit, onDelete) {
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
      { Header: "Chapter", accessor: "author", width: "45%", align: "left" },
      { Header: "Created", accessor: "date", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: rowData.map((chapter) => ({
      author: <Author image={book} name={chapter.title} />,
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {chapter.created}
        </MDTypography>
      ),
      action: <Action chapter={chapter} onEdit={onEdit} onDelete={onDelete} />,
    })),
  };
}
