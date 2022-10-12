import Container from "@cbi/components/container";
import { ModalConfirm } from "@cbi/components/modal";
import ModalContainer from "@cbi/components/ModalContainer";
import Pagination from "@cbi/components/pagination";
import { SCREEN_AUTH } from "@cbi/constants/index";
import { useUserContext } from "@cbi/context/AuthContext";
import { getListEvaluateCBI } from "@cbi/services/cbi";
import { ItemEvaluateI } from "@cbi/services/cbi/cbi.interface";
import { Box, Button, Grid, Image, Text, Tooltip } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { memo, useEffect, useRef, useState } from "react";
import { useCheckCebiQuantitative } from "src/common/hooks/useCheckCebiQuantitative";
import { useCheckUserProfile } from "src/common/hooks/useCheckUserProfile";
import ModalStepCBI from "src/EvaluateCBI/ModalStepCBI";
const size = 8;

const EvaluateCBI = memo(() => {
  const router = useRouter();
  const [currentPage, setcurrentPage] = useState<Number>(1);
  const [total, setTotal] = useState<Number>(1);
  const [listEvaluate, setListEvaluate] = useState<ItemEvaluateI[]>([]);
  const { isCanOpenCebiQuan } = useCheckCebiQuantitative();

  useEffect(() => {
    (async () => {
      try {
        const response =
          (await getListEvaluateCBI({
            page: currentPage,
            limit: size,
          })) || [];
        setListEvaluate(response.results);
        setTotal(response.total);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentPage]);
  const onChangePage = (page: Number) => {
    setcurrentPage(page);
  };

  const finalListEvaluate: ItemEvaluateI[] = [
    ...listEvaluate,

    {
      id: "xxx",
      name: "Bản đánh giá định lượng khí CO2 thải ra môi trường dành cho doanh nghiệp tiên phong về khí hậu ",
      description: "",
      slug: "",
      thumbnail: {
        id: "x",
        url: "/img/global/evalutate-quantitative.png",
      },
      onAction: () => router.push("/cebi-quantitative"),
      isDisabled: !isCanOpenCebiQuan,
      isQuantitative: true,
    },
  ];
  return (
    <div>
      <Head>
        <title>Đánh giá CEBI</title>
        <meta name="description" content="CEBI-web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Box>
            <Text
              fontSize={{ base: "25px", md: "30px", lg: "36px" }}
              fontWeight="bold"
              pt={{ base: "40px", md: "55px", lg: "63px" }}
              pb={{ base: "24px", md: "27px", lg: "33px" }}
            >
              Đánh giá CEBI
            </Text>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              }}
              gridGap={{ base: "20px", md: "25px", lg: "30px" }}
            >
              {!!finalListEvaluate.length &&
                finalListEvaluate.map((item: ItemEvaluateI) => {
                  return (
                    <Box
                      key={item.name}
                      border="1px solid #E2E8F0"
                      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
                      borderRadius="12px"
                    >
                      <RenderItemCBi item={item} />
                    </Box>
                  );
                })}
            </Grid>
            <Box
              marginTop={{ base: "35px", md: "59px" }}
              marginBottom={{ base: "50px", md: "80px" }}
            >
              {listEvaluate.length > 0 && (
                <Pagination
                  current={currentPage}
                  total={total}
                  onChangePage={onChangePage}
                  size={size}
                />
              )}
            </Box>
          </Box>
        </Container>
      </main>
    </div>
  );
});

export default EvaluateCBI;

const RenderItemCBi = ({ item }: { item: ItemEvaluateI }) => {
  const router = useRouter();
  const [isOpenWarningModal, setOpenWarningModal] = useState(false);
  const { isCompletedProfile } = useCheckUserProfile();

  const refSignIn = useRef<{ openModal: Function }>(null);
  const refStepCBI = useRef<{ openModal: Function }>(null);
  const { userContext } = useUserContext();

  function handleSubmit() {
    if (item.onAction) {
      item.onAction();
    } else if (!userContext?.accessToken) {
      refSignIn.current?.openModal(SCREEN_AUTH.SIGN_IN);
    } else {
      if (!isCompletedProfile) {
        setOpenWarningModal(true);
        return;
      }
      refStepCBI.current?.openModal(item);
    }
  }
  return (
    <Box>
      <Image
        src={item.thumbnail.url}
        borderTopRadius="12px"
        height={{ base: "100px", md: "170px", lg: "205px" }}
        objectFit="cover"
        minW="100%"
      />
      <Box p={{ base: "12px", md: "14px", lg: "16px" }}>
        <Text
          fontWeight={"bold"}
          fontSize={{ base: "15px", md: "16px", lg: "18px" }}
          pb={{ base: "20px", md: "27px", lg: "34px" }}
        >
          {item.name}
        </Text>
        <Text fontSize={{ base: "12px", md: "14px" }} pb={{ base: "12px", md: "14px", lg: "16px" }}>
          {item.description}
        </Text>
        <Tooltip
          hasArrow
          label={
            item.isQuantitative && item.isDisabled
              ? "Sau khi bạn làm đánh giá CEBI và đạt cấp độ 02 Hành động vì môi trường bạn sẽ sử dụng được chức năng này"
              : ""
          }
          bg="#61A533"
          minWidth="450px"
        >
          <Box>
            <Button
              bg="#61A533"
              color="#FFFFFF"
              fontSize={{ base: "15px", md: "16px", lg: "18px" }}
              disabled={item.isDisabled}
              _hover={{
                bg: "#61A533",
              }}
              onClick={handleSubmit}
            >
              <Text>Tham gia ngay</Text>
            </Button>
          </Box>
        </Tooltip>
      </Box>
      <ModalConfirm
        isOpen={isOpenWarningModal}
        iconType="warning"
        title="Thông báo"
        content="Hiện tại bạn chưa hoàn thành đầy đủ thông tin để tiếp tục đánh giá CEBI, xin hãy  hoàn thiện thông tin cá nhân để tiếp tục!"
        textBtn="Hoàn thiện  thông tin"
        onConfirm={() => router.push("/climate-account?activeMenu=PROFILE_ACCOUNT")}
        onClose={() => setOpenWarningModal(false)}
      />
      <ModalContainer ref={refSignIn} />
      <ModalStepCBI ref={refStepCBI} />
    </Box>
  );
};
