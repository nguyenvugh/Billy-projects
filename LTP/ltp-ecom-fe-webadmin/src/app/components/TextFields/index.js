import {
  IconButton,
  InputAdornment,
  InputBase,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import { useState } from "react";
import "./index.css";

const TextFields = ({
  children,
  className,
  label,
  required,
  error,
  errorDate,
  helperText,
  helperTextDate,
  type,
  value = "",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={clsx(className, (error || errorDate) && "text-field-error")}
    >
      {label && (
        <label className="text-field-label">
          {label} {required && <span>*</span>}
        </label>
      )}
      {children ? (
        children
      ) : (
        <OutlinedInput
          className="text-input"
          fullWidth
          error={error || errorDate}
          type={type === "password" && showPassword ? "text" : type}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end">
                <IconButton onClick={onChangeShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }
          value={value}
          {...rest}
        />
      )}
      {error && (
        <div className="text-field-message">
          {error && helperText}
          {errorDate && helperTextDate}
        </div>
      )}
    </div>
  );
};

export default TextFields;
