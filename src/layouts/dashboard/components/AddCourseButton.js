import React from "react";
import PropTypes from "prop-types";

const AddCourseButton = ({ onClick }) => {
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

  return (
    <button
      style={buttonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
    >
      Add Course
    </button>
  );
};

AddCourseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddCourseButton;
