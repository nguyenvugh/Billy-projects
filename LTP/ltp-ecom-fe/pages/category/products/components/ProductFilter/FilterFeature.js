import { Box, Checkbox } from "@chakra-ui/react";
import { useAppUserContext } from "@ltp/components/context/auth";
import useTranslation from "@ltp/hooks/useTranslation";
import Lodash from "lodash";
import { useRouter } from "next/router";
import WrapperFilter from "./WrapperFilter";

const FilterFeature = () => {
  const { userContext } = useAppUserContext();
  const router = useRouter();
  const { t, locale } = useTranslation();
  const onChange = (e, feature) => {
    router.push({
      query: { ...router.query, [feature?.id]: e.target.checked ? "1" : undefined, page: 1 },
    });
  };
  const FEATURE = Lodash.isEmpty(userContext) ? FEATURE_GUEST : FEATURE_LOGIN;

  return (
    <WrapperFilter title={t("featureTitle")}>
      {FEATURE.map((item) => {
        const isChecked = router.query[item?.id] === "1";
        return (
          <Box padding="8px 0" key={item.id}>
            <Checkbox
              title={locale === "vi" ? item.name : item.nameEn}
              isChecked={isChecked}
              onChange={(e) => onChange(e, item)}
            >
              {locale === "vi" ? item.name : item.nameEn}
            </Checkbox>
          </Box>
        );
      })}
      <Box borderBottom="1px solid #BCCCFF" />
    </WrapperFilter>
  );
};

export default FilterFeature;

export const FEATURE_LOGIN = [
  {
    id: "is_flash_sale",
    name: "Flash Sale",
    nameEn: "Flash Sale",
  },
  {
    id: "is_favourite",
    name: "Yêu Thích",
    nameEn: "Favorite",
  },
  {
    id: "is_feature",
    name: "Nổi Bật",
    nameEn: "Feature",
  },
  {
    id: "is_promotion",
    name: "Promotion",
    nameEn: "Promotion",
  },
  {
    id: "is_charity",
    name: "Kêu gọi từ thiện",
    nameEn: "Charity appeals",
  },
];
export const FEATURE_GUEST = [
  {
    id: "is_flash_sale",
    name: "Flash Sale",
    nameEn: "Flash Sale",
  },
  {
    id: "is_feature",
    name: "Nổi Bật",
    nameEn: "Feature",
  },
  {
    id: "is_promotion",
    name: "Promotion",
    nameEn: "Promotion",
  },
  {
    id: "is_charity",
    name: "Kêu gọi từ thiện",
    nameEn: "Charity appeals",
  },
];
