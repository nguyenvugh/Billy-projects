import {
  createStyles,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 20,
      marginBottom: 7,
      "& .MuiSelect-root": {
        height: 19,
      },
      "& .MuiFormHelperText-root": {
        height: 17,
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
      },
    },
  })
);

const SelectField = ({
  className,
  children,
  label,
  fullWidth = true,
  error,
  helperText,
  required,
  shrink,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant="outlined"
      size="small"
      className={clsx(classes.root, className)}
      fullWidth={fullWidth}
      error={error}
    >
      <InputLabel error={error} required={required} shrink={shrink}>
        {label}
      </InputLabel>
      {children}
      <FormHelperText error={error}>{error && helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;

const categories = [
  {
    id: 1,
    value: "BBN",
    label: "Bao bì nhựa",
  },
  {
    id: 2,
    value: "CNB",
    label: "Hộp nhự khuôn",
  },
];
