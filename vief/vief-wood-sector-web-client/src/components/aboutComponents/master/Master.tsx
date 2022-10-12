import { Box, Stack, Text } from "@chakra-ui/react";
import { ThumbnailItemProp } from "../interfaces";
import SliderMaster from "./component/SliderMaster";

const Master = ({ listImgThumb }: ThumbnailItemProp) => {
  return (
    <Box>
      <Stack h={{ md: "535px", sm: "515px" }} spacing={{ md: "32px", sm: "16px" }}>
        <Box w={"1216px"} alignSelf="center">
          <Text variant={{ md: "text28", sm: "text24" }} sx={{ textAlign: { md: "start!important", sm: "center" } }}>
            Nhân sự /Chuyên gia
          </Text>
        </Box>
        <SliderMaster listImgThumb={listImgThumb} />
      </Stack>
    </Box>
  );
};
export default Master;
