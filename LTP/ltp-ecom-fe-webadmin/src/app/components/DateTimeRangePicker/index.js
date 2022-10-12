import { Button, IconButton, InputBase, makeStyles, Popover, InputLabel, Radio } from "@material-ui/core";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import locale from "date-fns/locale/vi";
import { useCallback, useEffect, useState, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addZeroNumber } from 'app/utils/common';
const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'column'
  },
  icon: {
    '&.MuiIconButton-root': {
      color: '#ffffff',
      padding: 0,
      marginLeft: 12
    },
    '& .MuiSvgIcon-root': {
      width: 16,
      height: 18,
    }
  },
  popupContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  popupDate: {
    display: 'flex',
    flexDirection: 'column'
  },
  popupDateButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    paddingRight: 10,
    paddingBottom: 10
  },
  btnCancel: {
    marginRight: 10,
    '&.MuiButton-contained': {
      backgroundColor: '#F8F7FA'
    },

    '& .MuiButton-label': {
      color: '#19181A',
      fontSize: 10,
      textTransform: 'capitalize',
      fontWeight: 600
    }
  },
  btnConfirm: {
    '&.MuiButton-contained': {
      backgroundColor: '#1A43CC'
    },
    '& .MuiButton-label': {
      color: '#ffffff',
      fontSize: 10,
      textTransform: 'capitalize',
      fontWeight: 600
    }
  },
  popupTime: {
    marginLeft: 5,
    borderLeft: '1px solid #4D76FF'
  },
  staticTimePicker: {
    display: 'flex',
    flexDirection: 'row',

    height: 385,
    overflow: 'hidden',
    margin: '0 8px'
  },

  containerCol: {
    height: '100%',

    '& > h3': {

      display: 'flex',
      flex: 1,

      height: 53,
      fontSize: 14,
      fontWeight: 500,
      color: '#000000',

      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    }
  },

  startTime: {

  },

  endTime: {
    '& div > input:checked + label': {
      backgroundColor: '#FD6525'
    }
  },
  staticTimePickerCol: {
    display: 'flex',
    height: 'calc(100% - 53px)',
    overflowY: 'scroll',
    flexDirection: 'column',

    margin: 0,
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  timePickerItem: {
    display: 'flex',
    flexDirection: 'row',

    '& input': {
      display: 'none'
    },
    '& input:checked + label': {
      backgroundColor: '#2154FF',
      color: '#ffffff',
    },

  },
  timePickerItemLabel: {
    width: 40,
    textAlign: 'center',
    color: '#000000',
    fontSize: 14,
    fontWeight: 500,

    margin: '.5em 5px',
    padding: '5px 0',

    borderRadius: 2,
    cursor: 'pointer',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  },
  divider: {
    margin: '70px 5px 0',
    height: 2,
    borderRadius: 2,
    width: 16,
    backgroundColor: '#181818'
  },

  dateDisplayWrapper: {
    backgroundColor: 'white'
  },
  daySelected: {
    color: '#2154FF',
  },
  dayNumber: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 500,
  },
  displayDateTime: {
    fontSize: 14,

  }
}));


const timeRangeStructure = {
  startHours: '00',
  endHours: '00',
  startMinutes: '00',
  endMinutes: '00',
};



