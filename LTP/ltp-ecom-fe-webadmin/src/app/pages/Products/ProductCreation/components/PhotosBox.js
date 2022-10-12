import { useContext, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

import { ProductCreationContext } from "../context";

import { TiDelete } from "react-icons/ti";
import Input from "app/pages/Stores/components/Input";
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => ({
  photos: {
    backgroundColor: "#EDF3FD",
    border: "1px dashed #718096",
    borderRadius: "4px",
    padding: "15px 15px 0px 15px",
    marginBottom: "20px",
  },
  photoItem: {
    marginBottom: "15px",
    "&:nth-child(2n)": {
      paddingLeft: "7.5px",
    },
    "&:nth-child(2n + 1)": {
      paddingRight: "7.5px",
    },
  },
  photoItemContent: {
    backgroundColor: "#ffffff",
    backgroundSize: "cover",
    borderRadius: "6px",
    height: "150px",
    position: "relative",
  },
  photoItemContentRemove: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "32px",
    height: "32px",
  },
  addNewPhoto: {
    float: "right",
    textDecoration: "underline",
    cursor: "default",
  },
}));

export default function PhotosBox({ lan }) {
  const context = useContext(ProductCreationContext);
  const {
    state: { photos },
  } = context;

  const classes = useStyles();
  const photoRef = useRef();
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const handleUpload = (evt) => {
    if (evt.target.files && evt.target.files.length > 0) {
      for (let i = 0; i < evt.target.files.length; i++) {
        const file = evt.target.files[i];
        const reader = new FileReader();
        reader.onloadend = function () {
          context.dispatch({
            type: "addPhoto",
            payload: {
              url: reader.result,
              file,
            },
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleClickUploadButton = (event) => {
    photoRef.current.click();
  };

  const handleDelete = (index) => {
    if (index === selectedPhoto) {
      setSelectedPhoto(0);
    }
    context.dispatch({
      type: "deletePhoto",
      payload: { index },
    });
  };

  const handleUpdateMetePhoto = debounce((key, value) => {
    if (value.length > 150) return;
    const updatedPhoto = { ...photos[selectedPhoto] };
    let isExistOldTranslate = false;
    const newTranslationObj = (updatedPhoto.translates || []).map((it) => {
      if (it.language_code === lan && it.language_field === key) {
        isExistOldTranslate = true;
        return { ...it, language_value: value };
      }
      return it;
    });
    updatedPhoto.translates = isExistOldTranslate
      ? [...(newTranslationObj || [])]
      : [
          ...(newTranslationObj || []),
          {
            language_code: lan,
            language_field: key,
            language_value: value,
          },
        ];
    context.dispatch({
      type: "updateMetaPhoto",
      payload: { index: selectedPhoto, updatedPhoto },
    });
  }, 50);

  let altSEO = "";
  let titleSEO = "";
  let captionSEO = "";
  (photos[selectedPhoto]?.translates || []).forEach((it) => {
    if (it.language_code === lan) {
      if (it.language_field === "altSEO") altSEO = it.language_value;
      if (it.language_field === "titleSEO") titleSEO = it.language_value;
      if (it.language_field === "captionSEO") captionSEO = it.language_value;
    }
  });
  return (
    <>
      <h5>Hình ảnh ({photos.length}/5)</h5>
      <Box className={classes.photos}>
        <Grid container className={classes.photosBox}>
          {photos.map((item, index) => {
            const border =
              index === selectedPhoto
                ? "3px solid blue"
                : "0.5px solid #A0AEC0";
            return (
              <Grid key={item} item xs={6} className={classes.photoItem}>
                <Box
                  border={border}
                  className={classes.photoItemContent}
                  style={{ backgroundImage: `url(${item.url})` }}
                  onClick={() => setSelectedPhoto(index)}
                >
                  <TiDelete
                    className={classes.photoItemContentRemove}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <input
        type="file"
        ref={photoRef}
        style={{ display: "none" }}
        onChange={handleUpload}
        multiple="multiple"
      />
      {photos.length < 5 && (
        <span className={classes.addNewPhoto} onClick={handleClickUploadButton}>
          + Thêm ảnh khác
        </span>
      )}

      {photos.length > 0 && (
        <>
          <Input
            labelName={"Alt *"}
            value={altSEO}
            onChange={(value) => handleUpdateMetePhoto("altSEO", value)}
            placeholder="Alt"
          />
          <Input
            labelName={"Title *"}
            value={titleSEO}
            onChange={(value) => handleUpdateMetePhoto("titleSEO", value)}
            placeholder="Title SEO"
          />
          <Input
            labelName={"Caption *"}
            value={captionSEO}
            onChange={(value) => handleUpdateMetePhoto("captionSEO", value)}
            placeholder="Caption"
          />
        </>
      )}
    </>
  );
}
