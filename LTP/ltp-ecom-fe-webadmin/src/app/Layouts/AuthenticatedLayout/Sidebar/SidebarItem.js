import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
import { Fragment } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ item, pathname }) => {
  const [showMenu, setShowMenu] = useState(() => {
    return Array.isArray(item.childrens) && item.childrens.find(item => (
      pathname.indexOf(item.to) === 0 && item.to !== "/") || (item.to === "/" && pathname === "/")
    ) !== undefined
  });
  return (
    <Fragment>
      <ListItem
        component={item.childrens ? undefined : Link}
        to={item.to}
        button
        className={clsx("sidebar__list__item",
          !item.childrens && pathname.indexOf(item.to) === 0 && item.to !== "/" && 'sidebar__list__item__activated',
          item.to === "/" && pathname === "/" && 'sidebar__list__item__activated'
        )}
        onClick={() => setShowMenu(!showMenu)}
      >
        <ListItemIcon style={{ minWidth: 24, marginRight: 8 }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} disableTypography style={{ fontWeight: 600 }} />
        {item.childrens && (showMenu ? <ExpandMore /> : <ChevronRight />)}
      </ListItem>
      {
        Array.isArray(item.childrens) && (
          <Collapse in={showMenu}>
            <List component="div" className="sidebar__list__item__children">
              {item.childrens.map(child => (
                <ListItem
                  key={child.to}
                  component={Link}
                  to={child.to}
                  button
                  style={{ fontWeight: 600, color: "#8696d7" }}
                  className={clsx("sidebar__list__item__children__item", pathname?.indexOf(child.to) === 0 && 'sidebar__list__item__activated')}
                >
                  <ListItemText primary={child.text} disableTypography />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )
      }
    </Fragment>
  )
}

export default SidebarItem;