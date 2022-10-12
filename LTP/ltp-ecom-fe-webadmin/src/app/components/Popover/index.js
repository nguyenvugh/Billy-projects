import { Box, Popover as PopoverUI } from "@material-ui/core";
import { useState } from "react";

export default function Popover({ renderButton, children }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box onClick={handlePopoverOpen}>
        {renderButton instanceof Function && renderButton()}
      </Box>
      <PopoverUI
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {children}
      </PopoverUI>
    </div>
  )
}