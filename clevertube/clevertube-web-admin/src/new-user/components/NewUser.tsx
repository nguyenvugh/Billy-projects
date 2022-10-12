import React from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { UserType } from "src/common/interfaces/common.interfaces";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { addNewUser } from "../reducer";
import { ROUTER } from "src/common/constants/routes.constants";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { newUserSchema } from "../schema/NewUser.schema";

const { USER_INFO } = ROUTER;

export const NewUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(newUserSchema),
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: UserType) => {
    dispatch(addNewUser(data));
    navigate(USER_INFO);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        w={"300px"}
        h={"400px"}
        margin="100px auto"
        bg={"gray.line"}
        padding="30px"
        borderRadius="10px"
      >
        <Text textAlign={"center"}>Please Fill Your Information</Text>
        <Box h={"40px"} mt="20px">
          <Input
            {...register("name")}
            borderColor="black"
            focusBorderColor="black"
            placeholder="Enter Your Name"
          />
          {errors.name && <ErrorMess error={errors.name.message} />}
        </Box>
        <Box h={"40px"} mt="20px">
          <Input
            {...register("age")}
            borderColor="black"
            focusBorderColor="black"
            placeholder="Enter Your Name"
          />
          {errors.age && <ErrorMess error={errors.age.message} />}
        </Box>
        <Box h={"40px"} mt="20px">
          <Input
            {...register("address")}
            borderColor="black"
            focusBorderColor="black"
            placeholder="Enter Your Name"
          />
          {errors.address && <ErrorMess error={errors.address.message} />}
        </Box>
        <Text marginTop="20px">test i18n: {t("greeting")}</Text>
        <Button
          type="submit"
          marginLeft={"25px"}
          marginTop="30px"
          width="200px"
          bgColor="brand.800"
          color="white"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
