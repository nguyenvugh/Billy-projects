import { useState } from "react";

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
}));

const InputPassword = ({
  label,
  autoComplete = "new-password",
  required,
  placeholder,
  disabled,
  className,
  inputRef,
  name,
  error,
  helperText,
  value,
  onChange,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onChangeValue = (e) => {
    onChange instanceof Function && onChange(e);
  };
  return (
    <FormControl
      fullWidth
      className={[classes.root, className].join(" ")}
      variant="outlined"
      size="small"
      disabled={disabled}
    >
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChangeValue}
        error={error}
        name={name}
        inputRef={inputRef}
        required={required}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        inputProps={{
          autoComplete,
        }}
        autoComplete={autoComplete}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        fullWidth
      />
      {error && (
        <FormHelperText error={error}>{error && helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
export default InputPassword;
