import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import FileUpload from "@ltp/components/FileUpload";
import Popup from "@ltp/components/Popup";
import Radio from "@ltp/components/Radio";
import TextField from "@ltp/components/TextField";
import useTranslation from "@ltp/hooks/useTranslation";
import { SOCIAL_ACTION_TYPES, SOCIAL_TYPES } from "@ltp/utils/constant";
import { formatDate } from "@ltp/utils/date";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useGeneralInfo from "../hooks/useGeneralInfo";

const SOCIAL_TEXT_STYLE = {
  LINKED: {
    text: "Huỷ liên kết",
    textEN: "Unlink",
    color: "rgba(45, 55, 72, 0.8)",
  },
  UNLINKED: {
    text: "Liên kết",
    textEN: "Link",
    color: "#2154FF",
  },
};

export default function GeneralInfo() {
  const { t, locale } = useTranslation();
  const labelWidth = "20%";
  const {
    profile,
    errors,
    popup,
    closePopup,
    handleChangeField,
    handleSubmit,
    onGetSocialAccountLinking,
    checkSocialAccountValid,
  } = useGeneralInfo();
  const socialStyle = (socialType) =>
    checkSocialAccountValid(socialType) ? SOCIAL_TEXT_STYLE.LINKED : SOCIAL_TEXT_STYLE.UNLINKED;
  const actionType = (socialType) =>
    checkSocialAccountValid(socialType)
      ? SOCIAL_ACTION_TYPES.DISCONNECT
      : SOCIAL_ACTION_TYPES.CONNECT;
  if (!profile.email) return null;
  return (
    <Flex>
      <Box
        w={{ base: "100%", md: "75%" }}
        mx={{ base: 0, md: 8 }}
        borderRadius={4}
        borderColor="#BCCCFF"
        bgColor="#ffffff"
        borderWidth={1}
        p={4}
      >
        <Text as="h1" color="#2154FF" textTransform="uppercase" fontSize={18} fontWeight="bold">
          {t("myProfile")}
        </Text>
        <Text color="#2D3748" fontSize={14} mb={8}>
          {t("secureProfile")}
        </Text>
        <Flex display={{ base: "flex", md: "none" }} py={4} align="center">
          <Avatar bg="teal.500" w="90px" h="90px" mr={6} />
          <Box>
            <Text fontSize={14}>{t("changeAvatar")}</Text>
            <Button
              borderWidth={1}
              borderColor="#2154FF"
              borderRadius={5}
              color="#2154FF"
              bg="#ffffff"
              fontSize={16}
              px={6}
              mt={4}
            >
              {t("pickImage")}
            </Button>
          </Box>
        </Flex>
        <TextField
          value={profile.name}
          label={t("fullName")}
          required
          labelWidth={labelWidth}
          placeholder={t("enterFullName")}
          error={errors?.name}
          helperText={errors.name}
          onChange={(event) => handleChangeField("name", event.target.value)}
        />
        <TextField
          label="Email"
          value={profile.email}
          required
          labelWidth={labelWidth}
          placeholder={t("enterEmail")}
          disabled
          error={!profile.email}
          helperText={t("pleaseEnterEmail")}
          onChange={(event) => handleChangeField("email", event.target.value)}
        />
        <TextField
          label={t("phoneNum")}
          value={profile.phone_number}
          required
          labelWidth={labelWidth}
          placeholder={t("enterPhoneNumv2")}
          error={errors?.phone_number}
          helperText={errors.phone_number}
          onChange={(event) => handleChangeField("phone_number", event.target.value)}
        />
        <TextField
          label={t("sex")}
          required
          labelWidth={labelWidth}
          error={false}
          helperText={t("pleaseEnterSex")}
        >
          <RadioGroup value={+profile.sex} onChange={(value) => handleChangeField("sex", value)}>
            <HStack spacing="24px">
              <Radio value={1}>{t("male")}</Radio>
              <Radio value={2}>{t("female")}</Radio>
              <Radio value={3}>{t("other")}</Radio>
            </HStack>
          </RadioGroup>
        </TextField>
        {/* <Input userSelect=''/> */}
        <TextField
          color={profile?.birthday ? "transparent" : "#000000"}
          userSelect="none"
          position="relative"
          __css={{
            "::-webkit-calendar-picker-indicator": {
              zIndex: 1,
              cursor: "pointer",
            },
          }}
          _before={
            profile?.birthday
              ? {
                  content: `"${formatDate(profile?.birthday, "DD/MM/YYYY")}"`,
                  display: "flex",
                  width: "30%",
                  position: "absolute",
                  top: 0,
                  bottom: 0,

                  backgroundColor: "rgb(233, 238, 255)",
                  color: "#000000",
                  userSelect: "none",
                  alignItems: "center",
                }
              : {}
          }
          value={profile.birthday}
          onChange={(event) => handleChangeField("birthday", event.target.value)}
          label={t("birthday")}
          required
          labelWidth={labelWidth}
          type="date"
          error={!profile.birthday}
          helperText={t("pleaseEnterBirthday")}
        />
        <Text
          display={{ base: "block", md: "none" }}
          fontSize={14}
          fontWeight={600}
          color="#2154FF"
          mt={6}
          mb={4}
        >
          {t("connectAccount")}
        </Text>
        <Box display={{ base: "block", md: "none" }} py={4} fontSize={14} fontWeight={600} mb={4}>
          <Box>
            <Icon as={FaFacebookF} color="#1E599B" fontSize={18} display="inline-block" mr={2} />
            <Text as="span">Facebook</Text>
            <Text
              as="span"
              float="right"
              color={socialStyle(SOCIAL_TYPES.FACEBOOK).color}
              cursor="pointer"
              onClick={() =>
                onGetSocialAccountLinking(SOCIAL_TYPES.FACEBOOK, actionType(SOCIAL_TYPES.FACEBOOK))
              }
            >
              {locale === "vi"
                ? socialStyle(SOCIAL_TYPES.FACEBOOK).text
                : socialStyle(SOCIAL_TYPES.FACEBOOK).textEN}
            </Text>
          </Box>
          <Box mt={4}>
            <Icon as={FcGoogle} fontSize={18} display="inline-block" mr={2} />
            <Text as="span">Google</Text>
            <Text
              as="span"
              float="right"
              cursor="pointer"
              color={socialStyle(SOCIAL_TYPES.GOOGLE).color}
              onClick={() =>
                onGetSocialAccountLinking(SOCIAL_TYPES.GOOGLE, actionType(SOCIAL_TYPES.GOOGLE))
              }
            >
              {locale === "vi"
                ? socialStyle(SOCIAL_TYPES.GOOGLE).text
                : socialStyle(SOCIAL_TYPES.GOOGLE).textEN}
            </Text>
          </Box>
        </Box>
        <Box pl={{ base: 0, md: "20%" }} mb={4}>
          <Button
            onClick={handleSubmit}
            w={{ base: "100%", md: "unset" }}
            bg="#2154FF"
            color="#ffffff"
            fontSize={16}
            fontWeight={700}
            px={8}
          >
            {t("update")}
          </Button>
        </Box>
      </Box>
      <Box w="25%" display={{ base: "none", md: "block" }}>
        <Box
          borderRadius={4}
          borderColor="#BCCCFF"
          bgColor="#ffffff"
          borderWidth={1}
          p={4}
          align="center"
        >
          <AspectRatio ratio={1}>
            <Avatar src={profile?.avatar.url} bg="teal.500" w="100%" h="100%" />
          </AspectRatio>
          <FileUpload
            onChange={(value) => handleChangeField("avatar", value)}
            inputGroupProps={{ justifyContent: "center" }}
          >
            <Button
              borderWidth={1}
              borderColor="#2154FF"
              borderRadius={5}
              color="#2154FF"
              bg="#ffffff"
              px={6}
              mt={4}
            >
              {t("pickImage")}
            </Button>
          </FileUpload>
        </Box>
        <Text ml={6} fontSize={14} fontWeight={600} color="#2154FF" mt={6} mb={4}>
          {t("connectAccount")}
        </Text>
        <Box
          borderRadius={4}
          borderColor="#BCCCFF"
          bgColor="#ffffff"
          borderWidth={1}
          p={4}
          fontSize={14}
          fontWeight={600}
        >
          <Box>
            <Icon as={FaFacebookF} color="#1E599B" fontSize={18} display="inline-block" mr={2} />
            <Text as="span">Facebook</Text>
            <Text
              as="span"
              float="right"
              color={socialStyle(SOCIAL_TYPES.FACEBOOK).color}
              cursor="pointer"
              onClick={() =>
                onGetSocialAccountLinking(SOCIAL_TYPES.FACEBOOK, actionType(SOCIAL_TYPES.FACEBOOK))
              }
            >
              {locale === "vi"
                ? socialStyle(SOCIAL_TYPES.FACEBOOK).text
                : socialStyle(SOCIAL_TYPES.FACEBOOK).textEN}
            </Text>
          </Box>
          <Box mt={4}>
            <Icon as={FcGoogle} fontSize={18} display="inline-block" mr={2} />
            <Text as="span">Google</Text>
            <Text
              as="span"
              float="right"
              color={socialStyle(SOCIAL_TYPES.GOOGLE).color}
              cursor="pointer"
              onClick={() =>
                onGetSocialAccountLinking(SOCIAL_TYPES.GOOGLE, actionType(SOCIAL_TYPES.GOOGLE))
              }
            >
              {locale === "vi"
                ? socialStyle(SOCIAL_TYPES.GOOGLE).text
                : socialStyle(SOCIAL_TYPES.GOOGLE).textEN}
            </Text>
          </Box>
        </Box>
      </Box>
      <Popup
        errorPopup={popup?.error || false}
        isOpen={popup.visible}
        title={popup.title}
        subTitle={popup.subTitle}
        onPress={closePopup}
      />
    </Flex>
  );
}
