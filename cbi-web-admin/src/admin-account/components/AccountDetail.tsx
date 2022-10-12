import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { Checkboxes } from "src/common/components/checkbox";
import { ConfirmEditInfo } from "src/common/components/confirm-modal/ConfirmEditInfo";
import { ErrorMess } from "src/common/components/error-message-form";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import {
  BREAD_CRUMB_ACCOUNT_DETAIL,
  BREAD_CRUMB_ACCOUNT_EDIT,
} from "src/common/constants/breadcrumb.config";
import { ConfirmModal } from "../../common/components/confirm-modal/ConfirmModal";
import { Label } from "../../common/components/label/index";
import { useDeleteSingleAdmin } from "../hooks/useDeleteSingleAdmin";
import { useEditInfoAdmin } from "../hooks/useEditInfoAdmin";
import { useGetGroupPermission } from "../hooks/useGetGroupPermission";
import { adminDetailSchema } from "../adminDetail.schema";
import { useGetAdminDetail } from "../hooks/useGetAdminDetail";

const AccountDetail = () => {
  const [editPass, setEditPass] = useState(false);
  const [editAccount, setEditAccount] = useState(false);
  const isDisabled: boolean = true;
  const {
    isOpen: isOpenEditInfo,
    onOpen: onOpenEditInfo,
    onClose: onCloseEditInfo,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal,
  } = useDisclosure();
  const adminId = useParams();
  const id = adminId.adminId;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(adminDetailSchema),
  });
  const { data: getAdminDetail } = useGetAdminDetail(id || "");
  const admin = getAdminDetail?.data;
  const { mutate: editAdminAccount } = useEditInfoAdmin();
  const { mutate: deleteSingleAdmin } = useDeleteSingleAdmin();
  const navigate = useNavigate();
  const { data: getGroupPermission } = useGetGroupPermission();
  const handleDeleteAdmin = () => {
    deleteSingleAdmin(id);
    navigate("/account");
    onCloseConfirmModal();
  };

  useEffect(() => {
    setValue("username", admin?.username);
    setValue("status", admin?.status);
    setValue("phoneNumber", admin?.phoneNumber);
    setValue("fullName", admin?.fullName);
    setValue("groupPolicyKey", admin?.groupPoliciesKey);
  }, [admin]);

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = (data) => {
    if (data?.password && !data?.confirmPassword) {
      return;
    }
    editAdminAccount(
      { id: id || "", newData: data },
      {
        onSuccess: () => onOpenEditInfo(),
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Flex alignItems="center" justifyContent="space-between">
          <RenderBreadcrumb
            breadcrumbConfigs={editAccount ? BREAD_CRUMB_ACCOUNT_EDIT : BREAD_CRUMB_ACCOUNT_DETAIL}
          />
          {editAccount ? (
            <Button
              bg="white"
              color="black"
              w="119px"
              onClick={() => setEditAccount(!editAccount)}
              border="1px solid #CBCBCB"
            >
              Huỷ
            </Button>
          ) : (
            <Button onClick={() => setEditAccount(!editAccount)} w="119px">
              Chỉnh sửa
            </Button>
          )}
          {editAccount ? (
            <>
              <Button ml="4" type="submit" w="119px" onClick={onSubmit}>
                Lưu lại
              </Button>
              <ConfirmEditInfo
                onConfirm={onCloseEditInfo}
                onClose={onCloseEditInfo}
                isOpen={isOpenEditInfo}
                header="Cập nhật thành công"
                content="Bạn đã thay đổi thành công"
              />
            </>
          ) : (
            <>
              <Button ml="4" w="119px" bg="red.primary" onClick={() => onOpenConfirmModal()}>
                Xoá đã chọn
              </Button>
              <ConfirmModal
                title="Xoá phân quyền"
                content="Bạn có muốn xoá những phân quyền đã chọn ?"
                onCancel={onCloseConfirmModal}
                onDelete={handleDeleteAdmin}
                isOpen={isOpenConfirmModal}
              />
            </>
          )}
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
              <Label label="Tên đăng nhập" ml="25px" isRequired={true} />
              <Input
                ml="25px"
                w="var(--widthInput)"
                {...register("username")}
                onChange={(e) => setValue("username", e.target.value)}
              />
              {errors.username && <ErrorMess ml={"30px"} error={errors.username?.message} />}
            </Box>
            <Box>
              <Label label="Tên nhóm" ml="32px" isRequired={true} />
              {!editAccount ? (
                <Input
                  ml="32px"
                  w="var(--widthInput)"
                  {...register("groupPolicyKey")}
                  onChange={(e) => setValue("groupPolicyKey", e.target.value)}
                />
              ) : (
                <>
                  <Select
                    {...register("groupPolicyKey")}
                    w="var(--widthInput)"
                    ml="20px"
                    defaultValue={admin?.groupPoliciesKey}
                    onChange={(e) => setValue("groupPolicyKey", e.target.value)}
                  >
                    {getGroupPermission?.data?.map((option) => {
                      return <option value={option.key}>{option.description}</option>;
                    })}
                  </Select>
                  {errors.groupPolicyKey && (
                    <ErrorMess ml={"25px"} error={errors.groupPolicyKey?.message} />
                  )}
                </>
              )}
            </Box>
          </Flex>
          <Flex>
            <Box>
              <Label label="Trạng thái" mt="28px" ml="32px" isRequired={true} />
              <Input
                ml="25px"
                {...register("status")}
                onChange={(e) => setValue("status", e.target.value)}
                w="var(--widthInput)"
              />
              {errors.status && <ErrorMess ml={"30px"} error={errors.status?.message} />}
            </Box>
            <Box>
              <Label label="Họ và tên" mt="28px" ml="32px" />
              <Input
                ml="32px"
                {...register("fullName")}
                onChange={(e) => {
                  if (e.target.value) setValue("fullName", e.target.value);
                }}
                w="var(--widthInput)"
              />
              {errors.fullName && <ErrorMess ml={"30px"} error={errors.fullName?.message} />}
            </Box>
          </Flex>
          <Box>
            <Label label="Số điện thoại" mt="28px" ml="32px" />
            <Input
              ml="30px"
              {...register("phoneNumber")}
              onChange={(e) => {
                if (e.target.value) setValue("phoneNumber", e.target.value);
              }}
              w="var(--widthInput)"
            />
            {errors.phoneNumber && <ErrorMess ml={"30px"} error={errors.phoneNumber?.message} />}
          </Box>

          {editAccount && (
            <Box mt="60px" ml="24.5px">
              <Flex align="flex-start">
                <Checkboxes
                  content="Đổi mật khẩu"
                  isChecked={editPass}
                  onChange={() => setEditPass(!editPass)}
                />
              </Flex>
              {editAccount && (
                <>
                  <Box mt="24.31px">
                    <Label label="Mật khẩu mới" />
                    <InputGroup w={"382px"}>
                      <Input
                        type={!viewPassword ? "password" : "text"}
                        isDisabled={editPass ? !isDisabled : isDisabled}
                        placeholder="Nhập mật khẩu mới"
                        {...register("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement onClick={() => setViewPassword(!viewPassword)}>
                        {!viewPassword ? (
                          <ViewIcon color={"#00000033"} />
                        ) : (
                          <ViewOffIcon color={"#00000033"} />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && <ErrorMess error={errors.password?.message} />}
                  </Box>
                  <Box mt="24.31px">
                    <Label label="Xác nhận mật khẩu mới" />
                    <InputGroup w={"382px"}>
                      <Input
                        type={viewConfirmPassword ? "text" : "password"}
                        isDisabled={editPass ? !isDisabled : isDisabled}
                        placeholder="Nhập lại mật khẩu mới"
                        {...register("confirmPassword")}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <InputRightElement
                        onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                      >
                        {!viewConfirmPassword ? (
                          <ViewIcon color={"#00000033"} />
                        ) : (
                          <ViewOffIcon color={"#00000033"} />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && (
                      <ErrorMess error={errors.confirmPassword?.message} />
                    )}
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </form>
  );
};
export { AccountDetail };
