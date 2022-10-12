import {
  TextField as TextFieldUI, withStyles
} from "@material-ui/core";

const TextField = withStyles({
  root: {
    marginTop: 20,
    marginBottom: 7,
    "& .MuiInputBase-root:last-child": {
      marginBottom: 20,
    },
    "& .MuiInputBase-input": {
      height: 19,
    },
    "& .MuiInputLabel-shrink": {
      fontSize: 16,
      color: "#000000",
      backgroundColor: "#ffffff",
      paddingLeft: 2,
      paddingRight: 2,
    },
    "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.09)",
      pointerEvents: "none",
      color: "#373737",
    },
  },
})((props) => {
  return (
    <TextFieldUI
      variant="outlined"
      size="small"
      fullWidth
      inputProps={{
        maxLength: 255,
      }}
      {...props}
      helperText={props.error && props.helperText}
    />
  );
});

export default TextField;
