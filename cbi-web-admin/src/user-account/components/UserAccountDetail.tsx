import { Avatar, Box, Button, Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ErrorMess } from "src/common/components/error-message-form";
import { FilePreviewModal } from "src/common/components/file-loader-preview-modal/inedx";
import { Label } from "src/common/components/label/index";
import { LoadingPage } from "src/common/components/loading-page";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { BREAD_CRUMB_USER_ACC_DETAIL } from "src/common/constants/breadcrumb.config";
import { DATE_FORMAT } from "src/common/constants/common.constant";
import { toPresentValue } from "src/common/lib/common.lib";
import { useGetDetailUserAccount } from "../hooks/useGetDetailUserAccount";
import { useUpdatePasswordUserAccount } from "../hooks/useUpdatePasswordUserAccount";
import { ChangeUserPassword } from "../interfaces";
import { USER_CLIENT_CHANGE_PASS } from "../schema";

const UserAccountDetail = () => {
  const searchParams = useParams();
  const [isChangePass, setIsChangePass] = useState(false);
  const [isOpenPreviewDocument, setOpenPreviewDocument] = useState(false);
  const { data, isLoading } = useGetDetailUserAccount(searchParams?.userId || "");
  const user = data?.data;

  const { mutate, isLoading: isUpdatingPassword } = useUpdatePasswordUserAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeUserPassword>({ resolver: yupResolver(USER_CLIENT_CHANGE_PASS) });

  function handleUpdatePassword(data: ChangeUserPassword) {
    mutate({ ...data, userId: searchParams?.userId || "" });
  }

  return (
    <Box>
      <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_USER_ACC_DETAIL} />
      <LoadingPage isLoading={isLoading}>
        <>
          <Box bg="white" mt="25px" padding="20px">
            <Flex>
              <Box ml="24px" mt="24px">
                <Text color="#A4A4A4">T??n ng?????i d??ng</Text>
                <Text>{toPresentValue(user?.fullName)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  S??? ??i???n tho???i
                </Text>
                <Text>{toPresentValue(user?.phoneNumber)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  Ng??y sinh
                </Text>
                <Text>
                  {toPresentValue(
                    user?.birthday ? dayjs(user?.birthday).format(DATE_FORMAT) : null,
                  )}
                </Text>
                <Text mt="24px" color="#A4A4A4">
                  Ch???c v???
                </Text>
                <Text>{toPresentValue(user?.userCompany?.position)}</Text>
              </Box>
              <Box ml="150px" mt="24px">
                <Text color="#A4A4A4">Th???i gian t???o</Text>
                <Text>
                  {toPresentValue(
                    user?.createdAt ? dayjs(user?.createdAt).format(DATE_FORMAT) : null,
                  )}
                </Text>

                <Text mt="24px" color="#A4A4A4">
                  Email
                </Text>
                <Text>{toPresentValue(user?.email)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  L?? do kh??a
                </Text>
                <Text>{toPresentValue(user?.lockReason)}</Text>
              </Box>
              <Avatar
                w="212px"
                h="165px"
                ml="350px"
                mt="24px"
                src={user?.avatar?.url}
                borderRadius="unset"
                objectFit="contain"
              />
            </Flex>
          </Box>
          <Box bg="white" mt="16px" padding="30px">
            <Flex>
              <Box ml="24px" mt="24px">
                <Text color="#A4A4A4">T??n doanh nghi???p/h???p t??c x??</Text>
                <Text>{toPresentValue(user?.userCompany?.name)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  S??? l?????ng nh??n vi??n tr???c ti???p
                </Text>
                <Text>{toPresentValue(user?.userCompany?.numberEmployees)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  S??? l?????ng nh??n vi??n gi??n ti???p
                </Text>
                <Text>{toPresentValue(user?.userCompany?.numUnofficialEmployees)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  Ng??y th??nh l???p
                </Text>
                <Text>
                  {toPresentValue(
                    user?.userCompany?.dateCreateCompany
                      ? dayjs(user?.userCompany?.dateCreateCompany).format(DATE_FORMAT)
                      : null,
                  )}
                </Text>

                <Text mt="24px" color="#A4A4A4">
                  S??? ??i???n tho???i c?? quan
                </Text>
                <Text>{toPresentValue(user?.userCompany?.phoneNumber)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  Website
                </Text>
                <Text>{toPresentValue(user?.userCompany?.website)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  Doanh nghi???p/h???p t??c x?? c?? ??p d???ng nh???t k?? ?????ng ru???ng kh??ng?
                </Text>
                <Text>
                  {toPresentValue(user?.userCompany?.isApplyWorkingDiary === 1 ? "C??" : "Kh??ng")}
                </Text>
              </Box>
              <Box ml="150px" mt="24px">
                <Text color="#A4A4A4">Doanh thu</Text>
                <Text>{toPresentValue(user?.userCompany?.revenue)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  L??nh v???c ho???t ?????ng
                </Text>
                <Text>{toPresentValue(user?.userCompany?.workField)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  ?????a ch???
                </Text>
                <Text>{toPresentValue(user?.userCompany?.address)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  M?? h??nh s???n xu???t
                </Text>
                <Text>{toPresentValue(user?.userCompany?.modelManufactoring)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  Quy m?? s???n xu???t
                </Text>
                <Text>{toPresentValue(user?.userCompany?.sizeManufactoring)}</Text>

                <Text mt="24px" color="#A4A4A4">
                  V??ng nguy??n li???u
                </Text>
                <Text>{toPresentValue(user?.userCompany?.materialArea)}</Text>
                <Text mt="24px" color="#A4A4A4">
                  Doanh nghi???p/h???p t??c x?? c?? ??p d???ng s??? h??a trong ho???t ?????ng s???n xu???t kh??ng?
                </Text>
                <Text>
                  {toPresentValue(user?.userCompany?.isapplyDigital === 1 ? "C??" : "Kh??ng")}
                </Text>
              </Box>
              <Box ml="150px" display="flex" justifyContent="center" flexDir="column">
                <Checkbox onChange={(e) => setIsChangePass(e.target.checked)} mt="58px">
                  C???p m???t kh???u m???i
                </Checkbox>
                <Label mt="27px" label="M???t kh???u m???i" isRequired={true} />
                <Box minH="60px">
                  <Input
                    isDisabled={!isChangePass}
                    placeholder="Nh???p m???t kh???u m???i"
                    type="password"
                    w="250px"
                    {...register("password")}
                  />
                  <ErrorMess error={errors.password?.message} maxW="250px" />
                </Box>

                <Label mt="22px" label="X??c nh???n m???t kh???u m???i" isRequired={true} />
                <Box minH="60px">
                  <Input
                    isDisabled={!isChangePass}
                    placeholder="X??c nh???n m???t kh???u m???i"
                    type="password"
                    w="250px"
                    {...register("confirmPassword")}
                  />
                  <ErrorMess error={errors.confirmPassword?.message} />
                </Box>

                <Button
                  maxW="max-content"
                  m="auto"
                  mt="4"
                  isDisabled={!isChangePass}
                  onClick={handleSubmit((data) => {
                    handleUpdatePassword(data);
                  })}
                  isLoading={isUpdatingPassword}
                >
                  ?????ng ??
                </Button>
              </Box>
            </Flex>
            <Box mt="32px">
              <Button onClick={() => setOpenPreviewDocument(true)}>
                Xem t??i li???u c???a kh??ch h??ng
              </Button>
              <Text color="#A4A4A4" mt="2">
                M?? t??? t??i li???u
              </Text>
              <Text maxW="250px">{user?.userDocument?.description}</Text>
            </Box>
          </Box>
          <FilePreviewModal
            title="T??i li???u c???a ng?????i d??ng"
            path={user?.userDocument?.file?.url || ""}
            isOpen={isOpenPreviewDocument}
            onClose={() => setOpenPreviewDocument(false)}
          />
        </>
      </LoadingPage>
    </Box>
  );
};
export { UserAccountDetail };
