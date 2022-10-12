import { Select } from "@chakra-ui/select";
import useTranslation from "@ltp/hooks/useTranslation";
import { getCity } from "@ltp/services/address";
import { urlCity } from "@ltp/services/urlAPI";
import useSWR from "swr";

export default function SelectCity({ countryId, value, onChange }) {
  const { t } = useTranslation();
  let cityList = [];
  if (countryId) {
    const params = { country: countryId };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: city } = useSWR(urlCity, () => getCity(params));
    if (Array.isArray(city?.data?.results)) {
      cityList = city.data.results;
    }
  }

  return (
    <Select maxWidth={{ base: "100%", md: "30%" }} my={2} value={value} onChange={onChange}>
      <option value={0}>{t("all")}</option>
      {cityList.map((city) => (
        <option key={city?.id} value={city?.id}>
          {city?.name}
        </option>
      ))}
    </Select>
  );
}
