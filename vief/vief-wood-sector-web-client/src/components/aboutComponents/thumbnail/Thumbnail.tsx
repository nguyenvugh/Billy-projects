import { Box, Stack, Text } from "@chakra-ui/react";
import { ListImgProps } from "../interfaces";
import SliderImage from "./component/SliderImage";

const Thumbnail = ({ listImg, listImgThumb }: ListImgProps) => {
  return (
    <>
      <Box>
        <Stack h={{ md: "375px", sm: "265px" }} w="full">
          <Box w={"1216px"} alignSelf="center">
            <Text variant={{ md: "text28", sm: "text24" }} sx={{ textAlign: { md: "start!important", sm: "center" } }}>
              Hình ảnh
            </Text>
          </Box>
          <SliderImage listImg={listImg} listImgThumb={listImgThumb} />
        </Stack>
      </Box>
    </>
  );
};

export default Thumbnail;
