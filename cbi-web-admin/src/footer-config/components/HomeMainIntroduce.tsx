import React from "react";
import { Box, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { Dropzone } from "src/common/components/dropzone";
import { Label } from "src/common/components/label";
import { HomeConfigProps } from "../interfaces";

function HomeMainIntroduce({
  homeConfigJson,
  handleUpdateConfig,
  handleUpdateImg,
}: Pick<HomeConfigProps, "homeConfigJson" | "handleUpdateConfig" | "handleUpdateImg">) {
  return (
    <Box>
      <Text variant="page-title">Phần giới thiệu chính</Text>
      <Grid templateColumns="repeat(3, 1fr)" rowGap="29px" columnGap="34px">
        <GridItem>
          <Label label="Tiêu đề" />
          <Input
            placeholder="Nhập tên tiêu đề"
            value={homeConfigJson.main.title!!}
            onChange={(e) => handleUpdateConfig("main.title", e.target.value)}
          />
        </GridItem>

        <GridItem>
          <Label label="Mô tả" />
          <Input
            placeholder="Nhập mô tả"
            value={homeConfigJson.main.description}
            onChange={(e) => handleUpdateConfig("main.description", e.target.value)}
          />
        </GridItem>

        <GridItem rowSpan={3} colSpan={1} display="flex" flexDir="column">
          <Label label="Ảnh nền" />
          <Box flexGrow={1}>
            <Dropzone
              containerStype={{ maxH: "150px" }}
              onChange={(file?: File) => handleUpdateImg("main.bgThumnailUrl", file)}
              defaultImg={homeConfigJson.main.bgThumnailUrl}
            />
          </Box>
        </GridItem>

        <GridItem>
          <Label label="Tên nút" />
          <Input
            placeholder="Nhập tên nút"
            value={homeConfigJson.main.textBtn}
            onChange={(e) => handleUpdateConfig("main.textBtn", e.target.value)}
          />
        </GridItem>

        <GridItem>
          <Label label="Tiêu đề bổ sung" />
          <Input
            placeholder="Nhập tiêu đề bổ sung"
            value={homeConfigJson.main.extraText}
            onChange={(e) => handleUpdateConfig("main.extraText", e.target.value)}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}

export { HomeMainIntroduce };
