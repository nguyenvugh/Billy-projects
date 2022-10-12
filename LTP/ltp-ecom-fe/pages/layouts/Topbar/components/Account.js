import { Box, HStack, Image, Link as LinkUI, Text } from "@chakra-ui/react";
import { useAppUserContext } from "@ltp/components/context/auth";
import MenuHover from "@ltp/components/MenuHover";
import { ACCOUNT_DROPDOWN_LINK } from "@ltp/constants/misc";
import useTranslation from "@ltp/hooks/useTranslation";
import { clearCache } from "@ltp/services/datacache";
import Link from "next/link";
import { useRouter } from "next/router";
import PropType from "prop-types";

export default function Account({ children }) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const { setUserContext } = useAppUserContext();
  // const { emptyCart } = useCart();
  const logout = () => {
    clearCache();
    setUserContext({});
    // emptyCart();
    router.push("/");
  };

  return (
    <MenuHover renderTrigger={() => children}>
      {ACCOUNT_DROPDOWN_LINK.map((item) => (
        <Box key={item?.path}>
          <Link passHref shallow href={item?.path}>
            <LinkUI _hover={{ textDecoration: "none", color: "#007BFF" }} cursor="pointer">
              <HStack p="12px 35px 12px 15px">
                <Image
                  boxSize="16px"
                  src={`/icons/${item?.icon}`}
                  alt={locale === "vi" ? item?.text : item?.textEn}
                />
                <Text color="gray" fontSize={14}>
                  {locale === "vi" ? item.text : item.textEn}
                </Text>
              </HStack>
            </LinkUI>
          </Link>
        </Box>
      ))}
      <HStack p="12px 35px 12px 15px" onClick={logout}>
        <Image boxSize="16px" src="/icons/power.svg" alt="logout" />
        <Text color="gray" fontSize={14}>
          {t("logOut")}
        </Text>
      </HStack>
    </MenuHover>
  );
}

Account.propTypes = {
  children: PropType.element,
};

Account.defaultProps = {
  children: "<p></p>",
};
