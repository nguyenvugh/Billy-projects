import { SCREEN_AUTH, SCREEN_CBI } from "@cbi/constants/index";
import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Lodash from "lodash";
import { useRouter } from "next/router";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import ClimateLeve1 from "./ClimateLevel1";
import ClimateLeve2 from "./ClimateLevel2";
import ClimateLeve3 from "./ClimateLevel3";
import ClimateSuccessWithoutScore from "./ClimateSuccessWithoutScore";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import ResetForgotPassword from "./ResetForgotPassword";
import ResetNotiForgotPassword from "./ResetNotiForgotPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SubmitSuccessCBI from "./SubmitSuccessCBI";
const ModalContainer = (props: any, ref: any) => {
  // const { screen, setScreen } = props;
  const router = useRouter();
  const tokenScreenForgot = Lodash.get(router, "query.token", "");
  const [screen, setScreen] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pointEvaluate, setPointEvaluate] = useState<number>(0);
  const [emailResetPass, setEmailResetPass] = useState<string>("");
  useImperativeHandle(ref, () => ({
    closeModal() {
      setIsOpen(false);
    },
    openModal(data: string, point: number) {
      setPointEvaluate(point || 0);
      setScreen(data);
      setIsOpen(true);
    },
  }));

  const renderScreen = useCallback(() => {
    switch (screen) {
      case SCREEN_AUTH.SIGN_IN:
        return <SignIn setScreen={setScreen} />;
      case SCREEN_AUTH.SIGN_UP:
        return <SignUp setScreen={setScreen} />;
      case SCREEN_AUTH.RESET_PASSWORD:
        return (
          <ResetForgotPassword
            setScreen={setScreen}
            setEmailResetPass={setEmailResetPass}
          />
        );
      case SCREEN_AUTH.NOTI_RESET_PASSWORD:
        return (
          <ResetNotiForgotPassword
            setScreen={setScreen}
            emailResetPass={emailResetPass}
          />
        );
      case SCREEN_AUTH.FORGOT_PASSWORD:
        return (
          <ForgotPassword setScreen={setScreen} token={tokenScreenForgot} />
        );
      case SCREEN_AUTH.NOTI_FORGOT_PASSWORD:
        return <ForgotPasswordSuccess setScreen={setScreen} />;
      case SCREEN_CBI.ClimateLevel1:
        return (
          <ClimateLeve3 setScreen={setScreen} pointEvaluate={pointEvaluate} />
        );
      case SCREEN_CBI.ClimateLevel2:
        return (
          <ClimateLeve2 setScreen={setScreen} pointEvaluate={pointEvaluate} />
        );
      case SCREEN_CBI.ClimateLevel3:
        return (
          <ClimateLeve1 setScreen={setScreen} pointEvaluate={pointEvaluate} />
        );
      case SCREEN_CBI.SubmitSuccessCBI:
        return (
          <SubmitSuccessCBI
            setScreen={setScreen}
            pointEvaluate={pointEvaluate}
          />
        );
      case SCREEN_CBI.ClimateSuccessWithoutScore:
        return <ClimateSuccessWithoutScore setScreen={setScreen} />;
      default:
        return null;
    }
  }, [screen]);
  if (!screen) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      closeOnOverlayClick={true}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Box p={6} py={10} position="relative">
          {pointEvaluate === 0 && <ModalCloseButton />}

          {renderScreen()}
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalContainer);
