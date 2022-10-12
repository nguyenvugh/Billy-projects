import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";

export default function FollowByEmail() {
  const { t } = useTranslation();
  return (
    <Box width="100%" padding="24px" background="#EDF2F7" border="0.5px solid #CBD5E0">
      <Text fontSize="14px" color="#071133" paddingBottom="12px">
        {t("followLatestEmail")}
      </Text>
      <Flex>
        <Input
          placeholder="Nhập email của bạn"
          background="#FFFFF"
          border="0.5px solid #A0AEC0"
          borderRadius="none"
          color="#718096"
          fontSize="12px"
          _focus={{ borderRadius: "none" }}
        />
        <Button
          padding="14px 25px"
          background="#E53E3E"
          color="#FFFFFF"
          fontSize="12px"
          borderRadius="0px 4px 4px 0px"
        >
          {t("signUp")}
        </Button>
      </Flex>
    </Box>
  );
}
