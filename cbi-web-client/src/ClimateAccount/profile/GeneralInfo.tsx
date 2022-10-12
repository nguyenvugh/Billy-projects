import FileUpload from "@cbi/components/FileUpload";
import TextField from "@cbi/components/TextField";
import ToastError from "@cbi/components/ToastError";
import ToastSuccess from "@cbi/components/ToastSuccess";
import { MAX_FILE_SIZE } from "@cbi/constants/index";
import { useUserContext } from "@cbi/context/AuthContext";
import { PresignFile } from "@cbi/services/file";
import { updateProfile } from "@cbi/services/profile";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldProps, useFormik } from "formik";
import Lodash from "lodash";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FormGeneralDefault, UserInfoDefault } from "../constants";
import { fileProfileI, ResponseUserInforI } from "../interface";
import { UPDATE_PROFILE } from "./schema";

const uploadFileProfile = async (
  value: { file: File; base64: string },
  onChangeFile: Function,
  toast: Function,
  type: string,
  isHasName?: Boolean
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
      await fetch(url, {
        body: formData,
        method: "post",
      });
      if (isHasName) {
        onChangeFile({ url: value.base64, id, name: value.file.name });
      } else {
        onChangeFile({ url: value.base64, id });
      }
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

const GeneralInfo = ({
  userInfor,
  setUserInfor,
  avatar,
  setAvatar,
}: {
  userInfor: ResponseUserInforI;
  setUserInfor: Function;
  avatar: fileProfileI;
  setAvatar: Function;
}) => {
  const [isUploadingAvatar, setUploadingAvatar] = useState(false);
  const [isUploadingDocument, setUploadingDocument] = useState(false);
  const toast = useToast();
  const refProfile = useRef<HTMLDivElement>(null);
  const { userContext, setUserContext } = useUserContext();

  const [document, setDocument] = useState<{
    url: string;
    id: string;
    name?: string;
  }>({
    url: UserInfoDefault.userDocument.description,
    id: UserInfoDefault.userDocument.id,
    name: "",
  });

  useEffect(() => {
    // console.log("userInfor", userInfor);

    setUserInfor(userInfor);
    setDocument({
      url: userInfor.userDocument?.description || "",
      id: userInfor.userDocument?.id || "",
      name: userInfor.userDocument?.file?.id
        ? `${userInfor.userDocument?.file?.id}.${userInfor.userDocument?.file?.type}`
        : "",
    });
  }, [userInfor]);
  const formik = useFormik({
    initialValues: { ...FormGeneralDefault },
    validationSchema: UPDATE_PROFILE,
    onSubmit: async (values) => {
      try {
        let param = {
          ...values,
          revenue: values.revenue || 0,
          avatarId: avatar.id,
        };
        if (userInfor?.userDocument?.id !== document?.id) {
          param = Object.assign(param, { documentId: document?.id });
        }
        if (!param.avatarId) {
          toast({
            position: "top",
            status: "error",
            isClosable: true,
            duration: 2000,
            render: () => <ToastError message={"Xin hãy upload avatar"} />,
          });
          return;
        }
        if (isUploadingAvatar || isUploadingDocument) {
          toast({
            position: "top",
            status: "error",
            isClosable: true,
            duration: 2000,
            render: () => (
              <ToastError
                message={
                  isUploadingAvatar ? "Đang tải avatar" : "Đang tải document"
                }
              />
            ),
          });
          return;
        }
        const data = await updateProfile(param);
        setUserInfor(data);
        toast({
          position: "top",
          status: "success",
          isClosable: true,
          duration: 2000,
          render: () => <ToastSuccess message={"Cập nhật hồ sơ thành công"} />,
        });
      } catch (error) {
        toast({
          position: "top",
          status: "error",
          isClosable: true,
          duration: 2000,
          render: () => (
            <ToastError message={"Cập nhật hồ sơ thất bại. Vui lòng thử lại"} />
          ),
        });
      }
    },
  });
  useEffect(() => {
    if (Object.values(userInfor).some((e) => e)) {
      formik.setValues({
        fullName: userInfor.fullName,
        birthday: moment(userInfor.birthday).format("YYYY-MM-DD"),
        phoneNumber: userInfor.phoneNumber,
        companyName: userInfor.userCompany?.name || "",
        companyCode: userInfor?.companyCode || "",
        position: userInfor.userCompany?.position || "",
        address: userInfor.userCompany?.address || "",
        numberEmployees: userInfor.userCompany?.numberEmployees || 0,
        revenue: userInfor.userCompany?.revenue || 0,
        phoneNumberCompany: userInfor.userCompany?.phoneNumber || "",
        website: userInfor.userCompany?.website || "",
        workField: userInfor.userCompany?.workField || "",
        documentDescription: userInfor.userDocument?.description || "",
        dateCreateCompany:
          userInfor.userCompany?.dateCreateCompany &&
          moment(userInfor.userCompany!.dateCreateCompany).format("YYYY-MM-DD"),
        numUnofficialEmployees: userInfor.userCompany?.numUnofficialEmployees,
        modelManufactoring: userInfor.userCompany?.modelManufactoring,
        sizeManufactoring: userInfor.userCompany?.sizeManufactoring,
        materialArea: userInfor.userCompany?.materialArea,
        isApplyWorkingDiary: userInfor.userCompany?.isApplyWorkingDiary,
        isapplyDigital: userInfor.userCompany?.isapplyDigital,
      });
    }
    setUserContext({ ...userContext, avatarUrl: userInfor?.avatar?.url });
  }, [userInfor]);

  function handleUploadAvatarSuccess(resData: any) {
    setUserContext({ ...userContext, avatarUrl: resData.url });
    setAvatar(resData);
    setUploadingAvatar(false);
  }
  function handleUploadDocumentSuccess(resData: any) {
    setDocument(resData);
    setUploadingDocument(false);
  }
  function validateFileSize(fileSize: number) {
    if (fileSize > MAX_FILE_SIZE) {
      toast({
        position: "top",
        status: "error",
        isClosable: true,
        duration: 2000,
        render: () => (
          <ToastError message="Xin vui lòng chọn file nhỏ hơn 3mb!" />
        ),
      });
      return false;
    }
    return true;
  }
  return (
    <Box
      ref={refProfile}
      w={{ base: "85%" }}
      mx={{ base: 0, md: 8 }}
      margin="auto !important"
    >
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
              maxWidth="200px"
            >
              {userInfor.userCompany?.position}
            </Text>
            <FileUpload
              accept={".jpg,.png"}
              onChange={(value: { file: File; base64: string }) => {
                const isValidFile = validateFileSize(value.file.size);
                if (!isValidFile) return;
                setUploadingAvatar(true);
                uploadFileProfile(
                  value,
                  handleUploadAvatarSuccess,
                  toast,
                  "png"
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
        Thông tin cá nhân
      </Text>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <Flex justifyContent={"space-between"}>
          <Box w="48%">
            <TextField
              label={"Họ tên"}
              required
              placeholder={"Nhập thông tin"}
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.errors.fullName}
              helperText={formik.errors.fullName ? formik.errors.fullName : ""}
              disabled
            />
            <TextField
              required
              color={false ? "transparent" : "#000000"}
              userSelect="none"
              position="relative"
              __css={{
                "::-webkit-calendar-picker-indicator": {
                  zIndex: 1,
                  cursor: "pointer",
                },
              }}
              label={"Ngày sinh"}
              placeholder={"Chọn ngày sinh"}
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              error={formik.errors.birthday}
              helperText={formik.errors.birthday ? formik.errors.birthday : ""}
            />
          </Box>
          <Box w="48%">
            <TextField
              label={"Chức vụ"}
              required
              placeholder={"Nhập thông tin"}
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              error={formik.errors.position}
              helperText={formik.errors.position ? formik.errors.position : ""}
            />
            <TextField
              label={"Số điện thoại"}
              required
              placeholder={"Nhập thông tin"}
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.errors.phoneNumber}
              helperText={
                formik.errors.phoneNumber ? formik.errors.phoneNumber : ""
              }
            />
          </Box>
        </Flex>
        <TextField
          required
          value={userInfor.email}
          label={"Email"}
          placeholder={"user@gmail.com"}
          disabled={true}
        />
        <Box h="1px" w="100%" bg="#E2E8F0" mb="24px" />
        <Text color="#1A202C" fontSize={20} fontWeight="600" mb="30px">
          Thông tin doanh nghiệp
        </Text>
        <TextField
          required
          label={"Mã doanh nghiệp/hợp tác xã"}
          placeholder={"Nhập thông tin"}
          name="companyCode"
          value={formik.values.companyCode}
          onChange={formik.handleChange}
          error={formik.errors.companyCode}
          helperText={
            formik.errors.companyCode ? formik.errors.companyCode : ""
          }
        />
        <Flex justifyContent={"space-between"}>
          <Box w="48%">
            <TextField
              label={"Tên doanh nghiệp/hợp tác xã"}
              required
              placeholder={"Nhập thông tin"}
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={formik.errors.companyName}
              helperText={
                formik.errors.companyName ? formik.errors.companyName : ""
              }
            />
            <TextField
              required
              label={"Địa chỉ"}
              placeholder={"Nhập thông tin"}
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
              helperText={formik.errors.address ? formik.errors.address : ""}
            />
          </Box>

          <Box w="48%">
            <TextField
              required
              color={false ? "transparent" : "#000000"}
              userSelect="none"
              position="relative"
              __css={{
                "::-webkit-calendar-picker-indicator": {
                  zIndex: 1,
                  cursor: "pointer",
                },
              }}
              label={"Ngày thành lập"}
              placeholder={"01/01/2020"}
              type="date"
              name="dateCreateCompany"
              value={formik.values.dateCreateCompany}
              onChange={formik.handleChange}
              error={formik.errors.dateCreateCompany}
              helperText={
                formik.errors.dateCreateCompany
                  ? formik.errors.dateCreateCompany
                  : ""
              }
            />
            <TextField
              required
              label={"Số điện thoại cố định của cơ quan"}
              placeholder={"Nhập thông tin"}
              name="phoneNumberCompany"
              value={formik.values.phoneNumberCompany}
              onChange={formik.handleChange}
              error={formik.errors.phoneNumberCompany}
              helperText={
                formik.errors.phoneNumberCompany
                  ? formik.errors.phoneNumberCompany
                  : ""
              }
            />
          </Box>
        </Flex>
        <TextField
          label={"Website"}
          placeholder={"Nhập thông tin"}
          name="website"
          value={formik.values.website}
          onChange={formik.handleChange}
          error={formik.errors.website}
          helperText={formik.errors.website ? formik.errors.website : ""}
        />
        <Flex justifyContent={"space-between"}>
          <Box w="48%">
            <TextField
              label={"Số lượng nhân viên trực tiếp"}
              required
              placeholder={"Nhập thông tin"}
              name="numberEmployees"
              value={formik.values.numberEmployees}
              onChange={formik.handleChange}
              error={formik.errors.numberEmployees}
              helperText={
                formik.errors.numberEmployees
                  ? formik.errors.numberEmployees
                  : ""
              }
            />
          </Box>
          <Box w="48%">
            <TextField
              label={"Số lượng nhân viên gián tiếp"}
              placeholder={"Nhập thông tin"}
              name="numUnofficialEmployees"
              value={formik.values.numUnofficialEmployees}
              onChange={formik.handleChange}
              error={formik.errors.numUnofficialEmployees}
              helperText={
                formik.errors.numUnofficialEmployees
                  ? formik.errors.numUnofficialEmployees
                  : ""
              }
            />
          </Box>
        </Flex>
        <TextField
          label={"Tổng doanh thu của doanh nghiệp/hợp tác xã"}
          placeholder={"Nhập thông tin"}
          name="revenue"
          value={formik.values.revenue}
          onChange={formik.handleChange}
          error={formik.errors.revenue}
          helperText={formik.errors.revenue ? formik.errors.revenue : ""}
        />
        <TextField
          label={"Lĩnh vực hoạt động"}
          required
          placeholder={"Nhập thông tin"}
          name="workField"
          value={formik.values.workField}
          onChange={formik.handleChange}
          error={formik.errors.workField}
          helperText={formik.errors.workField ? formik.errors.workField : ""}
        />
        <TextField
          label={"Mô hình sản xuất"}
          required
          placeholder={"Nhập thông tin"}
          name="modelManufactoring"
          value={formik.values.modelManufactoring}
          onChange={formik.handleChange}
          error={formik.errors.modelManufactoring}
          helperText={
            formik.errors.modelManufactoring
              ? formik.errors.modelManufactoring
              : ""
          }
        />
        <TextField
          label={"Quy mô sản xuất"}
          required
          placeholder={"Nhập thông tin"}
          name="sizeManufactoring"
          value={formik.values.sizeManufactoring}
          onChange={formik.handleChange}
          error={formik.errors.sizeManufactoring}
          helperText={
            formik.errors.sizeManufactoring
              ? formik.errors.sizeManufactoring
              : ""
          }
        />
        <TextField
          label={"Vùng nguyên liệu"}
          placeholder={"Nhập thông tin"}
          name="materialArea"
          value={formik.values.materialArea}
          onChange={formik.handleChange}
          error={formik.errors.materialArea}
          helperText={
            formik.errors.materialArea ? formik.errors.materialArea : ""
          }
        />
        <Text color="#1A202C" fontSize={16} fontWeight="500" mb="8px">
          Doanh nghiệp/hợp tác xã có áp dụng nhật ký đồng ruộng không?
        </Text>
        <RadioGroup
          name="isApplyWorkingDiary"
          onChange={(val) => {
            const numVal: number = parseInt(val);
            formik.setFieldValue("isApplyWorkingDiary", numVal);
          }}
          value={formik.values.isApplyWorkingDiary}
        >
          <Stack direction="column">
            <Radio value={1}>A. Đã áp dụng</Radio>
            <Radio value={-1}>B. Chưa áp dụng</Radio>
          </Stack>
        </RadioGroup>
        <Text color="#1A202C" fontSize={16} fontWeight="500" mb="8px" mt={10}>
          Doanh nghiệp/hợp tác xã có áp dụng số hóa trong hoạt động sản xuất
          không?
        </Text>
        <RadioGroup
          onChange={(val) => {
            const numVal: number = parseInt(val);
            formik.setFieldValue("isapplyDigital", numVal);
          }}
          value={formik.values.isapplyDigital}
        >
          <Stack direction="column">
            <Radio value={1}>A. Đã áp dụng</Radio>
            <Radio value={-1}>B. Chưa áp dụng</Radio>
          </Stack>
        </RadioGroup>

        <Box h="1px" w="100%" bg="#E2E8F0" mb="24px" mt={10} />
        <Text color="#1A202C" fontSize={20} fontWeight="600" mb="30px">
          Hồ sơ
        </Text>
        <Text color="#1A202C" fontSize={16} fontWeight="500">
          Hãy tải các tài liệu của công ty bạn liên quan đến vấn đề bảo vệ môi
          trường, có thể là các tài liệu về quy trình của công ty trong khía
          cạnh bảo vệ khí hậu,...
        </Text>
        <Box mb="32px">
          <FileUpload
            onChange={(value: { file: File; base64: string }) => {
              const isValidFile = validateFileSize(value.file.size);
              if (!isValidFile) return;
              setUploadingDocument(true);
              uploadFileProfile(
                value,
                handleUploadDocumentSuccess,
                toast,
                "pdf",
                true
              );
            }}
            inputGroupProps={{ justifyContent: "center" }}
            accept=".xlsx, .xls, .pdf"
          >
            <Button
              borderWidth={1}
              borderColor="#61A533"
              borderRadius={5}
              color="#61A533"
              bg="#61A53326"
              px={6}
              mt={4}
              w="100%"
            >
              <Image src="/img/upload.svg" width="15px" height="15px" />
              <span style={{ marginLeft: "10px" }}>
                Tải tài liệu từ máy tính
              </span>
            </Button>
          </FileUpload>
        </Box>
        {document.name && (
          <HStack pb="30px">
            <Image src="/img/global/ic_file.svg" w="24px" h="24px" />
            <Text
              color="#3182CE"
              fontWeight={600}
              fontSize={{ base: "13px", md: "16px" }}
            >
              {document.name}
            </Text>
            <Image
              src="/img/global/ic_cancle.svg"
              onClick={() => {
                setDocument({ id: "", name: "", url: "" });
              }}
            />
          </HStack>
        )}
        <Text flexShrink={0} fontSize={16} fontWeight={500} pb="8px">
          Mô tả tài liệu
        </Text>
        <Textarea
          placeholder="Nhập thông tin"
          name="documentDescription"
          value={formik.values.documentDescription}
          onChange={formik.handleChange}
        />
        <Text
          fontSize={14}
          lineHeight={1.5}
          mt={1}
          mb={2}
          minHeight={6}
          color="#EA403F"
        >
          {formik.errors.documentDescription
            ? formik.errors.documentDescription
            : ""}
        </Text>
        <Box mt={4}>
          <Button
            w={{ base: "100%", md: "unset" }}
            bg="#61A533"
            color="#ffffff"
            fontSize={16}
            fontWeight={700}
            type="submit"
            px={8}
          >
            Cập nhật hồ sơ
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export { GeneralInfo };
