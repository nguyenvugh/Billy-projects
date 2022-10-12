import { Ability } from "@casl/ability";

export type Resource = "all" | "admin";
export type Action = "manage" | "read" | "write";
export type UserType = "SUPER_ADMIN" | "ADMIN" | "CLIENT";
export type AppAbility = Ability<[Action, Resource]>;
export type ActionAbility = "can" | "cannot";
