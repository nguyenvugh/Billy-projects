import { Box, Button, Center, Link, Stack, Text } from "@chakra-ui/react";
import Partner from "../../homeComponents/about/partner/Partner";

const WeAre = () => {
  return (
    <>
      <Box>
        <Box>
          <Stack w="full" align={"center"} spacing={{ md: "64px", sm: "32px" }}>
            <Text
              variant={{
                md: "text20",
                sm: "text16",
              }}
              borderBottom={"solid 1.5px"}
              width="fit-content"
              _hover={{ textDecoration: "none" }}
            >
              Về chúng tôi
            </Text>
            <Stack direction={{ md: "row", sm: "column" }} spacing={{ md: "32px", sm: "16px" }}>
              <Stack spacing={{ sm: "16px", md: "32px" }} w={{ sm: "100%", md: "50%" }} alignSelf="center">
                <Text
                  fontSize={{ base: "none", md: "36px", sm: "28px" }}
                  fontWeight={"700"}
                  textColor="brand.title"
                  lineHeight={"150%"}
                >
                  Diễn đàn Kinh tế Việt Nam thường niên lần thứ 4
                </Text>
                <Box>
                  <Button variant="primary">Đăng ký nhận tin</Button>
                </Box>
              </Stack>
              <Stack spacing={{ sm: "16px", md: "32px" }} w={{ sm: "100%", md: "50%" }}>
                <Text fontSize={"14px"} fontWeight={"500"} color="brand.text" textAlign={"justify"}>
                  Với chủ đề ViEF 2021 - Thúc đẩy tăng trưởng kinh tế và tạo sức bật cho doanh nghiệp trong tình hình
                  mới, Diễn đàn Kinh tế Việt Nam thường niên lần thứ 4 là sự kiện gặp gỡ, đối thoại công tư quy mô quốc
                  gia, nhằm huy động, tập hợp hiệu quả nguồn lực của khu vực doanh nghiệp để xây dựng và thực thi hiệu
                  quả Chương trình phục hồi, phát triển kinh tế giai đoạn 2022 - 2023, góp phần thúc đẩy các mục tiêu
                  tăng trưởng giai đoạn 5 năm và trước mắt trọng tâm cho năm 2022 là năm có ý nghĩa “bản lề” để bứt phá
                  trong bối cảnh dịch bệnh Covid-19.
                </Text>
                <Text fontSize={"14px"} fontWeight={"500"} color="brand.text" textAlign={"justify"}>
                  Dưới sự chủ trì của Thủ tướng Chính phủ và có sự tham gia của đông đảo cộng đồng doanh nghiệp, Diễn
                  đàn cũng đặt mục tiêu huy động, tập hợp hiệu quả nguồn lực của khu vực doanh nghiệp vào các bài toán
                  trọng tâm của nền kinh tế, như tinh thần Thủ tướng đã nêu “mong muốn cộng đồng doanh nghiệp thực sự là
                  trung tâm, là chủ thể trong phòng chống dịch và phát triển kinh tế xã hội”. Cùng với đó, tinh thần đối
                  thoại, hợp tác công - tư được thúc đẩy và duy trì thường xuyên, góp phần tạo lập khí thế, nỗ lực hành
                  động của cả hai khu vực công - tư.
                </Text>
              </Stack>
            </Stack>
            <Partner />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default WeAre;
