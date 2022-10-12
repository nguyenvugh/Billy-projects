import { FormHelperText, InputAdornment, InputBase, InputLabel, makeStyles } from '@material-ui/core';
import React from 'react';

function Input({ id, value, labelName, placeholder, inputSuffix, onChange, readOnly, error, required, type, inputFormat, inputProps }) {
  const classes = useStyles();
  const isError = error && error.length > 0 ? true : false;
  const handleChange = (event) => {
    const value = event.target.value;
    let valueReplaced = value;
    if (type === 'number') valueReplaced = value.replace(/[^0-9]/g, '');
    if (type === 'hour') {
      valueReplaced = value.replace(/[^0-9:]/g, '').replace(/:+/g, ':');
      if (valueReplaced.length === 2) {
        valueReplaced = valueReplaced.replace(/[^0-9]/g, '') + ":";
      }
    }
    if (type === 'latLng') valueReplaced = value.replace(/[^0-9.]/g, '');
    onChange && onChange(valueReplaced);
  };


  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label} ${isError && classes.labelError}`}
        htmlFor={id || labelName}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> *</span>
      </InputLabel>
      <InputBase
        onChange={handleChange}
        id={id || labelName}
        error={isError}
        value={value}
        readOnly={readOnly}
        disabled={readOnly}
        className={`${classes.input} ${isError && classes.inputError}`}
        placeholder={placeholder}
        inputProps={inputProps}
        endAdornment={
          <InputAdornment>
            <span className={classes.suffix}>{inputSuffix}</span>
          </InputAdornment>
        }
      />
      {isError > 0 && <FormHelperText classes={{ root: classes.error }} id={id || labelName}>{error}</FormHelperText>}
    </div>
  );
}

Input.defaultProps = {
  required: false,
  type: 'text'
};


const useStyles = makeStyles({
  root: {
    marginTop: '12px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#000000'
  },
  emptyLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: 'transparent'
  },
  input: {
    width: '100%',

    fontSize: '12px',
    fontWeight: 500,

    border: '1px solid #E2E2E2',
    borderRadius: '5px',
    padding: '4px 16px',

    marginTop: '6px',
    '& ::placeholder': {
      color: '#979797'
    }
  },
  suffix: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#000000',

    marginLeft: '16px'
  },
  labelError: {
    color: '#EA403F'
  },
  inputError: {
    border: '1px solid #EA403F',
  },
  error: {
    fontSize: '10px',
    fontWeight: 400,
    color: '#EA403F'
  }
});



export default Input;