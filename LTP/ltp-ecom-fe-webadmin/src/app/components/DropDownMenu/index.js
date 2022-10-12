import React, { Fragment, useEffect, useRef, useState } from "react";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 3,
  },
  item: {
    cursor: "pointer",
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
    color: "#000000",
    "& li:not(:first-child)": {
      borderTop: "1px solid #DFDFDF",
    },
    "& .MuiTypography-root, & .MuiListItem-root": {
      fontWeight: 500,
    },
  },
}));

const DropdownMenu = ({
  children,
  anchorOrigin,
  transformOrigin,
  renderButton,
  clickToClose = true,
  open,
  setOpen,
  disabled = false,
}) => {
  if (!anchorOrigin) {
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "right",
    };
  }
  if (!transformOrigin) {
    transformOrigin = {
      vertical: "top",
      horizontal: "right",
    };
  }
  const classes = useStyles();
  const refButton = useRef();
  const [anchorEl, setAnchorEl] = useState();

  useEffect(() => {
    if (open) {
      setAnchorEl(refButton?.current);
    } else {
      setAnchorEl(null);
    }
  }, [open]);

  const handleClick = () => {
    if (disabled) return;
    if (setOpen instanceof Function) {
      setOpen(true);
    } else {
      setAnchorEl(refButton?.current);
    }
  };

  const handleClose = () => {
    if (setOpen instanceof Function) {
      setOpen(false);
    } else {
      setAnchorEl(null);
    }
  };
  const onClick = () => {
    if (clickToClose) {
      setAnchorEl(null);
    }
  };

  return (
    <Fragment>
      <div
        className={clsx(!disabled && classes.item)}
        onClick={handleClick}
        ref={refButton}
      >
        {renderButton instanceof Function ? (
          renderButton()
        ) : (
          <IconButton className={classes.root}>
            <MoreVertIcon />
          </IconButton>
        )}
      </div>
      <Menu
        style={{ top: 4 }}
        MenuListProps={{
          classes: { padding: classes.padding },
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClick={onClick}
        PaperProps={{ style: { width: refButton?.current?.clientWidth, maxHeight: 300 } }}
        autoFocus={false}
      >
        {children}
      </Menu>
    </Fragment>
  );
};

export default DropdownMenu;
