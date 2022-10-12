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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { ConfirmEditInfo } from "src/common/components/confirm-modal/ConfirmEditInfo";
import { AlertSuccess } from "src/common/components/confirm-modal/AlertSuccess";
import { ErrorMess } from "src/common/components/error-message-form";
import { Label } from "src/common/components/label";
import { LoadingPage } from "src/common/components/loading-page";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { BREAD_CRUMB_AUTHORIZATION_ADD } from "src/common/constants/breadcrumb.config";
import { ROUTE_AUTHORIZATION } from "src/common/constants/routes.constants";
import { useToast } from "src/common/hooks/useToast";
import { useAddGroupPolicy } from "../hooks/useAddGroupPolicy";
import { useGetPolicies } from "../hooks/useGetPolicies";
import { ReqGroupPoliciesPostPatch } from "../interfaces";
import { CRETE_GROUP_POLICES } from "../schema";
const AddNewItems = () => {
  const toast = useToast();
  const [policiesIds, setPoliciesIds] = useState<string[]>([]);
  const { isOpen: isOpenAddSuccess, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { mutate } = useAddGroupPolicy();
  const { data, isLoading: isGettingPolicies } = useGetPolicies();
  const policies = data?.data || [];
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ReqGroupPoliciesPostPatch>({
    resolver: yupResolver(CRETE_GROUP_POLICES),
  });

  function handleAddPolicies(policyId: string, isAdd) {
    if (isAdd) {
      setPoliciesIds([...policiesIds, policyId]);
    } else {
      const listIds = policiesIds.filter((id) => id !== policyId);
      setPoliciesIds(listIds);
    }
  }

  function handleAddGroup(data: ReqGroupPoliciesPostPatch) {
    if (policiesIds.length <= 0) {
      toast({ title: "Xin hãy nhập phân quyền", status: "error" });
      return;
    }
    mutate(
      {
        ...data,
        policiesIds,
      },
      {
        onSuccess() {
          onOpen();
        },
      },
    );
  }
  return (
    <Box w="full">
      <Flex alignItems="flex-end">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_AUTHORIZATION_ADD} />
        <Flex>
          <Button
            bg="white"
            onClick={() => navigate(ROUTE_AUTHORIZATION)}
            color="black"
            w="119px"
            border="1px solid #CBCBCB"
          >
            Huỷ
          </Button>
          <Button
            ml="16px"
            w="119px"
            onClick={handleSubmit((data) => {
              handleAddGroup(data);
            })}
          >
            Lưu lại
          </Button>
        </Flex>
        <AlertSuccess
          title="Thông báo"
          content="Thêm Nhóm phân quyền thành công!"
          onSuccess={() => {
            onClose();
            navigate(ROUTE_AUTHORIZATION);
          }}
          isOpen={isOpenAddSuccess}
        />
      </Flex>
      <Box sx={{ "--widthInput": "480px" }} bg="white" padding="30px" mt="23px" borderRadius="5px">
        <Flex>
          <Box>
            <Label label="Tên nhóm" />
            <Input w="var(--widthInput)" {...register("name")} />
            <ErrorMess error={errors.name?.message} />
          </Box>
          <Box>
            <Label label="Mô tả" ml="5" />
            <Input w="var(--widthInput)" ml="5" {...register("description")} />
            <ErrorMess error={errors.description?.message} />
          </Box>
        </Flex>
        <Label mt="10px" label="Phân quyền" />
        <Flex mt="10px" border="1px solid #E2E2E2" padding="30px">
          <LoadingPage isLoading={isGettingPolicies}>
            <List spacing={3}>
              {policies.map((policy) => (
                <HStack>
                  <Checkbox onChange={(e) => handleAddPolicies(policy.id, e.target.checked)} />
                  <ListItem>{policy.name}</ListItem>
                </HStack>
              ))}
            </List>
          </LoadingPage>
        </Flex>
      </Box>
    </Box>
  );
};
export { AddNewItems };
