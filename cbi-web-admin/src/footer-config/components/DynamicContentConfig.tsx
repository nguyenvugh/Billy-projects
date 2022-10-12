import { Button, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomCkEditor } from "src/common/components/editor";
import { Label } from "src/common/components/label";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { Wrapper } from "src/common/components/wrapper/inedx";
import { BREAD_CRUMB_FOOTER_DETAIL } from "src/common/constants/breadcrumb.config";
import { ROUTE_CONFIG } from "src/common/constants/routes.constants";
import { useEditConfig } from "../hooks/useEditConfig";
import { useGetConfigDetail } from "../hooks/useGetConfigDetail";
import { ConfigKeys } from "../interfaces";

type DynamicContentConfigProps = {
  configKey: ConfigKeys;
};
function DynamicContentConfig({ configKey }: DynamicContentConfigProps) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { data } = useGetConfigDetail(configKey);
  const { mutate } = useEditConfig();
  const configContent = data?.data.content || "";

  function handleEditConfig() {
    mutate({
      key: configKey,
      value: {
        content,
      },
    });
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

      <Wrapper mt="20px">
        <Label isRequired label="Nội dung" />
        <CustomCkEditor data={configContent} onChange={(content) => setContent(content)} />
      </Wrapper>
    </>
  );
}

export { DynamicContentConfig };
