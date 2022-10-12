import { Button, Divider, Stack } from "@chakra-ui/react";
import { get, set } from "lodash";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { Wrapper } from "src/common/components/wrapper/inedx";
import { BREAD_CRUMB_FOOTER_DETAIL } from "src/common/constants/breadcrumb.config";
import { ROUTE_CONFIG } from "src/common/constants/routes.constants";
import { usePresignImg } from "src/common/hooks/usePresignImg";
import { useImmer } from "use-immer";
import { DEFAULT_HOME_CONFIG } from "../constants";
import { useEditConfig } from "../hooks/useEditConfig";
import { useGetConfigDetail } from "../hooks/useGetConfigDetail";
import { ConfigKeys, HomePageConfigI } from "../interfaces";
import { HomeCommentors } from "./HomeCommentors";
import { HomeDonors } from "./HomeDonors";
import { HomeIntroduce } from "./HomeIntroduce";
import { HomeMainIntroduce } from "./HomeMainIntroduce";

function HomePageConfig() {
  const navigate = useNavigate();
  const [homeConfigJson, setHomeConfigJson] = useImmer<HomePageConfigI>(DEFAULT_HOME_CONFIG);
  const { data } = useGetConfigDetail(ConfigKeys.PAGE_HOME);
  const { mutate } = useEditConfig();
  const rawConfigContent = data?.data.content;
  const { handleUpload } = usePresignImg();

  useEffect(() => {
    setHomeConfigJson(rawConfigContent ? getConfigAsJson(rawConfigContent) : DEFAULT_HOME_CONFIG);
  }, [rawConfigContent]);

  function getConfigAsJson(rawConfig: string) {
    let jsonConfig = DEFAULT_HOME_CONFIG;
    try {
      jsonConfig = JSON.parse(rawConfig);
    } catch (error) {
      jsonConfig = DEFAULT_HOME_CONFIG;
    }
    return jsonConfig;
  }

  function handleEditConfig() {
    mutate({
      key: ConfigKeys.PAGE_HOME,
      value: {
        content: JSON.stringify(homeConfigJson),
      },
    });
  }

  function handleUpdateConfig(path: string, value: string) {
    setHomeConfigJson((oldConfig) => {
      set(oldConfig, path, value);
    });
  }

  function handleAddMore(path: string, value?: string) {
    const newItems = [...get(homeConfigJson, path, []), value || get(DEFAULT_HOME_CONFIG, path)[0]];
    setHomeConfigJson((oldConfig) => {
      set(oldConfig, path, newItems);
    });
  }

  function handleRemoveItem(path: string, index: number) {
    const newItems = [...get(homeConfigJson, path, [])];
    newItems.splice(index, 1);
    setHomeConfigJson((oldConfig) => {
      set(oldConfig, path, newItems);
    });
  }

  async function handleUpdateImg(path: string, file?: File) {
    const thumnailRes = await handleUpload(file);
    handleUpdateConfig(path, thumnailRes.url || "");
  }

  async function handleUpdateLogo(file?: File) {
    const thumnailRes = await handleUpload(file);
    handleAddMore("donors.donorAvatarUrls", thumnailRes.url);
  }
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_FOOTER_DETAIL} />
        <Stack direction="row" spacing={4}>
          <Button
            bg="white"
            color="black"
            border="1px solid #CBCBCB"
            onClick={() => {
              navigate(ROUTE_CONFIG);
            }}
          >
            Hủy bỏ
          </Button>
          <Button bg="green.primary" type="submit" onClick={handleEditConfig}>
            Lưu
          </Button>
        </Stack>
      </Stack>

      <Wrapper
        sx={{
          hr: { my: "5" },
        }}
        mt="20px"
      >
        {/* Main Section */}
        <HomeMainIntroduce
          homeConfigJson={homeConfigJson}
          handleUpdateConfig={handleUpdateConfig}
          handleUpdateImg={handleUpdateImg}
        />

        <Divider />
        {/* Introduce Section */}
        <HomeIntroduce
          homeConfigJson={homeConfigJson}
          handleUpdateConfig={handleUpdateConfig}
          handleUpdateImg={handleUpdateImg}
          handleAddMore={handleAddMore}
          handleRemoveItem={handleRemoveItem}
        />

        <Divider />
        {/* Commentors Section */}
        <HomeCommentors
          homeConfigJson={homeConfigJson}
          handleUpdateConfig={handleUpdateConfig}
          handleUpdateImg={handleUpdateImg}
          handleAddMore={handleAddMore}
          handleRemoveItem={handleRemoveItem}
        />

        <Divider />
        {/* Donors Section */}
        <HomeDonors
          homeConfigJson={homeConfigJson}
          handleUpdateConfig={handleUpdateConfig}
          handleRemoveItem={handleRemoveItem}
          handleUpdateLogo={handleUpdateLogo}
        />
      </Wrapper>
    </>
  );
}

export { HomePageConfig };
