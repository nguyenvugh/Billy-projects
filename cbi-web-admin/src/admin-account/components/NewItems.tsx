import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmEditInfo } from "src/common/components/confirm-modal/ConfirmEditInfo";
import { ErrorMess } from "src/common/components/error-message-form/index";
import { Label } from "src/common/components/label";
import { useCreateNewAdmin } from "../hooks/useCreateNewAdmin";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { BREAD_CRUMB_ACCOUNT_ADD } from "src/common/constants/breadcrumb.config";
import { useGetGroupPermission } from "../hooks/useGetGroupPermission";
import { newAdminSchema } from "../newAccount.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROUTE_ADMIN_ACCOUNT } from "src/common/constants/routes.constants";

const NewItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { mutate } = useCreateNewAdmin();
  const navigate = useNavigate();

  const statusOptions = [
    {
      value: "ACTIVE",
    },
    {
      value: "INACTIVE",
    },
  ];
  const { data } = useGetGroupPermission();
  const groupPermission = data?.data || [];

  const groupPermissionOptions = groupPermission.map((item) => {
    return { key: item.key, label: item.name };
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newAdminSchema),
  });
  const onSubmit = (data) => {
    const newAdmin = {
      username: data?.username,
      groupPolicyKey: data?.groupPolicyKey,
      status: data?.status,
      password: data?.newPassword,
      confirmPassword: data?.confirmNewPassword,
    };
    if (data?.fullName) {
      newAdmin["fullName"] = data?.fullName;
    }
    if (data?.phoneNumber) {
      newAdmin["phoneNumber"] = data?.phoneNumber;
    }
    mutate(newAdmin, {
      onSuccess: () => onOpen(),
    });
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="center" justifyContent="space-between">
          <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_ACCOUNT_ADD} />
          <Button bg="white" color="black" w="119px" border="1px solid #CBCBCB">
            <Link to="/account">Hu???</Link>
          </Button>
          <Button type="submit" ml="16px" w="119px" onClick={onSubmit}>
            L??u l???i
          </Button>
          <ConfirmEditInfo
            onConfirm={() => {
              navigate(ROUTE_ADMIN_ACCOUNT);
              onClose();
            }}
            onClose={onClose}
            isOpen={isOpen}
            header="T???o m???i th??nh c??ng"
            content="B???n ???? t???o m???i th??nh c??ng"
          />
        </Flex>
        <Box
          sx={{ "--widthInput": "480px" }}
          bg="white"
          padding="30px"
          mt="23px"
          borderRadius="5px"
        >
          <Flex>
            <Box>
              <Label mt="10px" label="T??n ????ng nh???p" isRequired={true} />
              <Input
                type="text"
                placeholder={"Nh???p t??n ????ng nh???p"}
                {...register("username")}
                w="var(--widthInput)"
              />
              {errors.username && <ErrorMess mt={"3px"} error={errors.username?.message} />}
            </Box>
            <Box>
              <Label mt="10px" ml="20px" label="T??n nh??m" isRequired={true} />
              <Select
                {...register("groupPolicyKey")}
                placeholder="-Ch???n t??n nh??m-"
                w="var(--widthInput)"
                ml="20px"
              >
                {groupPermissionOptions.map((option) => (
                  <option value={option.key}>{option.label}</option>
                ))}
              </Select>
              {errors.groupPolicyKey && (
                <ErrorMess ml={"25px"} error={errors.groupPolicyKey?.message} />
              )}
            </Box>
          </Flex>
          <Flex>
            <Box>
              <Label mt="10px" label="Tr???ng th??i" isRequired={true} />
              <Select {...register("status")} placeholder="-Ch???n tr???ng th??i-" w="var(--widthInput)">
                {statusOptions.map((option) => (
                  <option value={option.value}>{option.value}</option>
                ))}
              </Select>
              {errors.status && <ErrorMess mt={"3px"} error={errors.status?.message} />}
            </Box>
            <Box>
              <Label mt="10px" ml="20px" label="H??? v?? t??n" />
              <Input
                value={fullName}
                placeholder="Nh???p h??? v?? t??n"
                type="text"
                {...register("fullName")}
                onChange={(e) => setFullName(e.target.value)}
                ml="20px"
                w="var(--widthInput)"
              />
              {errors.fullName && (
                <ErrorMess ml={"20px"} mt={"3px"} error={errors.fullName?.message} />
              )}
            </Box>
          </Flex>
          <Box>
            <Label mt="10px" label="S??? ??i???n tho???i" />
            <Input
              value={phoneNumber}
              placeholder="Nh???p s??? ??i???n tho???i"
              type="text"
              {...register("phoneNumber")}
              onChange={(e) => setPhoneNumber(e.target.value)}
              w="var(--widthInput)"
            />
          </Box>
          {errors.phoneNumber && <ErrorMess error={errors.phoneNumber?.message} mt={"3px"} />}
          <Box mt="60px" ml="24.5px">
            <Text fontWeight={"500"} fontSize="16px">
              M???t kh???u
            </Text>
            <>
              <Box mt="24.31px">
                <Label label="M???t kh???u" isRequired={true} />
                <InputGroup w={"382px"}>
                  <Input
                    {...register("newPassword")}
                    type={viewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="M???t kh???u"
                  />
                  <InputRightElement onClick={() => setViewPassword(!viewPassword)}>
                    {!viewPassword ? (
                      <ViewIcon color={"#00000033"} />
                    ) : (
                      <ViewOffIcon color={"#00000033"} />
                    )}
                  </InputRightElement>
                </InputGroup>
                {errors.newPassword && <ErrorMess error={errors.newPassword.message} />}
              </Box>
              <Box mt="24.31px">
                <Label label="X??c nh???n m???t kh???u" isRequired={true} />
                <InputGroup w={"382px"}>
                  <Input
                    {...register("confirmNewPassword")}
                    type={viewConfirmPassword ? "text" : "password"}
                    placeholder="Nh???p l???i m???t kh???u"
                  />
                  <InputRightElement onClick={() => setViewConfirmPassword(!viewConfirmPassword)}>
                    {!viewConfirmPassword ? (
                      <ViewIcon color={"#00000033"} />
                    ) : (
                      <ViewOffIcon color={"#00000033"} />
                    )}
                  </InputRightElement>
                </InputGroup>
                {errors.confirmNewPassword && (
                  <ErrorMess error={errors.confirmNewPassword?.message} />
                )}
              </Box>
            </>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export { NewItems };
