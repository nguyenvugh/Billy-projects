import { Button, Text, Image, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

export default function WrapperPopover({ placement, title = "", icon = false, children }) {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>
        <Button
          border="1px solid #BCCCFF"
          borderRadius="4px"
          padding="9px 16px"
          widht="100%"
          display="flex"
          justifyContent="space-between"
          background="transparent"
          _hover={{ bg: "transparent" }}
          _focus={{ bg: "transparent" }}
        >
          <Text fontSize="14px" color="#071133">
            {title}
          </Text>
          {icon && <Image src="/imgs/mock/products/Funnel.svg" alt="Funnel" title="Funnel" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}
