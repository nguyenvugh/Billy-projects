import { Select as SelectOption, withStyles } from "@material-ui/core";

const Select = withStyles({
  root: {
    height: 25,
    borderRadius: 4,
    border: "1px solid #0000003b",
    backgroundColor: "#ffffff",
    width: "100%",
    paddingLeft: 7,
    minWidth: 180,
    display: "flex",
    alignItems: "center",
    "&.Mui-disabled": {
      backgroundColor: "#f5f5f5"
    }
  },
})((props) => {
  return (
    <SelectOption {...props} />
  )
});

export default Select;
