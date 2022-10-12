import { getCity, getDistrict, getWard } from "@ltp/services/address";
import { useEffect, useState } from "react";

const COUNTRY_DEFAULT = 1;
const useAddress = (addressDefault) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [addressResult, setAddressResult] = useState({
    city: addressDefault?.city?.id || "",
    district: addressDefault?.district?.id || "",
    ward: addressDefault?.ward?.id || "",
    country: COUNTRY_DEFAULT,
  });

  useEffect(() => {
    getCityList();
  }, []);

  useEffect(() => {
    addressDefault && initialDetail();
  }, [addressDefault]);

  const initialDetail = () => {
    getDistrictList(addressDefault?.city?.id);
    getWardsList(addressDefault?.district?.id);
  };

  const handleChangeSelector = (event) => {
    const field = event.target.name;
    const { value } = event.target;

    switch (field) {
      case "city":
        getDistrictList(value);

        setAddressResult((prevState) => ({
          ...prevState,
          [field]: value,
          district: "",
          ward: "",
        }));
        setDistricts([]);
        setWards([]);
        break;
      case "district":
        getWardsList(value);

        setAddressResult((prevState) => ({ ...prevState, [field]: value, ward: "" }));
        setWards([]);
        break;
      case "ward":
        setAddressResult((prevState) => ({ ...prevState, [field]: value }));
        break;
      default:
    }
  };

  const getCityList = async () => {
    try {
      const request = await getCity({ country: COUNTRY_DEFAULT });
      const { data } = await request;
      setCities(data.results);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getDistrictList = async (cityId) => {
    try {
      if (!cityId) return;
      const request = await getDistrict({ city: cityId });
      const { data } = await request;
      setDistricts(data.results);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getWardsList = async (districtId) => {
    try {
      if (!districtId) return;
      const request = await getWard({ district: districtId });
      const { data } = await request;
      setWards(data.results);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    cities,
    districts,
    wards,
    addressResult,
    handleChangeSelector,
  };
};

export default useAddress;
