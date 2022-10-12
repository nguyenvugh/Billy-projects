import { Button, withStyles } from "@material-ui/core";

const DangerButton = withStyles({
  root: {
    textTransform: "none",
    fontSize: 14,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#D70000",
    borderColor: "#D70000",
    height: 40,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#D70000",
      borderColor: "#D70000",
    },
    "&:active": {
      backgroundColor: "#D70000",
      borderColor: "#D70000",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      borderColor: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
      boxShadow: "none",
    },
  },
})(Button);

export default DangerButton;
