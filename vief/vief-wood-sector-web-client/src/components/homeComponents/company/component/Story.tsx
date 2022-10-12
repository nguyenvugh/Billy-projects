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

const Story = () => {
  return (
    <>
      <Stack direction={"row"} spacing="64px">
        <Stack spacing="32px" w="70%">
          <Stack>
            <Breadcrumb
              color="brand.100"
              fontSize="20px"
              fontWeight="600"
              borderBottom={"solid 1.5px"}
              width="fit-content"
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="#" _hover={{ textDecoration: "none" }}>
                  Chuyện doanh nghiệp
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" _hover={{ textDecoration: "none" }}>
                  Câu chuyện
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>

          <Text fontSize="36px" fontWeight={600} color="text">
            IFC phối hợp ngân hàng Việt thúc đẩy dự án bảo vệ môi trường
          </Text>
          <Text textAlign={"justify"} fontSize="14px" fontWeight="500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel fringilla est ullamcorper eget nulla facilisi etiam
            dignissim diam quis enim lobortis scelerisque fermentum dui faucibus
            in ornare quam viverra orci sagittis eu volutpat odio facilisis
            mauris sit amet massa vitae tortor condimentum lacinia quis vel eros
            donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue
            lacus
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
        <Box>
          <Image
            src="/companyIMG.png"
            w="full"
            h="444px"
            objectFit="cover"
            borderRadius={"12px"}
          ></Image>
        </Box>
      </Stack>
    </>
  );
};

export default Story;
