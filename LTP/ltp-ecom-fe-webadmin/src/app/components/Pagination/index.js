import { withStyles } from "@material-ui/core/styles";
import { Pagination as PaginationUI } from "@material-ui/lab";

const Pagination = withStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "24px",
    backgroundColor: "#ffffff",
    "& .Mui-selected": {
      backgroundColor: "#2F49D1",
      color: "#ffffff",
      pointerEvents: "none",
    }
  },
})(({ handleChangePage, ...rest }) => {
  const onChangePage = (e, page) => {
    handleChangePage instanceof Function && handleChangePage(page);
  }
  return (
    <PaginationUI variant="outlined" shape="rounded" size="large" onChange={onChangePage}  {...rest} />
  );
});

export default Pagination;
