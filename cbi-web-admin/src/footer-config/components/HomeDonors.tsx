import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Button, Grid, GridItem, Image, Input, Text } from "@chakra-ui/react";
import React from "react";
import { Dropzone } from "src/common/components/dropzone";
import { Label } from "src/common/components/label";
import { HomeConfigProps } from "../interfaces";

function HomeDonors({
  homeConfigJson,
  handleUpdateConfig,
  handleRemoveItem,
  handleUpdateLogo,
}: Pick<
  HomeConfigProps,
  "homeConfigJson" | "handleUpdateConfig" | "handleRemoveItem" | "handleUpdateLogo"
>) {
  return (
    <Box>
      <Text variant="page-title"> Phần nhà tài trợ </Text>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="29px" columnGap="34px">
        <GridItem>
          <Label label="Tiêu đề" isRequired />
          <Input
            placeholder="Nhập tiêu đề"
            value={homeConfigJson.donors.title}
            onChange={(e) => handleUpdateConfig("donors.title", e.target.value)}
          />
        </GridItem>

        <GridItem>
          <Label label="Mô tả" isRequired />
          <Input
            placeholder="Nhập miêu tả"
            value={homeConfigJson.donors.description}
            onChange={(e) => handleUpdateConfig("donors.description", e.target.value)}
          />
        </GridItem>
      </Grid>

      <Box mt="3">
        <Box display="flex" alignItems="center">
          <Text variant="page-title">Logo nhà tài trợ</Text>
          <Dropzone onChange={handleUpdateLogo}>
            <Button ml="4">Tải logo</Button>
          </Dropzone>
        </Box>

        <Box display="flex" p="3" mt="3" flexWrap="wrap">
          {homeConfigJson.donors.donorAvatarUrls.map((logo, index) => {
            return (
              <Box border="1px solid grey" display="flex" flexShrink={0} mr="3" mt="3">
                <Image src={logo} w="28" h="16" />
                <SmallCloseIcon
                  boxSize={"10"}
                  cursor="pointer"
                  onClick={() => handleRemoveItem("donors.donorAvatarUrls", index)}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export { HomeDonors };
