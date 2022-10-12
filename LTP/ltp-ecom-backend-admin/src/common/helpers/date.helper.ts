export const getCurrentDateTimeFormatted = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const dateString = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date
    } ${hour}:${min}`;
  return dateString;
};

export const getMysqlCurrentDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  //const hour = d.getHours();
  //const min = d.getMinutes();
  const dateString = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date
    }`;
  return dateString;
};

export const getCurrentDateFormatDMY = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  //const hour = d.getHours();
  //const min = d.getMinutes();
  const dateString = `${date < 10 ? '0' + date : date}${month < 10 ? '0' + month : month
    }${year}`;
  return dateString;
};

export const getDateString = (date) => {
  const dateStr = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
  return dateStr;
};
