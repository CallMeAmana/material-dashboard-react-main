// Material Dashboard 2 React Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

const { text, info } = colors;
const { size } = typography;

const inputLabel = {
  styleOverrides: {
    root: {
      fontSize: size.lg, // Increase font size to 'lg'
      color: text.main,
      lineHeight: 1.5, // Adjust line height if necessary

      "&.Mui-focused": {
        color: info.main,
      },

      "&.MuiInputLabel-shrink": {
        lineHeight: 1.5,
        fontSize: size.lg, // Ensure the size is consistent when label shrinks

        "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "1em", // Match the font size of the legend if necessary
        },
      },
    },

    sizeSmall: {
      fontSize: size.md, // Adjust size for small variant if needed
      lineHeight: 1.625,

      "&.MuiInputLabel-shrink": {
        lineHeight: 1.6,
        fontSize: size.md, // Consistent size when shrunk

        "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "0.85em",
        },
      },
    },
  },
};

export default inputLabel;
