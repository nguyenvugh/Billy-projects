import { Box, Flex } from "@chakra-ui/react";
import Auth, { SCREEN_AUTH } from "@ltp/components/Auth";
import { keyCache } from "@ltp/constants/data";
import { GetOnpayCancel } from "@ltp/services/checkout";
import { readCache, saveCache } from "@ltp/services/datacache";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import useTranslation from "@ltp/hooks/useTranslation";
import OrderSuccess from "./orderSuccess";
import OrderUnsuccessful from "./orderUnsuccessful";

function OrderInfo() {
  const { t } = useTranslation();
  const { items: datacart, removeItem } = useCart();
  const [screen, setScreen] = useState();
  const router = useRouter();
  const vpc_TxnResponseCode = +router?.query?.vpc_TxnResponseCode;
  const orderId = router?.query?.orderId || router?.query?.vpc_MerchTxnRef || "";
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (!vpc_TxnResponseCode) {
      datacart.forEach((item) => {
        removeItem(item.id);
      });
    }
    const UserInfo = readCache(keyCache.UserInfo);
    setUserInfo(UserInfo || {});
    saveCache(keyCache.COUPON_CODE, {});
  }, []);

  useEffect(() => {
    const onPayCancel = async () => {
      await GetOnpayCancel(router.query);
    };
    onPayCancel();
  }, [router.query]);

  const setOpenAuthModal = () => {
    setScreen(SCREEN_AUTH.signUp);
  };

  return (
    <Box>
      <Head>
        <title>{t("payment")}</title>
        <meta name="description" content="LTP-ecommerce" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex h="600px" alignItems="center" justifyContent="center">
        {!vpc_TxnResponseCode ? (
          <OrderSuccess orderId={orderId} userInfo={userInfo} setOpenAuthModal={setOpenAuthModal} />
        ) : (
          <OrderUnsuccessful
            orderId={orderId}
            userInfo={userInfo}
            setOpenAuthModal={setOpenAuthModal}
          />
        )}
      </Flex>
      <Auth screen={screen} setScreen={setScreen} />
    </Box>
  );
}
export default OrderInfo;
