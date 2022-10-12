import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Link,
} from "@chakra-ui/react";

const ModalSubmitCBI = (props: any, ref: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPoint, setTotalPoint] = useState<Number>(0);
  useImperativeHandle(ref, () => ({
    openModal(total: Number) {
      setTotalPoint(total);
      setIsOpen(true);
    },
  }));
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Box p={6} py={10}>
          <Box>
            <Box textAlign={"center"} pb="32px">
              <Image src="/img/global/ic_submitsuccessCBI.png" m="auto" />
            </Box>
            {totalPoint !== 0 ? (
              <Box color="#2D3748" textAlign={"center"}>
                <Text
                  pb="16px"
                  fontWeight={"bold"}
                  fontSize={{ base: "20px", md: "24px" }}
                >
                  Nộp bài thành công!
                </Text>
                <Box
                  fontSize="18px"
                  fontWeight={500}
                  pb={{ base: "25px", md: "32px" }}
                >
                  <Text display={"inline-block"}>
                    Cảm ơn sự cố gắng của bạn, kết quả bài thi của bạn đạt{" "}
                    <span style={{ fontWeight: "bold" }}>{10} điểm</span>. Bạn
                    có thể kiểm tra kết quả của mình ở mục “ Kết quả của tôi ”.
                  </Text>
                </Box>
              </Box>
            ) : (
              <Box color="#2D3748" textAlign={"center"}>
                <Text
                  pb="16px"
                  fontWeight={"bold"}
                  fontSize={{ base: "20px", md: "24px" }}
                >
                  Nộp không bài thành công!
                </Text>
                <Box
                  fontSize="18px"
                  fontWeight={500}
                  pb={{ base: "25px", md: "32px" }}
                >
                  <Text display={"inline-block"}>
                    Cảm ơn bạn đã tham gia vào bài đánh giá CEBI. Câu trả lời
                    của bạn đã được gửi về hệ thống của Oxfam . Sau khi hoàn tất
                    đánh giá, Oxfam sẽ thông báo kết qủa của bạn. Hoặc bạn có
                    thể kiểm tra kết quả của mình ở mục “Kết quả của tôi”.
                  </Text>
                </Box>
              </Box>
            )}

            <Button
              as={Link}
              href="/"
              bg="#61A533"
              borderRadius="6px"
              fontSize={{
                base: "15px",
                lg: "16px",
                xl: "18px",
              }}
              color="#FFFFFF"
              height={"auto"}
              py={"10px"}
              _hover={{
                bg: "#61A533",
              }}
              w="100%"
              _active={{
                bg: "#61A533",
              }}
            >
              Trở về Trang chủ
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalSubmitCBI);
