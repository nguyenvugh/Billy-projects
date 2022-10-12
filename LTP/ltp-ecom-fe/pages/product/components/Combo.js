import { Box, SimpleGrid } from "@chakra-ui/react";
import ComboItem from "@ltp/components/ComboItem";
import TitlePanel from "@ltp/components/TitlePanel";
import { SORT_DESC } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { getComboList } from "@ltp/services/product";
import { urlCombo } from "@ltp/services/urlAPI";
import { combineUrlParams } from "@ltp/utils/index";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function Combo({ product }) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const handleDetail = (combo) => {
    router.push({ query: { combo: combo?.id } });
  };
  const params = {
    page: 1,
    limit: 4,
    product: product?.id,
    sort_field: "created_at",
    sort_value: SORT_DESC,
  };
  const getCombo = () => getComboList(params);

  const { data, mutate } = useSWR(combineUrlParams(`${urlCombo}/${product?.id}`, params), getCombo);
  const comboList = data?.data?.results;

  useEffect(() => {
    mutate(`${urlCombo}/${product?.id}`);
  }, [locale]);

  if (Array.isArray(comboList) && comboList.length > 0) {
    return (
      <Box>
        <TitlePanel
          title="Combo"
          viewAll={t("viewAll")}
          href={{ query: { combo: "all" } }}
          heading="h3"
        />
        <SimpleGrid
          columns={4}
          spacing="16px"
          justifyContent="center"
          display={["none", "none", "none", "none", "grid", "grid"]}
        >
          {(comboList || []).map((item) => (
            <ComboItem item={item} productId={product?.id} handleDetail={handleDetail} />
          ))}
        </SimpleGrid>
        <SimpleGrid
          columns={3}
          spacing="16px"
          justifyContent="center"
          display={["none", "none", "grid", "grid", "none", "none"]}
        >
          {(comboList || []).map((item, index) => {
            if (index < 3) {
              return (
                <ComboItem
                  heading="h4"
                  item={item}
                  productId={product?.id}
                  handleDetail={handleDetail}
                />
              );
            }
            return null;
          })}
        </SimpleGrid>
        <SimpleGrid
          columns={2}
          spacing="16px"
          justifyContent="center"
          display={["grid", "grid", "none", "none", "none", "none"]}
        >
          {(comboList || []).map((item, index) => {
            if (index < 2) {
              return (
                <ComboItem
                  heading="h4"
                  item={item}
                  productId={product?.id}
                  handleDetail={handleDetail}
                />
              );
            }
            return null;
          })}
        </SimpleGrid>
      </Box>
    );
  }
  return null;
}
