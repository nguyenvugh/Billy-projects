import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    padding: "4px 12px",
    border: "1px solid",
    borderRadius: "14px",
    whiteSpace: "nowrap",
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center",
  },
}));

const Status = ({ label, className, style }) => {
  const classes = useStyles();
  return <span style={style} className={clsx(classes.root, className)}>{label}</span>;
};

export default Status;
