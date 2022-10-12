import { Button, withStyles } from "@material-ui/core";

const PrimaryButton = withStyles({
  root: {
    textTransform: "none",
    fontSize: 14,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#2F49D1",
    borderColor: "#2F49D1",
    height: 40,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#303f9f",
      borderColor: "#303f9f"
    },
    "&:active": {
      backgroundColor: "#303f9f",
      borderColor: "#303f9f"
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      borderColor: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
      boxShadow: "none"
    },
    svg: {
      fontSize: "23px !important"
    }
  }
})(Button);

export default PrimaryButton;
