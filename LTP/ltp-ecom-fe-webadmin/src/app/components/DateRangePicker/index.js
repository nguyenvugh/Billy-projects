import { Box, Button, makeStyles, Popover } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { convertDate, formatDate, isEmpty } from "app/utils/validate";
import locale from "date-fns/locale/vi";
import { Fragment, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    display: "inline-block",
    fontSize: 14,

    border: "1px solid #E2E2E2",
    borderRadius: 4,
    height: 40,
    backgroundColor: "#ffffff"
  },
  button: {
    textTransform: "initial",
    whiteSpace: "nowrap",
    marginRight: 24,
    width: 220,
    fontSize: 14,
    padding: "8px 8px",
  },
  reset: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  remove: {
    cursor: "pointer"
  }
}));

const DateRangePicker = ({ startDate, endDate, onChange, children, label }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();
  const [rangeDate, setRangeDate] = useState([
    {
      startDate: isEmpty(startDate) ? undefined : formatDate(startDate),
      endDate: isEmpty(endDate) ? undefined : formatDate(endDate),
      key: "selection"
    }
  ]);
  const onClick = (e) => {
    setAnchorEl(e.target);
  };
  const onClose = () => {
    setAnchorEl(null);
    let startDate = rangeDate[0].startDate;
    let endDate = rangeDate[0].endDate;
    if (startDate instanceof Date && endDate instanceof Date) {
      startDate = convertDate(formatDate(startDate.toISOString()));
      endDate = convertDate(formatDate(endDate.toISOString()));
    } else {
      startDate = "";
      endDate = "";
    }
    onChange instanceof Function && onChange({ startDate, endDate });
  };
  const changeRange = (date) => {
    setRangeDate([date?.selection]);
  };
  const clearRangeDate = () => {
    let range = {
      startDate: undefined,
      endDate: undefined,
      key: "selection"
    };
    setRangeDate([range]);
    onChange instanceof Function && onChange({ startDate: "", endDate: "" });
  };

  const renderValue = () => {
    if (children) return children;
    let startDate = rangeDate?.[0]?.startDate;
    let endDate = rangeDate?.[0]?.endDate;
    if (startDate instanceof Date && endDate instanceof Date) {
      return formatDate(startDate.toISOString()) + " - " + formatDate(endDate.toISOString());
    }
    return label || "dd/mm/yyyy - dd/mm/yyyy";
  };

  return (
    <Box className={classes.root}>
      <Button
        className={classes.button}
        onClick={onClick}
      >
        {renderValue()}
      </Button>
      <Box component="span" className={classes.reset}>
        {rangeDate?.[0]?.startDate instanceof Date && <Close className={classes.remove} onClick={clearRangeDate} />}
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <DateRange
          ranges={rangeDate}
          onChange={changeRange}
          locale={locale}
          dateDisplayFormat="dd/MM/yyyy"
          editableDateInputs
        />
      </Popover>
    </Box>
  );
};

export default DateRangePicker;

const anchorOrigin = {
  vertical: "bottom",
  horizontal: "center"
};
const transformOrigin = {
  vertical: "top",
  horizontal: "center"
};