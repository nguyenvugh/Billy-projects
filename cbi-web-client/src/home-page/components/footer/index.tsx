import ToastError from "@cbi/components/ToastError";
import { postEmailServices } from "@cbi/services/email";
import { isEmail } from "@cbi/utils/validate";
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Image,
  Input,
  Link as LinkUI,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import Container from "src/common/components/container";
import { ConfigValue, DonorsSection } from "../slide-homepage/interfaces";
import { ConfirmPopup } from "./ConfirmPopup";
import ContactForm from "./ContactForm";
import Donors from "./Donors";
interface ItemFooter {
  title: string;
  data: Array<{ title: string; href: string; target?: string }>;
}

type FooterLayout = {
  donors: DonorsSection;
  footerConfig: ConfigValue;
};
function FooterLayout({ donors, footerConfig }: FooterLayout) {
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const data = require("./mock.json");
  const listData = data.list;
  listData[0].title = footerConfig.companyName;
  listData[0].data[0].title = footerConfig.address;

  listData[1].data[0].title = footerConfig.email;
  listData[1].data[1].title = footerConfig.hotline;
  listData[1].data[1].href = `tel:${footerConfig.hotline}`;
  const infomation = data.infomation;
  const isShowErr = !email && isSubmitted ? "Xin hãy nhập Email của bạn!" : "";
  const isEmailInvalid =
    !!email && !isEmail(email) ? "Nhập email không hợp lệ!" : "";

  function handleSubmit() {
    setIsSubmitted(true);
    if (!email || !!isEmailInvalid) {
      return;
    }
    postEmailServices({ email })
      .then(() => {
        setShowConfirm(true);
      })
      .catch((err) => {
        toast({
          position: "top",
          status: "error",
          isClosable: true,
          duration: 2000,
          render: () => <ToastError message="Gửi Email không thành công!" />,
        });
      });
  }
  return (
    <Box>
      <Donors data={donors} />
      <ContactForm />
      <Box bg="#61A533" pt="14px" pb="14px">
        <Container>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexWrap={{ base: "wrap", sm: "nowrap" }}
          >
            <Box>
              <Image src="/img/global/logo.svg" />
            </Box>
            <Box>
              <HStack spacing="16px">
                <Image src="/img/global/ic_facebook.svg" />
                <Image src="/img/global/ic_youtube.svg" />
                <Image src="/img/global/ic_media.svg" />
              </HStack>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr 2fr" }}
          spacing={8}
          pt="44px"
          pb="44px"
        >
          {listData.map((item: ItemFooter, index: number) => {
            return (
              <Stack
                align={"flex-start"}
                key={item.title}
                w={index == 0 ? "208px" : "auto"}
              >
                <Text
                  fontWeight="500"
                  fontSize={{ base: "17px", md: "18px" }}
                  color="#2D3748"
                >
                  {item.title}
                </Text>
                {item.data.map(
                  (el: { title: string; href: string; target?: string }) => (
                    <LinkUI
                      target={el.target && el.target}
                      href={el.href && el.href}
                      key={el.title}
                      color="#4A5568"
                      fontSize={{ base: "15px", md: "16px" }}
                      as={Link}
                    >
                      {el.title}
                    </LinkUI>
                  )
                )}
              </Stack>
            );
          })}
          <Stack
            align={"flex-start"}
            key={"Theo dõi Bản tin"}
            alignItems={{ base: "center", sm: "initial" }}
          >
            <Text
              color="#2D3748"
              fontWeight={"500"}
              fontSize={{ base: "16px", md: "18px" }}
            >
              Theo dõi Bản tin
            </Text>
            <Flex>
              <Box>
                <Input
                  placeholder="Nhập Email của bạn"
                  pl={"16px"}
                  pr="16px"
                  h="48px"
                  bg="#EDF2F7"
                  borderRadius="6px"
                  fontSize={{ base: "16px", md: "18px" }}
                  border={"none"}
                  _focus={{
                    outline: "none",
                  }}
                  _placeholder={{
                    color: "#A0AEC0",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Collapse in={!!isShowErr || !!isEmailInvalid} animateOpacity>
                  <Text color="red" fontSize="12px" mt="1" fontWeight="medium">
                    {isShowErr || isEmailInvalid}
                  </Text>
                </Collapse>
              </Box>
              <Button
                ml="8px"
                w="48px"
                h="48px"
                bg="#61A533"
                borderRadius="6px"
                border="none"
                _hover={{
                  bg: "#61A5338C",
                }}
                onClick={handleSubmit}
              >
                <Image src="/img/global/ic_follow_page.svg" />
              </Button>
            </Flex>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box fontSize="14px" pt="44px" pb="44px" bg="#F7FAFC">
        <Container>
          <Text color="#1A202C" fontWeight="500" fontSize="14px">
            {infomation.title}
          </Text>
          <Text color="#4A5568">{infomation.description}</Text>
        </Container>
      </Box>

      <Container>
        <Flex
          justifyContent="space-between"
          pt="35px"
          pb="35px"
          alignItems="center"
        >
          <Text fontSize={"12px"}>2020 TESO. All rights reserved</Text>
          <Image src="/img/global/img_boCongThuong.svg" />
        </Flex>
      </Container>

      <ConfirmPopup
        isOpen={showConfirm}
        onClose={() => {
          setIsSubmitted(false);
          setEmail("");
          setShowConfirm(false);
        }}
      />
    </Box>
  );
}

export default FooterLayout;
