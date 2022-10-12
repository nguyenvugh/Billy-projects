import { Box, MenuItem } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import DropdownMenu from "app/components/DropDownMenu";

const SelectStatus = ({ value, onChange, statusList, isLarge = false }) => {
  const changeStatus = (data) => {
    onChange instanceof Function && onChange(data);
  };

  const renderButton = () => (
    <Box
      cursor="button"
      display="flex"
      alignItems="center"
      height="40px"
      width={isLarge ? "230px" : "210px"}
      pl="16px"
      pr="4px"
      className="MuiPaper-elevation1"
      border="1px solid #E2E2E2"
      borderRadius="4px"
      paddingx="12px"
      bgcolor="#ffffff"
    >
      <Box
        bgcolor={value?.color}
        component="span"
        borderRadius="50%"
        width="12px"
        height="12px"
        mr="8px"
      />
      <Box component="span" flexGrow={1}>
        {value?.label}
      </Box>
      <ExpandMore />
    </Box>
  );
  return (
    <DropdownMenu
      renderButton={renderButton}
      PaperProps={{ style: { width: 210 } }}
    >
      {Array.isArray(statusList) &&
        statusList.map((item) => (
          <MenuItem key={item?.status} onClick={() => changeStatus(item)}>
            <Box
              bgcolor={item?.color}
              component="span"
              borderRadius="50%"
              width="12px"
              height="12px"
              mr="8px"
            />
            {item?.label}
          </MenuItem>
        ))}
    </DropdownMenu>
  );
};

export default SelectStatus;
