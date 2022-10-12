import { ItemCbiUser } from "@cbi/services/auth/auth.interface";
import { calcuTitleRestultCBI } from "@cbi/utils/index";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Image,
  Link as LinkUI,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { Fragment, useRef } from "react";
import ModalStepCBIUser from "./ModalStepCBIUser";
const ItemResultEvaluate = ({
  item,
  setActiveResult,
  getDataQuestionCbi,
  setCbiGroup,
}: {
  item: ItemCbiUser;
  setActiveResult: Function;
  getDataQuestionCbi: Function;
  setCbiGroup: Function;
}) => {
  const refModalStepCBIUser = useRef<{ openModal: Function }>(null);
  const calcuTitle = calcuTitleRestultCBI(+item.total_scores);
  return (
    <Box mt="16px">
      <Flex
        boxShadow={"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"}
        border="1px solid #E2E8F0"
        borderRadius={"12px"}
        padding="24px"
        position={"relative"}
      >
        <Box
          __css={{
            svg: {
              overflow: "initial !important",
            },
          }}
        >
          <CircularProgress
            value={+item.total_scores}
            size={"145px"}
            color="#61A533"
            thickness="20px"
            trackColor="#D0F2D8"
          >
            <CircularProgressLabel>
              <Text
                fontSize={{ base: "25px", md: "28px", lg: "30px" }}
                fontWeight="bold"
                lineHeight={1}
              >
                {item.total_scores}
              </Text>
              <Text
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                fontWeight={500}
                lineHeight={1}
              >
                Điểm
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Flex
          ml={{ base: "16px", md: "24px" }}
          justifyContent="space-between"
          flexDirection={"column"}
        >
          <Box>
            <Text
              color="#2D3748"
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              fontWeight="bold"
              pb="12px"
            >
              {item.cbi.name}
            </Text>
            <Text color="#2D3748" fontSize={{ base: "12px", md: "14px" }} fontWeight={500}>
              {item.title_earned}
            </Text>
          </Box>
          <LinkUI
            href={"#"}
            onClick={() => {
              setCbiGroup(item);
              refModalStepCBIUser.current?.openModal(item);
            }}
          >
            <Flex
              alignItems={"center"}
              fontSize={{ base: "13px", md: "15px", lg: "16px" }}
              fontWeight={600}
              color="#61A533"
            >
              <Text pr="12px">Chi tiết kết quả</Text>
              <Image src="/img/global/ic_arrow_evaluate.png" />
            </Flex>
          </LinkUI>
        </Flex>
        <Image
          src={calcuTitle?.image}
          position="absolute"
          bottom={0}
          right={0}
          h={"160px"}
          opacity={0.3}
        />
      </Flex>
      <ModalStepCBIUser
        ref={refModalStepCBIUser}
        setActiveResult={setActiveResult}
        getDataQuestionCbi={getDataQuestionCbi}
      />
    </Box>
  );
};
const ListResultEvaluate = ({
  setActiveResult,
  listCbiUser,
  getDataQuestionCbi,
  setCbiGroup,
}: {
  listCbiUser: ItemCbiUser[];
  setActiveResult: Function;
  getDataQuestionCbi: Function;
  setCbiGroup: Function;
}) => {
  return (
    <Box mt={{ base: "60px", md: "80px", lg: "108px" }} ml={{ base: 0, sm: 10, md: 15, lg: 20 }}>
      <Text color="#2D3748" fontWeight={"bold"} fontSize={{ base: "25px", md: "28px", lg: "30px" }}>
        Kết quả của tôi
      </Text>
      {listCbiUser.length ? (
        listCbiUser.map((item) => {
          return (
            <Box key={item.id}>
              <ItemResultEvaluate
                item={item}
                setActiveResult={setActiveResult}
                getDataQuestionCbi={getDataQuestionCbi}
                setCbiGroup={setCbiGroup}
              />
            </Box>
          );
        })
      ) : (
        <Fragment>
          <Box
            color="#979797"
            fontSize={{ base: "16px", md: "25px" }}
            fontWeight="600"
            lineHeight={1.2}
            py={10}
          >
            <Text>Bạn chưa làm bài đánh giá nào!</Text>
            <Text>Nhấn Bắt đầu ngay để tham gia đánh giá</Text>
          </Box>
          <Box>
            <Link href="/evaluate-cebi">
              <Button
                bg="#61A533"
                _hover={{
                  bg: "#61A533",
                }}
                fontSize={{
                  base: "11px",
                  sm: "13px",
                  md: "15px",
                  lg: "16px",
                  xl: "18px",
                }}
                height={"auto"}
                px={{ base: "10px", sm: "15px", md: "17px", lg: "24px" }}
                py={{ base: "7px", lg: "10px" }}
                color="#ffff"
              >
                Bắt đầu ngay
              </Button>
            </Link>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

ListResultEvaluate.propTypes = {};

export default ListResultEvaluate;
