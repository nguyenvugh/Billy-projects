import {
  Box,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Fragment, useRef } from "react";

interface MenuHoverI {
  children: any;
  renderTrigger: any;
}

const MenuHover = ({ children, renderTrigger }: MenuHoverI) => {
  const initRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      __css={{
        "> :first-of-type": {
          cursor: "pointer",
        },
      }}
    >
      <Popover trigger="hover" styleConfig={{}} initialFocusRef={initRef}>
        {({ onClose }) => (
          <Fragment>
            <PopoverTrigger>
              {renderTrigger instanceof Function && renderTrigger()}
            </PopoverTrigger>
            <PopoverContent>
              {children && <PopoverArrow bgColor="#ffffff" />}
              <Box
                onClick={onClose}
                ref={initRef}
                __css={{
                  bgColor: "#ffffff",
                  borderRadius: 5,
                  cursor: "pointer",
                  boxShadow: "0 6px 12px rgb(0 0 0 / 18%)",
                  ">:not(:last-child)": {
                    borderBottom: "1px solid #BCCCFF",
                  },
                }}
              >
                {children}
              </Box>
            </PopoverContent>
          </Fragment>
        )}
      </Popover>
    </Box>
  );
};

export default MenuHover;
