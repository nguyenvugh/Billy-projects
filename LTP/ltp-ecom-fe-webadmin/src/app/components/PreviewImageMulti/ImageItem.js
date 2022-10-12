import { Box, CardMedia, createStyles, Grid, IconButton, makeStyles } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useEffect, useState } from "react";

const ImageItem = ({ index, file, onRemove }) => {
  const classes = useStyles();
  const [src, setSrc] = useState();

  useEffect(() => {
    setSrc(URL.createObjectURL(file));
  }, [file]);

  useEffect(() => {
    return () => {
      src && URL.revokeObjectURL(src);
    };
  }, [src]);

  const remove = () => {
    onRemove instanceof Function && onRemove(index);
  };

  return (
    <Grid item xs={6}>
      <Box className={classes.cardMediaBox}>
        <IconButton onClick={remove} className={classes.removeIcon} >
          <Cancel />
        </IconButton>
        <CardMedia
          className={classes.cardMedia}
          image={src}
        />
      </Box>
    </Grid>
  );
};

export default ImageItem;

const useStyles = makeStyles((theme) =>
  createStyles({
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
    }
  }));