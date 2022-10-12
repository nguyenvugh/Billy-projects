import { Box, createStyles, makeStyles, MenuItem, Select } from "@material-ui/core";
import { LANG_VI, LANG_EN } from "app/utils/constant";
import { ReactComponent as VnFlag } from 'app/assets/flags/vn.svg';
import { ReactComponent as EnFlag } from 'app/assets/flags/en.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      display: "flex",
      alignItems: "center"
    },
    icon: {
      marginRight: 6,
    },
  })
);

const SelectLang = ({ value = LANG_VI, onChange }) => {
  const classes = useStyles();
  const change = (e) => {
    onChange instanceof Function && onChange(e.target.value);
  }
  return (
    <Select
      value={value}
      onChange={change}
    >
      <MenuItem value={LANG_VI}><Box className={classes.menuItem}><VnFlag className={classes.icon} /> Tiếng Việt</Box></MenuItem>
      <MenuItem value={LANG_EN}><Box className={classes.menuItem}><EnFlag className={classes.icon} /> Tiếng Anh</Box></MenuItem>
    </Select>
  )
}

export default SelectLang;