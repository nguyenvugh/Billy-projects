import React from "react";
import { Box, Button, Grid, GridItem, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Dropzone } from "src/common/components/dropzone";
import { Label } from "src/common/components/label";
import { HomeConfigProps } from "../interfaces";

function HomeIntroduce({
  homeConfigJson,
  handleUpdateConfig,
  handleUpdateImg,
  handleAddMore,
  handleRemoveItem,
}: Pick<
  HomeConfigProps,
  "homeConfigJson" | "handleUpdateConfig" | "handleUpdateImg" | "handleAddMore" | "handleRemoveItem"
>) {
  return (
    <Box>
      <Text variant="page-title"> Phần giới thiệu </Text>
      <Grid templateColumns="repeat(3, 1fr)" rowGap="29px" columnGap="34px">
        <GridItem>
          <Label label="Tiêu đề" />
          <Input
            placeholder="Nhập tên tiêu đề"
            value={homeConfigJson.introduce.title}
            onChange={(e) => handleUpdateConfig("introduce.title", e.target.value)}
          />
        </GridItem>

        <GridItem>
          <Label label="Mô tả" />
          <Input
            placeholder="Nhập mô tả"
            value={homeConfigJson.introduce.description}
            onChange={(e) => handleUpdateConfig("introduce.description", e.target.value)}
          />
        </GridItem>

        <GridItem>
          <Label label="Tên nút" />
          <Input
            placeholder="Nhập tên nút"
            value={homeConfigJson.introduce.textBtn}
            onChange={(e) => handleUpdateConfig("introduce.textBtn", e.target.value)}
          />
        </GridItem>
      </Grid>

      <Box mt="3">
        <HStack spacing="4" alignItems="center">
          <Text variant="page-title">Phần giới thiệu con</Text>
          <Button onClick={() => handleAddMore("introduce.items")}>Thêm</Button>
        </HStack>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="29px" columnGap="34px">
          {homeConfigJson.introduce.items.map((item, index) => {
            return (
              <>
                <GridItem>
                  <Label label="Tiêu đề" />
                  <Input
                    placeholder="Nhập tên tiêu đề"
                    value={item.title}
                    onChange={(e) =>
                      handleUpdateConfig(`introduce.items[${index}].title`, e.target.value)
                    }
                  />
                </GridItem>

                <GridItem>
                  <Label label="Mô tả" />
                  <Textarea
                    h="100px"
                    placeholder="Nhập mô tả"
                    value={item.description}
                    onChange={(e) =>
                      handleUpdateConfig(`introduce.items[${index}].description`, e.target.value)
                    }
                  />
                </GridItem>

                <GridItem display="flex" flexDir="column">
                  <Label label="Icon" />
                  <Box display="flex" alignItems="center" flexGrow={1}>
                    <Dropzone
                      containerStype={{ h: "100px" }}
                      onChange={(file?: File) =>
                        handleUpdateImg(`introduce.items[${index}].iconUrl`, file)
                      }
                      defaultImg={item.iconUrl}
                      upTitle="Drag files to here or"
                      downTitle="(Kích thước ảnh: 776x424)"
                    />
                    <Button
                      ml="3"
                      bg="red.primary"
                      onClick={() => handleRemoveItem("introduce.items", index)}
                    >
                      Xoá
                    </Button>
                  </Box>
                </GridItem>
              </>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export { HomeIntroduce };
