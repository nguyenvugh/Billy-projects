import { Box, Button, Flex, Input, Link as LinkUI, Text } from "@chakra-ui/react";
import Auth, { SCREEN_AUTH } from "@ltp/components/Auth";
import { useAppUserContext } from "@ltp/components/context/auth";
import Popup from "@ltp/components/Popup";
import useTranslation from "@ltp/hooks/useTranslation";
import { useState } from "react";
import useChangePassword from "../hooks/useChangePassword";

const inputStyles = {
  bg: "#E9EEFF",
  borderColor: "#BCCCFF",
  borderWidth: "1px",
  borderRadius: "4px",
  fontSize: "14px",
};

const inputErrorMessageStyle = {
  color: "#FF424F",
  fontSize: 12,
  mt: 2,
};

export default function Password() {
  const { t } = useTranslation();
  const { userContext } = useAppUserContext();
  const { password, errors, popup, closePopup, handleSubmit, handleChangeFields } =
    useChangePassword();
  const [screen, setScreen] = useState();
  const forgotPassword = (e) => {
    e.preventDefault();
    setScreen(SCREEN_AUTH.forgetPassword);
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
      <Auth screen={screen} setScreen={setScreen} emailLogin={userContext.email} />
      <Text color="#2154FF" textTransform="uppercase" fontSize={18} fontWeight="bold" mb={2}>
        {t("changePassword")}
      </Text>
      <Box bg="#BCCCFF" h="2px" w="100%" />
      <Box mt={4} fontSize={14}>
        <Flex mb={{ base: 2, md: 6 }} mt={6} display={{ base: "block", md: "flex" }}>
          <Text w={{ base: "100%", md: "20%" }} lineHeight="40px">
            {t("currentPassword")}
          </Text>
          <Box w={{ base: "100%", md: "50%" }} mr={4}>
            <Input
              type="password"
              name="oldPassword"
              value={password.old_password}
              placeholder={t("enterCurrentPassword")}
              onChange={(event) => handleChangeFields("old_password", event)}
              {...inputStyles}
              bg={errors.old_password ? "#FFE6E6" : "unset"}
              borderColor={errors.old_password ? "#FF0000" : "#CBD5E0"}
            />
            {errors?.old_password && <Text {...inputErrorMessageStyle}>{errors.old_password}</Text>}
          </Box>
          <Text>
            <LinkUI href="#" onClick={forgotPassword}>
              {t("forgotPassword")}
            </LinkUI>
          </Text>
        </Flex>
        <Flex mb={{ base: 2, md: 6 }} display={{ base: "block", md: "flex" }}>
          <Text w={{ base: "100%", md: "20%" }} lineHeight="40px">
            {t("newPassword")}
          </Text>
          <Box w={{ base: "100%", md: "50%" }}>
            <Input
              type="password"
              name="newPassword"
              value={password.new_password}
              placeholder={t("enterNewPassword")}
              onChange={(event) => handleChangeFields("new_password", event)}
              {...inputStyles}
              bg={errors.new_password ? "#FFE6E6" : "unset"}
              borderColor={errors.new_password ? "#FF0000" : "#CBD5E0"}
            />
            {errors?.new_password && <Text {...inputErrorMessageStyle}>{errors.new_password}</Text>}
          </Box>
        </Flex>
        <Flex mb={{ base: 2, md: 6 }} display={{ base: "block", md: "flex" }}>
          <Text w={{ base: "100%", md: "20%" }} lineHeight="40px">
            {t("confirmPassword")}
          </Text>
          <Box w={{ base: "100%", md: "50%" }}>
            <Input
              value={password.confirm_password}
              type="password"
              name="newPasswordConfirmation"
              placeholder={t("confirmNewPassword")}
              onChange={(event) => handleChangeFields("confirm_password", event)}
              {...inputStyles}
              bg={errors.confirm_password ? "#FFE6E6" : "unset"}
              borderColor={errors.confirm_password ? "#FF0000" : "#CBD5E0"}
            />
            {errors?.confirm_password && (
              <Text {...inputErrorMessageStyle}>{errors.confirm_password}</Text>
            )}
          </Box>
        </Flex>
        <Box pl={{ base: 0, md: "20%" }} textAlign={{ base: "center", md: "left" }}>
          <Button
            bg="#2154FF"
            color="#ffffff"
            fontSize={16}
            fontWeight={700}
            px={8}
            onClick={handleSubmit}
          >
            {t("confirm")}
          </Button>
        </Box>
      </Box>
      <Popup
        isOpen={popup.visible}
        title={popup.title}
        subTitle={popup.subTitle}
        onPress={closePopup}
      />
    </Box>
  );
}
