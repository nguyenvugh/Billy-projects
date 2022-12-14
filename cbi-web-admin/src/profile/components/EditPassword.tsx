import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ConfirmEditInfo } from "../../common/components/confirm-modal/ConfirmEditInfo";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { AlertModal } from "src/common/components/confirm-modal/AlertModal";
import { ErrorMess } from "src/common/components/error-message-form";
import { REGEX_PHONENUMBER } from "../profile.schema";

const EditPassword = ({
  editInfo,
  register,
  setEditInfo,
  phoneNumber,
  data,
  errors,
  clearErrors,
  extraDataForm,
  // isValid,
}) => {
  // listen event checkbox
  // const errorFlag = { ...errors };
  const [isDisplayingForm, setIsDisplayForm] = useState(false);
  const isDisabled = true;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure();
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [confirmNewPass, setConfirmNewpass] = useState("");
  let newData = {};
  const handleError = () => {
    onOpenError();
  };
  const handleSuccess = () => {
    onOpen();
  };
  const regex = new RegExp(REGEX_PHONENUMBER);
  const { mutate: updatePassword, error } = useUpdateProfile(handleError, handleSuccess);
  // view password
  const [viewOldPass, setViewOldPass] = useState(false);
  const [viewNewPass, setViewNewPass] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);
  //  errors = true;
  const handleSubmitNewData = () => {
    if (!regex.test(phoneNumber) || JSON.stringify(errors) !== "{}") {
      return;
    }
    newData = {
      fullName: data?.data?.fullName,
      phoneNumber,
      avatarId: extraDataForm?.thumbnailId,
    };
    if (isDisplayingForm && (!oldPass || !newPass || !confirmNewPass)) {
      return;
    }
    if (newPass && oldPass) {
      newData["password"] = newPass;
    }
    if (oldPass) {
      newData["oldPassword"] = oldPass;
    }
    if (confirmNewPass && newPass) {
      newData["confirmPassword"] = confirmNewPass;
    }
    updatePassword(newData);
  };
  return (
    <Box mt="60px" ml="24.5px">
      {editInfo && (
        <>
          <Checkbox
            isChecked={isDisplayingForm}
            {...register("checkbox")}
            onChange={() => {
              setIsDisplayForm(!isDisplayingForm);
            }}
          >
            ?????i m???t kh???u
          </Checkbox>
          <Box mt="24.31px">
            <Text>M???t kh???u c??</Text>
            <InputGroup w={"382px"}>
              <Input
                value={oldPass}
                {...register("oldPass")}
                type={viewOldPass ? "text" : "password"}
                h="40px"
                onChange={(e) => {
                  setOldPass(e.target.value);
                  if (oldPass.length > 0) {
                    clearErrors("oldPass");
                  }
                }}
                isDisabled={isDisplayingForm ? !isDisabled : isDisabled}
                placeholder="Nh???p m???t kh???u c??"
              />
              <InputRightElement onClick={() => setViewOldPass(!viewOldPass)}>
                {!viewOldPass ? <ViewIcon color="#00000033" /> : <ViewOffIcon color="#00000033" />}
              </InputRightElement>
            </InputGroup>
            <ErrorMess error={error?.status && !errors.oldPass && error?.data?.message} />
            {errors.oldPass && <ErrorMess error={errors.oldPass?.message} />}
          </Box>
          <Box mt="24.31px">
            <Text>M???t kh???u m???i</Text>
            <InputGroup w={"382px"}>
              <Input
                id="newPass"
                h="40px"
                value={newPass}
                type={viewNewPass ? "text" : "password"}
                {...register("newPass", {
                  required: true,
                })}
                onChange={(e) => {
                  setNewPass(e.target.value);
                  if (newPass.length === 0) {
                    clearErrors("newPass");
                  }
                }}
                isDisabled={isDisplayingForm ? !isDisabled : isDisabled}
                placeholder="Nh???p m???t kh???u m???i"
              />
              <InputRightElement onClick={() => setViewNewPass(!viewNewPass)}>
                {!viewNewPass ? <ViewIcon color="#00000033" /> : <ViewOffIcon color="#00000033" />}
              </InputRightElement>
            </InputGroup>
            {errors.newPass && isDisplayingForm && <ErrorMess error={errors.newPass?.message} />}
          </Box>
          <Box mt="24.31px">
            <Text>X??c nh???n m???t kh???u m???i</Text>
            <InputGroup w={"382px"}>
              <Input
                id="confirmNewpass"
                {...register("confirmNewpass")}
                h="40px"
                value={confirmNewPass}
                type={viewConfirmPass ? "text" : "password"}
                onChange={(e) => {
                  setConfirmNewpass(e.target.value);
                  if (confirmNewPass.length > 0) {
                    clearErrors("confirmNewpass");
                  }
                }}
                isDisabled={isDisplayingForm ? !isDisabled : isDisabled}
                placeholder="Nh???p l???i m???t kh???u m???i"
              />
              <InputRightElement onClick={() => setViewConfirmPass(!viewConfirmPass)}>
                {!viewConfirmPass ? (
                  <ViewIcon color="#00000033" />
                ) : (
                  <ViewOffIcon color="#00000033" />
                )}
              </InputRightElement>
            </InputGroup>
            {errors.confirmNewpass && isDisplayingForm && (
              <ErrorMess error={errors.confirmNewpass?.message} />
            )}
          </Box>
        </>
      )}
      {editInfo && (
        <Flex mt={"50px"} ml="60px">
          <Button
            w="119px"
            bg={"white"}
            color="black"
            border={"1px solid #CBCBCB"}
            onClick={() => setEditInfo(!editInfo)}
          >
            H???y
          </Button>
          <Button
            w="119px"
            ml={"16px"}
            type="submit"
            bg="green.primary"
            border="2px solid #CBCBCB"
            onClick={handleSubmitNewData}
          >
            L??u l???i
          </Button>
          <ConfirmEditInfo
            onConfirm={onClose}
            onClose={onClose}
            isOpen={isOpen}
            header="C???p nh???t th??nh c??ng"
            content="Th??ng tin c???a b???n ???? ???????c c???p nh???t th??nh c??ng."
            marginLeft="40px"
            color="#718096"
          />
          <AlertModal
            title="Th??ng b??o"
            content="???? c?? l???i! Vui l??ng th??? l???i!"
            isOpen={isOpenError}
            onCancel={onCloseError}
            onDelete={onCloseError}
          />
        </Flex>
      )}
    </Box>
  );
};
export { EditPassword };
