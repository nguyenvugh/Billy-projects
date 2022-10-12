import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { UseFormHandleSubmit, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// import { ConfirmEditInfo } from "src/common/components/confirm-modal/ConfirmEditInfo";
import { AlertSuccess } from "src/common/components/confirm-modal/AlertSuccess";
import { ConfirmModalV2 } from "src/common/components/confirm-modal/ConfirmModalV2";
import { ErrorMess } from "src/common/components/error-message-form";
import { Label } from "src/common/components/label";
import { LoadingPage } from "src/common/components/loading-page";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import {
  BREAD_CRUMB_AUTHORIZATION_DETAIL,
  BREAD_CRUMB_AUTHORIZATION_EDIT,
} from "src/common/constants/breadcrumb.config";
import { DATE_FORMAT } from "src/common/constants/common.constant";
import { ROUTE_AUTHORIZATION } from "src/common/constants/routes.constants";
import { useToast } from "src/common/hooks/useToast";
import { useDeleteOneGroupPolicy } from "../hooks/useDeleteOneGroupPolicy";
import { useGetDetailGroupPolicies } from "../hooks/useGetDetailGroupPolicies";
import { useGetPolicies } from "../hooks/useGetPolicies";
import { useUpdateGroupPolicy } from "../hooks/useUpdateGroupPolicy";
import { ReqGroupPoliciesPostPatch } from "../interfaces";
import { CRETE_GROUP_POLICES } from "../schema";
const AuthorizationDetail = () => {
  const toast = useToast();
  const params = useParams();
  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [isInDetailMode, setIsInDetailMode] = useState(true);
  const [policiesIds, setPoliciesIds] = useState<string[]>([]);
  const { isOpen: isOpenEditSuccess, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { mutate } = useUpdateGroupPolicy();
  const { mutate: deleteOneGroup } = useDeleteOneGroupPolicy();
  const { data: groupDetailData, isLoading: isGettingDetail } = useGetDetailGroupPolicies(
    params?.groupKey || "",
  );
  const groupDetail = groupDetailData?.data;
  const { data, isLoading: isGettingPolicies } = useGetPolicies();
  const policies = data?.data || [];
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ReqGroupPoliciesPostPatch>({
    defaultValues: {},
    resolver: yupResolver(CRETE_GROUP_POLICES),
  });

  useEffect(() => {
    if (!groupDetail) return;
    setValue("name", groupDetail.name);
    setValue("description", groupDetail.description);
    setPoliciesIds(groupDetail.policies.map((p) => p.id));
  }, [groupDetail]);

  function handleAddPolicies(policyId: string, isAdd) {
    if (isAdd) {
      setPoliciesIds([...policiesIds, policyId]);
    } else {
      const listIds = policiesIds.filter((id) => id !== policyId);
      setPoliciesIds(listIds);
    }
  }
  function handleEdit() {
    setIsInDetailMode(false);
  }
  function handleConfirmDelete() {
    deleteOneGroup(params?.groupKey || "");
  }
  function handleCancel() {
    setIsInDetailMode(true);
  }
  function handleSave(data: ReqGroupPoliciesPostPatch) {
    if (policiesIds.length <= 0) {
      toast({ title: "Xin hãy nhập phân quyền", status: "error" });
      return;
    }
    data.key = params.groupKey;
    data.policiesIds = policiesIds;
    mutate(data, {
      onSuccess() {
        onOpen();
      },
    });
  }
  return (
    <Box w="full">
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <RenderBreadcrumb
          breadcrumbConfigs={
            isInDetailMode ? BREAD_CRUMB_AUTHORIZATION_DETAIL : BREAD_CRUMB_AUTHORIZATION_EDIT
          }
        />
        {isInDetailMode ? (
          <DetailModeAction onEdit={handleEdit} onDelete={() => setOpenDeleteConfirm(true)} />
        ) : (
          <EditModeAction onCancel={handleCancel} onSave={handleSave} onSubmit={handleSubmit} />
        )}
        <AlertSuccess
          title="Thông báo"
          content="Chỉnh sửa Nhóm phân quyền thành công!"
          onSuccess={() => {
            onClose();
            navigate(ROUTE_AUTHORIZATION);
          }}
          isOpen={isOpenEditSuccess}
        />
      </Flex>
      <LoadingPage isLoading={isGettingDetail}>
        <Box
          sx={{ "--widthInput": "480px" }}
          bg="white"
          padding="30px"
          mt="23px"
          borderRadius="5px"
        >
          <Flex>
            <Box>
              <Label label="Tên nhóm" />
              <Input disabled={isInDetailMode} w="var(--widthInput)" {...register("name")} />
              <ErrorMess error={errors.name?.message} />
            </Box>
            <Box>
              <Label label="Mô tả" ml="5" />
              <Input
                disabled={isInDetailMode}
                w="var(--widthInput)"
                ml="5"
                {...register("description")}
              />
              <ErrorMess ml="5" error={errors.description?.message} />
            </Box>
          </Flex>
          <Flex mt="30px">
            <Box>
              <Label label="Ngày tạo" />
              <Input
                disabled={true}
                w="var(--widthInput)"
                value={
                  groupDetail?.created_at ? dayjs(groupDetail?.created_at).format(DATE_FORMAT) : ""
                }
              />
            </Box>
          </Flex>
          <Label mt="10px" label="Phân quyền" />
          <Flex mt="10px" border="1px solid #E2E2E2" padding="30px">
            <LoadingPage isLoading={isGettingPolicies}>
              <List spacing={3}>
                {policies.map((policy) => (
                  <HStack>
                    <Checkbox
                      disabled={isInDetailMode}
                      isChecked={policiesIds.includes(policy.id)}
                      onChange={(e) => handleAddPolicies(policy.id, e.target.checked)}
                    />
                    <ListItem>{policy.name}</ListItem>
                  </HStack>
                ))}
              </List>
            </LoadingPage>
          </Flex>
        </Box>
      </LoadingPage>
      <ConfirmModalV2
        isOpen={isOpenDeleteConfirm}
        title="Xoá phân quyền"
        content="Xoá nhóm phân quyền hiện tại?"
        onCancel={() => setOpenDeleteConfirm(false)}
        onOk={handleConfirmDelete}
      />
    </Box>
  );
};

type DetailModeActionProps = {
  onEdit: () => void;
  onDelete: () => void;
};
function DetailModeAction({ onEdit, onDelete }: DetailModeActionProps) {
  return (
    <Flex>
      <Button bg="green.primary" w="120px" onClick={onEdit}>
        Chỉnh sửa
      </Button>
      <Button bg="red.primary" w="120px" ml="4" onClick={onDelete}>
        Xoá
      </Button>
    </Flex>
  );
}

type EditModeActionProps = {
  onCancel: () => void;
  onSave: (data: ReqGroupPoliciesPostPatch) => void;
  onSubmit: UseFormHandleSubmit<ReqGroupPoliciesPostPatch>;
};
function EditModeAction({ onCancel, onSave, onSubmit }: EditModeActionProps) {
  return (
    <Flex>
      <Button bg="white" color="black" w="120px" border="1px solid #CBCBCB" onClick={onCancel}>
        Huỷ
      </Button>
      <Button
        w="120px"
        bg="green.primary"
        ml="4"
        onClick={onSubmit((data) => {
          onSave(data);
        })}
      >
        Lưu lại
      </Button>
    </Flex>
  );
}
export { AuthorizationDetail };
