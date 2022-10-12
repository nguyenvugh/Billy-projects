import { execute } from "@/src/common/lib/request";
import { Box } from "@chakra-ui/react";
import { ENTERPRISE_CATEGORY, EVENT_CATEGORY, LIBRARY_CATEGORY, POLICY_CATEGORY } from "@/src/common/constants/urlAPI";
import { ReactNode, useEffect, useRef, useState } from "react";
import Footer from "./footer/Footer";
import Navbar from "./header/components/navbar/Navbar";
import { NavbarProps } from "./interfaces";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const [policy, setPolicy] = useState<NavbarProps>();
  const [company, setCompany] = useState<NavbarProps>();
  const [event, setEvent] = useState<NavbarProps>();
  const [library, setLibrary] = useState<NavbarProps>();
  const layoutRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  useEffect(() => {
    handleGetCategories();
  }, []);

  async function handleGetCategories() {
    const resPolicy = await execute.get(POLICY_CATEGORY);
    const resCompany = await execute.get(ENTERPRISE_CATEGORY);
    const resEvent = await execute.get(EVENT_CATEGORY);
    const resLibrary = await execute.get(LIBRARY_CATEGORY);
    setPolicy(resPolicy.data);
    setCompany(resCompany.data);
    setEvent(resEvent.data);
    setLibrary(resLibrary.data);
  }

  return (
    <Box position="relative" h="100vh" overflow="scroll" ref={layoutRef}>
      <Navbar dataPolicy={policy} dataCompany={company} dataEvent={event} dataLibrary={library} />
      {children}
      <Footer />
    </Box>
  );
};

export { HomeLayout };
