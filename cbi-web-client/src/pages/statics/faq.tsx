import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Container from "@cbi/components/container";
import Head from "next/head";
const RenderIndexData = ({ data, pr }: { data: string; pr?: string }) => (
  <Text fontWeight={"bold"} display="inline-block" pr={pr || "10px"}>
    {data}
  </Text>
);
const FAQ = (props: any) => {
  return (
    <div>
      <Head>
        <title>Câu hỏi thường gặp (FAQ)</title>
        <meta name="description" content="CEBI-web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Breadcrumb pt={{ base: "25px", md: "33px" }} color="#2D3748">
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/">Trang chủ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage fontWeight={"bold"}>
              <Text>Câu hỏi thường gặp (FAQ)</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box mb={{ base: "60px", md: "80px", lg: "100px" }}>
            <Text
              color="#2D3748"
              fontSize={{ base: "25px", md: "30px", lg: "36px" }}
              fontWeight="bold"
              pt={{ base: "35px", md: "45px", lg: "54px" }}
              pb={{ base: "20px", md: "25px", lg: "32px" }}
            >
              Câu hỏi thường gặp (FAQ)
            </Text>
            {listFAQ.map((item: { title: string; content: string }, index) => (
              <Box>
                <Text
                  color="#2D3748"
                  fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  fontWeight={"bold"}
                  pb="16px"
                >
                  <RenderIndexData data={`${index + 1}.`} />
                  {item.title}
                </Text>
                <Box fontSize={{ base: "14px", md: "16px" }} key={item.title} pb={"7px"}>
                  {item.content}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </main>
    </div>
  );
};

FAQ.propTypes = {};

export default FAQ;

const listFAQ = [
  {
    title: "Chỉ số CEBI là gì ?",
    content: `CEBI là một khung báo cáo tự động dựa trên nền tảng mạng. Thông qua CEBI, doanh nghiệp có thể đánh giá và đóng góp vào các mục tiêu giảm thiểu và thích ứng với biến đổi khí hậu trong bản "Những đóng góp do Quốc gia tự quyết" của Việt Nam. `,
  },
  {
    title: "Mục đích của chỉ số CEBI là gì?",
    content: `Kể từ khi tham gia vào Thoả thuận chung Paris trong khuôn khổ Công ước chung của Liên Hiệp Quốc về Biến đổi Khí hậu vào năm 2015, Việt Nam đã cam kết trong bản "Những đóng góp do Quốc gia tự quyết" về giảm thiểu khí thải nhà kính và thích ứng với biến đổi khí hậu. Thoả thuận này sẽ có hiệu lực kể từ 2020. CEBI được xây dựng với mục đích nhằm thuận lợi hoá việc áp dụng các báo cáo bền vững của doanh nghiệp và cải thiện kho thông tin liên quan tới khí hậu hiện tại còn rất hạn chế của Việt Nam. CEBI không chỉ giúp các cơ quan chính phủ theo dõi quá trình đạt được các mục tiêu trong "Những đóng góp do Quốc gia tự quyết" ở lĩnh vực tư nhân, giảm rào cản cho doanh nghiệp tham gia và hưởng lợi từ việc thích nghi biến đổi khí hậu và giảm lượng khí thải nhà kính, mà còn khuyến khích hiểu biết và đầu tư kinh tế thân thiện với khí hậu.`,
  },
  {
    title: "Tại sao tôi nên tham gia CEBI?",
    content: `Chúng tôi tin tưởng rẳng việc chia sẻ các hành động thân thiện với khí hậu của Quý công ty chính là đang đóng góp vào các mục tiêu giảm thiểu và thích ứng với Biến đổi khí hậu của quốc gia. Có rất nhiều lợi ích cho việc chia sẻ thông tin này như: sự đánh giá, cơ hội hợp tác với UNDP và nâng cao Trách nhiệm Xã hội của Doanh nghiệp nhằm mở rộng các mối làm ăn kinh tế. `,
  },
  {
    title: "Ai sẽ sử dụng thông tin và dữ liệu từ CEBI?",
    content:
      "Tất cả dữ liệu được dùng cho mục đích đánh giá cuối cùng (khép kín trong OXFAM) và không chia sẻ với bất cứ cá nhân/tổ chức ngoài nào khác. Bản phân tích cuối cùng của mỗi lĩnh vực sẽ được phát hành thông qua website, là nguồn tin cậu và hiệu quả cho chính phủ và giới đầu tư hiểu được lĩnh vực tư nhân tại Việt Nam. Đương nhiên, các công ty tham gia vào CEBI sẽ được sử dụng đánh giá CEBI của riêng mình để định hướng bộ và xây dựng phát triển mục tiêu kinh doanh.",
  },
  {
    title: "Tôi có bị phạt nếu không hoàn thành cấp độ CEBI nào không?",
    content:
      "Không. Do CEBI là hệ thống tự nguyện, chúng tôi ghi nhận sự sẵn lòng và đóng góp của bạn tới khí hậu bền vững và khuyến khích các công ty đạt được các cấp độ phù hợp với quy mô và năng lực của mình. ",
  },
];
