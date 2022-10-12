import { Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import * as Utils from "../../../../utils";

const useStyles = makeStyles((theme) => ({}));

export default function PhotosBox({ images, lang }) {
  const classes = useStyles();
  const [currentImg, setCurrentImg] = useState(0);

  const currentTranslate = Utils.getSafeValue(
    images[currentImg]?.image,
    "translates",
    []
  );
  const translatesByFields = Utils.getTranslateField(currentTranslate, lang);
  const altSEO = translatesByFields.altSEO;
  const titleSEO = translatesByFields.titleSEO;
  const captionSEO = translatesByFields.captionSEO;

  return (
    <div className={classes.photosBox}>
      <Carousel onChange={(currentIndex) => setCurrentImg(currentIndex)}>
        {Array.isArray(images) &&
          images.map((itemImg, index) => {
            return (
              <Card key={index}>
                <CardMedia
                  image={itemImg?.image?.url}
                  style={{ paddingBottom: "64%", borderRadius: 6 }}
                />
              </Card>
            );
          })}
      </Carousel>
      <p className="text-field-label">Alt: {altSEO}</p>
      <p className="text-field-label">Title: {titleSEO}</p>
      <p className="text-field-label">Caption: {captionSEO}</p>
    </div>
  );
}
