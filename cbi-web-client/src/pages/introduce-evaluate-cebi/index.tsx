import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  Image,
  Text,
  Icon,
} from "@chakra-ui/react";
import Head from "next/head";
import Container from "@cbi/components/container";
import { BsFillCircleFill } from "react-icons/bs";
import Link from "next/link";
import WhyChooseCBI from "src/EvaluateCBI/WhyChooseCBI";
import AdvantageCBI from "src/EvaluateCBI/AdvantageCBI";
import Participants from "src/EvaluateCBI/Participants";
import MissonCBI from "src/EvaluateCBI/MissonCBI";
import EvaluateCBI from "src/EvaluateCBI/ReviewsCBI";
import SupportMechanismCBI from "src/EvaluateCBI/SupportMechanismCBI";
import ProcessCBI from "src/EvaluateCBI/ProcessCBI";
const listWhy = [
  "Chỉ số Khí hậu Doanh nghiệp là một hệ thống đăng ký tự nguyện dựa trên web.",
  "Được phát triển bởi Chương trình Phát triển Liên Hợp Quốc.",
  "Chỉ số Khí hậu Doanh nghiệp là một hệ thống đăng ký tự nguyện dựa trên web.",
  "Được phát triển bởi Chương trình Phát triển Liên Hợp Quốc.",
];
const advantage = [
  "Nhận được chứng nhận từ OXFAM sau khi hoàn thành",
  "Nhiều cơ hội hơn trong mạng lưới với chính phủ và các nhà đầu tư, cả trong nước và quốc tế.",
  "Tài nguyên kiến ​​thức và bộ công cụ được đề xuất; mẫu báo cáo; và gắn kết chặt chẽ hơn với OXFAM Việt Nam.",
];
const participants = [
  "Khởi nghiệp",
  "Doanh nghiệp vừa và nhỏ",
  "Công ty lớn ( tư nhân hoặc quốc gia)",
  "Công ty đa quốc gia",
];
const iIntroduceEvaluateCBI = (props: any) => {
  return (
    <div>
      <Head>
        <title>Giới thiệu CEBI</title>
        <meta name="description" content="CEBI-web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Breadcrumb pt={{ base: "25px", md: "33px" }} color="#2D3748">
            <BreadcrumbItem>
              <Link href="/evaluate-cebi" passHref shallow>
                <BreadcrumbLink>Đánh giá CEBI</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage fontWeight={"bold"}>
              <Text>Giới thiệu về CEBI</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box mt={10} mb={6}>
            <Text
              color="rgba(0, 0, 0, 0.8)"
              fontSize={{ base: "20px", md: "30px", lg: "36px" }}
              fontWeight="bold"
            >
              Chỉ số khí hậu doanh nghiệp là gì?
            </Text>
            <Text
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              pb={{ base: "35px", md: "40px", lg: "52px" }}
              pt={{ base: "16px", md: "20px", lg: "24px" }}
            >
              Chỉ số Khí hậu Doanh nghiệp là một hệ thống đăng ký tự nguyện dựa trên web, được phát
              triển bởi liên minh quốc tế OXFAM cho các công ty tư nhân để đánh giá và ghi nhận đóng
              góp của họ để giảm phát thải khí nhà kính và giải quyết các tác động của biến đổi khí
              hậu.
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
              <WhyChooseCBI />
              <AdvantageCBI />
            </Grid>
          </Box>
        </Container>
        <Participants />
        <MissonCBI />
        <Box bg="#F7FAFC">
          <Container>
            <EvaluateCBI />
          </Container>
        </Box>
        <Container>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            py={{ base: "40px", md: "60px", lg: "80px" }}
          >
            <SupportMechanismCBI />
            <ProcessCBI />
          </Grid>
        </Container>
      </main>
    </div>
  );
};

iIntroduceEvaluateCBI.propTypes = {};

export default iIntroduceEvaluateCBI;
