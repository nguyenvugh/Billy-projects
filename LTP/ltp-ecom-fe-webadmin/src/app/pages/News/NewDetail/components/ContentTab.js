import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Editor } from '@tinymce/tinymce-react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginBottom: '20px'
  },
  title: {
    fontSize: '14px',
		color: "#000000",
		fontWeight: '400',
  },
  input: {
		width: "100%",
		fontSize: "14px !important",
	},
}));

export default function ContentTab({data}) {
  const classes = useStyles();
  const vieEditorRef = useRef(null);

  return (
    <>
    <p className={classes.title}>Nội dung' *</p>
    <div className={classes.root}>
      <Editor
        disabled
        onInit={(evt, editor) => (vieEditorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        value={data.content}
      />
    </div>
    </>
  );
}