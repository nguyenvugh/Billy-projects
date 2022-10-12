import React, { useRef, useEffect, useState } from 'react';
import { Grid, makeStyles, Modal, InputBase, InputAdornment, InputLabel, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import EventIcon from '@material-ui/icons/Event';
import { addZeroNumber } from 'app/utils/common';

const useStyles = makeStyles({
  root: {
    marginTop: '12px',
    position: 'relative'
  },
  label: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#000000'
  },
  emptyLabel: {
    color: 'transparent'
  },
  input: {
    width: '100%',
    // content: '',
    fontSize: '12px',
    fontWeight: 500,

    border: '1px solid #E2E2E2',
    borderRadius: '5px',
    padding: '4px 16px',

    marginTop: '6px',

    '& .MuiInputBase-input': {
      color: 'transparent',
      opacity: 0,
      userSelect: 'none',
      '& .Mui-disabled': {
        color: 'transparent',
        opacity: 0
      }
    },
    '& ::placeholder': {
      color: '#979797',
    },

    '& .MuiSvgIcon-root': {
      color: '#000000'
    },

    '& ::-webkit-calendar-picker-indicator': {
      width: 'auto',
      height: 'auto',
      background: 'transparent',
      color: 'transparent',

      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,

      cursor: 'pointer',
    }
  },
  placeholder: {
    color: '#979797',
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
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
  },
  displayValue: {
    position: 'absolute',
    top: 7,
    left: 2,
    bottom: 2,

    paddingLeft: 14,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',


    backgroundColor: '#ffffff',
    color: 'rgba(0,0,0,0.38)',
    fontSize: 12
  },
  active: {
    color: '#000000'
  }
});



function CalendarPicker({ id, displayValue, defaultValue, error, labelName, placeholder, onChange, type, readOnly, required }) {
  const classes = useStyles();
  const isError = error && error.length > 0 ? true : false;
  const ref = useRef();
  const handleChange = (event) => {
    const value = event.target.value;
    onChange && onChange(value);
  };

  const convertDefaultValue = () => {

    const date = new Date(defaultValue);
    const day = addZeroNumber(date.getDate()),
      month = addZeroNumber(date.getMonth() + 1),
      year = date.getFullYear(),
      hour = addZeroNumber(date.getHours()),
      minute = addZeroNumber(date.getMinutes());
    if (type === 'datetime-local') {
      return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    return date;
  };



  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label} ${isError && classes.labelError}`}
        htmlFor={id}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> *</span>
      </InputLabel>

      <div className={classes.inputContainer}>
        {displayValue
          ? <span className={`${classes.displayValue} ${!readOnly && classes.active}`}>{displayValue}</span>
          : <span className={`${classes.displayValue} ${!readOnly && classes.placeholder}`}>{placeholder}</span>}
        <InputBase
          ref={ref}
          readOnly={readOnly}
          disabled={readOnly}
          onChange={handleChange}
          id={id}
          type={type}
          defaultValue={convertDefaultValue()}
          className={`${classes.input} ${isError && classes.inputError} `}
          placeholder={placeholder}
          endAdornment={
            <EventIcon />
          }
        />

      </div>
      {isError > 0 && <FormHelperText classes={{ root: classes.error }} id={id || labelName}>{error}</FormHelperText>}
    </div>
  );
}

CalendarPicker.propTypes = {
  type: PropTypes.oneOf(['date', 'time', 'datetime-local'])
};

CalendarPicker.defaultProps = {
  required: false,
  type: 'date'
};

export default CalendarPicker;