/* eslint-disable no-param-reassign */
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import Loadash from "lodash";
import moment from "moment";
import RenderStar from "../Star";

export default function RenderViewCustomer({ item = {}, key }) {
  const { t } = useTranslation();
  const { created_at = "", content = "", rating } = item;
  return (
    <Box key={key}>
      <HStack spacing="8px">
        <Image
          src={Loadash.get(item, "customer.avatar.url", "")}
          objectFit="cover"
          width="32px"
          borderRadius="50%"
          border="0.5px solid #718096"
          height="32px"
          onError={(i) => (i.target.style.display = "none")}
        />
        <Text color="#071133" fontSize="" fontWeight="600">
          {Loadash.get(item, "customer.name", "")}
        </Text>
      </HStack>
      <HStack spacing="8px" padding="9px 0">
        <Flex>
          <RenderStar width="14px" height="13.5px" num_rating={rating} />
        </Flex>
        <Text color="#718096" fontSize="14px">
          {!!created_at && `${t("postedAt")} ${moment(created_at).format("DD/MM/yyyy")}`}
        </Text>
      </HStack>
      <Text>{content}</Text>
      {/* <Image
        src={Loadash.get(item, "image.url", "")}
        alt=""
        onError={i => (i.target.style.display = "none")}
        margin="10px 0"
        minW="155px"
        w="155px"
        h="120px"
      /> */}
    </Box>
  );
}
