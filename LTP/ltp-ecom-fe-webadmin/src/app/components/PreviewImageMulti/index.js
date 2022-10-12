import { Box, CardMedia, createStyles, Grid, IconButton, makeStyles } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { LANG_VI } from "app/utils/constant";
import { Fragment, useRef, useState } from "react";
import ImageItem from "./ImageItem";

const PreviewImageMulti = ({ lang = LANG_VI, imgList, setImgList, onChangeFiles }) => {
  const classes = useStyles();
  const refInput = useRef();
  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    let filesList = e.target.files;
    if (filesList && filesList.length > 0) {
      let filesArray = Array.from(filesList);
      let remain = 5 - imgList.length - files.length;
      if (remain <= 0) {
        filesArray.length = 0;
        return;
      } else if (filesArray.length > remain) {
        filesArray.length = remain;
      }
      let newFiles = [...files, ...filesArray]
      setFiles(newFiles);
      onChangeFiles instanceof Function && onChangeFiles(newFiles);
    }
  }

  const removeImage = (index) => {
    let newImgList = [...imgList];
    newImgList.splice(index, 1);
    setImgList(newImgList);
  };

  const onRemove = (index) => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChangeFiles instanceof Function && onChangeFiles(newFiles);
  }

  const inputClick = () => {
    refInput?.current?.click();
  }

  return (
    <Fragment>
      <label className="text-field-label">{lang === LANG_VI ? "Hình ảnh" : "Images"} {imgList.length + files.length}/5</label>
      <Box className={classes.root}>
        <Grid container spacing={3}>
          {Array.isArray(imgList) && imgList.map((item, index) => {
            return (
              <Grid item xs={6}>
                <Box className={classes.cardMediaBox}>
                  <IconButton onClick={() => removeImage(index)} className={classes.removeIcon} >
                    <Cancel />
                  </IconButton>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item?.image?.url}
                  />
                </Box>
              </Grid>
            )
          })
          }
          {
            Array.isArray(files) && files.map((file, index) => {
              return <ImageItem key={index} index={index} file={file} onRemove={onRemove} />
            })
          }
        </Grid>
      </Box>
      <Box className={classes.add}>
        <span style={{ cursor: "pointer" }} onClick={inputClick}>+ Thêm ảnh khác</span>
      </Box>
      <input ref={refInput} multiple type="file" accept="image/*" className={classes.input} onChange={onChange} />
    </Fragment>
  )
}

export default PreviewImageMulti;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      border: "1px dashed #E2E2E2",
      backgroundColor: "#EDF3FD",
      borderRadius: "4px",
      padding: "12px"
    },
    cardMediaBox: {
      position: "relative"
    },
    removeIcon: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: 4,
    },
    cardMedia: {
      paddingBottom: "65%",
      borderRadius: "4px",
      border: "1px solid #A0AEC0",
    },
    add: {
      textAlign: "right",
      marginTop: 12,
      textDecoration: "underline",
    },
    input: {
      display: "none",
    }
  }));