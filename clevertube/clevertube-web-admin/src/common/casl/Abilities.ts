import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { Ability } from "@casl/ability";
import { Action, Resource } from "./interfaces";

export const ability = new Ability<[Action, Resource]>();
export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);
