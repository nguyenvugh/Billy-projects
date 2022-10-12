import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Research from "./component/Research";
import Story from "./component/Story";

const Company = () => {
  return (
    <>
      <Stack spacing="64px">
        <Story></Story>
        <Research></Research>
      </Stack>
    </>
  );
};

export default Company;
