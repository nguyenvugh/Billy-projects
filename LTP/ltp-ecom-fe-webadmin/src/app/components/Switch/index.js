import { Switch as SwitchUI, withStyles } from "@material-ui/core";

const Switch = withStyles({
  root: {
    "& .MuiSwitch-switchBase": {
      color: "#B4B4B4",
    },
    "& .MuiSwitch-track": {
      opacity: 0.12,
    },
    "& .Mui-checked": {
      color: "#05EE00",
    },
    "& .Mui-checked + .MuiSwitch-track": {
      opacity: 0.5,
      backgroundColor: "rgba(5, 238, 0, 0.38)",
    },
  },
})((props) => {
  return (
    <SwitchUI {...props} />
  )
});

export default Switch;
