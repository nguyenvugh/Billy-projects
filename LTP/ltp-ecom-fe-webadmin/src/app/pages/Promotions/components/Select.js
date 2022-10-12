import { FormHelperText, InputLabel, makeStyles, MenuItem, Select as MSelect } from '@material-ui/core';
import React, { useState, useEffect } from 'react';



function Select({ id, defaultValue, labelName, placeholder, data, onChange, readOnly, error, required }) {
  const classes = useStyles();
  const [value, setValue] = useState(data[defaultValue || 1]);
  const isError = error && error.length > 0 ? true : false;
  const handleChange = (event) => {
    const val = event.target.value;
    const index = data.indexOf(val);
    setValue(data[index]);
    onChange && onChange({ index, value: val });
  };

  useEffect(() => {
    setValue(data[defaultValue]);
  }, [defaultValue]);

  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label} ${isError && classes.labelError}`}
        htmlFor={id || labelName}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> {required ? '*' : ''}</span>
      </InputLabel>
      <MSelect
        readOnly={readOnly}
        disabled={readOnly}
        onChange={handleChange}
        disableUnderline
        displayEmpty
        labelId={id || labelName}
        value={defaultValue}
        defaultValue={defaultValue}
        className={`${classes.select} ${isError && classes.selectError}`}
        renderValue={() => <span className={classes.value}>{defaultValue}</span>}>
        {data.map((name) => <MenuItem className={!name && classes.emptyOption} key={name} value={name}>{name}</MenuItem>)}
      </MSelect>
      {isError > 0 && <FormHelperText classes={{ root: classes.error }} id={id || labelName}>{error}</FormHelperText>}
    </div>
  );
}

Select.defaultProps = {
  data: [],
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



export default Select;