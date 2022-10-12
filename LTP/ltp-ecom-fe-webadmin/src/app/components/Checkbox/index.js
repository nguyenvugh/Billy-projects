import {
  Checkbox as CheckboxUI,
  createStyles,
  FormControlLabel,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: 0,
    },
  })
);

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled,
  style,
  indeterminate,
}) => {
  const classes = useStyles();
  const onChangeValue = (e) => {
    onChange instanceof Function && onChange(e);
  };
  return (
    <FormControlLabel
      className={classes.root}
      style={style}
      control={
        <CheckboxUI
          color="primary"
          checked={checked}
          onChange={onChangeValue}
          disabled={disabled}
          indeterminate={indeterminate}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
