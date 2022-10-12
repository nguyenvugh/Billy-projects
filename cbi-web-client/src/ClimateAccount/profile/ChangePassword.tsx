import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  Link as LinkUI,
  Text,
  useToast,
} from "@chakra-ui/react";
import Lodash from "lodash";
import { useState } from "react";
import FileUpload from "@cbi/components/FileUpload";
import TextField from "@cbi/components/TextField";
import { FormikValues, useFormik } from "formik";
import { DefaultChangePassword } from "../constants";
import { fileProfileI, ResponseUserInforI } from "../interface";
import { changePasswordProfile } from "@cbi/services/profile";
import { isPasswordValid } from "@cbi/utils/validate";
import { AxiosError } from "axios";
import { PresignFile } from "@cbi/services/file";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import ToastSuccess from "@cbi/components/ToastSuccess";
import ToastError from "@cbi/components/ToastError";
import { passInValid } from "@cbi/constants/index";
import { useUserContext } from "@cbi/context/AuthContext";

const uploadFileProfile = async (
  value: { file: File; base64: string },
  setAvatar: Function,
  toast: Function,
  type: string,
  handleUpdateProfile: Function
) => {
  try {
    const presignFile = await PresignFile({ type });
    let formData = new FormData();
    const fields = Lodash.get(presignFile, "presign.fields", {});
    const url = Lodash.get(presignFile, "presign.url", "");
    const id = Lodash.get(presignFile, "image.id", "");
    Object.keys(fields).map((key) => {
      formData.append(key, fields[key]);
    });
    formData.append("file", value.file);
    try {
      const resFile = await fetch(url, {
        body: formData,
        method: "post",
      });
      setAvatar({ url: value.base64, id });
      handleUpdateProfile(id);
      toast({
        position: "top",
        status: "success",
        isClosable: true,
        duration: 2000,
        render: () => <ToastSuccess message="Upload file thành công" />,
      });
    } catch (error) {}
  } catch (error) {
    toast({
      position: "top",
      status: "error",
      isClosable: true,
      duration: 2000,
      render: () => (
        <ToastError message="Upload file thất bại, vui lòng thử lại" />
      ),
    });
  }
};

export default function ChangePassword({
  avatar,
  setAvatar,
  handleUpdateProfile,
  userInfor,
}: {
  userInfor: ResponseUserInforI;
  avatar: fileProfileI;
  setAvatar: Function;
  handleUpdateProfile: Function;
}) {
  const toast = useToast();
  const [isValidate, setIsValidate] = useState(false);
  const [isSumit, setIssubmit] = useState(false);
  const { userContext, setUserContext } = useUserContext();

  const validate = (values: FormikValues) => {
    const errors = { ...DefaultChangePassword };
    if (!values.oldPassword) {
      errors.oldPassword = "Mật khẩu hiện tại được yêu cầu";
    } else if (!isPasswordValid(values.oldPassword)) {
      errors.oldPassword = passInValid;
    }
    if (!values.password) {
      errors.password = "Mật khẩu mới được yêu cầu";
    } else if (values.password === values.oldPassword) {
      errors.password = "Mật khẩu mới không được trung với mật khẩu hiện tại";
    } else if (!isPasswordValid(values.password)) {
      errors.password = passInValid;
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Nhập lại mật khẩu mới được yêu cầu";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Mật khẩu không trùng khớp";
    } else if (!isPasswordValid(values.confirmPassword)) {
      errors.confirmPassword = passInValid;
    }
    if (Object.values(errors).some((e) => e)) {
      return errors;
    } else {
      setIsValidate(false);
    }
  };
  const formik = useFormik({
    initialValues: { ...DefaultChangePassword },
    validate: validate,
    onSubmit: async (values) => {
      setIssubmit(true);
      try {
        await changePasswordProfile(values);
        toast({
          position: "top",
          status: "success",
          isClosable: true,
          duration: 2000,
          render: () => <ToastSuccess message="Đổi mật khẩu thành công" />,
        });
        formik.resetForm();
        setIssubmit(false);
      } catch (error) {
        const err = error as AxiosError;
        let message = "Đổi mật khẩu thất bại. Vui lòng thử lại";
        if (err.response?.status === 417) {
          message = "Mật khẩu cũ không đúng";
        }
        toast({
          position: "top",
          status: "error",
          isClosable: true,
          duration: 2000,
          render: () => <ToastError message={message} />,
        });
        setIssubmit(false);
      }
    },
  });

  function handleUploadAvatarSuccess(resData: any) {
    setUserContext({ ...userContext, avatarUrl: resData.url });
    setAvatar(resData);
  }
  return (
    <Box w={{ base: "85%" }} mx={{ base: 0, md: 8 }} margin="auto !important">
      <Box p={4}>
        <Flex alignItems="center">
          <Box>
            <Box
              w="168px"
              h="168px"
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              p="16px"
              borderRadius="50%"
            >
              <AspectRatio ratio={1} w="136px" h="136px">
                <Avatar src={avatar.url} bg="teal.500" />
              </AspectRatio>
            </Box>
          </Box>
          <Box ml="60px">
            <Text color="#2D3748" fontSize={24} fontWeight="700">
              {userInfor.fullName}
            </Text>
            <Text
              color="#2D3748"
              fontSize={16}
              fontWeight="500"
              maxWidth="250px"
            >
              {userInfor.userCompany?.position}
            </Text>
            <FileUpload
              onChange={(value: { file: File; base64: string }) => {
                uploadFileProfile(
                  value,
                  handleUploadAvatarSuccess,
                  toast,
                  "png",
                  handleUpdateProfile
                );
              }}
              inputGroupProps={{ width: "max-content" }}
            >
              <Button
                borderWidth={1}
                borderColor="#61A533"
                borderRadius={5}
                color="#61A533"
                bg="#ffffff"
                px={6}
                mt={4}
              >
                {"Chọn ảnh"}
              </Button>
            </FileUpload>
          </Box>
        </Flex>
      </Box>
      <Box h="1px" w="100%" bg="#E2E8F0" mb="24px" />
      <Text color="#1A202C" fontSize={20} fontWeight="600" mb="30px">
        Đổi mật khẩu
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label={"Mật khẩu hiện tại"}
          placeholder={"Nhập thông tin"}
          type="password"
          name="oldPassword"
          value={formik.values.oldPassword}
          error={isValidate && formik.errors.oldPassword}
          helperText={formik.errors.oldPassword}
          onChange={formik.handleChange}
        />
        <TextField
          label={"Mật khẩu mới"}
          placeholder={"Nhập thông tin"}
          type="password"
          name="password"
          value={formik.values.password}
          error={isValidate && formik.errors.password}
          helperText={formik.errors.password}
          onChange={formik.handleChange}
        />
        <TextField
          label={"Nhập lại mật khẩu mới"}
          placeholder={"Nhập thông tin"}
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          error={isValidate && formik.errors.confirmPassword}
          helperText={formik.errors.confirmPassword}
          onChange={formik.handleChange}
        />
        <Box mt={4}>
          <Button
            w={{ base: "100%", md: "unset" }}
            bg="#61A533"
            color="#ffffff"
            fontSize={16}
            fontWeight={700}
            px={8}
            type="submit"
            onClick={() => {
              setIsValidate(true);
            }}
            disabled={isSumit}
          >
            Lưu mật khẩu
          </Button>
        </Box>
      </form>
    </Box>
  );
}
