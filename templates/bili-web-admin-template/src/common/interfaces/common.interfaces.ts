import React from "react";
import { Resource } from "../casl/interfaces";

export interface RoutesConfig {
  pathName: string;
  resource?: Resource;
  routes: RoutesConfig[];
  component: React.FC;
}
export interface UserType {
  name: string;
  age: string;
  address: string;
}
