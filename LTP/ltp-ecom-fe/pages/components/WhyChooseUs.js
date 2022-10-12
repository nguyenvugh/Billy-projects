import { Box, Text, Grid, Stack } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import Image from "next/image";

const contents = [
  {
    id: 1,
    icon: "/imgs/why-choose-us/technology.svg",
    name: "Đầu tư công nghệ",
    description:
      "Máy móc, dây chuyền hiện đại giúp tạo ra các sản phẩm chất lượng, đa dạng và phong phú",
  },
  {
    id: 2,
    icon: "/imgs/why-choose-us/delivery.svg",
    name: "Giao hàng nhanh chóng",
    description: "Chúng tôi cam kết Giao hàng nhanh chóng mọi lúc mọi nơi",
  },
  {
    id: 3,
    icon: "/imgs/why-choose-us/green-environment.svg",
    name: "Định hướng môi trường",
    description:
      "Áp dụng các quy trình quản lý môi trường tiên tiến, đáp ứng các hoạt động về môi trường và chất thải",
  },
];

const contentsEn = [
  {
    id: 1,
    icon: "/imgs/why-choose-us/technology.svg",
    name: "Technology investment",
    description: "Modern machines and lines help create quality, diverse and rich products",
  },
  {
    id: 2,
    icon: "/imgs/why-choose-us/delivery.svg",
    name: "Fast delivery",
    description: "We are committed to deliver quickly anytime, anywhere",
  },
  {
    id: 3,
    icon: "/imgs/why-choose-us/green-environment.svg",
    name: "Environment orientation",
    description:
      "Apply advanced environmental management processes to meet environmental and waste activities",
  },
];

export default function WhyChooseUs() {
  const { t, locale } = useTranslation();
  return (
    <Box color="#ffffff" bg="url('/imgs/why-choose-us.svg')" bgSize="cover">
      <Box
        bg="rgba(45, 55, 72, 0.64)"
        align="center"
        py={{ base: 4, md: 20 }}
        px={{ base: 2, md: 40 }}
      >
        <Text fontSize={{ base: 14, md: 30 }} fontWeight={600}>
          {t("whyChooseUs")}
        </Text>
        <Text fontSize={{ base: 12, md: 16 }} fontWeight={500} mt={4}>
          {t("whyChooseUsContent")}
        </Text>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
          mt={{ base: 6, md: 12 }}
        >
          {locale === "vi"
            ? contents.map((item) => (
                <Box
                  key={item}
                  role="group"
                  p={{ base: 2, md: 6 }}
                  w="full"
                  zIndex={1}
                  align="center"
                >
                  <Box>
                    <Image width="76px" height="76px" objectFit="cover" src={item.icon} />
                  </Box>
                  <Stack pt={10} align="center">
                    <Text fontSize={{ base: 14, md: 18 }} textTransform="uppercase">
                      {item.name}
                    </Text>
                    <Text fontSize={14}>{item.description}</Text>
                  </Stack>
                </Box>
              ))
            : contentsEn.map((item) => (
                <Box
                  key={item}
                  role="group"
                  p={{ base: 2, md: 6 }}
                  w="full"
                  zIndex={1}
                  align="center"
                >
                  <Box>
                    <Image
                      width="76px"
                      height="76px"
                      objectFit="cover"
                      src={item.icon}
                      alt={item?.alt || ""}
                      title={item?.title || ""}
                    />
                  </Box>
                  <Stack pt={10} align="center">
                    <Text fontSize={{ base: 14, md: 18 }} textTransform="uppercase">
                      {item.name}
                    </Text>
                    <Text fontSize={14}>{item.description}</Text>
                  </Stack>
                </Box>
              ))}
        </Grid>
      </Box>
    </Box>
  );
}
