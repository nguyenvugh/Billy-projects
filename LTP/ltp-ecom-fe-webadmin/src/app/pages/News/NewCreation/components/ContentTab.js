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

export default function ContentTab({creationFormErrorMessages, setCreationFormErrorMessages, dispatch, state}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeContent = (data) => {
    dispatch({
			type: 'updateDetailInput',
			payload: {
				key: 'content',
				value: data
			}
		});
    if(data !== '') {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        content: ''
      })
    }
  }

  return (
    <>
    <p className={classes.title}>Nội dung *</p>
    <div className={classes.root}>
      <TextEditors
        defaultValue={state.detail.content}
        onChange={handleChangeContent}
      />
    </div>
    {
      creationFormErrorMessages.content !== '' &&
      <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.content}</div>
    }
    </>
  );
}