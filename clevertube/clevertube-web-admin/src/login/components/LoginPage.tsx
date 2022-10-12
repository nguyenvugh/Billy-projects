import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "src/common/assets/images/clevertube-logo.png";
import { InputValueLoginType } from "../interface";
import { useAppDispatch } from "src/common/hooks/useAppDispatch";
import { ErrorMess } from "src/common/components/error-message/ErrorMessage";
import { LoginPageSchema } from "../schemas/LoginPage.schema";
import {
  emailAndPassword,
  isLoggedIn,
  rememberUser,
} from "../reducers/userLogin.reducer";
import { loginEmail } from "../service";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputValueLoginType>({
    resolver: yupResolver(LoginPageSchema),
  });
  const onSubmit = (data: InputValueLoginType) => {
    setIsLoading(true);
    loginEmail(data.emailLogin, data.passwordLogin, router, setIsLoading);
    dispatch(emailAndPassword(data));
    dispatch(isLoggedIn(true));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex marginTop="200px" flexDirection={"column"} justify="center" align="center">
        <Box>
          <Image src={Logo} width="90px" height={"90px"} margin="auto" />
          <Box h="40px" mt="25px">
            <Input {...INPUT_STYLE} placeholder="Username" {...register("emailLogin")} />
            {errors.emailLogin && (
              <ErrorMess mt={"5px"} error={errors.emailLogin.message} />
            )}
          </Box>
          <Box h={"40px"} mt="30px" mb={"30px"}>
            <InputGroup {...INPUT_STYLE}>
              <Input
                placeholder="Password"
                type={seePassword ? "text" : "password"}
                {...register("passwordLogin")}
              />
              <InputRightElement onClick={() => setSeePassword(!seePassword)}>
                {seePassword ? <ViewOffIcon /> : <ViewIcon />}
              </InputRightElement>
            </InputGroup>
            {errors.passwordLogin && (
              <ErrorMess width="350px" mt={"5px"} error={errors.passwordLogin.message} />
            )}
          </Box>
          <Flex justifyContent="flex-start">
            <Checkbox onChange={() => dispatch(rememberUser(true))}>Remember Me</Checkbox>
          </Flex>
          <Flex justifyContent="center">
            <Button
              width="173px"
              marginTop="16px"
              type="submit"
              spinnerPlacement="start"
              loadingText="Loading"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </Flex>
        </Box>
      </Flex>
    </form>
  );
};
const INPUT_STYLE = {
  //   marginTop: "16px",
  width: "361px",
};
