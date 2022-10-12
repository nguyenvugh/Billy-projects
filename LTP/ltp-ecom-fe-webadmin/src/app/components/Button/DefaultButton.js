import { Button, withStyles } from "@material-ui/core";

const DefaultButton = withStyles({
  root: {
    textTransform: "none",
    fontSize: 14,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    height: 40,
    color: "#000000",
    "&:hover": {
      backgroundColor: "#ffffff",
      borderColor: "#000000",
    },
    "&:active": {
      backgroundColor: "#ffffff",
      borderColor: "#000000",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      borderColor: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
      boxShadow: "none",
    },
  },
})(Button);

export default DefaultButton;
