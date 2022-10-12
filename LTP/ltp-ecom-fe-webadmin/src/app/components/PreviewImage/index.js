import { Box, CardMedia, createStyles, IconButton, makeStyles } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { FiUpload } from "react-icons/fi";
import PrimaryButton from "../Button/PrimaryButton";

const PreviewImage = ({ imgUrl, setImgUrl, onChangeFiles }) => {
  const classes = useStyles();
  const [src, setSrc] = useState(imgUrl);

  const onChange = (e) => {
    let files = e.target.files;
    if (files && files.length === 1) {
      let filesArray = Array.from(files);
      setSrc(URL.createObjectURL(files[0]));
      setImgUrl(URL.createObjectURL(files[0]))
      onChangeFiles instanceof Function && onChangeFiles(filesArray);
    }
  }

  const removeImage = () => {
    setSrc instanceof Function && setSrc(undefined);
    setImgUrl instanceof Function && setImgUrl(undefined);
    onChangeFiles instanceof Function && onChangeFiles([]);
  };

  return (
    <Box className={classes.root}>
      {src ?
        <Fragment>
          <IconButton onClick={removeImage} className={classes.icon} >
            <Cancel />
          </IconButton>
          <CardMedia
            className={classes.img}
            image={src}
          />
        </Fragment> :
        <Fragment>
          <input type="file" accept="image/*" className={classes.input} onChange={onChange} />
          <Box className={classes.content}>
            <Box color="#373737" fontSize={14} whiteSpace="nowrap">Kéo ảnh vào đây hoặc:</Box>
            <Box textAlign="center" marginTop="12px" marginBottom="8px">
              <PrimaryButton startIcon={<FiUpload />}>
                Upload
              </PrimaryButton>
            </Box>
            <Box color="#6A6A6A" fontSize={12} whiteSpace="nowrap" fontStyle="italic">(Kích thước ảnh: 464x464)</Box>
          </Box>
        </Fragment>
      }
    </Box>
  )
}

export default PreviewImage;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      border: "1px dashed #E2E2E2",
      paddingBottom: "64%",
      backgroundColor: "#EDF3FD",
      overflow: "hidden",
      borderRadius: "4px",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    input: {
      zIndex: 9,
      opacity: 0,
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      cursor: "pointer",
    },
    img: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
    },
    icon: {
      zIndex: 9,
      position: "absolute",
      top: 0,
      right: 0,
    }
  }));