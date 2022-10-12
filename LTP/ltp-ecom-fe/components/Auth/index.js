import { Box, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import ForgotPassword from "pages/auth/forgot-password";
import ResetPassword from "pages/auth/reset-password";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export const SCREEN_AUTH = {
  signIn: 1,
  signUp: 2,
  forgetPassword: 3,
  resetPassword: 4,
};

export default function Auth({ screen, setScreen, emailLogin }) {
  const onClose = () => {
    setScreen(undefined);
  };

  const renderScreen = () => {
    switch (screen) {
      case SCREEN_AUTH.signIn:
        return <SignIn setScreen={setScreen} />;
      case SCREEN_AUTH.signUp:
        return <SignUp setScreen={setScreen} />;
      case SCREEN_AUTH.forgetPassword:
        return <ForgotPassword setScreen={setScreen} emailLogin={emailLogin} />;
      case SCREEN_AUTH.resetPassword:
        return <ResetPassword setScreen={setScreen} />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={Boolean(screen)} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <Box p={6}>{renderScreen()}</Box>
      </ModalContent>
    </Modal>
  );
}

Auth.defaultProps = {
  isOpen: false,
  isSignInMode: false,
  emailLogin: "",
};
