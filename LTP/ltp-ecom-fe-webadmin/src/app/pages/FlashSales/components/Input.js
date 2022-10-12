import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Modal, InputBase, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
function Input({ id, defaultValue, labelName, placeholder, inputSuffix, onChange, readOnly, error, required, type, inputFormat, labelClassName, inputClassName, errorClassName }) {
  const classes = useStyles();
  const isError = error && error.length > 0 ? true : false;
  const [inputValue, setInputValue] = useState(defaultValue || '');

  const handleChange = (event) => {
    const value = event.target.value;
    let valueReplaced = value;
    if (type === 'number') valueReplaced = value.replace(/[^0-9]/g, '');
    if (type === 'decimal') valueReplaced = value.replace(/[^0-9.]/g, '');
    if (type === 'hour') valueReplaced = value.replace(/[^0-9:]/g, '');
    if (type === 'latLng') valueReplaced = value.replace(/[^0-9.]/g, '');
    setInputValue(valueReplaced);
    onChange && onChange(valueReplaced);
  };

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);


  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label} ${isError && classes.labelError} ${labelClassName}`}
        htmlFor={id || labelName}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> {required ? '*' : ''}</span>
      </InputLabel>
      <InputBase
        onChange={handleChange}
        id={id || labelName}
        error={isError}
        value={inputValue}
        readOnly={readOnly}
        disabled={readOnly}
        className={`${classes.input} ${isError && classes.inputError} ${inputClassName}`}
        placeholder={placeholder}
        endAdornment={
          <span className={`${readOnly && classes.suffixReadOnly} ${classes.suffix}`}>{inputSuffix}</span>
        }
      />
      {isError > 0 && <FormHelperText classes={{ root: `${classes.error} ${classes.errorClassName}` }} id={id || labelName}>{error}</FormHelperText>}
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
  suffixReadOnly: {
    color: '#A6A6A6'
  },
  inputError: {
    border: '1px solid #EA403F',
  },
  error: {
    fontSize: '10px',
    fontWeight: 400,
    color: '#EA403F'
  },
});



export default Input;