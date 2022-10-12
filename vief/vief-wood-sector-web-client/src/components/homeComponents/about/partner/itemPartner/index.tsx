import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { PARTNER_LOGO } from "../../../constant";

export const ItemPartner = () => {
  return (
    <Stack direction="row" spacing={{ md: "64px", sm: "16px" }} alignSelf="center">
      {PARTNER_LOGO.map((partner, index) => {
        return (
          <Box
            cursor="pointer"
            key={index}
            w={{ md: "220px", sm: "110px" }}
            h={{ sm: "40px", md: "64px" }}
            position="relative"
            sx={{
              _hover: {
                img: {
                  filter: "grayscale(1)",
                },
              },
            }}
          >
            <Image src={partner.url} alt={partner.alt} priority layout="fill" objectFit="contain" />
          </Box>
        );
      })}
    </Stack>
  );
};
