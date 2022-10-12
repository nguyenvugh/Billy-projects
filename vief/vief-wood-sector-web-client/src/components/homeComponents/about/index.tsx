import { ROUTE_ABOUT } from "@/src/common/constants/routes.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Partner from "./partner/Partner";
import { BsArrowRight } from "react-icons/bs";

const SectionAbout = () => {
  const router = useViefRouter();

  return (
    <Stack spacing={{ md: "64px", sm: "0px" }}>
      <Stack spacing={{ md: "64px", sm: "48px" }} direction={{ md: "row", sm: "column-reverse" }}>
        {/* Display from tablet mode */}
        <Box
          w="50%"
          h="444px"
          borderRadius="12px"
          position="relative"
          overflow="hidden"
          display={{ md: "block", sm: "none" }}
        >
          <Image src="/bgHome.png" alt="home" priority layout="fill" objectFit="cover" />
        </Box>
        <Stack w={{ md: "50%", sm: "100%" }} h="full" spacing={{ md: "32px", sm: "16px" }}>
          <Stack>
            <Stack>
              <Text variant={{ md: "text20", sm: "text16" }} borderBottom={"solid 1.5px"} width="fit-content">
                Về chúng tôi
              </Text>
            </Stack>
            <Text variant={{ md: "text36", sm: "text28" }}>ViEF - Vietnam Economic Forum</Text>
          </Stack>
          {/* Display in mobile mode */}
          <Box
            w="100%"
            h="257px"
            borderRadius="12px"
            position="relative"
            overflow="hidden"
            display={{ md: "none", sm: "block" }}
          >
            <Image src="/bgHome.png" alt="home" priority layout="fill" objectFit="cover" />
          </Box>
          <Text variant="text14" textAlign={"justify"}>
            Với chủ đề ViEF 2021 - Thúc đẩy tăng trưởng kinh tế và tạo sức bật cho doanh nghiệp trong tình hình mới,
            Diễn đàn Kinh tế Việt Nam thường niên lần thứ 4 là sự kiện gặp gỡ, đối thoại công tư quy mô quốc gia, nhằm
            huy động, tập hợp hiệu quả nguồn lực của khu vực doanh nghiệp để xây dựng và thực thi hiệu quả Chương trình
            phục hồi, phát triển kinh tế giai đoạn 2022 - 2023, góp phần thúc đẩy các mục tiêu tăng trưởng giai đoạn 5
            năm và trước mắt trọng tâm cho năm 2022 là năm có ý nghĩa “bản lề” để bứt phá trong bối cảnh dịch bệnh
            Covid-19.
          </Text>
          <Box>
            <Button
              variant="primary"
              rightIcon={<BsArrowRight />}
              onClick={() => {
                router.push(ROUTE_ABOUT["en"]);
              }}
            >
              Xem thêm
            </Button>
          </Box>
        </Stack>
      </Stack>

      <Partner />
    </Stack>
  );
};

export default SectionAbout;
