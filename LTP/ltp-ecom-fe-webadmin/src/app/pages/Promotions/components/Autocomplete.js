import React, { useEffect, useState, useCallback } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

import { InputAdornment, InputBase, InputLabel, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '12px',
    position: 'relative'
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    color: '#000000',
  },
  input: {
    width: '100%',

    fontSize: '12px',
    fontWeight: 500,

    border: '1px solid #E2E2E2',
    borderRadius: '5px',
    padding: '4px 8px 4px 16px',

    marginTop: '6px',
    '& ::placeholder': {
      color: '#979797'
    }
  },
  emptyLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: 'transparent'
  },
  listbox: {
    width: '100%',
    maxHeight: 230,

    margin: 0,
    padding: 0,
    zIndex: 1,
    borderRadius: 5,

    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#ffffff',
    overflow: 'auto',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',

    '& li': {
      padding: '10px 6px',
      fontSize: 12,
      fontWeight: 400,
    },

    '& li[data-focus="true"]': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
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
}));
function Autocomplete({ required, error, labelName, id, data, placeholder, onChange, defaultValue }) {
  const classes = useStyles();
  const isError = error && error.length > 0 ? true : false;
  const [inputValueState, setInputValueState] = useState(defaultValue || '');
  const [optionSelected, setOptionSelected] = useState('');

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    inputValue,
    value
  } = useAutocomplete({
    id: 'use-autocomplete',
    options: data,
    defaultValue: { title: inputValueState },
    getOptionLabel: (option) => option.title,
  });

  useEffect(() => {
    if (!value) return;
    onChange && onChange(value);
  }, [value]);



  return <div className={classes.root}>
    <div {...getRootProps()}>
      <InputLabel
        {...getInputLabelProps()}
        className={`${classes.label} ${isError && classes.labelError}`}
        htmlFor={id || labelName}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> {required ? '*' : ''}</span>
      </InputLabel>
      <InputBase value={inputValueState} placeholder={placeholder} className={`${classes.input} ${isError && classes.inputError}`} inputProps={{ ...getInputProps() }}
        endAdornment={
          <KeyboardArrowDownIcon />
        }
      />
      {isError > 0 && <FormHelperText classes={{ root: classes.error }} id={id || labelName}>{error}</FormHelperText>}
    </div>
    {groupedOptions.length > 0 ? (
      <ul className={classes.listbox} {...getListboxProps()}>
        {groupedOptions.map((option, index) => (
          <li {...getOptionProps({ option, index })}>{option.title}</li>
        ))}
      </ul>
    ) : null}
  </div>;
}

Autocomplete.defaultProps = {
  required: false,
  data: []
};


export default Autocomplete;