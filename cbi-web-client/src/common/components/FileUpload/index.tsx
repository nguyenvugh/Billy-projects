import { useRef } from "react";
import { InputGroup } from "@chakra-ui/react";
export default function FileUpload(props: any) {
  const { register, multiple, accept, children, onChange, inputGroupProps } =
    props;
  const inputRef = useRef();
  const { ...rest } = register || {};
  // @ts-ignore
  const handleClick = () => inputRef.current?.click();

  const handleChange = (event: any) => {
    if (event.target.files.length === 0) return;
    const callbackValue = {
      base64: "",
      file: "",
      event: event,
    };
    const fileReader = new FileReader();
    const file = event.target.files[0];
    fileReader.readAsDataURL(file);
    fileReader.onload = (eventFireReader) => {
      callbackValue.base64 = eventFireReader?.target?.result as string;
      callbackValue.file = file;
      onChange && onChange(callbackValue);
    };
  };
  return (
    <InputGroup
      onClick={handleClick}
      onChange={handleChange}
      {...inputGroupProps}
    >
      <input
        type="file"
        multiple={multiple || false}
        hidden
        accept={accept || "image/*"}
        {...rest}
        ref={(e) => {
          // @ts-ignore
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
}