function StaticTimePicker({ onChange, defaultValue }) {
  const classes = useStyles();
  const [hours, setHours] = useState(() => [...Array(24).keys()]);
  const [minutes, setMinutes] = useState(() => [...Array(60).keys()]);

  const [timeRange, setTimeRange] = useState({ ...timeRangeStructure, ...defaultValue });
  const startHoursRef = useRef(null);
  const endHoursRef = useRef(null);
  const startMinutesRef = useRef(null);
  const endMinutesRef = useRef(null);

  useEffect(() => {
    onChange && onChange(timeRange);
  }, [timeRange]);

  const handleChangeHours = (event, isStart) => {
    const value = event.target.value;
    const startHours = isStart ? value : timeRange.startHours,
      endHours = !isStart ? value : timeRange.endHours;

    setTimeRange(prevDate => ({
      ...prevDate,
      startHours,
      endHours,
    }));
  };

  const handleChangeMinutes = (event, isStart) => {
    const value = event.target.value;
    const startMinutes = isStart ? value : timeRange.startMinutes,
      endMinutes = !isStart ? value : timeRange.endMinutes;

    setTimeRange(prevDate => ({
      ...prevDate,
      startMinutes,
      endMinutes,

    }));

  };
  useEffect(() => {
    const startHoursElm = startHoursRef.current.querySelectorAll('div[data-checked=true]')[0];
    const startMinutesElm = startMinutesRef.current.querySelectorAll('div[data-checked=true]')[0];
    const endHoursElm = endHoursRef.current.querySelectorAll('div[data-checked=true]')[0];
    const endMinutesElm = endMinutesRef.current.querySelectorAll('div[data-checked=true]')[0];

    startHoursRef.current.scrollTo(0, startHoursElm.offsetTop - startHoursRef.current.offsetTop);
    startMinutesRef.current.scrollTo(0, startMinutesElm.offsetTop - startMinutesRef.current.offsetTop);
    endHoursRef.current.scrollTo(0, endHoursElm.offsetTop - endHoursRef.current.offsetTop);
    endMinutesRef.current.scrollTo(0, endMinutesElm.offsetTop - endMinutesRef.current.offsetTop);
  }, [startHoursRef, endHoursRef, startMinutesRef, endMinutesRef]);


  const renderHours = (isStart) => {
    return <div ref={isStart ? startHoursRef : endHoursRef} className={classes.staticTimePickerCol} onChange={event => handleChangeHours(event, isStart)}>
      {hours.map(h => {
        const hour = addZeroNumber(h);
        const checked = isStart ? h == timeRange.startHours : h == timeRange.endHours;
        return <div key={hour} className={classes.timePickerItem} data-checked={checked} >
          <input
            defaultChecked={checked}
            type='radio'
            value={hour}
            id={`${isStart ? 's' : 'e'}tpkh${hour}`}
            name={`${isStart ? 's' : 'e'}hours`} />
          <InputLabel htmlFor={`${isStart ? 's' : 'e'}tpkh${hour}`} className={classes.timePickerItemLabel}>{hour}</InputLabel>
        </div>;
      })}
    </div>;
  };

  const renderMinutes = (isStart) => {

    return <div ref={isStart ? startMinutesRef : endMinutesRef} className={classes.staticTimePickerCol} onChange={event => handleChangeMinutes(event, isStart)}>
      {minutes.map(m => {
        const minute = addZeroNumber(m);
        const checked = isStart ? m == timeRange.startMinutes : m == timeRange.endMinutes;
        return <div key={minute} className={classes.timePickerItem} data-checked={checked}>
          <input
            defaultChecked={checked}
            type='radio'
            value={minute}
            id={`${isStart ? 's' : 'e'}tpkm${minute}`}
            name={`${isStart ? 's' : 'e'}minutes`} />
          <InputLabel htmlFor={`${isStart ? 's' : 'e'}tpkm${minute}`} className={classes.timePickerItemLabel}>{minute}</InputLabel>
        </div>;
      })}
    </div>;
  };

  return (
    <div className={classes.staticTimePicker}>
      <div className={`${classes.containerCol} ${classes.startTime}`}>
        <h3 >Bắt đầu</h3>
        <div>
          {renderHours(true)}
          {renderMinutes(true)}
        </div>
      </div>
      <span className={classes.divider} />
      <div className={`${classes.containerCol} ${classes.endTime}`}>
        <h3 >Kết thúc</h3>
        <div>
          {renderHours(false)}
          {renderMinutes(false)}
        </div>
      </div>


    </div>
  );
}

