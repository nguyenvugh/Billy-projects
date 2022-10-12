import { InputLabel, makeStyles } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react';


function DocsEditor({ id, defaultValue = '', labelName, onSave, readOnly, rootClassName }) {
  const classes = useStyles();

  const editorRef = useRef();


  const onClickEditor = () => {

  };

  const handleInit = () => {
    console.log(editorRef.current);

  };

  const handleSave = (data) => {
    console.log(data);
    onSave && onSave(data);
  };
  return (
    <div className={`${classes.root} ${rootClassName}`}>
      <InputLabel
        className={classes.label}
        htmlFor={id}>
        {labelName} *
      </InputLabel>
      <div className={classes.editorContainer}>
        <Editor
          disabled={readOnly}
          onInit={(evt, editor) => {
            editorRef.current = editor;
            handleInit();
          }}
          initialValue={`<p>${defaultValue}</p>`}
          init={{
            height: 230,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: `body { font-family:Helvetica,Arial,sans-serif;
               font-size:14px;
               color: ${readOnly ? '#777777' : '#000000'};
                background-color: ${readOnly ? '#F5F5F5' : '#ffffff'} }`
          }}
        />
      </div>
    </div>
  );
}



const useStyles = makeStyles({
  root: {
    marginTop: '28px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#000000'
  },
  editorContainer: {
    marginTop: 6,

    '& .tox-edit-area': {
      backgroundColor: 'red'
    }
  },
  suffix: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#000000',

    marginLeft: '16px'
  },
});



export default DocsEditor;