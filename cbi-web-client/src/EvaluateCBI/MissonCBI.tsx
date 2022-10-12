import React from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import Container from "@cbi/components/container";
const MissonCBI = (props: any) => {
  return (
    <Box
      textAlign="center"
      bgImage="/img/global/ic_misson.png"
      bgRepeat={"no-repeat"}
      bgSize="cover"
    >
      <Box
        color="#FFFFFF"
        fontSize={{ base: "14px", lg: "16px" }}
        pt="54px"
        pb="80px"
      >
        <Text
          fontSize={{ base: "25px", md: "30px", lg: "36px" }}
          fontWeight="bold"
          pb={{ base: "20px", md: "30px", lg: "40px" }}
        >
          Tầm nhìn sứ mạng
        </Text>
        <Text w={{ base: "90%", sm: "70%", md: "60%", lg: "50%" }} m="auto">
          Tầm nhìn của Oxfam tại Việt Nam là hướng tới một Việt Nam nơi mọi hình
          thức nghèo đói, bất công và bất bình đẳng đều được xóa bỏ bằng cách
          tạo điều kiện cho phụ nữ và các cộng đồng yếu thế thực hiện các quyền
          và đưa ra các chương trình nghị sự của riêng họ.Chấm dứt bất bình đẳng
          là điều cơ bản cho những gì chúng ta làm. Chúng tôi tin rằng bình đẳng
          là điều cần thiết cho một xã hội công bằng - một xã hội trong đó tất
          cả mọi người, không phân biệt giới tính, đều có quyền tiếp cận bình
          đẳng với các nguồn lực và cơ hội, đồng thời được đối xử công bằng và
          tôn trọng. Chúng tôi làm việc với các đối tác của mình trong chính
          phủ, xã hội dân sự, kinh doanh, truyền thông và học viện để tác động
          đến chính sách và thay đổi các hệ thống duy trì sự bất bình đẳng. Để
          đảm bảo sự thay đổi lâu dài, chúng tôi nỗ lực thay đổi câu chuyện nói
          rằng bất bình đẳng là có thể chấp nhận được và không thể tránh khỏi.
        </Text>
      </Box>
    </Box>
  );
};

MissonCBI.propTypes = {};

export default MissonCBI;
