import { List } from '@material-ui/core';
import { ReactComponent as LogoMenu } from "app/assets/logo-menu.svg";
import { useLocation } from "react-router-dom";
import SidebarItem from './SidebarItem';
import './style.scss';

export default function Sidebar({ router }) {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <LogoMenu style={{ marginRight: 5 }} />
        <span>Long thành plastic </span>
        <span style={{ position: "relative", top: -4, marginLeft: 2 }}>®</span>
      </div>
      <div className="sidebar__list">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          style={{ zIndex: 9 }}
        >
          {Array.isArray(router) && router.map(item => (
            <SidebarItem key={item.to} item={item} pathname={location.pathname} />
          ))}
        </List>
      </div>
    </div>
  );
}