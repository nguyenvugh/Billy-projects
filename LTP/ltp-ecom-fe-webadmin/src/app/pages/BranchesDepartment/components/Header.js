import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { addZeroNumber } from 'app/utils/common';


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
    width: 'calc(85% + 40px)',

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

  status: {
    display: 'inline-block',
    fontSize: '14px',
    color: '#00B41D',
    backgroundColor: '#ffffff',

    margin: '0',
    padding: '2.5px 16px',
    borderRadius: '16px'
  }
}));


function Header({ fromDate, toDate, createBy, status }) {
  const classes = useStyles();

  const eventDate = () => {
    let fDate = '', tDate = '';
    try {
      if (!fromDate) fDate = '--/--/----';
      if (!toDate) tDate = '--/--/----';

      if (fromDate) {
        const convertFromDate = new Date(fromDate);
        fDate = `${addZeroNumber(convertFromDate.getDay())}/${addZeroNumber(convertFromDate.getMonth() + 1)}/${convertFromDate.getFullYear()} ${addZeroNumber(convertFromDate.getHours())}:${addZeroNumber(convertFromDate.getMinutes())}`;
      }

      if (toDate) {
        const convertToDate = new Date(toDate);
        tDate = `${addZeroNumber(convertToDate.getDay())}/${addZeroNumber(convertToDate.getMonth() + 1)}/${convertToDate.getFullYear()} ${addZeroNumber(convertToDate.getHours())}:${addZeroNumber(convertToDate.getMinutes())}`;
      }

      return `${fDate} - ${tDate}`;
    } catch (e) {
      return `${fDate} - ${tDate}`;
    }

  };
  return (
    <div className={classes.container}>
      <Grid className={classes.containerInner} container wrap='nowrap'>
        <Grid className={classes.column} item xs={6}>
          <h5 className={classes.label}>Thời gian diễn ra</h5>
          <p className={classes.content}>{eventDate()}</p>
        </Grid>

        <Grid className={classes.column} item xs={4}>
          <h5 className={classes.label}>Người tạo</h5>
          <p className={classes.content}>{createBy}</p>
        </Grid>

        <Grid className={classes.column} item xs>
          <h5 className={classes.label}>Trạng thái</h5>
          <p className={classes.status}>{status}</p>
        </Grid>
      </Grid>
    </div>
  );
}



export default Header;
