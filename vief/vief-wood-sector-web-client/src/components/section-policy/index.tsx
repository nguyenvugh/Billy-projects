import { Article } from "@/src/common/interfaces/common.interface";
import { Stack } from "@chakra-ui/react";
import PolicyInfo from "./policy-info";
import PolicyUpdate from "./policy-update";

type Props = {
  policies: Article[];
};
export default function SectionPolicy({ policies }: Props) {
  return (
    <Stack spacing={{ md: "64px", sm: "48px" }}>
      {policies[1] && <PolicyInfo policy={policies[1]} />}
      {policies[0] && <PolicyUpdate policy={policies[0]} />}
    </Stack>
  );
}
