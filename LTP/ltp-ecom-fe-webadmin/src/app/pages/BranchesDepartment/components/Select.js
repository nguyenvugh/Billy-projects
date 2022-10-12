import { FormHelperText, InputLabel, makeStyles, MenuItem, Select as MSelect } from '@material-ui/core';
import React from 'react';

function Select({ id, value = "", labelName, placeholder, data, onChange, readOnly, error, required }) {
  const classes = useStyles();
  const isError = error && error.length > 0 ? true : false;
  const handleChange = (event) => {
    const value = event.target.value.toString().trim();
    if (Array.isArray(data) && onChange instanceof Function) {
      let result = data.find(item => item?.id?.toString() === value);
      onChange(result);
    }
  };

  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label} ${isError && classes.labelError}`}
        htmlFor={id || labelName}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> *</span>
      </InputLabel>
      <MSelect
        readOnly={readOnly}
        disabled={readOnly}
        onChange={handleChange}
        disableUnderline
        displayEmpty
        labelId={id || labelName}
        value={value}
        className={`${classes.select} ${isError && classes.selectError}`}
        renderValue={() => <span className={value?.name ? classes.value : classes.placeholder}>{value?.name || placeholder}</span>}>
        {Array.isArray(data) && data.map(item => <MenuItem key={item?.id} value={item?.id}>{item?.name}</MenuItem>)}
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
  }
});



export default Select;