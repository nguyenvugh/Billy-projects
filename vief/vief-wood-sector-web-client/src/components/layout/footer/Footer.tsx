import { WebContainer } from "@/src/common/components/WebContainer";
import {
  ROUTE_ABOUT,
  ROUTE_ENTERPRISE_STORY,
  ROUTE_EVENT,
  ROUTE_HOME,
  ROUTE_LIBRARY,
  ROUTE_POLICY,
} from "@/src/common/constants/routes.constant";
import { useTranslation } from "@/src/common/hooks/useTranslation";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { Box, Center, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text variant="text20" mb="8px">
      {children}
    </Text>
  );
};

const Footer = () => {
  const router = useViefRouter();
  const { t } = useTranslation();
  const handleRouter = (children: any) => {
    router.push(children);
  };
  return (
    <Box bg="#F2F3F7" w="100%">
      <Center>
        <WebContainer>
          <SimpleGrid
            py={{ md: "64px", sm: "16px" }}
            columns={{ base: 3, sm: 1, md: 3 }}
            spacing={{ md: "64px", sm: "16px" }}
            color="text"
          >
            <Stack align={"flex-start"} spacing="8px">
              <ListHeader>Dự án phát triển mạng lưới CIO ngành gỗ và chế biến gỗ</ListHeader>
              <Text fontSize="14px" fontWeight={"500"}>
                Điện thoại: 024 2239 7555
              </Text>
              <Text fontSize="14px" fontWeight={"500"}>
                Email: info@vief.vn
              </Text>
            </Stack>

            <Stack align={"flex-start"} spacing="8px">
              <ListHeader>Địa chỉ</ListHeader>
              <Text variant="text14">Văn phòng Ban nghiên cứu phát triển kinh tế tư nhân</Text>
              <Text variant="text14">Địa chỉ: Tầng 6, Toà nhà số 10 Chu Văn An,Ba Đình, Hà Nội</Text>
              <Text variant="text14">Điện thoại: 024 2239 7555</Text>
              <Text variant="text14">Email: info@vief.vn</Text>
            </Stack>
            <Stack align={"flex-start"} spacing="8px">
              <ListHeader>Điều hướng</ListHeader>
              <Text onClick={() => handleRouter(ROUTE_HOME.en)} variant="text14" cursor="pointer">
                {t("home")}
              </Text>
              <Text onClick={() => handleRouter(ROUTE_POLICY.en)} variant="text14" cursor="pointer">
                Chính sách
              </Text>
              <Text onClick={() => handleRouter(ROUTE_EVENT.en)} variant="text14" cursor="pointer">
                Sự kiện
              </Text>
              <Text onClick={() => handleRouter(ROUTE_ENTERPRISE_STORY.en)} variant="text14" cursor="pointer">
                Doanh nghiệp
              </Text>
              <Text onClick={() => handleRouter(ROUTE_LIBRARY.en)} variant="text14" cursor="pointer">
                Thư viện
              </Text>
              <Text onClick={() => handleRouter(ROUTE_ABOUT.en)} variant="text14" cursor="pointer">
                Về chúng tôi
              </Text>
              <Text onClick={() => handleRouter(ROUTE_ABOUT.en)} variant="text14" cursor="pointer">
                Liên hệ
              </Text>
            </Stack>
          </SimpleGrid>
        </WebContainer>
      </Center>
    </Box>
  );
};
export default Footer;
