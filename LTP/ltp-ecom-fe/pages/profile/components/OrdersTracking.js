import { Box, Flex, Image, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { formatDate, formatDateToLocal, formatTimeLocale } from "@ltp/utils/date";
import Lodash from "lodash";
import useOrderTracking from "pages/profile/hooks/orderTracking";
import { useEffect, useState } from "react";
import { ORDER_DETAIL } from "../index";

const formatOrderTracking = {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const OrdersTracking = ({ order, product, setActiveMenu }) => {
  const { orderTracking } = useOrderTracking({ order, product });
  const [statusTracking, setStatusTracking] = useState([]);
  const [newStatusTracking, setNewStatusTracking] = useState({});
  const { t, locale } = useTranslation();
  const onBack = () => {
    setActiveMenu instanceof Function && setActiveMenu(ORDER_DETAIL);
  };

  useEffect(() => {
    if (!Lodash.isEmpty(orderTracking)) {
      const listTrack = [];
      const listStatusTrack = [];
      const tracking = orderTracking?.tracking || [];
      const shipping_statuses = orderTracking?.shipping_statuses || {};
      for (const [key, value] of Object.entries(shipping_statuses)) {
        listTrack.push({ step: +key, label: value });
      }
      tracking.forEach((item) => {
        const status = listTrack.find((x) => x.step == item.status);
        listStatusTrack.push({ ...item, track_value: status?.label });
      });
      const resGroup = groupDate(listStatusTrack);
      setStatusTracking(resGroup);
      setNewStatusTracking(listStatusTrack[0] || {});
    }
  }, [orderTracking]);
  const groupDate = (listStatusTrack) => {
    const groupArrays = listStatusTrack.reduce((arr, cur) => {
      const dateFormat = formatDate(cur.created_at, "YYYY-MM-DD");
      const indexExist = Lodash.findIndex(arr, { created_at: dateFormat });
      if (indexExist !== -1) {
        arr[indexExist].groups.push(cur);
      } else {
        arr.push({ created_at: dateFormat, groups: [cur] });
      }
      return arr;
    }, []);
    return groupArrays;
  };
  return (
    <Box
      borderRadius={4}
      borderColor="#BCCCFF"
      bgColor="#ffffff"
      ml={{ base: 0, md: 8 }}
      borderWidth={1}
      p={4}
    >
      <Text color="#6F6F6F" fontSize={18} fontWeight={500}>
        {t("trackOrder")} #{orderTracking?.order?.code}
      </Text>
      <Text color="#000000" fontSize={16} fontWeight={500} my={4}>
        {t("orderStatus")}
      </Text>
      <Box bgColor="#F3F4F6" p={4} border="1px solid #CCCCCC" borderRadius="4px">
        <Text mb={8} color="#000000" fontSize={16} fontWeight={600}>
          {t("statusV2")}:{" "}
          <Text as="span" fontWeight="normal">
            {newStatusTracking?.track_value} |{" "}
            {formatDateToLocal(newStatusTracking?.created_at || "", locale)}{" "}
          </Text>
        </Text>
        <StepByStep current={+newStatusTracking?.status || 1} />
      </Box>
      <Text color="#000000" fontSize={16} fontWeight={500} my={4}>
        {t("orderStatusDetail")}
      </Text>
      <Box overflow="hidden" border="1px solid #CCCCCC" borderRadius="4px">
        {statusTracking?.length &&
          statusTracking.map((item, index) => (
            <Box key={index}>
              <Box bgColor="#DBE6EC" fontSize={20} fontWeight={600} py={2} px={4}>
                {formatDateToLocal(item?.created_at || "", locale, formatOrderTracking)}
              </Box>
              {!!item?.groups?.length &&
                item.groups.map((itemChild) => (
                  <Flex bgColor="#F3F4F6" fontSize={16} fontWeight={500} p={2}>
                    <Box width="80px" flexShrink={0} p={2}>
                      {formatTimeLocale(itemChild?.created_at, locale)}
                    </Box>
                    <Box flexFlow={1} p={2}>
                      {itemChild.track_value}
                    </Box>
                  </Flex>
                ))}
            </Box>
          ))}
      </Box>
      <Text color="#000000" fontSize={16} fontWeight={500} my={4}>
        {t("orderHas")}
      </Text>
      <Flex bgColor="#F3F4F6" flexWrap="wrap" border="1px solid #CCCCCC" borderRadius="4px">
        {Array.isArray(orderTracking?.products) &&
          orderTracking.products.map((item) => (
            <Flex key={item?.id} width={{ base: "100%", md: "50%" }} p={4}>
              <Image src={Lodash.get(item?.images, "[0].url", "")} w="64px" height="64px" />
              <Text color="#071133" fontSize={16} p={2} ml={6}>
                {item?.name}
              </Text>
            </Flex>
          ))}
      </Flex>
      <Text as="button" my={4} color="#1A43CC" fontSize={18} onClick={onBack}>
        {`<< ${t("backToOrderDetail")}`}
      </Text>
    </Box>
  );
};

export default OrdersTracking;

const STEPS = [
  {
    step: 1,
    label: "Đã xác nhận",
  },
  {
    step: 2,
    label: "Đang lấy hàng",
  },
  {
    step: 3,
    label: "Đang giao hàng",
  },
  {
    step: 4,
    label: "Đã giao hàng",
  },
];

const StepByStep = ({ current }) => (
  <Flex
    css={{
      ">:first-of-type>:first-of-type>:first-of-type": {
        visibility: "hidden",
      },
      ">:last-child>:first-of-type>:last-child": {
        visibility: "hidden",
      },
    }}
  >
    {STEPS.map((item) => (
      <Step key={item.step} current={current} step={item.step} label={item.label} />
    ))}
  </Flex>
);

const stepFinishColor = "#007BFF";
const stepWaitColor = "#B8B8B8";
const Step = ({ current, step, label }) => {
  const renderStep = () => {
    if (step === current) {
      return (
        <Box
          flexShrink={0}
          border={`2px solid ${stepFinishColor}`}
          bgColor="#ffffff"
          w="18px"
          h="18px"
          borderRadius="50%"
          zIndex={99}
        />
      );
    }
    if (step < current) {
      return (
        <Box
          flexShrink={0}
          bgColor={stepFinishColor}
          w="18px"
          h="18px"
          borderRadius="50%"
          zIndex={99}
        />
      );
    }
    if (step > current) {
      return (
        <Box
          flexShrink={0}
          bgColor={stepWaitColor}
          w="18px"
          h="18px"
          borderRadius="50%"
          zIndex={99}
        />
      );
    }
    return null;
  };
  return (
    <Box flexGrow={1}>
      <Flex flexGrow={1} justifyContent="center" alignItems="center">
        <Box
          flexGrow={1}
          bgColor={step === current || step < current ? stepFinishColor : stepWaitColor}
          h="8px"
          mr="-1px"
        />
        {renderStep()}
        <Box
          flexGrow={1}
          bgColor={step === current || step > current ? stepWaitColor : stepFinishColor}
          h="8px"
          ml="-1px"
        />
      </Flex>
      <Text my={6} mx={2} textAlign="center" color="#AAAAAA" fontSize={16} fontWeight={500}>
        {label}
      </Text>
    </Box>
  );
};
