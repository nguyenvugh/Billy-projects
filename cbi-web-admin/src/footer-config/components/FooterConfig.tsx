import { Box, Button, Divider, Grid, GridItem, Input, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMess } from "src/common/components/error-message-form";
import { Label } from "src/common/components/label";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { Wrapper } from "src/common/components/wrapper/inedx";
import { BREAD_CRUMB_FOOTER_DETAIL } from "src/common/constants/breadcrumb.config";
import { ROUTE_CONFIG } from "src/common/constants/routes.constants";
import { footerConfigSchema } from "../footer-config.schema";
import { useEditConfig } from "../hooks/useEditConfig";
import { useGetConfigDetail } from "../hooks/useGetConfigDetail";
import { ConfigKeys, ConfigValue } from "../interfaces";

function FooterConfig() {
  const negative = useNavigate();
  const params = useParams();
  const { t } = useTranslation();
  const { data } = useGetConfigDetail(params?.configKey);
  const configDetail = data?.data || null;
  const { mutate } = useEditConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ConfigValue>({
    resolver: yupResolver(footerConfigSchema),
  });
  useEffect(() => {
    setValue("companyName", configDetail?.companyName || "");
    setValue("email", configDetail?.email || "");
    setValue("hotline", configDetail?.hotline || "");
    setValue("address", configDetail?.address || "");
  }, [configDetail]);

  const handleSave = () => {};

  const onSubmitData = (value: ConfigValue) => {
    mutate({
      key: ConfigKeys.FOOTER_CONFIG,
      value,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" w="full">
          <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_FOOTER_DETAIL} />
          <Stack direction="row" spacing={4}>
            <Button
              bg="white"
              color="black"
              border="1px solid #CBCBCB"
              onClick={() => {
                negative(ROUTE_CONFIG);
              }}
            >
              {t("cancel")}
            </Button>
            <Button bg="green.primary" type="submit" onClick={handleSave}>
              {t("save")}
            </Button>
          </Stack>
        </Stack>

        <Wrapper mt="20px">
          <Stack w="full">
            <Text fontWeight="600">{t("static-page")}</Text>
            <Divider />

            <Grid
              templateRows="repeat(5, 1fr)"
              templateColumns="repeat(3, 1fr)"
              rowGap="29px"
              columnGap="34px"
            >
              <GridItem>
                <Label label="Tên công ty" ml="25px" isRequired={true} />
                <Input
                  id="first-name"
                  placeholder="Nhập tên công ty"
                  {...register("companyName")}
                />
                {errors.companyName && <ErrorMess error={errors.companyName?.message} />}
              </GridItem>

              <GridItem>
                <Label label="Email" ml="25px" isRequired={true} />
                <Input id="first-name" placeholder="Nhập email" {...register("email")} />
                {errors.email && <ErrorMess error={errors.email?.message} />}
              </GridItem>

              <GridItem>
                <Label label="Hotline" ml="25px" isRequired={true} />
                <Input id="first-name" placeholder="Nhập hotline" {...register("hotline")} />
                {errors.hotline && <ErrorMess error={errors.hotline?.message} />}
              </GridItem>
              <GridItem colSpan={2}>
                <Label label="Địa chỉ" ml="25px" isRequired={true} />
                <Input id="first-name" placeholder="Nhập địa chỉ" {...register("address")} />
                {errors.address && <ErrorMess error={errors.address?.message} />}
              </GridItem>
            </Grid>
          </Stack>
        </Wrapper>
      </Box>
    </form>
  );
}

export { FooterConfig };
