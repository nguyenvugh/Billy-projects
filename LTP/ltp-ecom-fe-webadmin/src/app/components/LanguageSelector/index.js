import { makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
const languages = [
  {
    language: 'vi',
    icon: process.env.PUBLIC_URL + '/imgs/ic_vi.png',
    label: 'Tiếng Việt',
  },
  {
    language: 'en',
    icon: process.env.PUBLIC_URL + '/imgs/ic_us.png',
    label: 'Tiếng Anh',
  },
];

const useStyles = makeStyles({
  root: {
    width: 130,
    backgroundColor: '#ffffff',

    '& .MuiSelect-root': {
      paddingLeft: 4
    },
    '& :focus': {
      backgroundColor: 'transparent'
    },
    '& .Mui-disabled span': {
      color: 'rgba(0,0,0,0.38)'
    }
  },
  option: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    width: 20,
    height: 16
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#000000'
  }
});

function LanguageSelector({ defaultValue, onChange }) {
  const classes = useStyles();

  const handleChange = (event) => {
    const value = event.target.value;
    onChange && onChange(value);
  };
  return (
    <Select className={classes.root} disableUnderline defaultValue={defaultValue} onChange={handleChange}>
      {languages.map((lang, key) => <MenuItem key={key} value={lang.language}>
        <div className={classes.option}>
          <img src={lang.icon} className={classes.icon} />
          <span className={classes.label}>{lang.label}</span>
        </div>
      </MenuItem>)}
    </Select>
  );
}



LanguageSelector.defaultProps = {
  defaultValue: 'vi'
};


export default LanguageSelector;
