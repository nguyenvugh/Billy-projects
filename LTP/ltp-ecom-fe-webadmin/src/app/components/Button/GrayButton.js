import { Button, withStyles } from "@material-ui/core";

const GrayButton = withStyles({
  root: {
    textTransform: "none",
    fontSize: 14,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#5C5C5C",
    borderColor: "#000000",
    height: 40,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#5C5C5C",
      borderColor: "#5C5C5C",
    },
    "&:active": {
      backgroundColor: "#5C5C5C",
      borderColor: "#5C5C5C",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      borderColor: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
      boxShadow: "none",
    },
  },
})(Button);

export default GrayButton;
