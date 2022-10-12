import React from "react";
import {
  AlertStatus,
  Box,
  Icon,
  Text,
  UseToastOptions,
  useToast as useToastChakra,
} from "@chakra-ui/react";
import { IoMdCheckmarkCircle, IoMdInformationCircle } from "react-icons/io";

const STATUS_COLOR: Record<AlertStatus, string> = {
  success: "green.primary",
  error: "red.primary",
  warning: "orange.400",
  info: "blue.400",
};
export function useToast() {
  const toast = useToastChakra();
  function handleToast({ title, status, ...rest }: UseToastOptions) {
    toast({
      title,
      render: () => <ContainerMess title={title} status={status} />,
      duration: 2000,
      position: "top",
      ...rest,
    });
  }
  return handleToast;
}

function ContainerMess({ title, status }: { title: React.ReactNode; status?: AlertStatus }) {
  const icon = status === "success" ? IoMdCheckmarkCircle : IoMdInformationCircle;
  return (
    <Box
      display="flex"
      alignItems="center"
      bg={STATUS_COLOR[status || "success"]}
      borderRadius="6px"
      px="2"
      py="3"
    >
      <Icon as={icon} mr="2" size="s" boxSize={6} color="white" />
      <Text fontSize="18px" fontWeight="medium" color="white">
        {title}
      </Text>
    </Box>
  );
}
