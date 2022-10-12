import Container from "@cbi/components/container";
import { TAB_ACCOUNT } from "@cbi/constants/index";
import { getProfile, updateProfile } from "@cbi/services/profile";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  List,
  ListItem,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Lodash from "lodash";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AvatarDefault,
  menuItems,
  UserInfoDefault,
} from "src/ClimateAccount/constants";
import { MenuItemI, ResponseUserInforI } from "src/ClimateAccount/interface";
import ChangePassword from "src/ClimateAccount/profile/ChangePassword";
import { GeneralInfo } from "src/ClimateAccount/profile/GeneralInfo";
import ResultEvaluate from "src/ClimateAccount/ResultEvaluate";

const ClimateAccount = (props: { userInfoProps: Object }) => {
  const router = useRouter();
  const [userInfor, setUserInfor] =
    useState<ResponseUserInforI>(UserInfoDefault);
  const [avatar, setAvatar] = useState<{ url: string; id: string }>({
    url: AvatarDefault.url,
    id: AvatarDefault.id,
  });
  const [activeMenu, setActiveMenu] = useState("");
  useEffect(() => {
    let search = "";
    if (typeof window !== "undefined") {
      search = window.location.search;
    }
    var searchParams = new URLSearchParams(search);
    if (!!searchParams.get("activeMenu")) {
      setActiveMenu(searchParams.get("activeMenu") || "");
    } else {
      router.replace({
        pathname: router.pathname,
        search: `activeMenu=${menuItems[0].name}`,
      });
    }
  }, [router]);
  useEffect(() => {
    (async () => {
      if (
        [TAB_ACCOUNT.PROFILE_ACCOUNT, TAB_ACCOUNT.CHANGE_PASSWORD].includes(
          Lodash.get(router, "query.activeMenu", "")
        )
      ) {
        try {
          const user = await getProfile();
          setUserInfor(user);
          setAvatar({
            url: user.avatar?.url || "",
            id: user.avatar?.id || "",
          });
        } catch (error) {}
      }
    })();
  }, [Lodash.get(router, "query.activeMenu", "")]);
  const MenuItem = (item: MenuItemI) => (
    <ListItem
      display="flex"
      alignItems="center"
      justifyContent="left"
      pt="35px"
      pb="0"
      onClick={() => {
        setActiveMenu(item.name);
        router.replace(`/climate-account?activeMenu=${item.name}`);
      }}
      borderRight={activeMenu === item.name ? "6px solid #61A533" : ""}
    >
      <Text
        as="span"
        fontWeight={activeMenu === item.name ? "bold" : 500}
        fontSize={{ base: "16px", md: "18px", lg: "20px" }}
      >
        {item.text}
      </Text>
    </ListItem>
  );
  const renderMenuContent = () => {
    switch (activeMenu) {
      case TAB_ACCOUNT.PROFILE_ACCOUNT:
        return (
          <GeneralInfo
            userInfor={userInfor}
            avatar={avatar}
            setAvatar={setAvatar}
            setUserInfor={setUserInfor}
          />
        );
      case TAB_ACCOUNT.CHANGE_PASSWORD:
        return (
          <ChangePassword
            userInfor={userInfor}
            avatar={avatar}
            setAvatar={setAvatar}
            handleUpdateProfile={handleUpdateProfile}
          />
        );
      case TAB_ACCOUNT.RESULT_EVALUATE:
        return <ResultEvaluate />;
      default:
        return null;
    }
  };
  const handleUpdateProfile = async (avatarId: string) => {
    let param = {
      fullName: userInfor.fullName,
      birthday: moment(userInfor.birthday).format("YYYY-MM-DD"),
      phoneNumber: userInfor.phoneNumber,
      companyName: userInfor.userCompany?.name || "",
      position: userInfor.userCompany?.position || "",
      address: userInfor.userCompany?.address || "",
      numberEmployees: userInfor.userCompany?.numberEmployees || 0,
      revenue: userInfor.userCompany?.revenue || 0,
      phoneNumberCompany: userInfor.userCompany?.phoneNumber || "",
      website: userInfor.userCompany?.website || "",
      workField: userInfor.userCompany?.workField || "",
      documentDescription: userInfor.userDocument?.description || "",
      avatarId: avatarId,
      // documentId: userInfor.userDocument.id,
    };
    try {
      const data = await updateProfile(param);
    } catch (error) {}
  };
  return (
    <div>
      <Head>
        <title>tài khoản</title>
      </Head>
      <Container>
        <Tabs>
          <Grid templateColumns={{ base: "1fr", md: "0.35fr 1fr" }}>
            <Box
              borderBottom="none"
              borderRight="1px solid #E2E8F0"
              color="#2D3748"
            >
              <Breadcrumb pt={{ base: "25px", md: "33px" }} color="#2D3748">
                <BreadcrumbItem>
                  <BreadcrumbLink>Tài khoản</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage fontWeight={"bold"}>
                  <Text>
                    {menuItems.find((e) => e.name === activeMenu)?.text}
                  </Text>
                </BreadcrumbItem>
              </Breadcrumb>
              <Text
                color="#2D3748"
                fontSize={{ base: "20px", md: "25px", lg: "30px" }}
                fontWeight="bold"
                pt={{ base: "25px", md: "35px", lg: "52px" }}
                pb="16px"
              >
                Tài khoản
              </Text>
              <List>{menuItems.map((item: MenuItemI) => MenuItem(item))}</List>
            </Box>

            <Box mb={"100px"}>{renderMenuContent()}</Box>
          </Grid>
        </Tabs>
      </Container>
    </div>
  );
};

export default ClimateAccount;
