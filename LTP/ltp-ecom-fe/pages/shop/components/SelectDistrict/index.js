import { Select } from "@chakra-ui/select";
import { getDistrict } from "@ltp/services/address";
import { urlDistrict } from "@ltp/services/urlAPI";
import useSWR from "swr";
import useTranslation from "@ltp/hooks/useTranslation";

export default function SelectDistrict({ cityId, value, onChange }) {
  const { t } = useTranslation();
  let districtList = [];
  if (cityId) {
    const params = { city: cityId };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useSWR(urlDistrict, () => getDistrict(params));
    if (Array.isArray(data?.data?.results)) {
      districtList = data.data.results;
    }
  }

  return (
    <Select maxWidth={{ base: "100%", md: "30%" }} my={2} value={value} onChange={onChange}>
      <option value={0}>{t("all")}</option>
      {districtList.map((district) => (
        <option key={district?.id} value={district?.id}>
          {district?.name}
        </option>
      ))}
    </Select>
  );
}
