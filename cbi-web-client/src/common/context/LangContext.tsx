import { useStateCallback } from "@cbi/utils/contextHelper";
import React, { createContext, useCallback, useContext } from "react";
const LanguageContext = createContext({
  languageContext: {},
  setLanguageContext: (language: string) => () => {},
});

export const LanguageProvider = ({
  children,
  value,
}: {
  children: any;
  value: string;
}) => {
  const [languageContext, setLanguageContext] = useStateCallback(value);
  const contextValue = {
    languageContext,
    setLanguageContext: useCallback(
      (userContext) => setLanguageContext(userContext),
      []
    ),
  };
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const { languageContext, setLanguageContext } = useContext(LanguageContext);
  return { languageContext, setLanguageContext };
};
