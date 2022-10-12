import { components } from "./components/index";
import { extendTheme } from "@chakra-ui/react";
import foundations from "./foundations/index";

export const theme = extendTheme({
  ...foundations,
  styles: {
    global: () => ({
      body: {
        fontFamily: "Montserrat, sans-serif",
      },
    }),
  },
  components,
});
