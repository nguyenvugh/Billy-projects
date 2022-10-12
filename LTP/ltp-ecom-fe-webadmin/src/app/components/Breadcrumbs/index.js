import { Breadcrumbs as BreadcrumbsUI, withStyles } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

const Breadcrumbs = withStyles({
  root: {
    "& .MuiTypography-root, a": {
      color: "#000000",
      fontSize: 18,
      fontWeight: 600,
      textDecoration: "none",
      "& hover": {
        textDecoration: "none",
      }
    },
    "& .MuiBreadcrumbs-separator": {
      color: "#000000",
    },
  },
})((props) => {
  return (
    <BreadcrumbsUI
      separator={<NavigateNext />}
      aria-label="breadcrumb"
      {...props}
    />
  );
});

export default Breadcrumbs;
