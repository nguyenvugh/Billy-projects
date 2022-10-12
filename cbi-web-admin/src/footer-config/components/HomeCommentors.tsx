import React from "react";
import { Box, Button, Grid, GridItem, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Dropzone } from "src/common/components/dropzone";
import { Label } from "src/common/components/label";
import { HomeConfigProps } from "../interfaces";

function HomeCommentors({
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
      <Text variant="page-title"> Phần bình luận </Text>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="29px" columnGap="34px">
        <GridItem>
          <Label label="Tiêu đề" isRequired />
          <Input
            placeholder="Nhập tiêu đề"
            value={homeConfigJson.commentors.title}
            onChange={(e) => handleUpdateConfig("commentors.title", e.target.value)}
          />
        </GridItem>

        <GridItem>
          <Label label="Mô tả" isRequired />
          <Input
            placeholder="Nhập miêu tả"
            value={homeConfigJson.commentors.description}
            onChange={(e) => handleUpdateConfig("commentors.description", e.target.value)}
          />
        </GridItem>
      </Grid>

      <Box mt="3">
        <HStack spacing="4" alignItems="center">
          <Text variant="page-title">Người bình luận</Text>
          <Button onClick={() => handleAddMore("commentors.comments")}>Thêm</Button>
        </HStack>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="29px" columnGap="34px">
          {homeConfigJson.commentors.comments.map((cmt, i) => {
            return (
              <>
                <GridItem>
                  <Box>
                    <Label label="Tên và chức vụ" isRequired />
                    <Input
                      placeholder="Nhập tên"
                      value={cmt.commentorName}
                      onChange={(e) =>
                        handleUpdateConfig(
                          `commentors.comments[${i}].commentorName`,
                          e.target.value,
                        )
                      }
                    />
                  </Box>
                  <Box mt="4">
                    <Input
                      placeholder="Nhập chức vụ"
                      value={cmt.position}
                      onChange={(e) =>
                        handleUpdateConfig(`commentors.comments[${i}].position`, e.target.value)
                      }
                    />
                  </Box>
                </GridItem>
                <GridItem>
                  <Label label="Bình luận" isRequired />
                  <Textarea
                    h="100px"
                    placeholder="Nhập bình luận"
                    value={cmt.comment}
                    onChange={(e) =>
                      handleUpdateConfig(`commentors.comments[${i}].comment`, e.target.value)
                    }
                  />
                </GridItem>

                <GridItem display="flex" flexDir="column">
                  <Label label="Ảnh đại diện" isRequired />
                  <Box display="flex" alignItems="center" flexGrow={1}>
                    <Dropzone
                      containerStype={{ h: "100px" }}
                      onChange={(file?: File) =>
                        handleUpdateImg(`commentors.comments[${i}].avatarUrl`, file)
                      }
                      defaultImg={cmt.avatarUrl}
                    />
                    <Button
                      ml="3"
                      bg="red.primary"
                      onClick={() => handleRemoveItem("commentors.comments", i)}
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

export { HomeCommentors };
