import React from "react";
import { LoginForm } from "./components/LoginForm";
import { BannerAndLogo } from "./BannerAndLogo";
import { Flex } from "@chakra-ui/react";

function Login() {
  return (
    <Flex>
      <BannerAndLogo />
      <LoginForm />
    </Flex>
  );
}

export { Login };
