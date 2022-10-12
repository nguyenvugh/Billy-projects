import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextEditors from "app/components/TextEditors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  title: {
    fontSize: '14px',
    color: "#000000",
    fontWeight: '400',
  }
}));

export default function ContentTabEN({ creationFormErrorMessages, setCreationFormErrorMessages, dispatch, state }) {
  const classes = useStyles();

  const handleChangeContent = (data) => {
    dispatch({
      type: 'updateDetailInput',
      payload: {
        key: 'contentEN',
        value: data
      }
    });
    if (data !== '') {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        contentEN: ''
      })
    }
  }

  return (
    <>
      <p className={classes.title}>Content</p>
      <div className={classes.root}>
        <TextEditors
          defaultValue={state?.detail?.contentEN}
          onChange={handleChangeContent}
        />
      </div>
    </>
  );
}