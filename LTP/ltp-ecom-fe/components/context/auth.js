import { useStateCallback } from "@ltp/utils/index";
import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useState } from "react";

const UserContext = createContext({
  userContext: {},
  onLanguageChange: (_lang) => {},
  setUserContext: (_user) => () => {},
  setOnLanguageChange: (_onLangChange) => () => {},
  searchProductKey: "",
  setSearchProductKey: (_keyword) => () => {},
});

export const AppUserProvider = ({ children, value }) => {
  const [userContext, setUserContext] = useStateCallback(value);
  const [onLanguageChange, setOnLanguageChange] = useState(() => () => {});
  const [searchProductKey, setSearchProductKey] = useState("");

  const contextValue = {
    userContext,
    onLanguageChange,
    searchProductKey,
    setUserContext: useCallback((userContext) => setUserContext(userContext), []),
    setOnLanguageChange: useCallback((onLangChange) => setOnLanguageChange(onLangChange), []),
    setSearchProductKey: useCallback((keyword) => setSearchProductKey(keyword), []),
  };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useAppUserContext = () => {
  const {
    userContext,
    setUserContext,
    onLanguageChange,
    setOnLanguageChange,
    searchProductKey,
    setSearchProductKey,
  } = useContext(UserContext);
  return {
    userContext,
    setUserContext,
    onLanguageChange,
    setOnLanguageChange,
    searchProductKey,
    setSearchProductKey,
  };
};
