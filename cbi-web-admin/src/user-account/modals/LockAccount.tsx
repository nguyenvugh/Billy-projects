import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMess } from "src/common/components/error-message-form";
import { Status } from "src/common/constants/common.constant";
import { useUpdateSatusUserAccount } from "../hooks/useUpdateSatusUserAccount";

type LockAccountProps = {
  userId: string;
  title: string;
  content: string;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: (_lockReason?: string) => void;
};

const LockAccount = ({ userId, title, content, isOpen, onCancel }: LockAccountProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { mutate } = useUpdateSatusUserAccount();
  function handleLockAccount({ lockReason }: { lockReason: string }) {
    mutate(
      { userId, status: Status.INACTIVE, lockReason },
      {
        onSettled() {
          onCancel();
        },
      },
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent mt="40">
          <ModalHeader
            borderBottom="1px solid #EEEEEE"
            fontWeight="600"
            fontSize="18px"
            textTransform="uppercase"
          >
            {title}
          </ModalHeader>
          <ModalBody pb={6} fontSize="16px" fontWeight="normal">
            {content}
            <Input
              mt="19px"
              placeholder="Nhập lý do khoá"
              h="113px"
              w="400px"
              {...register("lockReason", {
                maxLength: 250,
              })}
            />
            <ErrorMess error={errors.lockReason && "Lý do phải dưới 250 kí tự!"} />
          </ModalBody>

          <ModalFooter justifyContent="center" pt="0">
            <Button
              bg="white"
              color="black"
              border="1px solid #CBCBCB"
              mr={4}
              onClick={onCancel}
              w="138px"
            >
              Huỷ
            </Button>
            <Button
              isDisabled={!watch("lockReason")}
              onClick={handleSubmit((data) => {
                handleLockAccount(data as { lockReason: string });
              })}
              bg="green.primary"
              color="white"
              w="138px"
            >
              Khóa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export { LockAccount };
