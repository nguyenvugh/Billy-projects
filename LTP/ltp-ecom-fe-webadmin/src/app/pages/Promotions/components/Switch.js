import { InputLabel, makeStyles, Switch as MSwitch, withStyles } from '@material-ui/core';
import React, { useState } from 'react';





function Switch({ id, defaultValue, labelName, onChange, readOnly, checked }) {
  const classes = useStyles();
  const [state, setState] = useState(() => {
    console.log('checked', checked);
    if (typeof checked == 'boolean') {
      return checked;
    }
    return +checked;
  });



  const handleChange = (event) => {
    const value = event.target.checked;
    setState(value);
    onChange && onChange(value);
  };

  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label}`}
        htmlFor={id || labelName}>
        {labelName}
      </InputLabel>
      <MSwitch classes={{
        root: classes.switchRoot,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
        disabled={readOnly}
        checked={state}
        onChange={handleChange}
      />
    </div>
  );
}

Switch.defaultProps = {
  checked: true,
  defaultValue: '',
  required: false

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
  select: {
    width: '100%',
    fontSize: '12px',
    fontWeight: 500,

    border: '1px solid #E2E2E2',
    borderRadius: '5px',
    // padding: '4px 16px',
    marginTop: '6px',

    '& :focus': {
      backgroundColor: 'transparent'
    },

    '&.MuiInput-root': {
      padding: '4px 16px',
    },

    '& .Mui-disabled span': {
      color: 'rgba(0,0,0,0.38)'
    }
  },

  switchRoot: {
    width: 75,
    transform: 'translateX(-6px)',
  },
  switchBase: {
    '&$checked': {
      color: '#ffffff',
      transform: 'translateX(32.5px)',

      '& + $track': {
        backgroundColor: '#00B41D',
        opacity: 1
      }
    },
  },

  thumb: {
    width: 24,
    height: 24
  },
  track: {
    height: 18,
    backgroundColor: '#D6D9DF',
    opacity: 1
  },

  checked: {

  },

  value: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#000000'
  },
  placeholder: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#979797'
  },

  labelError: {
    color: '#EA403F'
  },
  selectError: {
    border: '1px solid #EA403F',
  },
  error: {
    fontSize: '10px',
    fontWeight: 400,
    color: '#EA403F'
  },
  emptyOption: {
    display: 'none'
  }
});



export default Switch;