import { Image } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";

export default function SelectComponent({ placeholder = "", data = [], onChange, value, ...rest }) {
  return (
    <Select
      borderColor="#BCCCFF"
      icon={<Image src="/imgs/mock/checkout/arrowSelect.svg" width="15px" height="9px" />}
      placeholder={placeholder}
      onChange={(item) => {
        onChange(item);
      }}
      value={value}
      {...rest}
    >
      {data.map((item, index) => (
        <option value={JSON.stringify(item)} key={index}>
          {item.name}
        </option>
      ))}
    </Select>
  );
}

SelectComponent.defaultProps = {
  onChange: () => {},
  data: [],
};
