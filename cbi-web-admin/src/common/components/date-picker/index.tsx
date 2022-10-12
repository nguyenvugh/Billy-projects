import { Box, Input } from "@chakra-ui/react";
import { forwardRef, useEffect, useState } from "react";
import DatePickerReact, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMess } from "../error-message-form";

type DatePickerProps = {
  error?: string;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
} & ReactDatePickerProps;
function DatePicker({
  onChange,
  error,
  dateFormat,
  customInput,
  timeInputLabel,
  selected,
  disabled,
  ...rest
}: DatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date());
  useEffect(() => {
    setStartDate(selected);
  }, [selected]);

  function handleChangeDate(date: Date | null) {
    setStartDate(date);
    onChange(date);
  }

  const CustomInput = forwardRef(({ value, onClick }: any, _ref) => (
    <Input onFocus={onClick} value={value} disabled={disabled} />
  ));
  return (
    <Box
      sx={{
        ".react-datepicker__triangle": {
          display: "none",
        },
      }}
    >
      <DatePickerReact
        {...rest}
        selected={startDate}
        onChange={(date) => handleChangeDate(date)}
        timeInputLabel={timeInputLabel || "Time:"}
        dateFormat={dateFormat || "dd/MM/yyyy h:mm aa"}
        customInput={customInput || <CustomInput disabled={disabled} />}
      />
      <ErrorMess error={error} />
    </Box>
  );
}

export { DatePicker };
