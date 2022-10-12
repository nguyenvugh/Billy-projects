import ProfileRouter from "app/pages/Profile/router";
import { getPermissions, getToken, removePermissions, removeToken } from "app/reducers/auth";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import { HOME_ROUTER } from "./router";
import Sidebar from "./Sidebar";
import { urlProfile } from "./Sidebar/url";
import "./style.scss";

export default function AuthenticatedLayout() {
  const [router, setRouter] = useState([]);

  useEffect(() => {
    let permissions = getPermissions();
    if (Array.isArray(permissions)) {
      let router = [];
      HOME_ROUTER.forEach((item) => {
        let route = { ...item };
        if (Array.isArray(item?.childrens)) {
          let childrens = []
          item.childrens.forEach((child) => {
            if (permissions.indexOf(child.key) > -1) {
              childrens.push(child);
            }
          })
          if (childrens.length === 0) {
            return;
          } else {
            route.childrens = childrens;
            router.push(route);
          }
        } else {
          if (permissions.indexOf(item.key) > -1) {
            router.push(route);
          }
        }
      })
      setRouter(router);
    }
  }, [])

  const token = getToken();
  const decoded = token ? jwt_decode(token) : {};
  const expiredToken = decoded?.exp ? decoded?.exp * 1000 : null;
  const now = new Date().getTime();
  const expiredTokenLocal = localStorage.getItem("expiredToken");
  console.log('expiredToken', expiredToken, expiredTokenLocal);
  if (expiredToken && expiredToken < now && (expiredTokenLocal == "false" || !expiredTokenLocal)) {
    localStorage.setItem("expiredToken", true);
    removeToken();
    removePermissions();
    window.location.href = "/login";
    return;
  }
  if (getToken() === "") {
    removeToken();
    return <Redirect to={{ pathname: "/login" }} />;
  }
  return (
    <div className="authenticated-layout">
      <div className="authenticated-layout__left">
        <Sidebar router={router} />
      </div>
      <div className="authenticated-layout__right">
        <Menu />
        <div className="authenticated-layout__right__main">
          <Switch>
            <Route path={urlProfile} component={ProfileRouter} />
            {router.map((item, index) => {
              if (Array.isArray(item?.childrens)) {
                return item.childrens.map((child, index) => (
                  <Route
                    key={index}
                    exact={false}
                    path={child?.to}
                    component={child?.component}
                  />
                ));
              }
              return (
                <Route
                  key={index}
                  exact={false}
                  path={item?.to}
                  component={item?.component}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    </div>
  );
}
