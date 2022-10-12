import { createContext, useState } from "react";

export const CompanyInfoContext = createContext({
  companyInfo: [],
  setCompanyInfo: () => {},
});

export const CompanyInfoProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState();
  const value = { companyInfo, setCompanyInfo };
  return <CompanyInfoContext.Provider value={value}>{children}</CompanyInfoContext.Provider>;
};
