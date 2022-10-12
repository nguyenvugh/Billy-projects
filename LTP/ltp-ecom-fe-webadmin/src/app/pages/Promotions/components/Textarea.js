import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Modal, InputBase, InputAdornment, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import { TrendingUpTwoTone } from '@material-ui/icons';

function Textarea({ id, defaultValue, labelName, placeholder, onChange, readOnly, required }) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(defaultValue || '');
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);


  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label}`}
        htmlFor={id || labelName}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> {required ? '*' : ''}</span>
      </InputLabel>
      <textarea
        id={id || labelName}
        onChange={handleChange}
        value={inputValue}
        readOnly={readOnly}
        disabled={readOnly}
        className={classes.input}
        placeholder={placeholder} />
    </div>
  );
}

Textarea.defaultProps = {
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
    height: 100,
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: 'Montserrat',

    border: '1px solid #E2E2E2',
    borderRadius: '5px',
    padding: 16,
    whiteSpace: 'pre-line',

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



export default Textarea;