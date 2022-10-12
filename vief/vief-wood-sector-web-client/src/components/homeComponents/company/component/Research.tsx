import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

const Research = () => {
  return (
    <>
      <Stack spacing="32px">
        <Stack spacing="16px" textAlign={"right"}>
          <Stack>
            <Breadcrumb
              color="brand.100"
              fontSize="20px"
              fontWeight="600"
              borderBottom={"solid 1.5px"}
              width="fit-content"
              alignSelf={"flex-end"}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="#" _hover={{ textDecoration: "none" }}>
                  Chuyện doanh nghiệp
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#" _hover={{ textDecoration: "none" }}>
                  Nghiên cứu điển hình
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>

          <Text
            width={"1007px"}
            alignSelf={"flex-end"}
            fontSize="36px"
            fontWeight={600}
            color="text"
          >
            Đề xuất các nhóm giải pháp ngoài lâm nghiệp nhằm giảm phát thải khí
            nhà kính
          </Text>
        </Stack>
        <Stack spacing="64px" direction="row">
          <Box h="450px" w="800px">
            <Image
              src="/researchIMG.png"
              w="full"
              h="full"
              borderRadius={"12px"}
              objectFit="cover"
              alt=""
            ></Image>
          </Box>
          <Stack w="384px" spacing="32px">
            <Text
              textAlign={"justify"}
              fontSize="14px"
              fontWeight="500"
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              maxWidth="100%"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor rhoncus dolor purus non enim praesent elementum
              facilisis leo, vel fringilla est ullamcorper eget nulla facilisi
              etiam dignissim diam quis enim lobortis scelerisque fermentum dui
              faucibus in ornare quam viverra orci sagittis eu volutpat odio
              facilisis mauris sit amet massa vitae tortor condimentum lacinia
              quis vel eros donec ac odio tempor orci dapibus ultrices in
              iaculis nunc sed augue
            </Text>
            <Link href="/" _hover={{ textDecoration: "none" }}>
              <Button
                bg="brand.100"
                textColor="white"
                rightIcon={<ArrowForwardIcon />}
              >
                Xem thêm
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Research;
