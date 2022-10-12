import { Box, MenuItem } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import DropdownMenu from "app/components/DropDownMenu";
import Status from "../Status";

const SelectStatus = ({ value, onChange, statusList, width = 200, type = "select", disabled = false }) => {
  const changeStatus = (data) => {
    if (data?.status !== value?.status) {
      onChange instanceof Function && onChange(data);
    }
  }

  const renderButton = () => {
    switch (type) {
      case "label":
        return <Status label={value?.label} style={{ color: value?.color, width }} />
      default:
        return (
          <Box cursor="button" display="flex" alignItems="center" height="40px" width={width} pl="16px" pr="4px"
            className="MuiPaper-elevation1" border="1px solid #E2E2E2" borderRadius="4px" paddingx="12px" bgcolor="#ffffff"
          >
            {
              value?.color ?
              <Box bgcolor={value?.color} component="span" borderRadius="50%" width="12px" height="12px" mr="8px" /> : null
            }
            <Box component="span" flexGrow={1}>{value?.label}</Box>
            <ExpandMore />
          </Box>
        )
    }
  }
  return (
    <DropdownMenu renderButton={renderButton} disabled={disabled}>
      {Array.isArray(statusList) && statusList.map(item => (
        <MenuItem key={item?.status} onClick={() => changeStatus(item)} style={{ backgroundColor: value?.status === item?.status && "#27292b08" }}>
          <Box bgcolor={item?.color} component="span" borderRadius="50%" width="12px" height="12px" mr="8px" flexShrink={0} />
          {item?.label}
        </MenuItem>
      ))}
    </DropdownMenu>
  )
}

export default SelectStatus;