function DateTimeRangePicker({ defaultValue, onChange }) {
  const [dateRangeStructure] = useState([{
    startDate: defaultValue.startDate || new Date(),
    endDate: defaultValue.endDate || new Date(),
    key: 'selection'
  }]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [tmpDateRange, setTmpDateRange] = useState(dateRangeStructure);
  const [dateRange, setDateRange] = useState(dateRangeStructure);
  const [tmpTimeRange, setTmpTimeRange] = useState(() => {
    const time = timeRangeStructure;
    if (defaultValue) {
      const start = new Date(defaultValue.startDate);
      const end = new Date(defaultValue.endDate);
      time.startHours = start.getHours();
      time.startMinutes = start.getMinutes();
      time.endHours = end.getHours();
      time.endMinutes = end.getMinutes();
    }
    return time;
  });

  const [timeRange, setTimeRange] = useState(timeRangeStructure);
  const [displayDateTime, setDisplayDateTime] = useState('');

  useEffect(() => {
    handleDisplayDateTime();
  }, [timeRange, dateRange]);


  const onOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.target);
  };
  const onClose = () => {

  };

  const handleChangeRange = (ranges) => {
    setTmpDateRange([ranges.selection]);
  };

  const handleTimeChange = (time) => {
    setTmpTimeRange(time);
  };

  const handleConfirm = () => {
    setOpen(false);
    setDateRange(tmpDateRange);
    setTimeRange(tmpTimeRange);
    handleReturnConfirmDateTime(tmpDateRange, tmpTimeRange);
  };


  const handleCancel = () => {
    setOpen(false);
    setDateRange(dateRangeStructure);
    setTmpDateRange(dateRangeStructure);
  };

  const formatDateTimeRange = (date, hour, minute) => {

    const newDate = new Date(date);
    newDate.setHours(hour, minute);
    const day = addZeroNumber(newDate.getDate()),
      month = addZeroNumber(newDate.getMonth() + 1),
      year = newDate.getFullYear(),
      hours = addZeroNumber(newDate.getHours()),
      minutes = addZeroNumber(newDate.getMinutes());

    const toString = () => `${day}/${month}/${year} ${hours}:${minutes}`;
    return { day, month, year, hours, minutes, toString };
  };

  const handleReturnConfirmDateTime = (date, time) => {
    const { day: startDay, month: startMonth, year: startYear, hours: startHours, minutes: startMinutes } = formatDateTimeRange(date[0].startDate, time.startHours, time.startMinutes);
    const { day: endDay, month: endMonth, year: endYear, hours: endHours, minutes: endMinutes } = formatDateTimeRange(date[0].endDate, time.endHours, time.endMinutes);

    const dateTime = {
      startDate: `${startYear}-${startMonth}-${startDay}`,
      startTime: `${startHours}:${startMinutes}`,
      endDate: `${endYear}-${endMonth}-${endDay}`,
      endTime: `${endHours}:${endMinutes}`,
    };

    onChange && onChange(dateTime);
  };

  const handleDisplayDateTime = () => {
    const startDateTimeString = formatDateTimeRange(dateRange[0].startDate, timeRange.startHours, timeRange.startMinutes).toString();
    const endDateTimeString = formatDateTimeRange(dateRange[0].endDate, timeRange.endHours, timeRange.endMinutes).toString();
    setDisplayDateTime(startDateTimeString + ' - ' + endDateTimeString);

    return { startDateTimeString, endDateTimeString };
  };

  return <div className={classes.root}>
    <div>
      <span className={classes.displayDateTime}>{displayDateTime}</span>
      <IconButton onClick={onOpen} className={classes.icon} aria-label="DateTime range" component="span">
        <CalendarTodayIcon />
      </IconButton>
    </div>

    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >

      <div className={classes.popupContainer}>
        <div className={classes.popupDate}>
          <DateRange
            classNames={{
              dateDisplayWrapper: classes.dateDisplayWrapper,
              dayNumber: classes.dayNumber,
            }}
            onChange={handleChangeRange}
            ranges={tmpDateRange}
            locale={locale}
          />

          <div className={classes.popupDateButtonGroup}>
            <Button onClick={handleCancel} disableElevation variant='contained' className={classes.btnCancel}>Cancel</Button>
            <Button onClick={handleConfirm} disableElevation variant='contained' className={classes.btnConfirm}>Xác nhận</Button>
          </div>

        </div>

        <div className={classes.popupTime}>
          <StaticTimePicker onChange={handleTimeChange} defaultValue={timeRange} />
        </div>
      </div>
    </Popover>
  </div>;
}


DateTimeRangePicker.defaultProps = {

};

const anchorOrigin = {
  vertical: "bottom",
  horizontal: "center"
};
const transformOrigin = {
  vertical: "top",
  horizontal: "center"
};


export default DateTimeRangePicker;