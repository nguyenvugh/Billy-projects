import { Ability } from "@casl/ability";

export type UserType = "SUPER_ADMIN" | "ADMIN" | "CLIENT";
export type Action = "manage" | "read" | "write";
export type ActionAbility = "can" | "cannot";
export type Resource = "all" | "cbi" | "user" | "admin" | "news" | "config" | "documents";
export type AppAbility = Ability<[Action, Resource]>;
