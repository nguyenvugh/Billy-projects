import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Flex, Grid, Image, Text, Icon, Link } from "@chakra-ui/react";
const RenderCircle = () => (
  <Box
    bg="radial-gradient(83.4% 83.4% at 80.72% 7.09%, rgba(97, 165, 51, 0.15) 0%, rgba(204, 255, 170, 0.15) 100%)"
    w="80px"
    h="80px"
    borderRadius={50}
    position="absolute"
    top={"-20%"}
    right="-20%"
  />
);
const EvaluateCBI = (props: any) => {
  return (
    <Box py={{ base: "40px", md: "60px", lg: "80px" }}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
        <Box>
          <Text
            color="rgba(0, 0, 0, 0.8)"
            fontSize={{ base: "20px", md: "30px", lg: "36px" }}
            fontWeight="bold"
            mb={{ base: "25px", md: "35px", lg: "50px" }}
          >
            Bài đánh giá CEBI
          </Text>
          <Box color="#4A5568" fontSize={{ base: "14px", lg: "16px" }}>
            <Text>
              Một bài đánh giá CEBI bao gồm n câu hỏi, trắc nghiệp, chú ý đọc kĩ câu hỏi, một vài
              trong số đó sẽ yêu cầu bạn phỉa tải lên những tài liệu liên quan để minh chứng cho câu
              trả lời của bạn.
            </Text>
            <Text pt={8}>
              Bạn sẽ chỉ cần làm một bài đánh giá duy nhất, kết quả sẽ được phân loại và bạn sẽ nhận
              được chứng nhận tương ứng với kết quả của mình. Nếu bạn không may, không nhận dược
              chứng chỉ từ OXFAM, bạn có thể quay lại để làm bài đánh giá CEBI 6 tháng tính từ ngày
              bạn có kết quả. Bên dưới chúng tôi sẽ giải thích chi tiết cách phân loại kết quả và
              phần thưởng tương ứng.
            </Text>
          </Box>
          <Button
            as={Link}
            href="/evaluate-cebi"
            bg="#61A533"
            color="#FFFFFF"
            fontSize={{ base: "15px", md: "16px", lg: "18px" }}
            mt={{ base: "18px", md: "27px", lg: "37px" }}
            px={10}
          >
            Đánh giá ngay
          </Button>
        </Box>
        <Box>
          <Box textAlign={"center"} mt={{ base: "37px", sm: 0 }}>
            <Box position={"relative"} display="inline-block">
              <Image src="/img/global/ic_tienphongkhihau.png" zIndex={1} />
              <RenderCircle />
            </Box>
            <Text
              color="#171717"
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              fontWeight="bold"
            >
              Tiên phong về khí hậu
            </Text>
            <Text color="#4A5568">Cấp 3: Từ 75-100 điểm</Text>
          </Box>
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
            mt="37px"
            justifyContent={"center"}
          >
            <Box textAlign={"center"} mt={{ base: "40px", sm: 0 }}>
              <Box position={"relative"} display="inline-block">
                <Image src="/img/global/ic_hanhdongkhihau.png" zIndex={1} />
                <RenderCircle />
              </Box>
              <Text
                color="#171717"
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                fontWeight="bold"
              >
                Hành động về khí hậu
              </Text>
              <Text color="#4A5568">Cấp 2: Từ 51-74 điểm</Text>
            </Box>
            <Box textAlign={"center"} mt={{ base: "40px", sm: 0 }}>
              <Box position={"relative"} display="inline-block">
                <Image src="/img/global/ic_ythuckhihau.png" zIndex={1} />
                <RenderCircle />
              </Box>
              <Text
                color="#171717"
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                fontWeight="bold"
              >
                Ý thức về khí hậu
              </Text>
              <Text color="#4A5568">Cấp 1: Từ 26-50 điểm</Text>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

EvaluateCBI.propTypes = {};

export default EvaluateCBI;
