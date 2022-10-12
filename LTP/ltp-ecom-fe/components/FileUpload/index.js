import { InputGroup } from "@chakra-ui/react";
import { useRef } from "react";

export default function FileUpload(props) {
  const { register, multiple, accept, children, onChange, inputGroupProps } = props;
  const inputRef = useRef();
  const { ...rest } = register;
  const handleClick = () => inputRef.current?.click();

  const handleChange = (event) => {
    if (event.target.files.length === 0) return;
    const callbackValue = {
      base64: "",
      file: "",
      event,
    };
    const fileReader = new FileReader();
    const file = event.target.files[0];
    fileReader.readAsDataURL(file);
    fileReader.onload = (eventFireReader) => {
      callbackValue.base64 = eventFireReader.target.result;
      callbackValue.file = file;
      onChange && onChange(callbackValue);
    };
  };
  return (
    <InputGroup onClick={handleClick} onChange={handleChange} {...inputGroupProps}>
      <input
        type="file"
        multiple={multiple || false}
        hidden
        accept={accept || "image/*"}
        {...rest}
        ref={(e) => {
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
}
