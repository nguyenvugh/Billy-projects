import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton, Input, makeStyles } from '@material-ui/core';
import { addZeroNumber } from 'app/utils/common';
import Switch from '../components/Switch';
import DateTimeRangePicker from 'app/components/DateTimeRangePicker';
import { activeFlashSaleTime as _activeFlashSaleTime } from 'app/services/flashsale';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
Header.propTypes = {
  fromDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  toDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  createBy: PropTypes.string,
  status: PropTypes.string
};

Header.defaultProps = {
  fromDate: '',
  toDate: '',
  createBy: '',
  status: ''
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#1A43CC',
    borderRadius: '8px',

    padding: '15px 20px',
  },

  containerInner: {
    // width: 'calc(85% + 40px)',
    padding: '0 0 0 50px',
    margin: '0 auto',
    color: '#ffffff'
  },

  label: {
    fontSize: '14px',
    margin: '10px 0'
  },

  content: {
    fontSize: '14px',
    margin: '12px 0'
  },

  column: {
    '&:nth-child(3) > h5': {
    },
    '&:nth-child(3) > div': {
      marginTop: 0
    }
  },

  status: {
    display: 'inline-block',
    fontSize: '14px',
    color: '#00B41D',
    backgroundColor: '#ffffff',

    margin: '0',
    padding: '2.5px 16px',
    borderRadius: '16px'
  },

  button: {
    display: 'inline-block',
    width: 14,
    height: 14,

    padding: 0,
    marginLeft: 5,
    '& > .MuiButtonBase-root': {
      padding: 0
    },
    '& svg': {
      color: '#ffffff',
      width: 14,
      height: 14,
      cursor: 'pointer'
    },
    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      '& svg': {
        marginLeft: 5
      }
    }
  },
  flashSaleNameContainer: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',

    '& input': {
      width: 'auto',
      color: '#ffffff',
      display: 'inline-block',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '1px solid #ffffff',
      outline: 'none',
    },
    '& input:disabled': {
      border: 'none',
    }
  }
}));


function Header({ flashSaleName, startDate, endDate, createBy, onDateTimeChange, onChangeSwitch, onChangeName }) {
  const classes = useStyles();
  // const [status, setStatus] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(flashSaleName);
  useEffect(() => {
    convertDateTimeToStatus();
    console.log(startDate);
  }, [startDate]);

  const handleChangeDateTime = (dateTime) => {
    onDateTimeChange && onDateTimeChange(dateTime);
  };

  const handleChangeSwitch = (checked) => {
    onChangeSwitch && onChangeSwitch(checked);
  };

  const convertDateTimeToStatus = () => {
    if (!startDate) return;
    const current = new Date(),
      start = new Date(startDate),
      end = new Date(endDate);
    let status = {
      name: 'Đang diễn ra',
      color: '#00B41D',
    };

    if (current < start) {
      status = {
        name: 'Sắp diễn ra',
        color: '#FFC043'
      };
    };
    if (current > end) {
      status = {
        name: 'Đã kết thúc',
        color: '#9A9A9A'
      };
    };
    return status;
  };

  const handleCloseEditingName = () => {
    setName(flashSaleName);
    setIsEdit(false);
  };

  return (
    <div className={classes.container}>
      <Grid className={classes.containerInner} container wrap='nowrap'>
        <Grid className={classes.column} item xs={8}>
          <h5 className={classes.label}>Tên chương trình</h5>
          <div className={classes.flashSaleNameContainer}>
            {isEdit
              ? <input disabled={!isEdit} onChange={(event) => setName(event.target.value)} defaultValue={flashSaleName} />
              : <span>{name || flashSaleName}</span>
            }

            <div className={classes.button}>
              {!isEdit && <EditIcon onClick={() => setIsEdit(true)} />}
              {isEdit && <div>
                <CheckIcon onClick={() => {
                  onChangeName && onChangeName(name);
                  setIsEdit(false);
                }} />
                <CloseIcon onClick={handleCloseEditingName} />
              </div>}
            </div>
          </div>
        </Grid>
        <Grid className={classes.column} item xs={8}>
          <h5 className={classes.label}>Thời gian diễn ra</h5>
          {startDate && <DateTimeRangePicker defaultValue={{ startDate, endDate }} onChange={handleChangeDateTime} />}
        </Grid>
        <Grid className={classes.column} item xs={4}>
          <h5 className={classes.label}>Người tạo</h5>
          <span>{createBy}</span>
        </Grid>
        <Grid className={classes.column} item xs={4}>
          <h5 className={classes.label}>Trạng thái</h5>
          {startDate && <p className={classes.status} style={{
            color: convertDateTimeToStatus().color,
            border: `1px solid ${convertDateTimeToStatus().color}`
          }}>{convertDateTimeToStatus().name}</p>}
        </Grid>


      </Grid>
    </div>
  );
};



export default React.memo(Header);
