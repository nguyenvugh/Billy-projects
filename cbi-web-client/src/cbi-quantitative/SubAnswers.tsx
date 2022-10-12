import { HStack, Input, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import { CbiQuanAnswers } from "./interface";

const STYLES = {
  fontSize: {
    lg: "16px",
    base: "14px",
  },
  w: {
    lg: "200px",
    base: "33%",
  },
  h: "48px",
  type: "number",
  onWheel: (event: any) => event.currentTarget.blur(),
};
const LABEL_STYLE = {
  fontSize: {
    lg: "16px",
    base: "14px",
  },
  w: {
    lg: "300px",
    base: "33%",
  },
};

const CONTAINER_STYLE = {
  w: "full",
  spacing: {
    lg: "20",
    base: "2",
  },
};
export type SubAnswersProps = {
  onChange: (value?: number | string, code?: string) => void;
} & CbiQuanAnswers;

function handleChange(value: string = "1_1", onChange: (value?: string, code?: string) => void) {
  const code = value.split("_")[0];
  const val = value.split("_")[1];

  onChange(val, code);
}
function RadioEl({ groups = [], onChange }: SubAnswersProps) {
  function handleUpdate(value: string = "1_1", code?: string) {
    onChange(value, code);
  }
  return (
    <RadioGroup onChange={(value) => handleChange(value, handleUpdate)}>
      <Stack>
        {groups.map((radio) => {
          return <Radio value={`${radio.code}_${radio.value}`}>{radio.label}</Radio>;
        })}
      </Stack>
    </RadioGroup>
  );
}

function RowEl({ rows = [] }: SubAnswersProps) {
  return (
    <HStack {...CONTAINER_STYLE} py="2" bg="#EBEFF2">
      {rows.map((row, index) => {
        const width = index === 0 ? LABEL_STYLE.w : STYLES.w;
        const textAlign = index !== 0 ? "center" : ("" as any);
        return (
          <Text fontSize="14px" fontWeight="600" color="#2D3748" w={width} textAlign={textAlign!!}>
            {row}
          </Text>
        );
      })}
    </HStack>
  );
}

function LabelInputSelect({ label, select1, input1, onChange }: SubAnswersProps) {
  return (
    <HStack {...CONTAINER_STYLE}>
      <Text {...LABEL_STYLE}>{label}</Text>
      <Input
        {...STYLES}
        placeholder={input1?.placeholder}
        onChange={(e) => onChange(e.target.value, input1?.code)}
      />
      <Select
        onChange={(e) => handleChange(e.target.value, onChange)}
        placeholder={select1?.placeholder}
        {...STYLES}
      >
        {select1?.options?.map(({ label, value, code }) => (
          <option value={`${code || select1.code}_${value}`}>{label}</option>
        ))}
      </Select>
    </HStack>
  );
}

function LabelSelect({ label, select1, onChange }: SubAnswersProps) {
  return (
    <HStack {...CONTAINER_STYLE}>
      <Text {...LABEL_STYLE}>{label}</Text>
      <Select
        onChange={(e) => handleChange(e.target.value, onChange)}
        placeholder={select1?.placeholder}
        {...STYLES}
      >
        {select1?.options?.map(({ label, value, code }) => (
          <option value={`${code || select1.code}_${value}`}>{label}</option>
        ))}
      </Select>
    </HStack>
  );
}

function SelectInput({ input1, select1, onChange }: SubAnswersProps) {
  return (
    <HStack {...CONTAINER_STYLE}>
      <Select
        onChange={(e) => handleChange(e.target.value, onChange)}
        placeholder={select1?.placeholder}
        w="300px"
      >
        {select1?.options?.map(({ label, value, code }) => (
          <option value={`${code || select1.code}_${value}`}>{label}</option>
        ))}
      </Select>
      <Input
        {...STYLES}
        placeholder={input1?.placeholder}
        onChange={(e) => onChange(e.target.value, input1?.code)}
      />
    </HStack>
  );
}

function LabelSelectInput({ label, select1, input1, onChange }: SubAnswersProps) {
  return (
    <HStack {...CONTAINER_STYLE}>
      <Text {...LABEL_STYLE}>{label}</Text>
      <Select
        onChange={(e) => handleChange(e.target.value, onChange)}
        placeholder={select1?.placeholder}
        {...STYLES}
      >
        {select1?.options?.map(({ label, value, code }) => (
          <option value={`${code || select1.code}_${value}`}>{label}</option>
        ))}
      </Select>
      <Input
        {...STYLES}
        placeholder={input1?.placeholder}
        onChange={(e) => onChange(e.target.value, input1?.code)}
      />
    </HStack>
  );
}

function LabelInput({ label, input1, onChange }: SubAnswersProps) {
  return (
    <HStack {...CONTAINER_STYLE}>
      <Text {...LABEL_STYLE}>{label}</Text>
      <Input
        {...STYLES}
        placeholder={input1?.placeholder}
        onChange={(e) => onChange(e.target.value, input1?.code)}
      />
    </HStack>
  );
}

function LabelInputInput({ label, input1, input2, onChange }: SubAnswersProps) {
  return (
    <HStack {...CONTAINER_STYLE}>
      <Text {...LABEL_STYLE}>{label}</Text>
      <Input
        {...STYLES}
        placeholder={input1?.placeholder}
        onChange={(e) => onChange(e.target.value, input1?.code)}
      />
      <Input
        {...STYLES}
        placeholder={input2?.placeholder}
        onChange={(e) => onChange(e.target.value, input2?.code)}
      />
    </HStack>
  );
}

export {
  RadioEl,
  RowEl,
  LabelInputSelect,
  LabelSelect,
  SelectInput,
  LabelSelectInput,
  LabelInput,
  LabelInputInput,
};
