import { useStateCallback } from "@ltp/utils/index";
import React, { createContext, useCallback, useContext } from "react";

const AppCheckoutContext = createContext({
  checkoutContext: {},
  setCheckoutContext: (_checkout) => () => {},
});

export const CheckoutProvider = ({ children, value }) => {
  const [checkoutContext, setCheckoutContext] = useStateCallback(value);
  const contextValue = {
    checkoutContext,
    setCheckoutContext: useCallback((checkoutContext) => setCheckoutContext(checkoutContext), []),
  };
  return <AppCheckoutContext.Provider value={contextValue}>{children}</AppCheckoutContext.Provider>;
};

export const useCheckoutContext = () => {
  const { checkoutContext, setCheckoutContext } = useContext(AppCheckoutContext);
  return { checkoutContext, setCheckoutContext };
};
