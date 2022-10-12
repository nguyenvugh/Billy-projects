import { useStateCallback } from "@cbi/utils/contextHelper";
import React, { createContext, useCallback, useContext } from "react";
export interface userI {
  email?: string;
  accessToken?: string;
  avatarUrl?: string;
}
const UserContext = createContext({
  userContext: {} as userI,
  setUserContext: (user: userI) => () => {},
});

export const UserProvider = ({
  children,
  value,
}: {
  children: any;
  value: userI;
}) => {
  const [userContext, setUserContext] = useStateCallback(value);
  const contextValue = {
    userContext,
    setUserContext: useCallback(
      (userContext) => setUserContext(userContext),
      []
    ),
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  return { userContext, setUserContext };
};
